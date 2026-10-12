import { useLocation } from "react-router-dom";
import { seoFor } from "../content/seo";
import { SmartLink } from "./ui/SmartLink";

/** "Home / Tools / Campaign Planner". The trail comes from src/content/seo.ts (same data as Google's BreadcrumbList). */
export function Breadcrumbs({ className = "" }: { className?: string }) {
  const { pathname } = useLocation();
  const trail = seoFor(pathname.replace(/\/$/, "") || "/").crumbs;
  if (!trail || trail.length === 0) return null;
  const items = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex min-w-0 items-center gap-2">
              {last ? (
                <span aria-current="page" className="max-w-[16rem] truncate text-ink/80 sm:max-w-none">
                  {c.name}
                </span>
              ) : (
                <>
                  <SmartLink href={c.path} className="inline-flex min-h-8 items-center hover:text-ink">
                    {c.name}
                  </SmartLink>
                  <span aria-hidden className="text-dim">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
