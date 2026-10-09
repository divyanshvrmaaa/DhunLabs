import { useEffect, useRef } from "react";

/**
 * The hero's signature visual: a mirrored equalizer that breathes on its own,
 * swells near the cursor and kicks with scroll speed.
 * Capped at 30fps, paused when off-screen or in a background tab,
 * and drawn as a single still frame for reduced-motion users.
 */
export function Waveform({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let bars = 0;
    let gradient: CanvasGradient | null = null;

    const pointer = { x: -1, target: -1, strength: 0 };
    let scrollEnergy = 0;
    let lastScrollY = window.scrollY;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = width < 640 ? 7 : 9;
      bars = Math.max(24, Math.floor(width / gap));
      gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(29,185,84,0.05)");
      gradient.addColorStop(0.22, "rgba(29,185,84,0.85)");
      gradient.addColorStop(0.55, "rgba(52,211,120,0.95)");
      gradient.addColorStop(0.8, "rgba(76,141,255,0.85)");
      gradient.addColorStop(1, "rgba(76,141,255,0.05)");
    };

    // Smooth pseudo-noise from layered sines (cheap and stable)
    const noise = (i: number, t: number) =>
      0.5 * Math.sin(i * 0.21 + t * 1.3) +
      0.3 * Math.sin(i * 0.07 - t * 0.8 + 1.7) +
      0.2 * Math.sin(i * 0.53 + t * 2.1 + 0.4);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!gradient) return;
      const mid = height / 2;
      const step = width / bars;
      const barW = Math.max(2, step * 0.42);
      const radius = barW / 2;
      pointer.x += (pointer.target - pointer.x) * 0.12;

      ctx.fillStyle = gradient;
      for (let i = 0; i < bars; i++) {
        const x = i * step + (step - barW) / 2;
        const u = i / (bars - 1);
        // Taper at the edges like a waveform envelope
        const envelope = Math.sin(Math.PI * u) ** 0.8;
        let amp = (0.16 + 0.62 * (0.5 + 0.5 * noise(i, t))) * envelope;
        // Cursor swell
        if (pointer.x >= 0) {
          const d = Math.abs(x - pointer.x) / (width * 0.12);
          amp += pointer.strength * 0.45 * Math.exp(-d * d);
        }
        // Scroll kick
        amp += scrollEnergy * 0.35 * envelope * (0.6 + 0.4 * Math.sin(i * 0.9 + t * 6));
        const h = Math.max(barW, Math.min(1, amp) * mid * 0.92);
        ctx.globalAlpha = 1;
        roundRect(ctx, x, mid - h, barW, h, radius);
        ctx.globalAlpha = 0.28; // reflection
        roundRect(ctx, x, mid + 3, barW, h * 0.75, radius);
      }
      ctx.globalAlpha = 1;
      scrollEnergy *= 0.92;
      pointer.strength *= pointer.target < 0 ? 0.94 : 1;
    };

    resize();
    if (reduce) {
      draw(1.2);
      const onResize = () => {
        resize();
        draw(1.2);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let running = false;
    let last = 0;
    const frameMs = 1000 / 30;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameMs) return;
      last = now;
      draw(now / 1000);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden || !onScreen ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 120) {
        pointer.target = -1;
        return;
      }
      pointer.target = e.clientX - rect.left;
      if (pointer.x < 0) pointer.x = pointer.target;
      pointer.strength = 1;
    };
    const onLeave = () => (pointer.target = -1);
    const onScroll = () => {
      const y = window.scrollY;
      scrollEnergy = Math.min(1, scrollEnergy + Math.abs(y - lastScrollY) / 400);
      lastScrollY = y;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}
