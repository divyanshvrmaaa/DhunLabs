import { channelCard, learnIntro, videoUrl, videos } from "../../content/videos";
import { site } from "../../content/site";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { SmartLink } from "../ui/SmartLink";
import { BlurImg } from "../ui/BlurImg";
import { placeholderFor } from "../../lib/placeholder";
import { track } from "../../lib/analytics";

export function Learn() {
  return (
    <section id="learn" aria-labelledby="learn-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHeader id="learn-title" eyebrow={learnIntro.eyebrow} title={learnIntro.title} body={learnIntro.body} />

        <div className="mt-14 grid gap-x-5 gap-y-10 md:mt-20 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 2) * 0.08}>
              <SmartLink href={videoUrl(v.id)} className="group block" onClick={() => track("video_click", { video: v.id })}>
                <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line">
                  <BlurImg
                    src={`/thumbs/${v.id}.webp`}
                    placeholder={placeholderFor(`/thumbs/${v.id}.webp`)}
                    alt=""
                    width={640}
                    height={360}
                    wrapperClassName="aspect-video"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                    Watch on YouTube ↗
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.hook}</p>
              </SmartLink>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <SmartLink
            href={site.youtube}
            className="group card flex flex-col gap-4 p-6 transition-colors duration-500 hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between md:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff0033] text-white" aria-hidden>
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p className="font-heading text-xl font-semibold tracking-tight">{channelCard.handle}</p>
                <p className="text-sm text-muted">{channelCard.line}</p>
              </div>
            </div>
            <span className="text-[0.95rem] font-medium text-gold">{channelCard.cta}</span>
          </SmartLink>
        </Reveal>
      </div>
    </section>
  );
}
