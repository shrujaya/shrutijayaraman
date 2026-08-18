import { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
  !window.matchMedia || window.matchMedia('(pointer: fine)').matches;

/** Cards lift toward the cursor on hover. */
export function useTilt() {
  useEffect(() => {
    if (prefersReduced() || !finePointer()) return undefined;
    const cleanups = Array.from(document.querySelectorAll('.tilt')).map((card) => {
      const apply = (px, py) => {
        const ry = -px * 13;
        const rx = py * 11;
        card.style.transform = `perspective(1000px) translateZ(14px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      };
      const at = (e) => {
        const r = card.getBoundingClientRect();
        apply((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      };
      const leave = () => { card.style.transform = ''; };
      card.addEventListener('pointerenter', at);
      card.addEventListener('pointermove', at);
      card.addEventListener('pointerleave', leave);
      return () => {
        card.removeEventListener('pointerenter', at);
        card.removeEventListener('pointermove', at);
        card.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

/** Blobs that trail the cursor with staggered easing. */
export function useCursorGlow() {
  useEffect(() => {
    const el = document.getElementById('cursor-glow');
    if (!el || prefersReduced() || !finePointer()) return undefined;

    const blobs = Array.from(el.querySelectorAll('.glow-blob')).map((node, i) => ({
      node,
      ease: [0.085, 0.055, 0.032, 0.018][i] || 0.03,
      wob: [16, 26, 38, 20][i] || 20,
      speed: [0.00042, 0.00031, 0.00023, 0.00017][i] || 0.0003,
      phase: i * 1.9,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let raf = null;
    let idle = 0;

    const tick = (t) => {
      let moving = false;
      blobs.forEach((b) => {
        b.x += (tx - b.x) * b.ease;
        b.y += (ty - b.y) * b.ease;
        const dx = Math.sin(t * b.speed + b.phase) * b.wob;
        const dy = Math.cos(t * b.speed * 1.37 + b.phase * 1.4) * b.wob;
        b.node.style.translate = `${(b.x + dx).toFixed(1)}px ${(b.y + dy).toFixed(1)}px`;
        if (Math.abs(tx - b.x) > 0.4 || Math.abs(ty - b.y) > 0.4) moving = true;
      });
      idle = moving ? 0 : idle + 1;
      raf = idle < 90 ? requestAnimationFrame(tick) : null;
    };

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY; idle = 0;
      el.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { el.style.opacity = '0'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/**
 * Panels slide in from alternating sides as they enter the viewport, and slide
 * back out the same side when they leave it — so scrolling up rewinds the
 * entrance instead of snapping the panel away.
 */
export function useReveal() {
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll('main section'));
    if (prefersReduced() || !('IntersectionObserver' in window)) return undefined;

    const ease = 'cubic-bezier(.19,.72,.28,1)';
    const resting = new WeakMap();

    panels.forEach((el, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      resting.set(el, `translateX(${dir * 62}px)`);
      el.style.opacity = '0';
      el.style.transform = resting.get(el);
      el.style.transition = `opacity 720ms ${ease}, transform 860ms ${ease}, background 220ms ease`;
      el.style.willChange = 'opacity, transform';
    });

    // No unobserve: each panel keeps reacting every time it crosses the edge.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        } else {
          el.style.opacity = '0';
          el.style.transform = resting.get(el);
        }
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -14% 0px' });

    panels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Tracks the section under the header and drives the progress bar. */
export function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);
  const raf = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const line = window.scrollY + 140;
        let current = sectionIds[0];
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = id;
        });
        setActive(current);

        const bar = document.getElementById('scroll-progress');
        if (bar) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [sectionIds]);

  return active;
}

/** Scrambles the résumé button's label between two strings. */
export function useGlitchLabel(idleText) {
  const ref = useRef(null);
  const raf = useRef(null);

  const glitchTo = (target) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    const noise = '·:-—/|()<>+×';
    const from = el.textContent;
    const len = Math.max(from.length, target.length);
    const dur = 440;
    const start = performance.now();
    const ease = (t) => 1 - (1 - t) ** 3;
    const frame = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const settled = ease(t) * len;
      let out = '';
      for (let i = 0; i < len; i += 1) {
        if (i + 0.6 < settled) out += target[i] || '';
        else if (i - 1.5 > settled) out += from[i] || '';
        else out += noise[Math.floor(Math.random() * noise.length)];
      }
      el.textContent = out;
      if (t < 1) {
        raf.current = requestAnimationFrame(frame);
      } else {
        raf.current = null;
        el.textContent = target;
      }
    };
    raf.current = requestAnimationFrame(frame);
  };

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  return { ref, glitchTo, reset: () => glitchTo(idleText) };
}
