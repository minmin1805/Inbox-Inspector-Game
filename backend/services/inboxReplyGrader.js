const AZURE_TIMEOUT_MS = 12000;

function normalizeText(input) {
  return String(input || "").trim();
}

function getHeuristicSignals(reply) {
  const text = normalizeText(reply);
  const lower = text.toLowerCase();

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
    /\b(password|passcode|otp|code|gift card|ssn|bank|account number|send money|wire|id photo)\b/.test(
      lower
    );
  const hasSafeAction =
    /\b(verify|official|app|website|trusted adult|in person|report|ignore|contact)\b/.test(
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

function fallbackGrade({ playerReply, correctVerdict }) {
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
          ? "Good: keep actions on official channels."
          : "Good: you avoided risky steps and chose safer verification.",
    };
  }

  return {
    replySafetyBand: "ok",
    sharesCredentials: false,
    shortRationale: "Reply is understandable but lacks specific safety actions.",
    coachTip:
      "Be specific: mention checking an official app/site or verifying in person.",
  };
}

function isAzureConfigured() {
  return Boolean(
    process.env.AZURE_OPENAI_ENDPOINT &&
      process.env.AZURE_OPENAI_API_KEY &&
      process.env.AZURE_OPENAI_DEPLOYMENT &&
      process.env.AZURE_OPENAI_API_VERSION
  );
}

async function callAzureGrade({ caseId, playerReply, channel, correctVerdict, theme }) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/+$/, "");
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const systemPrompt =
    "You evaluate the SAFETY QUALITY of a player's reply to suspicious or legit inbox messages for teens. " +
    "Return strict JSON only with keys: replySafetyBand (strong|ok|weak), sharesCredentials (boolean), shortRationale (<=18 words), coachTip (<=22 words). " +
    "Mark weak for blank, gibberish, nonsense, or unsafe sharing/payment actions.";

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
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AZURE_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        temperature: 0.1,
        max_tokens: 180,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(userPrompt) },
        ],
      }),
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
    return fallbackGrade({ playerReply: text, correctVerdict });
  }

  // Hard guard for gibberish/low quality before any API call.
  const signals = getHeuristicSignals(text);
  if (signals.looksLikeGibberish || signals.isVeryShort) {
    return fallbackGrade({ playerReply: text, correctVerdict });
  }

  if (!isAzureConfigured()) {
    return fallbackGrade({ playerReply: text, correctVerdict });
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
    return fallbackGrade({ playerReply: text, correctVerdict });
  }
}

