# 🏋️‍♂️ AI Fitness Assistant

An AI-powered fitness companion built with **Next.js 15**, **Vapi**, **Gemini AI**, **Clerk**, and **TypeScript**.  
The app creates personalized **diet and workout plans** through natural, real-time conversations — no rigid forms, just you and an AI that actually *listens*.

---

## 🚀 Features

- 🎙 **Voice conversations with Vapi** – have a natural back-and-forth with the AI.
- 🧠 **Personalized plans with Gemini AI** – diet and workout plans tailored to your lifestyle, not copy-pasted templates.
- 🔐 **Authentication with Clerk** – secure, simple, and modern user management.
- ⚡ **Built with Next.js 15 + TypeScript** – App Router, server actions, and a fully typed experience.
- 📊 **Structured plan storage** – diet + workout data saved in Convex (or your backend of choice).
- 🌍 **Cross-platform ready** – works well on web, mobile browsers, and is future-proof for native integrations.

---

## 📂 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **AI:** [Gemini](https://ai.google.dev/gemini-api) for personalized plan generation
- **Voice:** [Vapi](https://vapi.ai/) for real-time conversation
- **Auth:** [Clerk](https://clerk.com/)
- **Language:** TypeScript
- **Database (optional):** Convex for storing user plans  

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-fitness-assistant.git
cd ai-fitness-assistant
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Add environment variables

Create a .env.local file and configure:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

#From Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

App will be live at http://localhost:3000

## 🛠 Development Notes

- All AI prompts are kept modular so you can tweak tone/personality without touching business logic.

- Plans are validated before saving to ensure schema consistency (diet and workout must include title and description).

- The app is built around consistency, not intensity — same philosophy for the codebase.

## 📜 License

MIT — free to use, modify, and build on.
