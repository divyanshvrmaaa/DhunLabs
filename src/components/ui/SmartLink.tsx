import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../../lib/scroll";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Internal route ("/planner", "/#work") or external URL / mailto. */
  href: string;
  children: ReactNode;
}

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * One link component for everything:
 * - external links open in a new tab with rel="noopener"
 * - "/#section" links scroll smoothly on the home page, or navigate home first
 * - other internal links use the router (no page reload)
 */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink({ href, children, onClick, ...rest }, ref) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isExternal(href)) {
    const newTab = !href.startsWith("mailto:") && !href.startsWith("tel:");
    return (
      <a ref={ref} href={href} {...(newTab ? { target: "_blank", rel: "noopener" } : {})} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const hashIndex = href.indexOf("#");
  if (hashIndex !== -1) {
    const path = href.slice(0, hashIndex) || "/";
    const id = href.slice(hashIndex + 1);
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (location.pathname === path) {
        scrollToId(id);
        history.replaceState(null, "", `#${id}`);
      } else {
        navigate(`${path}#${id}`);
      }
    };
    return (
      <a ref={ref} href={href} onClick={handle} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
});
