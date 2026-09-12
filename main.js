'use strict';

/* ══════════════════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════════════════ */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function trackRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(trackRing);
  })();

  document.querySelectorAll('a, button, .tab, .skill-chip, .project-card, .cert-card, input, textarea, .timeline-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
    });
})();

/* ══════════════════════════════════════════════════════
   NAVBAR SCROLL
   ══════════════════════════════════════════════════════ */
(function () {
  const nav = document.getElementById('navbar');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL — handles reveal-* and slide-from-*
   ══════════════════════════════════════════════════════ */
(function () {
  const sel = '.reveal-up, .reveal-left, .reveal-right, .slide-from-left, .slide-from-right';
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(sel).forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════════
   COUNTER ANIMATION
   ══════════════════════════════════════════════════════ */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.target;
      const dur = 1600;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════════
   HERO SCROLL PARALLAX
   ══════════════════════════════════════════════════════ */
(function () {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual  = document.querySelector('.hero-visual');
  const cardA = document.querySelector('.card-a');
  const cardB = document.querySelector('.card-b');
  const cardC = document.querySelector('.card-c');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > window.innerHeight) return; // only while hero visible

    if (heroContent) heroContent.style.transform = `translateY(${sy * 0.1}px)`;
    if (heroVisual)  heroVisual.style.transform  = `translateY(${sy * 0.05}px)`;
    // Float cards drift at different rates for depth
    if (cardA) cardA.style.setProperty('--px', `${sy * 0.08}px`);
    if (cardB) cardB.style.setProperty('--px', `${-sy * 0.06}px`);
    if (cardC) cardC.style.setProperty('--px', `${sy * 0.1}px`);
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   PROJECTS DATA
   ══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: 'PROREPO',
    subtitle: 'AI-Driven Repository & Talent Discovery Platform',
    desc: 'Multimodal AI platform evaluating student projects using BERT NLP (90% domain classification), ResNet-50 for diagram assessment, and I3D + TransRank for video ranking (0.78 human correlation).',
    stack: ['BERT', 'ResNet-50', 'Python', 'MongoDB', 'NLP'],
    bg: 'linear-gradient(145deg, #0A1F10 0%, #0B2A15 50%, #0D3318 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="18" stroke="#C9A227" stroke-width="1" opacity="0.6"/>
      <circle cx="40" cy="40" r="6" fill="#C9A227" opacity="0.8"/>
      <line x1="40" y1="14" x2="40" y2="22" stroke="#2A9450" stroke-width="1.5"/>
      <line x1="40" y1="58" x2="40" y2="66" stroke="#2A9450" stroke-width="1.5"/>
      <line x1="14" y1="40" x2="22" y2="40" stroke="#2A9450" stroke-width="1.5"/>
      <line x1="58" y1="40" x2="66" y2="40" stroke="#2A9450" stroke-width="1.5"/>
      <circle cx="40" cy="14" r="3" fill="#2A9450"/>
      <circle cx="40" cy="66" r="3" fill="#2A9450"/>
      <circle cx="14" cy="40" r="3" fill="#2A9450"/>
      <circle cx="66" cy="40" r="3" fill="#2A9450"/>
      <circle cx="23" cy="23" r="2" fill="#1B6B3A" opacity="0.7"/>
      <circle cx="57" cy="23" r="2" fill="#1B6B3A" opacity="0.7"/>
      <circle cx="23" cy="57" r="2" fill="#1B6B3A" opacity="0.7"/>
      <circle cx="57" cy="57" r="2" fill="#1B6B3A" opacity="0.7"/>
    </svg>`,
    featured: true,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
  {
    title: 'NOTIONLITE',
    subtitle: 'Full-Stack Project & Task Management App',
    desc: 'Django REST + React/TypeScript app with JWT auth, CRUD APIs, CSV export, nested task endpoints, Zustand state management, and clean modular architecture.',
    stack: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Zustand'],
    bg: 'linear-gradient(145deg, #0A1A0D 0%, #0C2414 50%, #0E2E18 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="18" width="44" height="44" rx="4" stroke="#2A9450" stroke-width="1" opacity="0.5"/>
      <rect x="24" y="24" width="32" height="6" rx="2" fill="#1B6B3A" opacity="0.7"/>
      <rect x="24" y="34" width="24" height="3" rx="1.5" fill="#C9A227" opacity="0.6"/>
      <rect x="24" y="41" width="28" height="3" rx="1.5" fill="#C9A227" opacity="0.4"/>
      <rect x="24" y="48" width="20" height="3" rx="1.5" fill="#C9A227" opacity="0.3"/>
      <circle cx="56" cy="56" r="8" fill="#0A1F10" stroke="#C9A227" stroke-width="1"/>
      <path d="M52 56l3 3 5-5" stroke="#C9A227" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    featured: false,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
  {
    title: 'AI DJ',
    subtitle: 'Real-Time Mood-Based Music Recommender',
    desc: 'FastAPI + Kafka pipeline streaming chat data through NLP emotion detection (TextBlob), with SSE live dashboard updates. Deployed publicly on Render.',
    stack: ['FastAPI', 'Kafka', 'NLP', 'SSE', 'Python'],
    bg: 'linear-gradient(145deg, #080F0A 0%, #0A1A0D 50%, #0C2010 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 Q30 20 40 40 Q50 60 60 30" stroke="#C9A227" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="20" cy="50" r="3" fill="#2A9450"/>
      <circle cx="60" cy="30" r="3" fill="#2A9450"/>
      <rect x="34" y="34" width="12" height="12" rx="6" fill="#1B6B3A" stroke="#C9A227" stroke-width="1"/>
    </svg>`,
    featured: false,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
  {
    title: 'Mental Health Chatbot',
    subtitle: 'NLP-Powered Empathetic AI Support',
    desc: 'Flask-based AI chatbot using OpenAI API for empathetic responses. Implements sentiment analysis and intent recognition, improving response relevance by 35%.',
    stack: ['OpenAI API', 'Flask', 'NLP', 'Sentiment Analysis'],
    bg: 'linear-gradient(145deg, #080E08 0%, #0A1A0C 50%, #0B1F0E 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 28 Q20 18 30 18 L50 18 Q60 18 60 28 L60 45 Q60 55 50 55 L44 55 L38 64 L38 55 L30 55 Q20 55 20 45 Z" stroke="#2A9450" stroke-width="1" fill="rgba(11,51,24,0.4)"/>
      <circle cx="32" cy="36" r="3" fill="#C9A227" opacity="0.8"/>
      <circle cx="40" cy="36" r="3" fill="#C9A227" opacity="0.8"/>
      <circle cx="48" cy="36" r="3" fill="#C9A227" opacity="0.8"/>
    </svg>`,
    featured: false,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
  {
    title: 'Mood Prediction App',
    subtitle: 'Data-Driven Mental Health Tracker',
    desc: 'Achieved 87% predictive accuracy using TensorFlow and Pandas for real-time sentiment analysis. Integrated cognitive restructuring techniques with interactive Matplotlib visualisations.',
    stack: ['TensorFlow', 'Pandas', 'Matplotlib', 'Seaborn'],
    bg: 'linear-gradient(145deg, #080C08 0%, #0A1A0C 50%, #0C2010 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 55 L28 38 L36 46 L46 28 L56 36 L64 22" stroke="#C9A227" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M16 55 L28 38 L36 46 L46 28 L56 36 L64 22 L64 55 Z" fill="rgba(42,148,80,0.1)"/>
      <line x1="16" y1="55" x2="64" y2="55" stroke="#1B6B3A" stroke-width="1" opacity="0.5"/>
      <line x1="16" y1="20" x2="16" y2="55" stroke="#1B6B3A" stroke-width="1" opacity="0.5"/>
    </svg>`,
    featured: false,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
  {
    title: 'House Price Predictor',
    subtitle: 'Multi-Variable Regression Model',
    desc: 'Multi-variable regression model reducing RMSE prediction error by 15% via feature engineering. Deployed with Flask API endpoints for seamless frontend integration.',
    stack: ['Scikit-Learn', 'Flask', 'NumPy', 'Feature Eng.'],
    bg: 'linear-gradient(145deg, #080B08 0%, #0A1810 50%, #0B2010 100%)',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="40" width="10" height="20" fill="#1B6B3A" opacity="0.8" rx="1"/>
      <rect x="32" y="30" width="10" height="30" fill="#2A9450" opacity="0.8" rx="1"/>
      <rect x="46" y="22" width="10" height="38" fill="#3ECF72" opacity="0.6" rx="1"/>
      <line x1="14" y1="60" x2="66" y2="60" stroke="#C9A227" stroke-width="1" opacity="0.5"/>
      <path d="M16 55 Q30 28 45 24 Q55 22 64 22" stroke="#C9A227" stroke-width="1.5" stroke-dasharray="3 2" fill="none" opacity="0.7"/>
    </svg>`,
    featured: false,
    demo: '#',
    code: 'https://github.com/Aman030304',
  },
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    const slideClass = i % 2 === 0 ? 'slide-from-left' : 'slide-from-right';
    card.className = 'project-card' + (p.featured ? ' featured' : '') + ' ' + slideClass;
    const stagger = (i % 3) * 0.12;
    card.style.setProperty('--delay', stagger + 's');

    const tagsHTML = p.stack.map(t => `<span class="proj-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="proj-img">
        <div class="proj-img-inner" style="background:${p.bg}">
          ${p.svgIcon}
        </div>
        <div class="proj-overlay">
          <div class="proj-links">
            <a href="${p.code}" class="proj-link primary" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-stack">${tagsHTML}</div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  // Observe the newly added slide cards
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  grid.querySelectorAll('.slide-from-left, .slide-from-right').forEach(el => io.observe(el));
}
renderProjects();

/* ══════════════════════════════════════════════════════
   SKILL BAR ANIMATION
   ══════════════════════════════════════════════════════ */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.prof-fill').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════════
   SKILLS TICKER MARQUEE
   ══════════════════════════════════════════════════════ */
(function initTicker() {
  const ROW_A = ['Python', 'TensorFlow', 'PyTorch', 'React.js', 'Node.js', 'Django', 'FastAPI', 'MongoDB', 'PostgreSQL', 'AWS', 'Scikit-Learn', 'Pandas', 'NumPy', 'Docker', 'Java', 'NLP'];
  const ROW_B = ['SQL', 'Swift', 'Power BI', 'Tableau', 'Flask', 'Kafka', 'Computer Vision', 'Jupyter', 'REST APIs', 'Matplotlib', 'Seaborn', 'Agile', 'Git', 'TypeScript', 'SQLite'];

  function makeTrack(items) {
    const all = [...items, ...items]; // double for seamless loop
    const track = document.createElement('div');
    track.className = 'ticker-track';
    track.innerHTML = all.map(s => `<span class="ticker-item">${s}</span>`).join('');
    return track;
  }

  const wrap = document.createElement('div');
  wrap.className = 'skills-ticker-wrap';

  const rowA = document.createElement('div');
  rowA.className = 'skills-ticker-row ticker-row-a';
  rowA.appendChild(makeTrack(ROW_A));

  const rowB = document.createElement('div');
  rowB.className = 'skills-ticker-row ticker-row-b';
  rowB.appendChild(makeTrack(ROW_B));

  wrap.appendChild(rowA);
  wrap.appendChild(rowB);

  const container = document.querySelector('#skills .container');
  const proficiency = container ? container.querySelector('.proficiency') : null;
  if (proficiency) container.insertBefore(wrap, proficiency);
  else if (container) container.appendChild(wrap);
})();

/* ══════════════════════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════════════════════ */
(function () {
  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('send-btn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const span = btn.querySelector('span');
    span.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      span.textContent = 'Message Sent';
      btn.style.background = 'linear-gradient(135deg, #0B3318, #1B6B3A)';
      btn.style.border = '1px solid #2A9450';
      form.reset();
      setTimeout(() => {
        span.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.border = '';
      }, 3500);
    }, 1600);
  });
})();

/* ══════════════════════════════════════════════════════
   THREE.JS — BACKGROUND: NEURAL NETWORK
   ══════════════════════════════════════════════════════ */
(function initBg() {
  if (typeof THREE === 'undefined') return;

  const canvas   = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500);
  camera.position.z = 8;

  // ── Nodes ─────────────────────────────────────────────
  const NODE_COUNT = 80;
  const nodePositions = [];

  const nodeGeo = new THREE.SphereGeometry(0.045, 6, 6);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x2A9450 });

  for (let i = 0; i < NODE_COUNT; i++) {
    const m = new THREE.Mesh(nodeGeo.clone(), nodeMat.clone());
    const x = (Math.random() - 0.5) * 36;
    const y = (Math.random() - 0.5) * 22;
    const z = (Math.random() - 0.5) * 18;
    m.position.set(x, y, z);
    scene.add(m);
    nodePositions.push(m.position);
  }

  // ── Connections ────────────────────────────────────────
  const lineVerts = [];
  const lineAlphas = [];
  const CONNECT_DIST = 6.5;

  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const d = nodePositions[i].distanceTo(nodePositions[j]);
      if (d < CONNECT_DIST) {
        lineVerts.push(
          nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
          nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
        );
        const alpha = Math.max(0, (CONNECT_DIST - d) / CONNECT_DIST) * 0.18;
        lineAlphas.push(alpha);
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xC9A227,
    transparent: true,
    opacity: 0.1,
  });
  const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineSegs);

  // ── Mouse parallax ─────────────────────────────────────
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / innerWidth  - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  let t = 0;
  function loop() {
    t += 0.004;
    camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-my * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Subtle pulse on line opacity
    lineMat.opacity = 0.07 + Math.sin(t * 0.6) * 0.04;

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

/* ══════════════════════════════════════════════════════
   THREE.JS — HERO: DNA DOUBLE HELIX
   ══════════════════════════════════════════════════════ */
(function initHelix() {
  if (typeof THREE === 'undefined') return;
  const mount = document.getElementById('hero-3d-mount');
  if (!mount) return;

  const W = mount.clientWidth  || 520;
  const H = mount.clientHeight || 580;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setAnimationLoop(animate);
  mount.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0.8, 0.4, 7);
  camera.lookAt(0, 0, 0);

  // ── DNA Helix geometry ─────────────────────────────────
  const TURNS   = 3.8;
  const RADIUS  = 1.4;
  const HEIGHT  = 7.5;
  const SEGS    = 260;
  const NODE_STEP = 22;  // sphere at every Nth point

  const pts1 = [], pts2 = [];
  for (let i = 0; i <= SEGS; i++) {
    const frac  = i / SEGS;
    const angle = frac * TURNS * Math.PI * 2;
    const y     = (frac - 0.5) * HEIGHT;
    pts1.push(new THREE.Vector3(RADIUS * Math.cos(angle), y, RADIUS * Math.sin(angle)));
    pts2.push(new THREE.Vector3(-RADIUS * Math.cos(angle), y, -RADIUS * Math.sin(angle)));
  }

  const curve1 = new THREE.CatmullRomCurve3(pts1);
  const curve2 = new THREE.CatmullRomCurve3(pts2);

  // Strand materials
  const matS1 = new THREE.MeshPhysicalMaterial({
    color: 0x2A9450, emissive: 0x0D3318, emissiveIntensity: 0.55,
    roughness: 0.12, metalness: 0.75,
  });
  const matS2 = new THREE.MeshPhysicalMaterial({
    color: 0x8C7A3A, emissive: 0x4A3D18, emissiveIntensity: 0.45,
    roughness: 0.2, metalness: 0.65,
  });

  const strand1 = new THREE.Mesh(new THREE.TubeGeometry(curve1, 260, 0.028, 8, false), matS1);
  const strand2 = new THREE.Mesh(new THREE.TubeGeometry(curve2, 260, 0.028, 8, false), matS2);
  scene.add(strand1, strand2);

  // Node spheres + rungs
  const helixGroup = new THREE.Group();
  scene.add(helixGroup);
  helixGroup.add(strand1, strand2);

  const nodeGeoA = new THREE.SphereGeometry(0.065, 10, 10);
  const nodeGeoB = new THREE.SphereGeometry(0.065, 10, 10);
  const nodeMatA = new THREE.MeshPhysicalMaterial({ color: 0x3ECF72, emissive: 0x2A9450, emissiveIntensity: 0.9, roughness: 0.08, metalness: 0.5 });
  const nodeMatB = new THREE.MeshPhysicalMaterial({ color: 0xA8944A, emissive: 0x6B5A28, emissiveIntensity: 0.7, roughness: 0.15, metalness: 0.5 });
  const rungMat  = new THREE.LineBasicMaterial({ color: 0x4E6857, transparent: true, opacity: 0.45 });

  for (let i = 0; i <= SEGS; i += NODE_STEP) {
    const frac  = i / SEGS;
    const angle = frac * TURNS * Math.PI * 2;
    const y     = (frac - 0.5) * HEIGHT;

    const p1 = new THREE.Vector3( RADIUS * Math.cos(angle), y,  RADIUS * Math.sin(angle));
    const p2 = new THREE.Vector3(-RADIUS * Math.cos(angle), y, -RADIUS * Math.sin(angle));

    const sA = new THREE.Mesh(nodeGeoA, nodeMatA);
    const sB = new THREE.Mesh(nodeGeoB, nodeMatB);
    sA.position.copy(p1);
    sB.position.copy(p2);
    helixGroup.add(sA, sB);

    const rungGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
    helixGroup.add(new THREE.Line(rungGeo, rungMat));
  }

  // ── Lights ─────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x051A0A, 1.2));

  const light1 = new THREE.PointLight(0x2A9450, 8, 18);
  light1.position.set(3, 4, 4);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x8C7A3A, 5, 16);
  light2.position.set(-3, -3, 3);
  scene.add(light2);

  const light3 = new THREE.DirectionalLight(0xffffff, 0.3);
  light3.position.set(0, 6, 4);
  scene.add(light3);

  // ── Mouse interaction ──────────────────────────────────
  let hx = 0, hy = 0;
  document.addEventListener('mousemove', e => {
    hx = (e.clientX / innerWidth  - 0.5) * 2;
    hy = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  let t = 0;
  function animate() {
    t += 0.006;

    helixGroup.rotation.y = t * 0.35 + hx * 0.15;
    helixGroup.rotation.x = hy * 0.06;

    // Pulse emissive
    const pulse = 0.45 + Math.sin(t * 1.2) * 0.15;
    matS1.emissiveIntensity = pulse;
    matS2.emissiveIntensity = pulse;
    nodeMatA.emissiveIntensity = 0.75 + Math.sin(t * 1.8) * 0.2;
    nodeMatB.emissiveIntensity = 0.75 + Math.sin(t * 1.4 + 1) * 0.2;

    // Orbit lights
    light1.position.x = Math.sin(t * 0.5) * 4;
    light1.position.z = Math.cos(t * 0.5) * 4;
    light2.position.x = Math.cos(t * 0.4) * 4;
    light2.position.y = Math.sin(t * 0.4) * 3;

    renderer.render(scene, camera);
  }

  const ro = new ResizeObserver(() => {
    const nw = mount.clientWidth, nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });
  ro.observe(mount);
})();

/* ══════════════════════════════════════════════════════
   THREE.JS — ABOUT: PARTICLE DATA SPHERE
   ══════════════════════════════════════════════════════ */
(function initAboutSphere() {
  if (typeof THREE === 'undefined') return;
  const mount = document.getElementById('about-3d');
  if (!mount) return;

  const W = mount.clientWidth  || 360;
  const H = mount.clientHeight || 480;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setAnimationLoop(animate);
  mount.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
  camera.position.z = 5.5;

  // ── Fibonacci sphere ───────────────────────────────────
  const PCOUNT = 2400;
  const pos    = new Float32Array(PCOUNT * 3);
  const col    = new Float32Array(PCOUNT * 3);
  const PHI    = Math.PI * (3 - Math.sqrt(5));
  const R      = 2.0;

  for (let i = 0; i < PCOUNT; i++) {
    const lat = Math.acos(1 - 2 * i / PCOUNT);
    const lon = PHI * i;
    const x   = R * Math.sin(lat) * Math.cos(lon);
    const y   = R * Math.cos(lat);
    const z   = R * Math.sin(lat) * Math.sin(lon);

    pos[i * 3]     = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;

    // Colour gradient: emerald at top, gold at equator
    const lat01 = i / PCOUNT;
    if (lat01 < 0.33) {
      col[i*3]=0.1; col[i*3+1]=0.55; col[i*3+2]=0.25;   // emerald
    } else if (lat01 < 0.66) {
      col[i*3]=0.35; col[i*3+1]=0.30; col[i*3+2]=0.12;  // muted bronze
    } else {
      col[i*3]=0.12; col[i*3+1]=0.42; col[i*3+2]=0.2;   // mid-green
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const sphere = new THREE.Points(geo, mat);
  scene.add(sphere);

  // Inner wireframe icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(1.3, 2);
  const icoMat = new THREE.MeshBasicMaterial({ color: 0x1B6B3A, wireframe: true, transparent: true, opacity: 0.06 });
  const ico    = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  // ── Lights ─────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x051A0A, 0.5));
  const p1 = new THREE.PointLight(0x2A9450, 4, 12); p1.position.set(3, 3, 3); scene.add(p1);
  const p2 = new THREE.PointLight(0xC9A227, 3, 10); p2.position.set(-3, -2, 2); scene.add(p2);

  let t = 0;
  function animate() {
    t += 0.006;
    sphere.rotation.y = t * 0.22;
    sphere.rotation.x = t * 0.08;
    ico.rotation.y    = -t * 0.15;
    ico.rotation.x    = t * 0.05;
    p1.position.x     = Math.sin(t * 0.5) * 3.5;
    p2.position.x     = Math.cos(t * 0.4) * 3.5;
    renderer.render(scene, camera);
  }

  const ro = new ResizeObserver(() => {
    const nw = mount.clientWidth, nh = mount.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });
  ro.observe(mount);
})();
