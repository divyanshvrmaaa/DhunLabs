import { Routes, Route, Outlet } from "react-router-dom";

import { Navbar } from "./components/ui/Navbar";
import { Footer } from "./components/sections/Footer";
import { ScrollToTop } from "./hooks/ScrollToTop";

import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { CaseStudies } from "./components/sections/CaseStudies";
import { Network } from "./components/sections/Network";
import { Learn } from "./components/sections/Learn";
import { Contact } from "./components/sections/Contact";
import { Playlists } from "./components/sections/Playlists";
import { About } from "./components/sections/About";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <Network />
      <Learn />
      <About />
      <Contact />
    </>
  );
}

// Shared shell so every route — Home, Playlists, About — gets a Navbar
// and Footer, and scroll position resets on navigation.
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
