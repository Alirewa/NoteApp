<div align="center">

# NoteApp — Persian RTL Note-Taking App

**A fast, minimal note-taking web app built with Vanilla JavaScript. Full Persian (Farsi) RTL support, Jalali calendar dates, and zero dependencies.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-→-4ade80?style=for-the-badge)](https://alirewa.github.io/NoteApp/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**[View Live Demo →](https://alirewa.github.io/NoteApp/)**

</div>

---

## Overview

NoteApp is a lightweight, client-side note-taking application designed specifically for Persian (Farsi) users. It features a modern RTL interface, Jalali (Shamsi) date display, and instant local storage — no server required.

Built as a learning project while studying JavaScript, it has since been redesigned with a modern UI/UX focused on Persian readability and mobile responsiveness.

---

## Features

- Create, edit, and delete notes
- Real-time search across all notes
- Full Persian RTL layout and typography (IRANYekan font)
- Jalali calendar date display
- Offline-first: data stored in `localStorage`
- Responsive design — works on mobile and desktop
- Modular ES6+ architecture
- No frameworks, no build step, no dependencies

---

## Tech Stack

| Technology | Role |
|---|---|
| Vanilla JavaScript (ES6 Modules) | App logic and state |
| HTML5 | Markup |
| CSS3 (Custom Properties) | Styling and responsive layout |
| IRANYekan Font | Persian typography |
| localStorage API | Client-side data persistence |

---

## Getting Started

Clone and serve locally with any static server:

```bash
git clone https://github.com/Alirewa/NoteApp.git
cd NoteApp
npx serve .
```

Or open the **[live demo](https://alirewa.github.io/NoteApp/)** directly — no installation needed.

---

## Project Structure

```
NoteApp/
├── index.html          # Entry point
├── css/
│   └── style.css       # All styles with CSS custom properties
├── js/
│   ├── app.js          # Bootstrap and controller
│   ├── notesapi.js     # localStorage CRUD layer
│   └── notesview.js    # DOM rendering and events
└── assets/
    └── styles/fonts/   # IRANYekan webfonts (self-hosted)
```

---

## License

MIT License — free to use, modify, and distribute.

---

<div align="center">

Built by [Alirewa](https://github.com/Alirewa)

</div>
