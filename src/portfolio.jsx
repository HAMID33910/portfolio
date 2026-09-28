import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./portfolio.css";
import hamid from "./hamid.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  {
    category: "Backend",
    icon: "fas fa-server",
    color: "#6C63FF",
    items: [
      { name: "PHP / Laravel", level: 92 },
      { name: "Node.js / Express", level: 88 },
      { name: "Python / Django", level: 80 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "Frontend",
    icon: "fas fa-palette",
    color: "#FF6584",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 82 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    category: "Database",
    icon: "fas fa-database",
    color: "#36D1DC",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL / PostgreSQL", level: 88 },
      { name: "Redis", level: 72 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "fas fa-tools",
    color: "#F7B731",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Linux / CLI", level: 78 },
      { name: "Postman / Swagger", level: 85 },
    ],
  },
];

const TECH_TAGS = [
  "PHP", "Laravel", "React", "Next.js", "Node.js", "Express",
  "Python", "MongoDB", "MySQL", "PostgreSQL", "JavaScript", "TypeScript",
  "Docker", "Git", "Redis", "Firebase", "Tailwind CSS", "REST APIs",
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Remote",
    period: "2022 – Present",
    type: "Full-time",
    color: "#6C63FF",
    points: [
      "Built and delivered 15+ full-stack web applications for clients across Pakistan, UAE, and UK.",
      "Developed Laravel-based SaaS platforms with multi-tenant architecture and role-based access control.",
      "Engineered MERN stack apps with real-time features using Socket.io.",
      "Integrated payment gateways (Stripe, PayFast) and third-party APIs.",
      "Managed VPS deployments using Nginx, PM2, and Let's Encrypt SSL.",
    ],
  },
  {
    role: "PHP Laravel Developer",
    company: "Web Agency – Lahore",
    period: "2021 – 2022",
    type: "On-site",
    color: "#FF6584",
    points: [
      "Developed and maintained multiple Laravel-based e-commerce and ERP systems.",
      "Optimised database queries reducing load times by 40%.",
      "Implemented RESTful APIs consumed by React and mobile frontends.",
      "Collaborated with design team to convert Figma mockups into pixel-perfect UIs.",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Tech Startup – Sahiwal",
    period: "2020 – 2021",
    type: "On-site",
    color: "#36D1DC",
    points: [
      "Built dynamic websites using HTML, CSS, JavaScript, and PHP.",
      "Assisted in developing CMS solutions and client portals.",
      "Maintained existing codebases and resolved production bugs.",
    ],
  },
];

const PROJECTS = [
  {
    title: "E-Commerce Website",
    subtitle: "Full-Stack E-Commerce Store",
    desc: "A premium flash-frozen food store for Pakistani consumers. Features a full React storefront with cart, wishlist, Google OAuth, OTP reset, order tracking, and a complete admin panel with real-time analytics, product/order/banner management, and low-stock notifications.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Firebase", "Tailwind CSS"],
    color: "#6C63FF",
    icon: "fas fa-shopping-bag",
    github: "https://github.com/HAMID33910/Festive_Frozen",
    live: "#",
  },
  {
    title: "Emerald Library",
    subtitle: "Community Library System",
    desc: "A cozy community library web app built with plain PHP & MySQL. Users can browse, search, borrow, and read books online. Admins manage books, borrow requests, returns, fines, and members via a full dashboard — secured with bcrypt + prepared statements.",
    tags: ["PHP", "MySQL", "Tailwind CSS", "AJAX"],
    color: "#10b981",
    icon: "fas fa-book-open",
    github: "https://github.com/HAMID33910/Emerald-Library",
    live: "#",
  },
  {
    title: "Hospital Management System",
    subtitle: "Django REST + Dashboard",
    desc: "A Django-based hospital management system with REST API (JWT auth) for patients, doctors, appointments, rooms, and billing. Includes a single-page vanilla JS dashboard and SQLite database for quick deployment.",
    tags: ["Python", "Django", "Django REST", "JWT", "SQLite"],
    color: "#FF6584",
    icon: "fas fa-hospital",
    github: "https://github.com/HAMID33910/Hospital-Managment-System",
    live: "#",
  },
  {
    title: "SkyCast",
    subtitle: "Weather Forecast App",
    desc: "A realistic weather app showing current, future (16-day), and historical weather (back to 1940) for any city worldwide. Features autocomplete search, geolocation, hourly forecast tables, interactive charts, and a Node.js/Express proxy to Open-Meteo API — no API key required.",
    tags: ["React", "Node.js", "Express", "Tailwind CSS", "Open-Meteo API"],
    color: "#36D1DC",
    icon: "fas fa-cloud-sun",
    github: "https://github.com/HAMID33910/SkyCast",
    live: "#",
  },
  {
    title: "Decode Labs",
    subtitle: "Python Internship Projects",
    desc: "A collection of Python projects completed during internship training at Decode Labs. Covers CLI task management, data processing, automation scripts, and algorithmic problem-solving — demonstrating core Python programming fundamentals.",
    tags: ["Python", "CLI", "Algorithms", "Automation"],
    color: "#F7B731",
    icon: "fab fa-python",
    github: "https://github.com/HAMID33910/Decode_Labs",
    live: "#",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

function useTypewriter(words, speed = 120, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (isPaused) {
      const timer = setTimeout(() => setIsPaused(false), pause);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setIsPaused(true);
            setIsDeleting(true);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, isPaused, words, speed, pause]);

  return text;
}

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SkillBar({ name, level, color, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay || 0);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div className="project-card reveal" style={{ "--delay": `${index * 0.1}s` }}>
      <div className="project-card-header" style={{ "--accent": project.color }}>
        <div className="project-icon" style={{ background: `${project.color}22`, color: project.color }}>
          <i className={project.icon}></i>
        </div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" title="Live Demo">
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.desc}</p>
      </div>
      <div className="project-card-footer">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag" style={{ "--tag-color": project.color }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }) {
  return (
    <div className="exp-card reveal" style={{ "--delay": `${index * 0.15}s` }}>
      <div className="exp-line" style={{ background: exp.color }}></div>
      <div className="exp-content">
        <div className="exp-header">
          <div>
            <h3 className="exp-role">{exp.role}</h3>
            <p className="exp-company">
              <i className="fas fa-building"></i> {exp.company}
            </p>
          </div>
          <div className="exp-meta">
            <span className="exp-period">
              <i className="fas fa-calendar-alt"></i> {exp.period}
            </span>
            <span className="exp-type" style={{ background: `${exp.color}22`, color: exp.color }}>
              {exp.type}
            </span>
          </div>
        </div>
        <ul className="exp-points">
          {exp.points.map((point, i) => (
            <li key={i}>
              <i className="fas fa-chevron-right" style={{ color: exp.color }}></i>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const activeSection = useActiveSection();
  const typewriterText = useTypewriter([
    "PHP Laravel Developer",
    "MERN Stack Developer",
    "Python Developer",
    "Full Stack Engineer",
  ]);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handler = (e) => {
      if (menuActive && !e.target.closest("nav")) setMenuActive(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuActive]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 4000);
    }, 1200);
  }

  return (
    <Router>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav>
            <a href="#home" className="logo" onClick={() => setMenuActive(false)}>
              &lt;Hamid<span>/</span>&gt;
            </a>

            <ul className={`nav-links ${menuActive ? "open" : ""}`}>
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={activeSection === link.toLowerCase() ? "active" : ""}
                    onClick={() => setMenuActive(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Hamid_Mehmood_Resume.pdf"
                  className="nav-resume-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuActive(false)}
                >
                  <i className="fas fa-file-pdf"></i> Resume
                </a>
              </li>
            </ul>

            <div className="nav-actions">
              <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle theme"
                aria-label="Toggle dark/light mode"
              >
                <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
              </button>
              <button
                className={`hamburger ${menuActive ? "open" : ""}`}
                onClick={() => setMenuActive(!menuActive)}
                aria-label="Toggle menu"
                aria-expanded={menuActive}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {menuActive && <div className="nav-overlay" onClick={() => setMenuActive(false)} />}

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="grid-overlay"></div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Available for Freelance Work
              </div>

              <h1 className="hero-heading">
                Hi, I'm <span className="gradient-text">Hamid Mehmood</span>
              </h1>

              <div className="hero-typewriter">
                <span className="typewriter-label">I'm a </span>
                <span className="typewriter-text">{typewriterText}</span>
                <span className="cursor">|</span>
              </div>

              <p className="hero-desc">
                Full Stack Developer with <strong>4+ years</strong> of experience crafting
                scalable web applications using <strong>PHP Laravel</strong>,{" "}
                <strong>MERN Stack</strong>, and <strong>Python</strong>. I turn complex
                problems into elegant, performant solutions.
              </p>

              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">4+</span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-num">15+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-num">10+</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>

              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">
                  <i className="fas fa-rocket"></i> View Projects
                </a>
                <a href="#contact" className="btn btn-outline">
                  <i className="fas fa-paper-plane"></i> Hire Me
                </a>
              </div>

              <div className="hero-socials">
                <a href="https://github.com/HAMID33910" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/hamidmehmood325/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://wa.me/923251092088" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="mailto:hamidamz@gmail.com" title="Email" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>

            <div className="hero-image-wrap">
              <div className="hero-image-glow"></div>
              <div className="hero-image-ring ring-1"></div>
              <div className="hero-image-ring ring-2"></div>
              <div className="hero-image-container">
                <img src={hamid} alt="Hamid Mehmood - Full Stack Developer" />
              </div>
              <div className="float-badge badge-laravel">
                <i className="fab fa-laravel"></i> Laravel
              </div>
              <div className="float-badge badge-react">
                <i className="fab fa-react"></i> React
              </div>
              <div className="float-badge badge-python">
                <i className="fab fa-python"></i> Python
              </div>
            </div>
          </div>
        </div>

        <a href="#about" className="scroll-indicator" aria-label="Scroll down">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
        </a>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Get to Know Me</span>
            <h2>About <span className="gradient-text">Me</span></h2>
          </div>

          <div className="about-grid">
            <div className="about-image-side reveal">
              <div className="about-img-wrapper">
                <img src={hamid} alt="Hamid Mehmood" />
                <div className="about-img-decoration"></div>
              </div>
              <div className="about-card-float">
                <div className="about-card-item">
                  <i className="fas fa-code" style={{ color: "#6C63FF" }}></i>
                  <div>
                    <strong>4+ Years</strong>
                    <span>Experience</span>
                  </div>
                </div>
                <div className="about-card-item">
                  <i className="fas fa-map-marker-alt" style={{ color: "#FF6584" }}></i>
                  <div>
                    <strong>Sahiwal</strong>
                    <span>Punjab, Pakistan</span>
                  </div>
                </div>
                <div className="about-card-item">
                  <i className="fas fa-graduation-cap" style={{ color: "#36D1DC" }}></i>
                  <div>
                    <strong>BS Computer Science</strong>
                    <span>University Graduate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-text-side reveal">
              <h3>
                I build <span className="gradient-text">digital products</span> that make an impact
              </h3>
              <p>
                I'm a passionate Full Stack Developer based in Sahiwal, Punjab. I specialise in
                building robust, scalable web applications from backend APIs to polished frontends
                — with a strong focus on clean code, performance, and user experience.
              </p>
              <p>
                My stack spans <strong>PHP Laravel</strong> for enterprise-grade backends,{" "}
                <strong>MERN Stack</strong> for modern JavaScript applications, and{" "}
                <strong>Python</strong> for data-driven solutions. I'm comfortable working across
                the full stack and adapting to whatever the project demands.
              </p>
              <p>
                When I'm not coding, I explore new technologies, contribute to open-source, and
                mentor aspiring developers in my community.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i> Clean, maintainable code
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i> API design & integration
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i> Performance optimisation
                </div>
                <div className="highlight-item">
                  <i className="fas fa-check-circle"></i> Agile & remote collaboration
                </div>
              </div>

              <div className="about-cta">
                <a href="#contact" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i> Get In Touch
                </a>
                <a href="/Hamid_Mehmood_Resume.pdf" className="btn btn-ghost" download>
                  <i className="fas fa-download"></i> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">What I Work With</span>
            <h2>My <span className="gradient-text">Skills</span></h2>
          </div>

          <div className="tech-marquee reveal">
            <div className="marquee-track">
              {[...TECH_TAGS, ...TECH_TAGS].map((tag, i) => (
                <span key={i} className="marquee-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="skills-grid">
            {SKILLS.map((group, gi) => (
              <div key={gi} className="skill-group reveal" style={{ "--delay": `${gi * 0.1}s` }}>
                <div className="skill-group-header">
                  <div className="skill-group-icon" style={{ background: `${group.color}22`, color: group.color }}>
                    <i className={group.icon}></i>
                  </div>
                  <h3>{group.category}</h3>
                </div>
                <div className="skill-bars">
                  {group.items.map((skill, si) => (
                    <SkillBar
                      key={si}
                      name={skill.name}
                      level={skill.level}
                      color={group.color}
                      delay={si * 100 + gi * 200}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">My Journey</span>
            <h2>Work <span className="gradient-text">Experience</span></h2>
          </div>

          <div className="exp-timeline">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

          <div className="education-block reveal">
            <div className="edu-header">
              <i className="fas fa-graduation-cap"></i>
              <h3>Education</h3>
            </div>
            <div className="edu-card">
              <div className="edu-icon">
                <i className="fas fa-university"></i>
              </div>
              <div className="edu-info">
                <h4>Bachelor of Science in Computer Science</h4>
                <p className="edu-school">University of Sahiwal</p>
                <span className="edu-year">2023 – 2027</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">What I've Built</span>
            <h2>Featured <span className="gradient-text">Projects</span></h2>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>

          <div className="projects-footer reveal">
            <p>Want to see more?</p>
            <a href="https://github.com/HAMID33910" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fab fa-github"></i> View GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Let's Work Together</span>
            <h2>Get In <span className="gradient-text">Touch</span></h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <h3>Let's build something great together</h3>
              <p>
                I'm currently available for freelance projects, remote positions, and exciting
                collaborations. Drop me a message and I'll get back to you within 24 hours.
              </p>

              <div className="contact-items">
                <a href="tel:+923251092088" className="contact-item">
                  <div className="ci-icon"><i className="fas fa-phone"></i></div>
                  <div className="ci-detail">
                    <span className="ci-label">Phone</span>
                    <span className="ci-value">+92 325-1092088</span>
                  </div>
                </a>

                <a href="mailto:hamidamz@gmail.com" className="contact-item">
                  <div className="ci-icon"><i className="fas fa-envelope"></i></div>
                  <div className="ci-detail">
                    <span className="ci-label">Email</span>
                    <span className="ci-value">hamidamz@gmail.com</span>
                  </div>
                </a>

                <div className="contact-item">
                  <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="ci-detail">
                    <span className="ci-label">Location</span>
                    <span className="ci-value">Sahiwal, Punjab, Pakistan</span>
                  </div>
                </div>

                <a href="https://www.linkedin.com/in/hamidmehmood325/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="ci-icon" style={{ background: "#0077b522", color: "#0077b5" }}>
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div className="ci-detail">
                    <span className="ci-label">LinkedIn</span>
                    <span className="ci-value">hamidmehmood325</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-form-wrap reveal">
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary btn-full ${formStatus === "sending" ? "loading" : ""}`}
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
                {formStatus === "success" && (
                  <div className="form-success">
                    <i className="fas fa-check-circle"></i> Message sent! I'll reply soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo">&lt;Hamid<span>/</span>&gt;</a>
              <p>
                Full Stack Developer passionate about building scalable, user-focused web
                applications with PHP Laravel, MERN Stack, and Python.
              </p>
              <div className="footer-socials">
                <a href="https://github.com/HAMID33910" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/hamidmehmood325/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://wa.me/923251092088" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="mailto:hamidamz@gmail.com" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li><a href="#contact">Laravel Development</a></li>
                <li><a href="#contact">MERN Stack Apps</a></li>
                <li><a href="#contact">REST API Design</a></li>
                <li><a href="#contact">Python / Django</a></li>
                <li><a href="#contact">Code Review</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2022 Hamid Mehmood. Crafted with <i className="fas fa-heart" style={{ color: "#FF6584" }}></i> in Pakistan.</p>
            <p><a href="mailto:hamidamz@gmail.com">hamidamz@gmail.com</a></p>
          </div>
        </div>
      </footer>

      {/* ── Floating Social Dock ───────────────────────────────────────── */}
      <div className="fab-dock">
        <a
          href="https://wa.me/923251092088"
          className="fab-btn fab-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
          <span className="fab-label">WhatsApp</span>
        </a>

        <a
          href="https://www.linkedin.com/in/hamidmehmood325/"
          className="fab-btn fab-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <i className="fab fa-linkedin-in"></i>
          <span className="fab-label">LinkedIn</span>
        </a>

        <a
          href="mailto:hamidamz@gmail.com"
          className="fab-btn fab-email"
          aria-label="Send Email"
        >
          <i className="fas fa-envelope"></i>
          <span className="fab-label">Email Me</span>
        </a>

        <a
          href="https://github.com/HAMID33910"
          className="fab-btn fab-github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <i className="fab fa-github"></i>
          <span className="fab-label">GitHub</span>
        </a>

        <a
          href="tel:+923251092088"
          className="fab-btn fab-phone"
          aria-label="Call Hamid"
        >
          <i className="fas fa-phone"></i>
          <span className="fab-label">Call Me</span>
        </a>
      </div>
    </Router>
  );
}

export default App;
