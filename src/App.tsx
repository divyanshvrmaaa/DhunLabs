import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Seo } from "./components/ui/Seo";
import { scrollToId, scrollToTop, setLenis } from "./lib/scroll";
import Home from "./pages/Home";

// Everything except the home page loads only when visited (keeps the first load fast).
const Playlists = lazy(() => import("./pages/Playlists"));
const Planner = lazy(() => import("./pages/Planner"));
const Estimator = lazy(() => import("./pages/Estimator"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const ReleaseRoadmap = lazy(() => import("./pages/tools/ReleaseRoadmap"));
const PlaylistReadiness = lazy(() => import("./pages/tools/PlaylistReadiness"));
const CostPerStream = lazy(() => import("./pages/tools/CostPerStream"));
const PitchWriter = lazy(() => import("./pages/tools/PitchWriter"));
const RevenueCalculator = lazy(() => import("./pages/tools/RevenueCalculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}

/** On page change: jump to the #section if there is one, otherwise to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame (or a few) for the section to exist
      let tries = 0;
      const attempt = () => {
        if (scrollToId(id, true) || tries++ > 20) return;
        requestAnimationFrame(attempt);
      };
      requestAnimationFrame(attempt);
      // Correct once more after fonts/images settle
      const t = window.setTimeout(() => scrollToId(id, true), 450);
      return () => window.clearTimeout(t);
    } else {
      scrollToTop();
    }
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo path={pathname.replace(/\/$/, "") || "/"} />
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[100dvh]" aria-hidden />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

/** All routes. Shared by the browser app and the build-time pre-renderer. */
export function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="planner" element={<Planner />} />
            <Route path="estimator" element={<Estimator />} />
            <Route path="tools" element={<ToolsHub />} />
            <Route path="tools/release-roadmap" element={<ReleaseRoadmap />} />
            <Route path="tools/playlist-readiness" element={<PlaylistReadiness />} />
            <Route path="tools/cost-per-stream" element={<CostPerStream />} />
            <Route path="tools/pitch-writer" element={<PitchWriter />} />
            <Route path="tools/revenue-calculator" element={<RevenueCalculator />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </MotionConfig>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
    </>
  );
}
