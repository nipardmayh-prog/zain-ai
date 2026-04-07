# NexusAI — AI Automation Agency Dashboard

A stunning, production-level AI automation agency dashboard with 3D visuals, interactive demos, and a full SaaS-style admin panel.

## 🚀 Tech Stack

- **Frontend:** React + Vite, Tailwind CSS v3, Framer Motion, React Three Fiber
- **Backend:** Node.js + Express
- **State:** Zustand
- **Charts:** Recharts
- **3D:** Three.js via React Three Fiber + Post-processing

## 📁 Project Structure

```
ai-agency-dashboard/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # UI, 3D, layout, page-specific components
│   │   ├── pages/        # 5 pages (Landing, Dashboard, Showcase, Demos, Admin)
│   │   ├── store/        # Zustand state management
│   │   └── ...
│   └── ...
├── backend/           # Express API server
│   ├── server.js
│   └── data/mockData.js
└── package.json       # Root workspace scripts
```

## 🛠 Setup & Run

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start both frontend + backend
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

## ✨ Features

### 🏠 Landing Page
- 3D animated particle background with floating geometric objects
- Gradient hero text with CTAs
- Services grid with glassmorphism cards

### 📊 Dashboard
- Animated stat counters (leads, chatbots, revenue, conversations)
- Revenue area chart + leads bar chart
- Activity feed + performance metrics

### 🤖 AI Showcase
- Chatbot, Voice Agent, and Lead Gen sections
- Each with animated mockup UI and feature highlights

### 🎮 Interactive Demos
- **Chatbot:** Real-time chat interface with AI responses
- **Voice Agent:** Simulated call with waveform + live transcript
- **Lead Scraper:** Progress bar animation with results

### ⚙️ Admin Panel
- Toggle automations ON/OFF
- Click-to-edit values
- Clean SaaS table with type badges

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stats | Dashboard statistics |
| PATCH | /api/stats | Update stats |
| GET | /api/revenue | Revenue chart data |
| GET | /api/automations | List automations |
| PATCH | /api/automations/:id | Toggle/update automation |
| POST | /api/chat | Send chat message |
| GET | /api/activity | Activity feed |
| GET | /api/leads | Lead scraping results |
