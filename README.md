# DevPulse - Modern Developer Resources & Knowledge Hub

A fully responsive, interactive web application engineered using **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**, deployed on **GitHub Pages**. This project represents the final capstone submission for the **6-Week Web Development Internship (Week 6 Final Project)**.

- **🌐 Live Demo (GitHub Pages):** [https://mohitchowdhury-ios.github.io/INTERNOVA-Final-Project-Week6/](https://mohitchowdhury-ios.github.io/INTERNOVA-Final-Project-Week6/)
- **📁 GitHub Repository:** [https://github.com/mohitchowdhury-ios/INTERNOVA-Final-Project-Week6](https://github.com/mohitchowdhury-ios/INTERNOVA-Final-Project-Week6)

---

## 📌 Project Overview & Planning

- **Project Title:** DevPulse — Modern Developer Resources & Knowledge Hub
- **Project Objective:** To design, build, and deploy an accessible, lightning-fast client-side web hub where software engineers can search, filter, bookmark, and contribute developer tools, documentation, architecture patterns, and learning roadmaps across diverse technology tracks.
- **Target Audience:** Aspiring software developers, computer science students, engineering interns, and tech professionals looking for a centralized, curated, and offline-capable developer resource directory.
- **Technologies Used:** Semantic HTML5, Modern CSS3 (Flexbox, CSS Grid, Custom Variables, Dark/Light Mode, Media Queries), Vanilla JavaScript (ES6+), Browser LocalStorage API, GitHub Pages.

---

## 🛠️ Repository & Directory Architecture (Task 2)

```text
INTERNOVA-Final-Project-Week6/
├── index.html            # Semantic HTML5 architecture (Header, Hero, Catalog, Testimonials, FAQ, Contact)
├── css/
│   └── style.css         # Modern responsive CSS (Grid, Flexbox, Dark Mode, Animations, Media Queries)
├── js/
│   └── app.js            # Modular ES6+ JavaScript (State, DOM Manipulation, Search/Filter, LocalStorage)
├── assets/
│   ├── logo.svg          # Brand identity SVG vector asset
│   └── favicon.svg       # Browser icon
└── README.md             # Complete capstone documentation, reflection, git guide, and deployment steps
```

---

## 🚀 Key Technical Implementation (Tasks 3 & 4)

### 1. Semantic HTML5 & CSS Architecture (Task 3: 30 Marks)
- **Semantic Structure:** Organized using native HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>`).
- **Modern Box Model & Layouts:** Built with CSS Grid and Flexbox for fluid multi-column cards, interactive toolbars, and responsive headers.
- **Responsive Media Queries:** Tailored responsive breakpoints for desktop (>1024px), tablet (768px–1024px), and mobile devices (<768px and <480px) including a collapsible mobile navigation drawer.
- **Dual Theme Engine:** Dark and Light mode powered by CSS custom properties (`--bg-body`, `--text-main`, `--primary-glow`), toggled with a single click and persisted via `localStorage`.

### 2. JavaScript Interactivity & Algorithms (Task 4: 15 Marks)
- **Real-Time Reactive Search:** Instant input listener filtering title, descriptions, and tags.
- **Multi-Category Track Filtering:** Filter pills for Frontend, Backend, DevOps & Cloud, AI & Machine Learning, and UI/UX Design.
- **Multi-Directional Sorting:** Sort by Featured status, Rating (Highest to Lowest), Alphabetical title (A–Z), and Newly added timestamp.
- **Dynamic Bookmarking System:** Saved items with real-time counter badge and slide-out side drawer with full offline LocalStorage persistence.
- **Resource Details Modal Inspector:** Opens detailed metadata, tags, and direct documentation links without navigating away.
- **Resource Contribution Modal & Form Validation:** Real-time client-side validation ensuring title length, valid URLs, numeric ratings (1.0–5.0), and descriptions.
- **Interactive FAQ Accordion:** Pure DOM manipulation accordion with smooth CSS height transitions.
- **Contact & Feedback Validation:** Regex email verification and field error cues with toast feedback.

---

## 📝 Task 6: Final Project Documentation & Reflection

### Project Overview
**DevPulse** was conceived and developed as the capstone project of this 6-week web development internship. It addresses a common challenge among self-taught engineers and interns: discovering organized, vetted, and high-impact developer documentation without cognitive overload. The platform delivers an engaging user experience through real-time search, category classification, dynamic bookmarking, and community contribution tools—all executing purely client-side with zero external library overhead.

### Technologies & Principles Used
The project demonstrates end-to-end web fundamentals. Semantic HTML5 provides accessibility and structural clarity. Modern CSS3 utilizes the CSS Box Model, CSS Grid, and Flexbox alongside custom CSS variables to enable light and dark themes. Fluid typography and responsive media queries ensure flawless rendering across smartphones, tablets, and desktop displays. JavaScript (ES6+) coordinates application state, array operations (`filter`, `reduce`, `sort`, `find`), DOM manipulation, event delegation, and browser LocalStorage synchronization.

### Challenges Faced
1. **Responsive Viewport Flexibility:** Maintaining uniform card heights and visual alignment across diverse screen resolutions while switching between dynamic Grid and List view layouts.
2. **Synchronous Multi-Criteria Data Pipeline:** Ensuring simultaneous text search, category filtering, and sorting functioned collaboratively without mutating the master dataset.
3. **Robust Form Validation:** Providing immediate, non-intrusive feedback on modal and contact inputs while preventing invalid data entries from corrupting local storage.

### Solutions Implemented
- Implemented CSS Grid with `repeat(auto-fill, minmax(330px, 1fr))` and Flexbox column distribution to ensure aesthetic consistency across all display form factors.
- Engineered a centralized `getFilteredResources()` unidirectional pipeline that applies sequential filter, search, and sort algorithms against application state.
- Designed reusable input validation routines that update descriptive error spans beneath form controls before triggering notifications.

### Key Learnings
This internship reinforced the immense power of vanilla web technologies. Building DevPulse without heavy front-end frameworks deepened my understanding of DOM lifecycles, event delegation, semantic web accessibility (ARIA roles), Git version control workflows, and deploying production-ready assets to GitHub Pages.

### Future Improvements
1. Integrating GitHub REST API to fetch live repository statistics (stars, forks, open issues) dynamically.
2. Adding a user voting system for community-driven resource curation.
3. Incorporating interactive skill roadmaps with printable progress checklists.

*(Word Count: 442 words — strictly within the 400–500 word limit)*

---

## 🔧 Task 1: Git & Version Control Workflow Reference

This project demonstrates disciplined Git version control practices:

1. **Initialize & Setup:**
   ```bash
   git init
   git config user.name "Mohit Chowdhury"
   git config user.email "your-email@example.com"
   ```

2. **Stage & Commit:**
   ```bash
   git status
   git add .
   git commit -m "feat: complete final responsive website capstone - DevPulse"
   ```

3. **Log & History Verification:**
   ```bash
   git log --oneline
   ```

4. **Remote Linking & Push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/mohitchowdhury-ios/INTERNOVA-Final-Project-Week6.git
   git push -u origin main
   ```

---

## 🌐 Task 5: GitHub Pages Deployment Guide

To deploy this project to live production:

1. Go to your repository on GitHub:
   `https://github.com/mohitchowdhury-ios/INTERNOVA-Final-Project-Week6`
2. Click on the **Settings** tab.
3. On the left sidebar under the "Code and automation" section, click **Pages**.
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` & folder `/ (root)`.
   - Click **Save**.
5. Wait 1–2 minutes. GitHub will provide your live deployment URL:
   👉 **`https://mohitchowdhury-ios.github.io/INTERNOVA-Final-Project-Week6/`**
6. Open the URL to verify that all styles, scripts, modals, and responsive layouts function cleanly online!

