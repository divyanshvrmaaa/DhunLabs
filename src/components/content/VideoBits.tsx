import { SmartLink } from "../ui/SmartLink";
import { channelCard } from "../../content/videos";
import { site } from "../../content/site";
import { placeholderFor } from "../../lib/placeholder";

/** Local thumbnail if we have one, otherwise YouTube's. */
export const thumbFor = (id: string) => (placeholderFor(`/thumbs/${id}.webp`) ? `/thumbs/${id}.webp` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);

export function ChannelCard() {
  return (
    <SmartLink
      href={site.youtube}
      className="group card flex flex-col gap-4 p-6 transition-colors duration-500 hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between md:p-8"
    >
      <span className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff0033] text-white" aria-hidden>
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
        <span>
          <span className="block font-heading text-xl font-semibold tracking-tight">{channelCard.handle}</span>
          <span className="block text-sm text-muted">{channelCard.line}</span>
        </span>
      </span>
      <span className="text-[0.95rem] font-medium text-gold">{channelCard.cta}</span>
    </SmartLink>
  );
}

