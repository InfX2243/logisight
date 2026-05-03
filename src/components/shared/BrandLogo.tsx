import Image from "next/image";

type Variant = "hero" | "auth" | "nav" | "navCollapsed";

const styles: Record<Variant, string> = {
  hero: "h-14 w-56",
  auth: "h-12 w-44",
  nav: "h-10 w-36",
  navCollapsed: "h-9 w-9",
};

export default function BrandLogo({ variant = "nav", priority = false }: { variant?: Variant; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${styles[variant]}`}>
      <Image
        src="/logo-cropped.png"
        alt="LogiSight"
        fill
        priority={priority}
        className={
          variant === "navCollapsed"
            ? "object-contain"
            : "object-contain"
        }
      />
    </div>
  );
}
