"use client";

import { AnimBox, useInView } from "../../../../utils/AnimBox";

interface StatsItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatsItem[];
}

function StatsBar({ stats }: StatsBarProps) {
  const [ref] = useInView();

  return (
    <section
      ref={ref}
      style={{
        background: "#f7f4ee",
        paddingTop: "3rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <AnimBox key={i} delay={i * 0.12}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(90,79,254,0.08)",
                  border: "1px solid rgba(90,79,254,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "var(--primary-text-color)",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    margin: "8px 0 0",
                  }}
                >
                  {s.label}
                </p>
              </div>
            </AnimBox>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;