import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/ui/Reveal";
import { ToolCardLink } from "../components/ToolCardLink";
import { toolsHub } from "../content/tools";

export default function ToolsHub() {
  return (
    <>
      <PageHeader badge={toolsHub.badge} title={toolsHub.title} sub={toolsHub.sub} />
      <div className="container-x pb-24 md:pb-36">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {toolsHub.cards.map((t, i) => (
            <Reveal as="li" key={t.href} delay={(i % 3) * 0.06} className={t.wide ? "lg:col-span-2" : ""}>
              <ToolCardLink t={t} featured={i < 2} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
