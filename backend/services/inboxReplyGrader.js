const AZURE_TIMEOUT_MS = 12000;

function normalizeText(input) {
  return String(input || "").trim();
}

/**
 * Match frontend InboxInspectorContext: drop refusal sentences before flagging
 * "code" / "gift card" so "I won't send the code" is not treated as sharing.
 */
function stripRefusalClausesForRiskScoringBackend(lower) {
  const parts = lower
    .split(/(?<=[.!?])\s+|\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks = parts.length > 0 ? parts : (lower.trim() ? [lower.trim()] : []);
  if (chunks.length === 0) return "";
  const kept = chunks.filter(
    (p) =>
      !/^(i\s+)?(won't|wont|don't|do not|never|will not|can't|cannot)\b/i.test(
        p
      ) && !/^(no|nope|never)\.?\s*$/i.test(p)
  );
  return kept.join(" ").trim();
}

function getHeuristicSignals(reply) {
  const text = normalizeText(reply);
  const lower = text.toLowerCase();
  const textForUnsafeKeywords = stripRefusalClausesForRiskScoringBackend(lower);

  const noWhitespace = lower.replace(/\s+/g, "");
  const alphaOnly = noWhitespace.replace(/[^a-z]/g, "");
  const alphaRatio = noWhitespace.length
    ? alphaOnly.length / noWhitespace.length
    : 0;
  const uniqueChars = new Set(noWhitespace).size;
  const uniqueRatio = noWhitespace.length
    ? uniqueChars / noWhitespace.length
    : 0;

  const hasUnsafeKeywords =
    Boolean(textForUnsafeKeywords) &&
    /\b(password|passcode|otp|code|gift card|ssn|bank|account number|send money|wire|id photo)\b/.test(
      textForUnsafeKeywords
    );
  const hasSafeAction =
    /\b(verify|check|double-check|confirm|official|app|website|safely|trusted adult|in person|report|ignore|contact|block|unsubscribe|won't|will not)\b/.test(
      lower
    );

  const isBlank = text.length === 0;
  const isVeryShort = text.length > 0 && text.length < 8;
  const looksLikeGibberish =
    !isBlank &&
    (alphaRatio < 0.45 ||
      uniqueRatio < 0.22 ||
      /(.)\1{4,}/.test(noWhitespace) ||
      /^[a-z]{10,}$/i.test(noWhitespace) === false && noWhitespace.length > 14 && !/\s/.test(text));

  return {
    text,
    hasUnsafeKeywords,
    hasSafeAction,
    isBlank,
    isVeryShort,
    looksLikeGibberish,
  };
}

function coachTipOkBandDefault(theme, channel, correctVerdict) {
  if (theme === "friend_trip_photo_legit" && correctVerdict === "legit") {
    return "For a friend message, you can also confirm on another app or in person you already trust with them—no company 'official site' needed.";
  }
  if (channel === "dm" && correctVerdict === "legit") {
    return "When it’s social, be specific: confirm it’s the person (another chat, call) before private steps—not always a business website.";
  }
  if (correctVerdict === "legit") {
    return "For businesses and accounts, be specific: use the official app/site you already trust or verify in person.";
  }
  return "Be specific: use official channels, out-of-band confirmation, or a trusted adult when something feels off.";
}

function coachTipStrongLegit(theme, channel) {
  if (theme === "friend_trip_photo_legit") {
    return "Good call — for friends, that’s a normal way to be careful with photos and who can see them.";
  }
  if (channel === "dm") {
    return "Good — keep confirming who you’re talking to on channels you already trust with that person.";
  }
  return "Good: keep actions on official channels and apps you already trust.";
}

function fallbackGrade({ playerReply, correctVerdict, theme, channel }) {
  const s = getHeuristicSignals(playerReply);

  if (s.isBlank) {
    return {
      replySafetyBand: "weak",
      sharesCredentials: false,
      shortRationale: "Reply is blank.",
      coachTip: "Write a short action plan instead of leaving the reply empty.",
    };
  }

  if (s.looksLikeGibberish || s.isVeryShort) {
    return {
      replySafetyBand: "weak",
      sharesCredentials: false,
      shortRationale: "Reply appears too short or low-quality.",
      coachTip:
        "Use clear words that explain what you will do (verify, report, or confirm safely).",
    };
  }

  if (s.hasUnsafeKeywords) {
    return {
      replySafetyBand: "weak",
      sharesCredentials: true,
      shortRationale: "Reply includes risky sharing/payment language.",
      coachTip: "Never share codes, payment, or ID details in message replies.",
    };
  }

  if (s.hasSafeAction) {
    return {
      replySafetyBand: "strong",
      sharesCredentials: false,
      shortRationale: "Reply uses explicit safe verification actions.",
      coachTip:
        correctVerdict === "legit"
          ? coachTipStrongLegit(theme, channel)
          : "Good: you avoided risky steps and chose safer verification.",
    };
  }

  return {
    replySafetyBand: "ok",
    sharesCredentials: false,
    shortRationale: "Reply is understandable but lacks specific safety actions.",
    coachTip: coachTipOkBandDefault(theme, channel, correctVerdict),
  };
}

function isOpenAiV1BaseUrl(endpoint) {
  if (!endpoint) return false;
  return /\/openai\/v1\/?$/i.test(endpoint.replace(/\/+$/, ""));
}

function isAzureConfigured() {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const key = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  if (!endpoint || !key || !deployment) return false;
  if (isOpenAiV1BaseUrl(endpoint)) return true;
  // Legacy: resource root + api-version
  return Boolean(process.env.AZURE_OPENAI_API_VERSION);
}

/**
 * Resolves the chat-completions URL for either:
 * - OpenAI-compatible v1: .../openai/v1/ + /chat/completions (Azure portal sample)
 * - Classic Azure: .../openai/deployments/{deployment}/chat/completions?api-version=...
 */
function resolveChatCompletionsUrl() {
  const raw = process.env.AZURE_OPENAI_ENDPOINT || "";
  const base = raw.replace(/\/+$/, "");
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

  if (isOpenAiV1BaseUrl(base)) {
    const path = `${base}/chat/completions`;
    if (apiVersion) {
      const sep = path.includes("?") ? "&" : "?";
      return `${path}${sep}api-version=${encodeURIComponent(apiVersion)}`;
    }
    return path;
  }

  if (!apiVersion) {
    throw new Error("AZURE_OPENAI_API_VERSION is required for non-v1 Azure endpoints");
  }
  return `${base}/openai/deployments/${deployment}/chat/completions?api-version=${encodeURIComponent(
    apiVersion
  )}`;
}

async function callAzureGrade({ caseId, playerReply, channel, correctVerdict, theme }) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/+$/, "");
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const useV1 = isOpenAiV1BaseUrl(endpoint);
  const apiKey = process.env.AZURE_OPENAI_API_KEY;

  const url = resolveChatCompletionsUrl();

  const systemPrompt =
    "You evaluate the SAFETY QUALITY of a player's reply to suspicious or legit inbox messages for teens. " +
    "Return strict JSON only with keys: replySafetyBand (strong|ok|weak), sharesCredentials (boolean), shortRationale (<=18 words), coachTip (<=22 words). " +
    "Mark weak for blank, gibberish, nonsense, or unsafe sharing/payment actions. " +
    "sharesCredentials MUST be false when the player only REFUSES to share (e.g. \"I won't send ID/money/codes\") or names what they will not share — referring to sensitive items in a refusal is NOT sharing. " +
    "Set sharesCredentials true only if they indicate they WILL or DID share secrets, codes, payment, or ID.";

  const userPrompt = {
    task: "Grade this player reply for safety quality.",
    caseId,
    channel,
    correctVerdict,
    theme,
    playerReply,
    rubric: [
      "strong: clear safe action and no risky sharing",
      "ok: understandable but vague safe action",
      "weak: blank, gibberish, or unsafe sharing/payment behavior",
    ],
    note:
      theme === "friend_trip_photo_legit" && channel === "dm"
        ? "This case is a casual friend/photo share. coachTip should NOT default to 'bank/company official website' unless the message is about a business. For friends, 'verify' can mean confirm it's really the person (another app, in person) or keep private photos in trusted threads."
        : theme === "manager_gift_card_scam"
          ? "Fake boss asks for gift card codes. Refusing to send codes, reporting or blocking, and verifying with the real manager are STRONG. Mentioning 'code' or 'gift card' only in a refusal (e.g. I won't send codes) is NOT sharing. replySafetyBand should be at least ok, often strong. coachTip: praise no-code + verify/block — do not scold for the word 'code' in a refusal."
          : "coachTip should match the situation (DM vs email, social vs business).",
  };

  const requestBody = {
    temperature: 0.1,
    max_tokens: 180,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: JSON.stringify(userPrompt) },
    ],
  };
  if (useV1) {
    requestBody.model = deployment;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AZURE_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Azure grading failed (${response.status})`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content || "{}");

    const band = ["strong", "ok", "weak"].includes(parsed.replySafetyBand)
      ? parsed.replySafetyBand
      : "ok";

    return {
      replySafetyBand: band,
      sharesCredentials: Boolean(parsed.sharesCredentials),
      shortRationale:
        typeof parsed.shortRationale === "string"
          ? parsed.shortRationale
          : "Graded by AI with low confidence.",
      coachTip:
        typeof parsed.coachTip === "string"
          ? parsed.coachTip
          : "Use clear safe actions and avoid sharing sensitive details.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function gradeInboxReply(payload) {
  const { caseId, playerReply, channel, correctVerdict, theme } = payload || {};
  const text = normalizeText(playerReply);

  if (!text) {
    return fallbackGrade({ playerReply: text, correctVerdict, theme, channel });
  }

  // Hard guard for gibberish/low quality before any API call.
  const signals = getHeuristicSignals(text);
  if (signals.looksLikeGibberish || signals.isVeryShort) {
    return fallbackGrade({ playerReply: text, correctVerdict, theme, channel });
  }

  if (!isAzureConfigured()) {
    return fallbackGrade({ playerReply: text, correctVerdict, theme, channel });
  }

  try {
    return await callAzureGrade({
      caseId,
      playerReply: text,
      channel,
      correctVerdict,
      theme,
    });
  } catch (error) {
    return fallbackGrade({ playerReply: text, correctVerdict, theme, channel });
  }
}

