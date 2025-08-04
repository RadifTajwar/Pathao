# Pathao - Kanban Project Management App

A full-featured Kanban board application built with **Next.js 14**, **TypeScript**, **Zustand** (state management), **shadcn/ui**, **Tailwind CSS**, and **NextAuth** for Google OAuth & password authentication.

> Inspired by Trello, but with a modern stack and fully customizable.

<br/>

## 🚀 Features

- 🔐 Google OAuth and Email/Password authentication (with `next-auth`)
- 📁 Multiple boards, each with its own background/image
- 📝 Drag-and-drop Kanban columns & tasks (using `@hello-pangea/dnd`)
- ✅ Edit, delete, re-order tasks & columns
- 🎨 Color labels for tasks (with pop-up color picker)
- 💾 LocalStorage + Zustand persist (your data survives refresh)
- 📦 Modular codebase, scalable for teams
- ⚡ Super-fast, modern UI with shadcn and Tailwind
- ☁️ Easy deployment to Vercel

<br/>

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```sh
git clone https://github.com/RadifTajwar/Pathao.git
cd Pathao
npm install
```

---

### 2. Configure Environment

Create a `.env.local` file in your root directory with these variables (replace with your real values):

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
board_secret_key=abcdefghijklmnopqrstuvwxyz1234567890
```

- Get Google OAuth credentials at: [Google Developer Console](https://console.developers.google.com/)

---

### 3. Run Locally

```sh
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)


---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State Management:** Zustand + persist middleware
- **Drag-and-Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Authentication:** NextAuth (Google OAuth + Credentials)
- **Icons:** lucide-react, react-icons
- **Avatar/Image:** shadcn/ui

---

## 🗂️ Folder Structure


---

## 📝 Usage Notes

- **Boards & Tasks**: All user data is persisted locally (Zustand + localStorage).
- **Auth**: Supports both Google login and email/password (uses NextAuth.js).
- **No server/database needed** (except for NextAuth providers).
- **Easy theming**: Update Tailwind config or shadcn components to change look.

---

## 🤝 Contributing

Pull requests and issues are welcome!  
Please open an issue if you find a bug or want a new feature.

---



## 🙏 Special Thanks

- [Next.js](https://nextjs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)

---

**Built by [Radif Tajwar](https://github.com/RadifTajwar) with ❤️**
