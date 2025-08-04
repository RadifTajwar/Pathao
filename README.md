# Pathao – Kanban Board App

A **Trello-inspired Kanban board** for project and task management, built with [Next.js 14](https://nextjs.org/), TypeScript, Zustand, shadcn/ui, Google OAuth, and drag-and-drop.  
**Live Demo:** [pathao-orpin.vercel.app](https://pathao-orpin.vercel.app)

---

## ✨ Features

- **Multiple Boards:** Create as many boards as you want; each board has its own columns and tasks.
- **Drag & Drop:** Reorder tasks within columns, move tasks across columns (powered by `@hello-pangea/dnd`).
- **Editable:** Click on tasks and column titles to edit them instantly.
- **Color Labels:** Choose from 6 task label colors (set color with a click).
- **Delete:** Remove columns (and their tasks) or delete individual tasks easily.
- **Board Images:** Assign an image to each board for a personalized background.
- **Authentication:** Sign in with Google (NextAuth.js), or use email/password (stored in local storage).
- **State Persistence:** All your data persists via Zustand + local storage—**no backend needed** for boards/tasks.
- **Responsive & Accessible:** Mobile-friendly, keyboard accessible, modern UI via shadcn/ui.
- **Fast & Modern:** Instant state updates, serverless ready, deployable to Vercel.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State:** Zustand (with persistence)
- **Components/UI:** shadcn/ui, Tailwind CSS, Lucide & React Icons
- **Drag-and-Drop:** @hello-pangea/dnd
- **Auth:** NextAuth.js (Google OAuth, custom local signup/signin)
- **Image Upload:** Local base64, with preview avatar
- **Deploy:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/RadifTajwar/Pathao.git
cd Pathao
npm install
