import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-28 pb-20">
      <p className="eyebrow">Error 404</p>
      <h1 className="h-display mt-5 text-[clamp(3rem,10vw,8rem)]">
        This track <span className="text-accent">skipped.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" size="lg" arrow>
          Back to home
        </Button>
        <Button href="/tools" variant="secondary" size="lg">
          Free tools
        </Button>
      </div>
    </section>
  );
}
