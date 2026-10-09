import { Hero } from "../components/home/Hero";
import { ProofStrip } from "../components/home/ProofStrip";
import { Pillars } from "../components/home/Pillars";
import { HowItWorks } from "../components/home/HowItWorks";
import { Work } from "../components/home/Work";
import { Network } from "../components/home/Network";
import { ToolsStrip } from "../components/home/ToolsStrip";
import { Learn } from "../components/home/Learn";
import { About } from "../components/home/About";
import { FinalCta } from "../components/home/FinalCta";
import { Faq } from "../components/home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Pillars />
      <HowItWorks />
      <Work />
      <Network />
      <ToolsStrip />
      <Learn />
      <About />
      <Faq />
      <FinalCta />
    </>
  );
}
