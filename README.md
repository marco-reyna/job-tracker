# Job Tracker
 
A full-stack job application tracker built to solve a real problem: managing dozens of job applications without losing track of where things stand. Includes a Chrome extension that reads job postings and automatically sends structured data to the app — no manual entry needed.
 
🔗 **Live app:** [job-tracker-seven-flame.vercel.app](https://job-tracker-seven-flame.vercel.app) *(authentication required)*
 
---
 
## The Problem
 
When applying to many roles simultaneously, it's easy to lose track of which companies you've applied to, what stage each application is in, and what the original job listing said. Spreadsheets work, but they require tedious manual data entry and don't scale well.
 
## The Solution
 
Job Tracker is a purpose-built web app that centralizes all application data in one place, with a Chrome extension that eliminates manual entry entirely. Open a job posting, click the extension, and the listing is parsed and saved to your tracker automatically using AI-powered extraction.
 
---
 
## Features
 
- **AI-Powered Job Extraction** — The Chrome extension reads the current job listing page and uses OpenAI to extract structured data (company, role, location, requirements, salary, etc.) automatically.
- **Chrome Extension** — A companion browser extension that captures job postings from any site and sends them directly to the deployed app via API.
- **Dashboard** — View, filter, and manage all applications in one place with status tracking.
- **Authentication** — Protected behind an auth layer so only you can access your data.
- **Deployed & Production-Ready** — Hosted on Vercel with a Supabase-managed PostgreSQL database.
 
---
 
## Screenshots
 
### Chrome Extension — AI-Powered Job Capture
Open any job listing, click the extension, and it extracts all relevant fields automatically using OpenAI.
 
![Chrome Extension capturing a job listing](docs/extension.png)
 
### Dashboard — All Applications at a Glance
Filter by status (Applied, Interviewing, Offer, Rejected) and see every application in one table.
 
![Job Applications dashboard](docs/dashboard.png)
 
### Edit View — Full Control Over Each Entry
Edit any field, add notes, or update the application status as you progress through the pipeline.
 
![Edit Application view](docs/edit.png)
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| ORM | Prisma 7 |
| Database | PostgreSQL (Supabase) |
| Styling | Tailwind CSS |
| AI | OpenAI API |
| Deployment | Vercel |
| Browser Extension | Chrome Extension (Manifest V3) |
 
---
 
## Architecture
 
```
┌─────────────────────┐       ┌──────────────────────────────┐
│  Chrome Extension    │       │  Next.js App (Vercel)        │
│                      │       │                              │
│  Reads job listing   │──────▶│  API Route receives payload  │
│  page content        │ POST  │  Prisma writes to DB         │
│  Sends to API        │       │  Dashboard renders data      │
└─────────────────────┘       └──────────┬───────────────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │  Supabase (PostgreSQL)│
                              │  Managed database     │
                              └──────────────────────┘
```
 
**Chrome Extension Flow:**
1. User opens a job listing on any job board or company site.
2. Extension extracts the page content.
3. Content is sent to the Next.js API route.
4. The API uses OpenAI to parse the unstructured text into structured job data.
5. Prisma saves the parsed data to the Supabase PostgreSQL database.
6. The job appears on the dashboard instantly.
 
---
 
## Project Structure
 
```
job-tracker/
├── extension/             # Chrome extension source code
├── prisma/                # Prisma schema and migrations
├── src/                   # Next.js application source
│   ├── app/               # App Router pages and API routes
│   └── ...
├── prisma.config.ts       # Prisma 7 configuration
├── .env.example           # Environment variable template
├── tailwind.config.ts     # Tailwind configuration
└── package.json
```
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- An [OpenAI](https://platform.openai.com) API key
 
### 1. Clone the repository
 
```bash
git clone https://github.com/marco-reyna/job-tracker.git
cd job-tracker
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Set up environment variables
 
Copy `.env.example` to `.env` and fill in your credentials:
 
```bash
cp .env.example .env
```
 
```env
# Supabase connection pooling URL (for Prisma queries via pgBouncer)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
 
# Supabase direct connection URL (for migrations)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
 
# Secret for the login page
AUTH_SECRET="your-strong-secret-here"
 
# OpenAI API key for AI-powered job extraction
OPENAI_API_KEY="sk-your-key-here"
```
 
### 4. Run database migrations
 
```bash
npx prisma migrate dev
```
 
### 5. Start the development server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) to see the app.
 
### 6. Load the Chrome Extension
 
1. Open `chrome://extensions/` in Chrome.
2. Enable **Developer Mode** (top right).
3. Click **Load unpacked** and select the `extension/` folder.
4. Pin the extension to your toolbar.
 
---
 
## Usage
 
1. Navigate to any job listing (LinkedIn, Indeed, company career pages, etc.).
2. Click the Job Tracker extension icon.
3. The extension reads the page, sends it to your deployed app, and the AI extracts the relevant data.
4. Open your Job Tracker dashboard to see the new entry with all fields populated.
 
---
 
## License
 
MIT
 
---
 
Built by [Marco Reyna](https://github.com/marco-reyna)⚡️