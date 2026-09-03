export function About() {
  return (
    <section className="px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          About Codebridge
        </p>
        <h2 className="mt-6 text-3xl leading-[1.25] font-medium text-balance sm:text-4xl lg:text-5xl">
          <span className="text-muted-foreground">
            At Codebridge, we don&apos;t just execute briefs —{" "}
          </span>
          <span className="text-foreground">
            we embed with your team, sweat the details, and ship work that
            actually moves the needle.
          </span>
        </h2>
      </div>
    </section>
  );
}
