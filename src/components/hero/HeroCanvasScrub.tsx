/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvasScrub() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const poster = posterRef.current;
    const hero = document.getElementById("hero");
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const HERO = {
      FLY_END: 0.76,
      TAU: 0.34,
      EAGER: 18,
    };

    const manifestUrl = "/assets/hero/manifest.33b7384c.json";
    let isCancelled = false;
    let animId: number;

    fetch(manifestUrl, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error("Manifest not loaded");
        return r.json();
      })
      .then((man) => {
        if (isCancelled || !man || !man.count) return;
        run(man);
      })
      .catch((err) => {
        console.warn("Hero 3D manifest notice:", err);
      });

    function run(man: { count: number; pos?: number[]; v?: string }) {
      const dir = "/assets/hero/";
      const n = man.count;
      const pos = man.pos || [];
      const imgs: (HTMLImageElement | null)[] = new Array(n).fill(null);
      const ready: boolean[] = new Array(n).fill(false);
      const loading: boolean[] = new Array(n).fill(false);

      let current = 0;
      let target = 0;
      let shown = -1;
      let last = 0;
      let paused = false;
      let handed = false;

      function load(i: number) {
        if (i < 0 || i >= n || loading[i]) return;
        loading[i] = true;
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
          im.decode()
            .then(ok, ok)
            .catch(ok);
        };
        function ok() {
          imgs[i] = im;
          ready[i] = true;
          if (shown < 0) draw(0);
        }
        im.src = dir + String(i).padStart(4, "0") + ".webp" + (man.v ? "?v=" + man.v : "");
      }

      // Load initial eager frames
      for (let i = 0; i < Math.min(HERO.EAGER, n); i++) {
        load(i);
      }

      // Background loading pump
      let next = HERO.EAGER;
      function pump() {
        if (paused || isCancelled) return;
        let budget = 3;
        while (budget-- > 0 && next < n) {
          load(next++);
        }
        if (next < n) setTimeout(pump, 90);
      }
      setTimeout(pump, 320);

      function posToIndex(p: number) {
        if (!pos.length) return p * (n - 1);
        let lo = 0;
        let hi = pos.length - 1;
        while (lo < hi - 1) {
          const m = (lo + hi) >> 1;
          if (pos[m] <= p) lo = m;
          else hi = m;
        }
        const span = pos[hi] - pos[lo];
        return span > 0 ? lo + (p - pos[lo]) / span : lo;
      }

      function fit() {
        if (!canvas || !ctx) return;
        const r = canvas.getBoundingClientRect();
        const dpr = Math.max(window.devicePixelRatio || 1, 1.5);
        const rw = r.width || window.innerWidth || 1920;
        const rh = r.height || window.innerHeight || 1080;
        const w = Math.max(2560, Math.round(rw * dpr));
        const h = Math.max(1440, Math.round(rh * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      function draw(idx: number) {
        if (!canvas || !ctx) return;
        const i = Math.max(0, Math.min(n - 1, Math.round(idx)));
        let im = ready[i] ? imgs[i] : null;
        if (!im) {
          for (let k = i; k >= 0; k--) {
            if (ready[k]) {
              im = imgs[k];
              break;
            }
          }
        }
        if (!im) return;

        fit();
        const cw = canvas.width;
        const ch = canvas.height;
        const s = Math.max(cw / im.width, ch / im.height); // cover
        const dw = im.width * s;
        const dh = im.height * s;
        ctx.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        shown = i;

        if (canvas.style.opacity !== "1") {
          canvas.style.opacity = "1";
          canvas.style.transition = "opacity .5s ease";
          if (poster) poster.style.opacity = "0";
        }
      }

      // Idle yoyo animation before user scrolls
      let yoyoI = 0;
      let yoyoDir = 1;
      let yoyoT = 0;

      function tick(now: number) {
        if (isCancelled) return;
        const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
        last = now;

        if (!handed) {
          yoyoT += dt;
          if (yoyoT > 0.075) {
            yoyoT = 0;
            yoyoI += yoyoDir;
            const lim = Math.min(n - 1, HERO.EAGER - 1);
            if (yoyoI >= lim) {
              yoyoI = lim;
              yoyoDir = -1;
            }
            if (yoyoI <= 0) {
              yoyoI = 0;
              yoyoDir = 1;
            }
            draw(yoyoI);
          }
        } else {
          current += (target - current) * (1 - Math.exp(-dt / HERO.TAU));
          if (Math.abs(current - shown) > 0.0006) {
            draw(current);
          }
        }
        animId = requestAnimationFrame(tick);
      }
      animId = requestAnimationFrame(tick);

      function onScroll() {
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        const total = hero.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, (-r.top) / total / HERO.FLY_END));

        if (!handed && -r.top > 2) {
          handed = true;
          current = yoyoI;
          const hint = document.getElementById("heroHint");
          if (hint) hint.style.opacity = "0";
        }

        target = posToIndex(p);

        const off = r.bottom < -200;
        if (off !== paused) {
          paused = off;
          if (!paused) pump();
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener(
        "resize",
        () => {
          fit();
          draw(current);
        },
        { passive: true }
      );
      onScroll();
    }

    return () => {
      isCancelled = true;
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <img
        ref={posterRef}
        className="hero__poster"
        id="heroPoster"
        src="/assets/hero/poster.jpg"
        alt="A two-level villa of dark timber and glass on the shore of a mirror-still lake in a pine forest at sunset"
        fetchPriority="high"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        id="heroCanvas"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
}

