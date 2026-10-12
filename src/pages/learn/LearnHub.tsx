import { PageHeader } from "../../components/PageHeader";
import { Reveal } from "../../components/ui/Reveal";
import { SmartLink } from "../../components/ui/SmartLink";
import { BlurImg } from "../../components/ui/BlurImg";
import { RelatedLinks } from "../../components/content/Blocks";
import { formatDate, learnPage, videosByDate } from "../../content/videos";
import { ChannelCard, thumbFor } from "../../components/content/VideoBits";
import { placeholderFor } from "../../lib/placeholder";

export default function LearnHub() {
  const list = videosByDate();
  return (
    <>
      <PageHeader badge={learnPage.badge} title={learnPage.h1} kicker={learnPage.kicker} sub={learnPage.sub} />
      <div className="container-x pb-16 md:pb-24">
        <ul className="grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <Reveal as="li" key={v.id} delay={(i % 3) * 0.06}>
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
                <h2 className="mt-5 font-heading text-xl font-semibold leading-snug tracking-tight">
                  <SmartLink href={`/learn/${v.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent">
                    {v.title}
                  </SmartLink>
                </h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.hook}</p>
                <p className="mt-3 text-xs text-muted">
                  <time dateTime={v.published}>{formatDate(v.published)}</time> · In Hindi
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
        <div className="mt-14">
          <ChannelCard />
        </div>
      </div>
      <RelatedLinks
        links={[
          { href: "/tools", label: "Free music marketing tools", note: "Put the lessons into numbers for your own song." },
          { href: "/services", label: "Our music promotion services", note: "Want us to run it for you?" },
          { href: "/work", label: "See our campaign results", note: "The case study and receipts behind the videos." },
        ]}
      />
    </>
  );
}
