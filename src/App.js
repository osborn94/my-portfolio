import { useState, useEffect, useRef, createContext, useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

// THEME CONTEXT
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

// All colour tokens resolved per theme
function makeTokens(dark) {
  return {
    bg: dark ? "#010409" : "#f5f5f0",
    bgCard: dark ? "#0d1117" : "#ffffff",
    bgCard2: dark ? "#161b22" : "#f0efe9",
    bgStat: dark ? "#0d1117" : "#ffffff",
    border: dark ? "#21262d" : "#d8d6ce",
    borderMid: dark ? "#30363d" : "#c0bdb4",
    text: dark ? "#e6edf3" : "#111111",
    textMuted: dark ? "#8b949e" : "#5a5a5a",
    textFaint: dark ? "#6e7681" : "#888880",
    accent: "#00ffa3",
    accentDim: dark ? "rgba(0,255,163,0.08)" : "rgba(0,180,120,0.10)",
    accentBord: dark ? "rgba(0,255,163,0.25)" : "rgba(0,160,110,0.35)",
    link: dark ? "#58a6ff" : "#0969da",
    navBg: dark ? "rgba(1,4,9,0.92)" : "rgba(245,245,240,0.92)",
    inputBg: dark ? "#0d1117" : "#ffffff",
    mono: dark ? "#7ee787" : "#1a7f37",
    codeBg: dark ? "#161b22" : "#f0efe9",
    termBg: dark ? "#0d1117" : "#1e1e2e",
    termBar: dark ? "#161b22" : "#2a2a3e",
    termBorder: dark ? "#30363d" : "#3a3a4e",
    termText: dark ? "#c9d1d9" : "#cdd6f4",
    toggleBg: dark ? "#161b22" : "#e0dfd8",
  };
}

// SCROLL REVEAL HOOK

function useReveal(options = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, revealed];
}

// Wrapper that fades + slides up on scroll
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style = {},
}) {
  const [ref, revealed] = useReveal();
  const translate = {
    up: "translateY(36px)",
    down: "translateY(-36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? "translate(0,0)"
          : translate[direction] || translate.up,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}


// DATA

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  {
    category: "Runtime & Language",
    items: ["Node.js", "JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis", "Mongoose ODM"],
  },
  {
    category: "APIs & Protocols",
    items: ["REST", "GraphQL", "WebSockets", "gRPC"],
  },
  { category: "DevOps & Cloud", items: ["Docker", "AWS", "CI/CD", "Nginx"] },
  {
    category: "Auth & Security",
    items: ["JWT", "OAuth 2.0", "bcrypt", "HTTPS/TLS"],
  },
  { category: "Tools & Testing", items: ["Git", "Jest", "Postman", "Linux"] },
];

const PROJECTS = [
    {
    title: "Guessing Game",
    tag: "Multiplayer Game",
    tagColor: "#00ffa3",
    description:
      "Real-time multiplayer guessing game where players compete to identify the correct answer within a limited time. Features live gameplay, score tracking, interactive game rooms, and a responsive user interface for seamless play across devices.",
    tech: ["EJS", "JavaScript", "CSS", "Node.js"],
    metrics: ["Real-time Multiplayer", "Score Tracking", "Game Rooms"],
    github: "https://github.com/osborn94/GuessingGame.git",
    live: "https://osborn-guessinggame.onrender.com",
  },
    {
    title: "Eventful",
    tag: "Event Management",
    tagColor: "#ff7a59",
    description:
      "Professional event management platform that enables organizers to create, manage, and track events, sell tickets, verify attendees through QR-code validation, and gain actionable insights with event analytics. Attendees can discover upcoming events and purchase tickets seamlessly.",
    tech: ["Node.js", "MongoDB", "JavaScript", "QR Codes"],
    metrics: ["Ticket Sales", "QR Verification", "Event Analytics"],
    github: "https://github.com/osborn94/Eventful.git",
    live: "https://eventful-kpza.onrender.com",
  },
  {
    title: "Restaurant Chatbot",
    tag: "Food Ordering System",
    tagColor: "#22c55e",
    description:
      "Interactive restaurant chatbot that enables customers to place food orders through a conversational interface, manage active orders, view order history, and complete secure payments via Paystack integration. Features session-based user management, finite-state machine-driven conversations, webhook-powered payment confirmation, and a modern mobile-first user experience.",
    tech: ["Node.js", "Express.js", "MongoDB", "JavaScript", "Paystack"],
    metrics: ["Chat Ordering", "Payment Processing", "Order Management"],
    github: "https://github.com/osborn94/restaurant_chatbot.git",
    live: "https://restaurant-chatbot-3739.onrender.com",
  },

  {
    title: "Blogging API",
    tag: "Backend Development",
    tagColor: "#3b82f6",
    description:
      "Production-ready REST API for content publishing and management, built with secure JWT authentication and role-based authorization. Supports draft-to-published workflows, automated reading-time calculations, readership analytics through view tracking, advanced filtering and search capabilities, and scalable pagination for efficient content delivery.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    metrics: ["JWT Security", "Content Management", "Read Analytics"],
    github: "https://github.com/osborn94/blogging_api.git",
    live: "https://blogging-api-7sc7.onrender.com",
  },

  // {
  //   title: "DevAuth Service",
  //   tag: "Security",
  //   tagColor: "#7c6fff",
  //   description:
  //     "Microservice handling OAuth 2.0, JWT rotation, MFA, and RBAC for multi-tenant SaaS products with full audit trail.",
  //   tech: ["Node.js", "PostgreSQL", "Redis", "JWT"],
  //   metrics: ["Multi-tenant", "RBAC + MFA", "Full audit log"],
  //   github: "#",
  //   live: "#",
  // },

  // {
  //   title: "DataPipe Engine",
  //   tag: "Data",
  //   tagColor: "#ff6b6b",
  //   description:
  //     "Real-time event streaming pipeline ingesting IoT sensor data, aggregating via sliding windows, and persisting to MongoDB Atlas.",
  //   tech: ["Node.js", "MongoDB", "WebSockets", "AWS"],
  //   metrics: ["10k events/sec", "5ms latency", "Auto-scaling"],
  //   github: "#",
  //   live: "#",
  // },

  // {
  //   title: "TaskGrid",
  //   tag: "Productivity",
  //   tagColor: "#ffd93d",
  //   description:
  //     "Full-featured project management backend with real-time collaboration, nested tasks, time tracking, and team analytics dashboards.",
  //   tech: ["Node.js", "MongoDB", "GraphQL", "Docker"],
  //   metrics: ["GraphQL API", "Real-time sync", "Analytics"],
  //   github: "#",
  //   live: "#",
  // },

];

const EXPERIENCE = [
  {
    role: "Backend Developer",
    company: "Freelance & Personal Projects",
    period: "2026 – Present",
    points: [
      "Developing scalable APIs and backend services using Node.js, Express.js, and MongoDB",
      "Building production-ready web applications with secure authentication, payment integrations, and data management systems",
      "Applying software engineering best practices to create maintainable and performant backend architectures",
    ],
  },
  {
    role: "Backend Engineering Student",
    company: "AltSchool Africa",
    period: "2025 – 2026",
    points: [
      "Specialized in backend engineering with Node.js, Express.js, and MongoDB",
      "Built and deployed RESTful APIs featuring JWT authentication, filtering, pagination, and database optimization",
      "Collaborated on real-world projects and gained practical experience designing modern web services",
    ],
  },
  {
    role: "Web Development Intern",
    company: "OTS Innovations",
    period: "2023 – 2024",
    points: [
      "Learned full-stack web development using HTML, CSS, JavaScript, Python, and Django",
      "Developed applications including banking systems, e-commerce platforms, and election result tracking solutions",
      "Implemented authentication systems, database operations, and responsive user interfaces across multiple projects",
    ],
  },
];

// THEME TOGGLE BUTTON
function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const t = makeTokens(dark);
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: t.toggleBg,
        border: `1px solid ${t.border}`,
        borderRadius: "999px",
        width: "56px",
        height: "28px",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      {/* track icons */}
      <span
        style={{
          position: "absolute",
          left: "7px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px",
          pointerEvents: "none",
        }}
      >
        ☀️
      </span>
      <span
        style={{
          position: "absolute",
          right: "7px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "12px",
          pointerEvents: "none",
        }}
      >
        🌙
      </span>
      {/* thumb */}
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: dark ? "30px" : "3px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: dark ? "#00ffa3" : "#111",
          transition: "left 0.3s cubic-bezier(.22,.68,0,1.2), background 0.3s",
        }}
      />
    </button>
  );
}

// ANIMATED TERMINAL
// function Terminal() {
//   const { dark } = useTheme();
//   const t = makeTokens(dark);
//   const lines = [
//     { text: "$ node server.js", delay: 0 },
//     { text: "✔ MongoDB connected", delay: 600, color: "#00ffa3" },
//     { text: "✔ Redis ready", delay: 1100, color: "#00ffa3" },
//     { text: "⚡ Server listening on :3000", delay: 1700, color: "#7c6fff" },
//     { text: "→ GET /api/users        200", delay: 2400 },
//     { text: "→ POST /api/auth/login  201", delay: 3000 },
//     { text: "→ GET /api/metrics      200", delay: 3500 },
//   ];
//   const [visible, setVisible] = useState([]);
//   useEffect(() => {
//     lines.forEach((l, i) => {
//       setTimeout(() => setVisible((v) => [...v, i]), l.delay + 300);
//     });
//   }, []);
//   return (
//     <div
//       style={{
//         background: t.termBg,
//         borderRadius: "12px",
//         border: `1px solid ${t.termBorder}`,
//         overflow: "hidden",
//         fontFamily: "'JetBrains Mono','Fira Code',monospace",
//         fontSize: "13px",
//         maxWidth: "480px",
//         width: "100%",
//         transition: "background 0.3s, border-color 0.3s",
//       }}
//     >
//       <div
//         style={{
//           background: t.termBar,
//           padding: "10px 16px",
//           display: "flex",
//           gap: "6px",
//           alignItems: "center",
//           borderBottom: `1px solid ${t.termBorder}`,
//           transition: "background 0.3s",
//         }}
//       >
//         {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
//           <div
//             key={i}
//             style={{
//               width: 12,
//               height: 12,
//               borderRadius: "50%",
//               background: c,
//             }}
//           />
//         ))}
//         <span style={{ color: "#6e7681", marginLeft: "8px", fontSize: "12px" }}>
//           backend-server
//         </span>
//       </div>
//       <div style={{ padding: "16px", minHeight: "160px", lineHeight: "1.9" }}>
//         {lines.map((l, i) => (
//           <div
//             key={i}
//             style={{
//               color: l.color || t.termText,
//               opacity: visible.includes(i) ? 1 : 0,
//               transform: visible.includes(i)
//                 ? "translateY(0)"
//                 : "translateY(6px)",
//               transition: "opacity 0.35s ease, transform 0.35s ease",
//             }}
//           >
//             {l.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// ANIMATED COUNTER
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = Math.ceil(to / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= to) {
              setVal(to);
              clearInterval(timer);
            } else setVal(start);
          }, 30);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}


// SKILL BADGE
function SkillBadge({ item }) {
  const { dark } = useTheme();
  const t = makeTokens(dark);
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "5px 14px",
        borderRadius: "999px",
        border: `1px solid ${hovered ? t.accent : t.borderMid}`,
        color: hovered ? t.accent : t.textMuted,
        fontSize: "13px",
        cursor: "default",
        transition: "all 0.2s ease",
        background: hovered ? t.accentDim : "transparent",
      }}
    >
      {item}
    </span>
  );
}


// PROJECT CARD
function ProjectCard({ p, delay }) {
  const { dark } = useTheme();
  const t = makeTokens(dark);
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: t.bgCard,
          border: `1px solid ${hovered ? t.borderMid : t.border}`,
          borderRadius: "12px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "100%",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? dark
              ? "0 16px 48px rgba(0,0,0,0.5)"
              : "0 16px 48px rgba(0,0,0,0.12)"
            : "none",
          cursor: "default",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: t.text,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {p.title}
          </h3>
          <span
            style={{
              background: p.tagColor + "18",
              color: p.tagColor,
              border: `1px solid ${p.tagColor}40`,
              borderRadius: "999px",
              padding: "3px 12px",
              fontSize: "12px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {p.tag}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            color: t.textMuted,
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          {p.description}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {p.metrics.map((m) => (
            <span
              key={m}
              style={{
                background: t.bgCard2,
                border: `1px solid ${t.border}`,
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "12px",
                color: t.mono,
                fontFamily: "monospace",
              }}
            >
              {m}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {p.tech.map((tech) => (
            <span key={tech} style={{ color: t.textFaint, fontSize: "12px" }}>
              #{tech}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: t.link, fontSize: "13px", textDecoration: "none" }}
          >
            ⟨/⟩ GitHub
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: t.link, fontSize: "13px", textDecoration: "none" }}
          >
            ↗ Live demo
          </a>
        </div>
      </div>
    </Reveal>
  );
}


// SECTION WRAPPER
function Section({ id, children }) {
  const { dark } = useTheme();
  const t = makeTokens(dark);
  return (
    <section
      id={id}
      style={{
        padding: "80px 0",
        borderTop: `1px solid ${t.border}`,
        transition: "border-color 0.3s",
      }}
    >
      {children}
    </section>
  );
}

function SectionTitle({ label, title, delay = 0 }) {
  const { dark } = useTheme();
  const t = makeTokens(dark);
  return (
    <Reveal delay={delay}>
      <div style={{ marginBottom: "48px" }}>
        <span
          style={{
            color: t.accent,
            fontSize: "13px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <h2
          style={{
            color: t.text,
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700,
            margin: "8px 0 0",
            letterSpacing: "-0.5px",
            transition: "color 0.3s",
          }}
        >
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

// MAIN APP
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggle = () => setDark((v) => !v);
  const t = makeTokens(dark);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => document.getElementById(l));
      const active = sections.find((s) => {
        if (!s) return false;
        const r = s.getBoundingClientRect();
        return r.top <= 120 && r.bottom > 120;
      });
      if (active) setActiveSection(active.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/mqeoyeob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    background: t.inputBg,
    border: `1px solid ${t.borderMid}`,
    borderRadius: "8px",
    padding: "12px 16px",
    color: t.text,
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.3s",
  };

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div
        style={{
          background: t.bg,
          color: t.textMuted,
          minHeight: "100vh",
          width: "100%",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          overflowX: "hidden",
          transition: "background 0.35s, color 0.35s",
        }}
      >
        {/* ── NAV ── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: scrolled ? t.navBg : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            borderBottom: scrolled
              ? `1px solid ${t.border}`
              : "1px solid transparent",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              padding: "0 24px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                fontFamily: "monospace",
                color: t.accent,
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                cursor: "pointer",
              }}
            >
              {"<Osborn Israel />"}
            </div>

            {/* Desktop links */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  style={{
                    background: "none",
                    border: "none",
                    color: activeSection === l ? t.accent : t.textFaint,
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    transition: "color 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {l}
                </button>
              ))}
              <ThemeToggle />
              <button
                onClick={() => scrollTo("Contact")}
                style={{
                  background: t.accent,
                  border: "none",
                  color: "#010409",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontFamily: "inherit",
                  marginLeft: "8px",
                }}
              >
                Hire me
              </button>
            </div>

            {/* Mobile row */}
            <div
              style={{ display: "none", alignItems: "center", gap: "10px" }}
              className="mobile-controls"
            >
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                style={{
                  background: "none",
                  border: `1px solid ${t.border}`,
                  color: t.text,
                  borderRadius: "6px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  lineHeight: 1,
                  fontSize: "16px",
                }}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div
              style={{
                background: t.bgCard,
                borderBottom: `1px solid ${t.border}`,
                padding: "16px 24px",
                transition: "background 0.3s",
              }}
            >
              {[...NAV_LINKS, "Hire me"].map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l === "Hire me" ? "Contact" : l)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    color: l === "Hire me" ? t.accent : t.text,
                    fontSize: "16px",
                    padding: "12px 0",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    borderBottom: `1px solid ${t.border}`,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ── MAIN CONTENT ── */}
        <div
          style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 24px" }}
        >
          {/* HERO */}
          <section
            id="About"
            style={{ paddingTop: "140px", paddingBottom: "80px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "48px",
                alignItems: "center",
              }}
              className="hero-grid"
            >
              <div>
                <Reveal>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: t.accentDim,
                      border: `1px solid ${t.accentBord}`,
                      borderRadius: "999px",
                      padding: "6px 16px",
                      marginBottom: "24px",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: t.accent,
                        display: "inline-block",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <span style={{ color: t.accent, fontSize: "13px" }}>
                      Available for hire
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    style={{
                      color: t.text,
                      fontSize: "clamp(36px, 6vw, 64px)",
                      fontWeight: 800,
                      margin: "0 0 16px",
                      lineHeight: 1.1,
                      letterSpacing: "-1.5px",
                      transition: "color 0.3s",
                    }}
                  >
                    Backend Engineer
                    <br />
                    <span style={{ color: t.accent }}>Node.js · MongoDB</span>
                  </h1>
                </Reveal>
                <Reveal delay={160}>
                  <p
                    style={{
                      color: t.textMuted,
                      fontSize: "clamp(15px, 2vw, 18px)",
                      lineHeight: 1.7,
                      maxWidth: "520px",
                      margin: "0 0 36px",
                      transition: "color 0.3s",
                    }}
                  >
                    I build scalable, resilient server-side systems — APIs,
                    microservices, data pipelines — that power products people
                    love. 3+ years turning complex requirements into clean,
                    production-ready code.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                  >
                    <button
                      onClick={() => scrollTo("Projects")}
                      style={{
                        background: t.accent,
                        border: "none",
                        color: "#010409",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: "14px 28px",
                        borderRadius: "8px",
                        fontFamily: "inherit",
                      }}
                    >
                      View my work ↓
                    </button>
                    <button
                      onClick={() => scrollTo("Contact")}
                      style={{
                        background: "transparent",
                        border: `1px solid ${t.borderMid}`,
                        color: t.text,
                        fontSize: "15px",
                        fontWeight: 500,
                        cursor: "pointer",
                        padding: "14px 28px",
                        borderRadius: "8px",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s, color 0.3s",
                      }}
                    >
                      Get in touch
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* <Reveal delay={300} direction="left" className="terminal-wrapper">
                <Terminal />
              </Reveal> */}
            </div>

            {/* Stats */}
            <Reveal delay={100} style={{ marginTop: "64px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1px",
                  background: t.border,
                  border: `1px solid ${t.border}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "background 0.3s, border-color 0.3s",
                }}
              >
                {[
                  { val: 3, suffix: "+", label: "Years experience" },
                  { val: 20, suffix: "+", label: "Projects shipped" },
                  { val: 99, suffix: "%", label: "API uptime avg." },
                  { val: 8, suffix: "", label: "Open source repos" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: t.bgStat,
                      padding: "28px 24px",
                      textAlign: "center",
                      transition: "background 0.3s",
                    }}
                  >
                    <div
                      style={{
                        color: t.text,
                        fontSize: "36px",
                        fontWeight: 800,
                        letterSpacing: "-1px",
                        transition: "color 0.3s",
                      }}
                    >
                      <Counter to={s.val} suffix={s.suffix} />
                    </div>
                    <div
                      style={{
                        color: t.textFaint,
                        fontSize: "13px",
                        marginTop: "4px",
                        transition: "color 0.3s",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* SKILLS */}
          <Section id="Skills">
            <SectionTitle label="// expertise" title="Technical Skills" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {SKILLS.map((group, i) => (
                <Reveal key={group.category} delay={i * 70}>
                  <div
                    style={{
                      background: t.bgCard,
                      border: `1px solid ${t.border}`,
                      borderRadius: "12px",
                      padding: "24px",
                      transition: "background 0.3s, border-color 0.3s",
                    }}
                  >
                    <h3
                      style={{
                        color: t.accent,
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: "0 0 16px",
                        fontFamily: "monospace",
                      }}
                    >
                      {group.category}
                    </h3>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {group.items.map((item) => (
                        <SkillBadge key={item} item={item} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="Projects">
            <SectionTitle label="// portfolio" title="Featured Projects" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} p={p} delay={i * 80} />
              ))}
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="Experience">
            <SectionTitle label="// career" title="Work Experience" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.company} delay={i * 100}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "24px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: t.bg,
                          border: `2px solid ${t.accent}`,
                          marginTop: "6px",
                          flexShrink: 0,
                          zIndex: 1,
                          transition: "background 0.3s",
                        }}
                      />
                      {i < EXPERIENCE.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            width: "1px",
                            background: t.border,
                            margin: "8px 0",
                            transition: "background 0.3s",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingBottom: "40px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginBottom: "12px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: t.text,
                              fontWeight: 600,
                              fontSize: "18px",
                              transition: "color 0.3s",
                            }}
                          >
                            {e.role}
                          </div>
                          <div
                            style={{
                              color: t.accent,
                              fontSize: "14px",
                              marginTop: "2px",
                            }}
                          >
                            {e.company}
                          </div>
                        </div>
                        <span
                          style={{
                            background: t.bgCard2,
                            border: `1px solid ${t.border}`,
                            borderRadius: "6px",
                            padding: "4px 12px",
                            fontSize: "13px",
                            color: t.textFaint,
                            fontFamily: "monospace",
                            transition: "background 0.3s, border-color 0.3s",
                          }}
                        >
                          {e.period}
                        </span>
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          padding: "0 0 0 18px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {e.points.map((pt) => (
                          <li
                            key={pt}
                            style={{
                              color: t.textMuted,
                              fontSize: "14px",
                              lineHeight: 1.6,
                              transition: "color 0.3s",
                            }}
                          >
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="Contact">
            <SectionTitle label="// connect" title="Let's Work Together" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "start",
              }}
              className="contact-grid"
            >
              <Reveal direction="right">
                <div>
                  <p
                    style={{
                      color: t.textMuted,
                      fontSize: "16px",
                      lineHeight: 1.8,
                      margin: "0 0 32px",
                      transition: "color 0.3s",
                    }}
                  >
                    I'm open to senior backend roles, contract work, and
                    interesting technical collaborations. Got a problem that
                    needs a rock-solid API or data architecture? Let's talk.
                  </p>
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: "israelosborn@gmail.com",
                      link: "mailto:israelosborn@gmail.com",
                    },
                    {
                      icon: <FaGithub />,
                      label: "GitHub",
                      value: "github.com/osborn94",
                      link: "https://github.com/osborn94",
                    },
                    {
                      icon: <FaLinkedin />,
                      label: "LinkedIn",
                      value: "linkedin.com/in/osborn-israel",
                      link: "https://linkedin.com/in/osborn-israel",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "16px 0",
                        borderBottom: `1px solid ${t.border}`,
                        transition: "border-color 0.3s",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{c.icon}</span>
                      <div>
                        <div
                          style={{
                            color: t.textFaint,
                            fontSize: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            transition: "color 0.3s",
                          }}
                        >
                          {c.label}
                        </div>
                        {/* <div style={{ color: t.link, fontSize: "14px" }}>
                          {c.value}
                        </div> */}
                        {c.link ? (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: t.link,
                              fontSize: "14px",
                              textDecoration: "none",
                            }}
                          >
                            {c.value}
                          </a>
                        ) : (
                          <span
                            style={{
                              color: t.link,
                              fontSize: "14px",
                            }}
                          >
                            {c.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={150} direction="left">
                {submitted ? (
                  <div
                    style={{
                      background: t.accentDim,
                      border: `1px solid ${t.accentBord}`,
                      borderRadius: "12px",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                      ✅
                    </div>
                    <h3 style={{ color: t.accent, margin: "0 0 8px" }}>
                      Message sent!
                    </h3>
                    <p style={{ color: t.textMuted, margin: 0 }}>
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {[
                      {
                        id: "name",
                        label: "Your name",
                        type: "text",
                        placeholder: "John Doe",
                      },
                      {
                        id: "email",
                        label: "Email address",
                        type: "email",
                        placeholder: "you@example.com",
                      },
                    ].map((f) => (
                      <div key={f.id}>
                        <label
                          style={{
                            display: "block",
                            color: t.textFaint,
                            fontSize: "13px",
                            marginBottom: "8px",
                          }}
                        >
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          value={formState[f.id]}
                          onChange={(e) =>
                            setFormState((s) => ({
                              ...s,
                              [f.id]: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = t.accent)
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = t.borderMid)
                          }
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        style={{
                          display: "block",
                          color: t.textFaint,
                          fontSize: "13px",
                          marginBottom: "8px",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell me about your project..."
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={(e) => (e.target.style.borderColor = t.accent)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = t.borderMid)
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: t.accent,
                        border: "none",
                        color: "#010409",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: "14px",
                        borderRadius: "8px",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.88")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Send message →
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </Section>
        </div>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: `1px solid ${t.border}`,
            padding: "32px 24px",
            textAlign: "center",
            color: t.textFaint,
            fontSize: "13px",
            fontFamily: "monospace",
            transition: "border-color 0.3s, color 0.3s",
          }}
        >
          // Built with React · Node.js · ❤️ · © {new Date().getFullYear()}{" "}
          Osborn Israel
        </footer>

        {/* GLOBAL STYLES */}
        <style>{`
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @media (max-width: 768px) {
            .desktop-nav    { display: none !important; }
            .mobile-controls { display: flex !important; }
            .hero-grid      { grid-template-columns: 1fr !important; }
            .terminal-wrapper { display: none !important; }
            .contact-grid   { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 520px) {
            section { padding: 56px 0 !important; }
          }
        `}</style>
      </div>
    </ThemeCtx.Provider>
  );
}
