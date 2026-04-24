# Inbox Inspector

A browser-based **digital safety and phishing awareness game** for learners. Players step through realistic **email and direct-message (DM) scenarios**, use **investigation tools** to read the clues, pick a **verdict** (Phishing, Sketchy, or Legit), and write a **safe reply**—then see **how their choices scored** and **what to do in real life** for that type of message.

---

## What players do

1. **Review messages** that mimic prize scams, school notices, job offers, package alerts, “friend in trouble” requests, and more—across both **inbox and chat-style** views.
2. **Reveal tools** (sender check, link preview, urgency detector, and others) to build evidence. Using fewer tools earns a better **scan efficiency** score.
3. **Submit a verdict** that matches the case design, where possible.
4. **Write a short safe reply**; replies are scored with **rule-based checks** and optional **AI grading** (Azure OpenAI) for a **safe-reply** band and coach tip.
5. **Open feedback** after each case: score breakdown, a concise **“why this verdict”** explainer, an **in-real-life checklist**, and a personalized **tip** when AI grading is available.

The experience is **session-based in the client** (player name in `sessionStorage`) with **scores and names** persisted in **MongoDB** for a simple **leaderboard** on the end screen.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| **Frontend** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/), [React Router 7](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| **HTTP** | [Axios](https://axios-http.com/) |
| **Audio** | [use-sound](https://github.com/joshwcomeau/use-sound) (UI sounds + optional background music) |
| **Backend** | [Node.js](https://nodejs.org/) (ES modules), [Express 5](https://expressjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/) |
| **AI (optional)** | [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) for reply “safety band” and coach text; **fallback heuristics** run if Azure is not configured |

**Content** for levels (messages, tool findings, teaching blurbs) lives in **`frontend/src/data/inboxInspectorLevels.json`**, versioned in-repo.

---

## Requirements

- **Node.js** 20+ (or current LTS) and **npm**  
- **MongoDB** — a reachable `MONGODB_URI` (local install or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  
- **Optional:** Azure OpenAI deployment + keys for stricter, model-based **reply** grading; without them, the app still runs using **local fallback grading**

---

## Run locally (development)

Use **two processes**: the **API** on one port and the **Vite dev server** on another (Vite **proxies** `/api` to the backend).

### 1. Install dependencies

From the **repository root**:

```bash
npm install
cd frontend && npm install && cd ..
```

### 2. Environment variables

Create a **`.env` file in the project root** (next to `backend/server.js`) so `dotenv` can load it when you start the server. Minimum:

```env
# Required — app exits if MongoDB cannot be reached
MONGO_URI="mongodb://localhost:27017/inbox-inspector"
# or your Atlas string: mongodb+srv://user:pass@cluster/...
```

**Optional (reply grading + richer tips):**

```env
AZURE_OPENAI_ENDPOINT="https://YOUR_RESOURCE.openai.azure.com"
AZURE_OPENAI_API_KEY="your-key"
AZURE_OPENAI_DEPLOYMENT="your-deployment-name"
# Non–OpenAI v1 (classic Azure resource URL) also needs:
# AZURE_OPENAI_API_VERSION="2024-xx-xx"
```

**Optional:**

```env
PORT=8000
```

If `PORT` is omitted, the server defaults to **8000** (this matches the Vite proxy in `frontend/vite.config.js`).

### 3. Start MongoDB

If you use a local install, start the `mongod` process (or your Docker container) so `MONGO_URI` is valid.

### 4. Start the backend

From the **repository root**:

```bash
npm run dev
```

This runs **nodemon** on `backend/server.js`. You should see log output that the server is listening (default **port 8000**) and that MongoDB connected.

### 5. Start the frontend

In a **second terminal**, from the repository root:

```bash
cd frontend
npm run dev
```

Open the URL Vite prints (usually **`http://localhost:5173`**). The dev server **proxies** requests from `/api/...` to **`http://localhost:8000`**, so the React app and API work together without CORS issues during development.

**Flow in the app:** content notice → **Welcome** (name) → **Instructions** → **Game** (cases) → **Endgame** (summary / leaderboard when configured).

---

## Production-style run (single port)

Build the client and run Node with `NODE_ENV=production` so Express serves **`frontend/dist`** and the same process handles **API + static** files.

From the **repository root**:

```bash
npm run build
```

Set **`MONGO_URI`** (and optional Azure / `PORT`) in `.env`, then:

```bash
NODE_ENV=production npm start
```

Visit **`http://localhost:8000`** (or your `PORT`). The API remains under paths like `/api/players` and `/api/ai`.

---

## Helpful scripts (root `package.json`)

| Script | Purpose |
|--------|--------|
| `npm run dev` | API only (nodemon), **development** |
| `npm start` | API (and in production, static `frontend/dist`) |
| `npm run build` | `npm install` in root and frontend, then **`vite build`** in `frontend/` |

Frontend-only:

```bash
cd frontend && npm run dev    # dev server
cd frontend && npm run build  # output to frontend/dist
cd frontend && npm run preview # local preview of production build
```

---

## Project layout (short)

```text
.
├── backend/           # Express API, routes, reply grader, Mongo
├── frontend/          # Vite + React + Tailwind app
│   ├── src/
│   │   ├── data/     # inboxInspectorLevels.json
│   │   ├── pages/    # Content warning, welcome, game, endgame, …
│   │   ├── components/
│   │   └── context/  # Game state, audio, etc.
│   └── dist/         # after npm run build (frontend)
├── package.json      # server + workspace scripts
└── README.md
```

---

## License

The repository’s `package.json` lists **license: ISC** unless you change it—confirm with your team before publishing.

---

**Tip:** If the server **exits on startup**, check the console for **MongoDB connection errors** and verify `MONGO_URI` and network access. If **reply scores** feel off without Azure, the **fallback** path in `backend/services/inboxReplyGrader.js` is what runs—configure Azure for full model-based reply grading when you are ready.
