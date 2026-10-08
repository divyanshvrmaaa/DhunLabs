import { useState, type ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  wrapperClassName?: string;
}

/** Image with a blurred preview behind it until it loads. Width/height should be set to avoid layout shift. */
export function BlurImg({ placeholder, wrapperClassName = "", className = "", onLoad, loading = "lazy", ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={`relative block overflow-hidden ${wrapperClassName}`}
      style={placeholder ? { backgroundImage: `url(${placeholder})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <img
        {...rest}
        loading={loading}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`${className} transition-opacity duration-700 ease-[var(--ease-brand)] ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
