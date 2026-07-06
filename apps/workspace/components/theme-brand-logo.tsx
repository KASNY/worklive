import { BrandLogo } from "@worklive/ui";

type ThemeBrandLogoProps = {
  size?: number;
  showWordmark?: boolean;
  withBackground?: boolean;
};

export function ThemeBrandLogo(props: ThemeBrandLogoProps) {
  return (
    <>
      <span className="dark:hidden">
        <BrandLogo variant="light" {...props} />
      </span>
      <span className="hidden dark:inline-flex">
        <BrandLogo variant="dark" {...props} />
      </span>
    </>
  );
}
