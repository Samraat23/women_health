"use client";

import { AnimBox, useInView } from "../../../../utils/AnimBox";

export function ExpertiseSection({expertise}:any) {
    return (
      <section style={{ background: "linear-gradient(135deg,#1B1463,#31285a)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(90,79,254,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div className="container mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
          <AnimBox>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>Specialisations</p>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#fff", margin: 0 }}>Areas of Expertise</h2>
            </div>
          </AnimBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem" }}>
            {expertise.map((e:any, i:number) => (
              <AnimBox key={i} delay={i * 0.06}>
                <div style={{
                  background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
                  padding: "1.5rem 1rem", textAlign: "center", cursor: "default",
                  transition: "transform 0.25s, background 0.25s, border-color 0.25s",
                }}
                  onMouseEnter={el => { el.currentTarget.style.transform = "translateY(-6px)"; el.currentTarget.style.background = "rgba(90,79,254,0.3)"; el.currentTarget.style.borderColor = "rgba(90,79,254,0.5)"; }}
                  onMouseLeave={el => { el.currentTarget.style.transform = ""; el.currentTarget.style.background = "rgba(255,255,255,0.06)"; el.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>{e.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.82rem" }}>{e.label}</span>
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
      </section>
    );
  }