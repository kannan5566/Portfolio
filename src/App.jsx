import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const ROLES = ['Mobile Application Developer', 'Data Analyst', 'Python Developer']

/** Adds a fade/slide-in reveal animation when the element scrolls into view */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

function Nav({ activeSection, mobileOpen, setMobileOpen }) {
  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="nav-mark">
          <span className="dot"></span>KANNAN&nbsp;N
        </div>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span></span>
        </button>
      </div>
      <div className={`nav-links-mobile ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            onClick={handleLinkClick}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}

function useTypedRoles(roles) {
  const [text, setText] = useState(roles[0])

  useEffect(() => {
    let roleIndex = 0
    let charIndex = roles[0].length
    let deleting = false
    let timeoutId

    const tick = () => {
      const current = roles[roleIndex]
      if (!deleting) {
        charIndex++
        if (charIndex > current.length) {
          deleting = true
          timeoutId = setTimeout(tick, 1400)
          return
        }
      } else {
        charIndex--
        if (charIndex < 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % roles.length
          charIndex = 0
        }
      }
      setText(roles[roleIndex].slice(0, charIndex))
      timeoutId = setTimeout(tick, deleting ? 40 : 70)
    }

    timeoutId = setTimeout(tick, 1400)
    return () => clearTimeout(timeoutId)
  }, [roles])

  return text
}

function Hero() {
  const typedRole = useTypedRoles(ROLES)

  return (
    <section className="hero">
      <div className="hero-grid-bg"></div>
      <div className="wrap hero-inner">
        <div className="eyebrow">MCA STUDENT · DR. MAHALINGAM COLLEGE OF ENGINEERING &amp; TECHNOLOGY</div>
        <h1>
          Kannan N builds
          <br />
          with data, AI, and <span className="accent">mobile.</span>
        </h1>
        <div className="terminal">
          <span className="prompt">&gt;</span>
          <span className="role">{typedRole}</span>
          <span className="cursor"></span>
        </div>
        <p className="lede">
          Aspiring Software Developer and Data Analyst with a passion for transforming business requirements into
          practical digital solutions. Skilled in web technologies, Flutter, and Python, with a focus on delivering
          efficient, user-friendly applications.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View projects</a>
          <a href="#contact" className="btn btn-ghost">Get in touch</a>
  <a href="/Kannan_N_Resume.pdf" download className="btn btn-ghost">Download Resume</a>
</div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">2</div>
            <div className="stat-label">FEATURED PROJECTS</div>
          </div>
          <div>
            <div className="stat-num">4</div>
            <div className="stat-label">CERTIFICATIONS</div>
          </div>
          <div>
            <div className="stat-num">6mo</div>
            <div className="stat-label">AI INTERNSHIP</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const interests = ['Mobile Application Developer', 'Data Analyst', 'Python Developer']
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal>
            <span className="section-tag">About</span>
            <h2 style={{ marginBottom: 22 }}>Objective</h2>
            <div className="about-text">
              <p>
                Aspiring <strong>Software Developer and Data Analyst</strong> with a passion for transforming
                business requirements into practical digital solutions. Skilled in web technologies, Flutter, and
                Python, with a focus on delivering efficient, user-friendly applications.
              </p>
              <p>
                Currently pursuing my <strong>Master of Computer Applications</strong> at Dr. Mahalingam College of
                Engineering and Technology (Anna University), Pollachi, with hands-on experience across mobile
                development, applied AI, and data visualization.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <span className="section-tag">Areas of Interest</span>
            <div className="interest-list" style={{ marginTop: 22 }}>
              {interests.map((name, i) => (
                <div className="interest-item" key={name}>
                  <span className="interest-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="interest-name">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const technical = ['Python', 'Flutter', 'Power BI', 'MongoDB', 'Dart', 'Postman', 'Canva']
  const soft = ['Team Player', 'Adaptability']
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Skills</span>
          <h2>What I work with</h2>
        </Reveal>
        <div className="skills-grid">
          <Reveal as="div" className="skill-card">
            <h3>Technical Skills</h3>
            <div className="chip-row">
              {technical.map((s, i) => (
                <span className={`chip ${i < 4 ? 'teal' : ''}`} key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
          <Reveal as="div" className="skill-card">
            <h3>Soft Skills</h3>
            <div className="chip-row">
              {soft.map((s) => (
                <span className="chip violet" key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const PROJECTS = [
  {
    index: '01',
    title: 'Retail Distribution Management System',
    desc: 'A Flutter and Firebase-based mobile application for real-time, multi-branch retail inventory management. Tracks stock and monitors payments across locations, with role-based access separating Admin and Employee permissions.',
    tags: ['Flutter', 'Firebase', 'Real-time DB', 'Role-based Access'],
  },
  {
    index: '02',
    title: 'AI-Powered Trip Planner',
    desc: 'A multi-agent AI system that autonomously generates optimized, real-time travel itineraries — coordinating multiple agents to balance routing, timing, and preferences without manual input.',
    tags: ['Streamlit', 'Python', 'MongoDB', 'Multi-agent AI'],
  },
  {
    index: '03',
    title: 'Find My Labour',
    desc: 'Find My Labour is a full-stack digital labour marketplace built with React and Django REST Framework, connecting Indias 450 million unorganized daily wage workers directly with organizations and contractors — eliminating middlemen completely.',
    tags: ['TailwindCSS', 'Django','GST Regex Validator','Ollama','MockIVR Dialer','MongoDB'],
  },
]

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Projects</span>
          <h2>Featured work</h2>
        </Reveal>
        <div className="project-list">
          {PROJECTS.map((p) => (
            <Reveal as="div" className="project-card" key={p.index}>
              <div className="project-index mono">{p.index}</div>
              <div>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Experience</span>
          <h2>Internship</h2>
        </Reveal>
        <Reveal as="div" className="exp-card">
          <div className="exp-top">
            <div>
              <div className="exp-role">AI Powered Trip Planner — Project Intern</div>
              <div className="exp-org">EPIC-X BHARATH PVT LTD</div>
            </div>
            <div className="exp-date">Oct 2025 — Mar 2026</div>
          </div>
          <div className="exp-row">
            <span className="k">Learning Objective</span>
            <span>Gained hands-on knowledge of Python applied to Artificial Intelligence.</span>
          </div>
          <div className="exp-row">
            <span className="k">Abstract</span>
            <span>Built a multi-agent AI system to autonomously generate optimized, real-time travel itineraries.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const ACHIEVEMENTS = [
  { title: 'Epic-X Hackathon', org: 'Epic-X Bharath Pvt Ltd, Coimbatore' },
  { title: 'Neuro Hack — Inter-College Hackathon', org: 'Held at Dr. Mahalingam College of Engineering and Technology (MCET)' },
]

function Achievements() {
  return (
    <section className="achievements" id="achievements">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Achievements</span>
          <h2>Wins &amp; recognition</h2>
        </Reveal>
        <div className="achieve-grid">
          {ACHIEVEMENTS.map((a) => (
            <Reveal as="div" className="achieve-card" key={a.title}>
              <div className="achieve-badge">1ST PRIZE</div>
              <div className="achieve-title">{a.title}</div>
              <div className="achieve-org">{a.org}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const CERTS = [
  { icon: 'AWS', name: 'AWS Cloud Computing', issuer: 'Certification' },
  { icon: 'PBI', name: 'Power BI', issuer: 'Certification' },
  { icon: 'PY', name: 'Python', issuer: 'Infosys Springboard' },
  { icon: 'FL', name: 'Flutter', issuer: 'GT Software Pvt Ltd, Coimbatore' },
]

function Certifications() {
  return (
    <section className="certs" id="certifications">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Certifications</span>
          <h2>Credentials</h2>
        </Reveal>
        <div className="cert-grid">
          {CERTS.map((c) => (
            <Reveal as="div" className="cert-card" key={c.name}>
              <div className="cert-icon">{c.icon}</div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="education" id="education">
      <div className="wrap">
        <Reveal className="section-head" as="div">
          <span className="section-tag">Education</span>
          <h2>Academic background</h2>
        </Reveal>
        <Reveal as="div" className="edu-list">
          <div className="edu-item">
            <div className="edu-degree">Master of Computer Applications (MCA)</div>
            <div className="edu-school">Dr. Mahalingam College of Engineering and Technology, Anna University — Pollachi</div>
            <div className="edu-meta">I SEMESTER &nbsp;·&nbsp; CGPA <span className="edu-score">7.0</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <Reveal as="div">
          <span className="section-tag">Contact</span>
          <h2>Let's work together</h2>
          <p>Open to opportunities in mobile app development, data analysis, and software development. Reach out below.</p>
          <div className="contact-links">
            <a href="mailto:kannanbsdnk@gmail.com">✉ kannanbsdnk@gmail.com</a>
            <span className="contact-location">📍 Coimbatore</span>
            <a
              href="https://www.linkedin.com/in/n-kannan-n?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/n-kannan-n
            </a>
            <a href="https://github.com/kannan5566" target="_blank" rel="noopener noreferrer">
              github.com/kannan5566
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">© 2026 Kannan N — Built with intent, one project at a time.</div>
    </footer>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certifications />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
