import { learnIntro, videoHref, videosByDate } from "../../content/videos";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { BlurImg } from "../ui/BlurImg";
import { placeholderFor } from "../../lib/placeholder";
import { track } from "../../lib/analytics";
import { ChannelCard, thumbFor } from "../content/VideoBits";

/** Home page summary of /learn: the 4 newest videos, each linking to its own page. */
export function Learn() {
  const latest = videosByDate().slice(0, 4);
  return (
    <section id="learn" aria-labelledby="learn-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="learn-title" eyebrow={learnIntro.eyebrow} title={learnIntro.title} body={learnIntro.body} />
          <Reveal className="shrink-0">
            <SmartLink href="/learn" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-medium text-muted hover:text-ink">
              See all video lessons <span aria-hidden>→</span>
            </SmartLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-5 gap-y-10 md:mt-20 md:grid-cols-2">
          {latest.map((v, i) => (
            <Reveal key={v.id} delay={(i % 2) * 0.08}>
              <article className="group relative">
                <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line">
                  <BlurImg
                    src={thumbFor(v.id)}
                    placeholder={placeholderFor(`/thumbs/${v.id}.webp`)}
                    alt=""
                    width={640}
                    height={360}
                    wrapperClassName="aspect-video"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
                  />
                  <span className="num absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-1 text-xs font-medium">{v.duration}</span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                  <SmartLink href={videoHref(v)} onClick={() => track("video_click", { video: v.id })} className="after:absolute after:inset-0 after:content-['']">
                    {v.title}
                  </SmartLink>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.hook}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <ChannelCard />
        </Reveal>
      </div>
    </section>
  );
}
