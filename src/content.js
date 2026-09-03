// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file, nothing else,
//  to change what appears on the page.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Shruti Jayaraman',
  brand: 'Shruti Jayaraman’s Portfolio',
  status: 'seeking full-time swe, ml/ai and quant roles (2027)',
  bio: 'I’m curious about what models get wrong and stubborn about fixing it. If that sounds like your kind of problem, we’ll get along.',
  email: 'shrujaya@umich.edu',
  location: 'Ann Arbor, MI',
  year: '2026',
  photo: '/avatar.png',
  photoWink: '/avatar-wink.png',
  resumeUrl: '/shruti-jayaraman-resume.pdf',
  links: {
    github: 'https://github.com/shrujaya',
    linkedin: 'https://linkedin.com/in/shrutijayaraman',
    medium: 'https://medium.com/@sjayaraman2307',
  },
};

export const facts = [
  { label: 'currently', text: 'Studying CS at the University of Michigan.' },
  { label: 'interested in', text: 'Agents, NLP, good music, and iced coffee.' },
  { label: 'best way to reach me', text: profile.email, href: `mailto:${profile.email}` },
];

export const skillGroups = [
  { name: 'Languages', items: ['python', 'java', 'c++', 'c', 'javascript', 'html/css', 'sql', 'bash'] },
  { name: 'ML & AI', items: ['pytorch', 'tensorflow', 'hugging face transformers', 'llms', 'rag', 'langgraph', 'stable diffusion', 'scikit-learn'] },
  { name: 'Data', items: ['pandas', 'numpy', 'mysql', 'oracle', 'chromadb', 'sqlite'] },
  { name: 'Infra & tooling', items: ['git', 'fastapi', 'langchain', 'streamlit', 'boto3 (aws)', 'linux'] },
];

// An item is either a plain string, or an array of parts where an object
// becomes a link: { text, href }.
export const now = {
  updated: 'last updated · september 2026',
  items: [
    'Spent the summer upskilling',
    'Taking Advanced Compilers and Reinforcement Learning this Fall',
    [
      'Starting an apprenticeship with ',
      { text: 'GigXR', href: 'https://www.gigxr.com/' },
      ' through the ',
      {
        text: 'Perot Jain TechLab',
        href: 'https://cfe.umich.edu/launch/perot-jain-techlab-series/perot-jain-techlab-healthtech/',
      },
    ],
  ],
};

// One tile per organization. `positions` holds the roles held there — the
// per-position dates only show when there is more than one.
export const roles = [
  {
    org: 'University of Michigan',
    location: 'Ann Arbor, MI',
    dates: 'Oct 2025 — Now',
    positions: [
      {
        title: 'Student Researcher',
        at: 'Blablablab',
        atHref: 'https://blablablab.si.umich.edu/',
        dates: 'Jun 2026 — Now',
        tags: ['llm bias', 'evals', 'annotation'],
      },
      {
        title: 'Student Researcher',
        at: 'LIT Lab',
        atHref: 'https://lit.eecs.umich.edu/',
        dates: 'Oct 2025 — Now',
        tags: ['agents', 'rag', 'clinical nlp'],
      },
    ],
  },
  {
    org: 'Caterpillar Inc.',
    location: 'Chennai, India',
    dates: 'Jan 2023 — May 2025',
    positions: [
      {
        title: 'Automation Engineer',
        tags: ['python', 'c++', 'simulation', 'systems engg'],
      },
    ],
  },
];

export const education = [
  {
    dates: 'Aug 2025 — May 2027',
    degree: 'M.S., Computer Science and Engineering',
    school: 'University of Michigan',
    location: 'Ann Arbor, MI',
    gpa: '3.7',
    gpaScale: '4.0',
    courses: [
      'nlp',
      'randomness & computation',
      'scalable agentic systems',
      'computer vision',
      'open source innovation',
      'compilers',
      'reinforcement learning',
    ],
  },
  {
    dates: 'Jul 2019 — Apr 2023',
    degree: 'B.E., Computer Science and Engineering',
    school: 'College of Engineering, Guindy',
    location: 'Chennai, India',
    gpa: '9.3',
    gpaScale: '10',
    courses: [],
  },
];

export const projects = [
  {
    num: '01',
    year: '2025',
    title: 'Git-Hired',
    blurb: 'An AI interview platform with a video avatar that asks the questions, adapts difficulty as you answer, and writes the hiring report.',
    tags: ['fastapi', 'react', 'typescript', 'websockets', 'multi-agent'],
    url: 'https://github.com/shrujaya/git-hired',
  },
  {
    num: '02',
    year: '2026',
    title: 'RepoRanger',
    blurb: 'A GitHub App that reviews your pull requests and sweeps up stale branches, running entirely on your own infrastructure.',
    tags: ['github actions', 'llama 3.3', 'groq'],
    url: 'https://github.com/shrujaya/repo-ranger',
  },
  {
    num: '03',
    year: '2026',
    title: 'MemHub',
    blurb: 'A shared memory layer that lets multiple agents keep what they have learned without overflowing the context window.',
    tags: ['sqlite', 'chromadb', 'agents'],
    url: 'https://github.com/shrujaya/memhub',
  },
];

// Shown in the writing panel while there's nothing to link to yet.
// Once there are posts to show (on Medium or wherever), replace this with
// a `posts` array of { date, title, tags, read, url } and swap the empty
// state in App.jsx back for the list it replaced.
export const writingNote = 'New articles are brewing, check back soon.';

export const nav = [
  { id: 'home', label: 'about' },
  { id: 'now', label: 'now' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'blog', label: 'writing' },
];
