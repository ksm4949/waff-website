import React from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>({
    threshold: 0.2,
    once: false,
    rootMargin: "0px 0px 0% 0px",
  });

  return (
    <div
      ref={ref}
      className={["reveal", inView ? "is-visible" : "", className].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
