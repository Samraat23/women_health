"use client";

import { useRef, useEffect, useState } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, visible] as const;
}


interface AnimBoxProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}

export function AnimBox({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: AnimBoxProps) {
  const [ref, vis] = useInView();

  const transforms = {
    bottom: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : transforms[from],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}


