import { useMemo } from 'react';
import {
  profile, facts, skillGroups, now, roles, education, projects, writingNote, nav,
} from './content';
import {
  useTilt, useCursorGlow, useReveal, useScrollSpy, useGlitchLabel,
} from './effects';

const RESUME_IDLE = 'résumé ↗';
const RESUME_HOVER = 'hire me ↗';

// Placement and timing live in CSS (.sparkle:nth-child); this is just the count.
const SPARKLES = [0, 1, 2, 3, 4, 5, 6, 7];

const GLOW_BLOBS = [
  { size: 520, alpha: 0.34, blur: 74, dur: 17, delay: 0 },
  { size: 380, alpha: 0.30, blur: 54, dur: 13, delay: -4 },
  { size: 260, alpha: 0.26, blur: 37, dur: 21, delay: -9 },
  { size: 700, alpha: 0.16, blur: 100, dur: 27, delay: -13 },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: id === 'home' ? 0 : top, behavior: 'smooth' });
}

function SectionHead({ num, kicker, title, accent, meta }) {
  return (
    <div className="section-head">
      <div className="section-head-grid">
        <div className="section-num">{num}</div>
        <div>
          <div className="section-kicker">{kicker}</div>
          <h1 className="section-title">
            {title} <em>{accent}</em>
          </h1>
          {meta ? <div className="mono-note" style={{ marginTop: 14 }}>{meta}</div> : null}
        </div>
      </div>
    </div>
  );
}

// Same eight-point star as the favicon, so the tab icon and the banner match.
function StarMark() {
  return (
    <svg className="brand-star" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M32 4 Q33.91 27.38 44.02 19.98 Q36.62 30.09 60 32 Q36.62 33.91 44.02 44.02
           Q33.91 36.62 32 60 Q30.09 36.62 19.98 44.02 Q27.38 33.91 4 32
           Q27.38 30.09 19.98 19.98 Q30.09 27.38 32 4Z"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
           0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
           -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
           .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
           -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
           1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95
           .29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

// A now entry is a plain string, or parts where an object becomes a link.
function NowItem({ item }) {
  if (typeof item === 'string') return item;
  return item.map((part, i) => (
    typeof part === 'string' ? part : (
      // eslint-disable-next-line react/no-array-index-key
      <a key={i} href={part.href} target="_blank" rel="noreferrer">{part.text}</a>
    )
  ));
}

function Tags({ items }) {
  return (
    <div className="tag-row">
      {items.map((tag) => <span className="pill" key={tag}>{tag}</span>)}
    </div>
  );
}

export default function App() {
  const sectionIds = useMemo(() => nav.map((n) => n.id), []);
  const active = useScrollSpy(sectionIds);
  const resume = useGlitchLabel(RESUME_IDLE);

  useCursorGlow();
  useReveal();
  useTilt();

  return (
    <div className="page">
      <div aria-hidden="true" className="grain" />
      <div aria-hidden="true" className="hatch" />

      <div id="cursor-glow">
        {GLOW_BLOBS.map((b) => (
          <div
            key={b.size}
            className="glow-blob"
            style={{
              width: b.size,
              height: b.size,
              margin: `${-b.size / 2}px 0 0 ${-b.size / 2}px`,
              background: `radial-gradient(closest-side, rgba(var(--glow-rgb),${b.alpha}) 0%, rgba(var(--glow-rgb),${b.alpha * 0.45}) 45%, transparent 78%)`,
              filter: `blur(${b.blur}px)`,
              animation: `glowmorph ${b.dur}s ease-in-out ${b.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <StarMark />
            <span className="brand-name">{profile.brand}</span>
          </div>
          <nav className="site-nav">
            {nav.map((item) => (
              <button
                type="button"
                key={item.id}
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
                {active === item.id ? <span className="nav-underline" /> : null}
              </button>
            ))}
            <a
              id="resume-btn"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => resume.glitchTo(RESUME_HOVER)}
              onMouseLeave={() => resume.reset()}
            >
              <span ref={resume.ref}>{RESUME_IDLE}</span>
            </a>
          </nav>
        </div>
        <div aria-hidden="true" className="progress-track">
          <div id="scroll-progress" />
        </div>
      </header>

      <main>
        {/* ── about ─────────────────────────────────────────── */}
        <section id="home">
          <div className="hero">
            <div>
              <div className="status">
                <span className="status-dot" />
                {profile.status}
              </div>
              <h1>{profile.name}</h1>
              <p className="hero-bio">{profile.bio}</p>
              <div className="hero-links">
                <a className="btn btn-solid" href={`mailto:${profile.email}`}>email</a>
                <a className="btn btn-ghost" href={profile.links.github} target="_blank" rel="noreferrer">github</a>
                <a className="btn btn-ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">linkedin</a>
                <a className="btn btn-ghost" href={profile.links.medium} target="_blank" rel="noreferrer">medium</a>
              </div>
            </div>
            <div>
              <div className="portrait">
                {profile.photo ? (
                  <>
                    <img src={profile.photo} alt={profile.name} />
                    {profile.photoWink ? (
                      <img className="avatar-wink" src={profile.photoWink} alt="" aria-hidden="true" />
                    ) : null}
                    <span className="sparkles" aria-hidden="true">
                      {SPARKLES.map((s) => <span className="sparkle" key={s} />)}
                    </span>
                  </>
                ) : (
                  <span className="portrait-label">your photo · portrait 4:5</span>
                )}
              </div>
              <div className="portrait-meta">
                <span>{profile.location}</span>
                <span>{profile.year}</span>
              </div>
            </div>
          </div>

          <div className="fact-row">
            {facts.map((fact) => (
              <div className="fact tilt glass" key={fact.label}>
                <div className="eyebrow">{fact.label}</div>
                <p>
                  {fact.href
                    ? <a className="fact-link" href={fact.href}>{fact.text}</a>
                    : fact.text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ padding: '18px 0 0' }}>
            <div className="skills-head">
              <div className="eyebrow">technical skills</div>
            </div>
            {skillGroups.map((group) => (
              <div className="skill-group tilt" key={group.name}>
                <div className="skill-group-name">{group.name}</div>
                <div className="skill-items">
                  {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── now ───────────────────────────────────────────── */}
        <section id="now">
          <SectionHead
            num="02"
            kicker="now"
            title="What I'm up to"
            accent="right now"
            meta={now.updated}
          />
          <ul className="now-list">
            {now.items.map((item) => (
              <li className="now-item tilt" key={typeof item === 'string' ? item : item[0]}>
                <span className="now-arrow">→</span>
                <span className="now-text"><NowItem item={item} /></span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── experience ────────────────────────────────────── */}
        <section id="experience">
          <SectionHead num="03" kicker="experience & education" title="Where I've" accent="been" />

          <div style={{ padding: '18px 0 0' }}>
            <div className="sub-label">experience</div>
            {roles.map((role) => (
              <div className="role tilt glass" key={role.org}>
                <div className="role-dates">{role.dates}</div>
                <div>
                  <h3>
                    {role.org}
                    {role.note ? <span className="role-note"> ({role.note})</span> : null}
                  </h3>
                  <div className="role-loc">{role.location}</div>
                </div>
                <div className={role.positions.length > 1 ? 'timeline' : undefined}>
                  {role.positions.map((post) => (
                    <div className="position" key={post.at || post.title}>
                      <div className="position-title">
                        {post.title}
                        {post.at ? (
                          <span className="position-at">
                            {', '}
                            {post.atHref
                              ? <a href={post.atHref} target="_blank" rel="noreferrer">{post.at}</a>
                              : post.at}
                          </span>
                        ) : null}
                      </div>
                      {post.dates ? <div className="position-dates">{post.dates}</div> : null}
                      {post.tags.length ? <Tags items={post.tags} /> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '18px 0 0' }}>
            <div className="sub-label">education</div>
            {education.map((edu) => (
              <div className="edu tilt glass" key={edu.school}>
                <div className="edu-dates">{edu.dates}</div>
                <div>
                  <h3>
                    {edu.degree}
                    {edu.gpa ? <span className="edu-gpa"> (GPA {edu.gpa}/{edu.gpaScale})</span> : null}
                  </h3>
                  <div className="edu-school">{edu.school}</div>
                  {edu.courses.length ? <Tags items={edu.courses} /> : null}
                </div>
                <div className="edu-loc">{edu.location}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── projects ──────────────────────────────────────── */}
        <section id="projects">
          <SectionHead num="04" kicker="projects" title="Things I've" accent="built" />
          <div className="project-grid">
            {projects.map((p) => (
              <div className="project tilt glass" key={p.num}>
                <div className="project-meta">
                  <div className="project-num">{p.num}</div>
                  <div className="project-year">{p.year}</div>
                </div>
                <div className="project-title-row">
                  <h3>{p.title}</h3>
                  <a
                    className="repo-link"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    title={`${p.title} on GitHub`}
                  >
                    <GithubMark />
                  </a>
                </div>
                <p>{p.blurb}</p>
                <Tags items={p.tags} />
              </div>
            ))}
          </div>
        </section>

        {/* ── writing ───────────────────────────────────────── */}
        <section id="blog">
          <p className="empty-state">
            <span className="empty-state-icon" aria-hidden="true">✳</span>
            {writingNote}
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-note">
            <span className="footer-star">✳</span>
            <span>
              Like what you see? Let&apos;s chat — <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </div>
          <div className="footer-credit">
            <span>Built with <span className="footer-heart">♥</span> and agents</span>
            <span className="footer-copy">© {profile.year}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
