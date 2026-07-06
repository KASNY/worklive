type BrandLogoProps = {
  variant: "light" | "dark";
  withBackground?: boolean;
  size?: number;
  showWordmark?: boolean;
};

export function BrandLogo({
  variant,
  withBackground = false,
  size = 36,
  showWordmark = true,
}: BrandLogoProps) {
  const source = `/brand/icon-${variant}${withBackground ? "" : "-no-bg"}.svg`;
  const isDark = variant === "dark";

  return (
    <span className="inline-flex items-center gap-3">
      <img
        src={source}
        width={size}
        height={size}
        alt={showWordmark ? "" : "WorkLive"}
        aria-hidden={showWordmark || undefined}
        className="block shrink-0"
      />
      {showWordmark && (
        <span className="text-[17px] font-bold tracking-[-0.04em]" aria-label="WorkLive">
          <span style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}>Work</span>
          <span style={{ color: "#2563EB" }}>Live</span>
        </span>
      )}
    </span>
  );
}
