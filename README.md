# 🚀 Hamid Mehmood — Personal Portfolio

> A modern, fully responsive developer portfolio built with **React 19** and **Vite** — featuring dark/light mode, animated skill bars, a real projects showcase, and a floating social dock.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---

## ✨ Features

- 🌙 **Dark / Light mode** toggle with CSS variable theming
- ⌨️ **Typewriter effect** cycling through roles (Laravel / MERN / Python / Full Stack)
- 📊 **Animated skill bars** triggered on scroll with IntersectionObserver
- 🖱️ **Scroll reveal** — sections fade in as you scroll
- 🏷️ **Scrolling tech marquee** banner
- 💼 **Work experience timeline** with colour-coded cards
- 🗂️ **Real GitHub projects** — all 5 repos with accurate descriptions & tags
- 📬 **Contact form** with loading & success states
- 📱 **Fully responsive** — mobile hamburger menu with slide-in drawer
- 🔘 **Floating social dock** — WhatsApp, LinkedIn, Email, GitHub, Phone with tooltips & pulse animation
- 📄 **Resume viewer** — opens PDF directly in the browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM v7 |
| Styling | Pure CSS (CSS Variables, Glassmorphism) |
| Icons | Font Awesome 6.5 |
| Fonts | Inter · Space Grotesk · Fira Code |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── Hamid_Mehmood_Resume.pdf   # Resume served as static file
├── src/
│   ├── hamid.jpg                  # Profile photo
│   ├── portfolio.jsx              # Main React component (all sections)
│   ├── portfolio.css              # All styles (dark theme, animations)
│   └── main.jsx                  # React entry point
├── index.html                     # HTML shell with fonts & meta tags
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HAMID33910/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder — ready to deploy on Vercel, Netlify, or any static host.

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Deployment

This project can be deployed as a static site on any of these platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Drag and drop the `dist/` folder onto [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
```bash
npm run build
# Push the dist/ folder to the gh-pages branch
```

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Hero** | Name, typewriter roles, stats, CTA buttons, morphing photo |
| **About** | Bio, highlights, floating info card, Download CV |
| **Skills** | 4 categories (Backend, Frontend, Database, Tools) with animated bars |
| **Experience** | 3 work positions + education card |
| **Projects** | 5 real GitHub projects with links |
| **Contact** | Contact info cards + message form |
| **Footer** | Quick links, services, social links |

---

## 📬 Contact

| | |
|---|---|
| 📧 Email | [hamidamz@gmail.com](mailto:hamidamz@gmail.com) |
| 💼 LinkedIn | [hamidmehmood325](https://www.linkedin.com/in/hamidmehmood325/) |
| 🐙 GitHub | [HAMID33910](https://github.com/HAMID33910) |
| 📞 Phone | +92 325-1092088 |
| 📍 Location | Sahiwal, Punjab, Pakistan |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Crafted with ❤️ by <strong>Hamid Mehmood</strong> — Full Stack Developer</p>
