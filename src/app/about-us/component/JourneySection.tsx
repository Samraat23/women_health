 "use client"
 import { AnimBox } from "../../../../utils/AnimBox";
 
  function JourneySection({journey}:any) {
    return (
      <section style={{ background: "#f7f4ee", padding: "6rem 0" }}>
        <div className="container mx-auto px-6">
          <AnimBox>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--primary-text)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>Professional Journey</p>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "var(--primary-text-color)", margin: 0 }}>
                Two Decades of <span style={{ color: "var(--primary-color)" }}>Dedication</span>
              </h2>
            </div>
          </AnimBox>
  
          {/* Timeline */}
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            {/* center line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,var(--primary-color),var(--secondary-color))", transform: "translateX(-50%)" }} />
  
            {journey.map((item:any, i:number) => (
              <AnimBox key={i} delay={i * 0.12} from={item.side === "left" ? "left" : "right"}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "2rem",
                  marginBottom: "3rem",
                  alignItems: "center",
                }}>
                  {/* left content */}
                  {item.side === "left" ? (
                    <div style={{ background: "#fff", borderRadius: "20px", padding: "1.8rem", boxShadow: "0 8px 32px rgba(27,20,99,0.1)", border: "1px solid rgba(90,79,254,0.08)", borderLeft: `4px solid ${item.color}` }}>
                      <span style={{ color: item.color, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.period}</span>
                      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: "var(--primary-text-color)", fontSize: "1.1rem", margin: "6px 0 4px" }}>{item.role}</h3>
                      <p style={{ color: item.color, fontWeight: 600, fontSize: "0.85rem", margin: "0 0 10px" }}>@ {item.org}</p>
                      <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                    </div>
                  ) : <div />}
  
                  {/* dot */}
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.color, boxShadow: `0 0 0 6px rgba(90,79,254,0.12),0 0 0 12px rgba(90,79,254,0.06)`, zIndex: 2, flexShrink: 0, justifySelf: "center" }} />
  
                  {/* right content */}
                  {item.side === "right" ? (
                    <div style={{ background: "#fff", borderRadius: "20px", padding: "1.8rem", boxShadow: "0 8px 32px rgba(27,20,99,0.1)", border: "1px solid rgba(90,79,254,0.08)", borderRight: `4px solid ${item.color}` }}>
                      <span style={{ color: item.color, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.period}</span>
                      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: "var(--primary-text-color)", fontSize: "1.1rem", margin: "6px 0 4px" }}>{item.role}</h3>
                      <p style={{ color: item.color, fontWeight: 600, fontSize: "0.85rem", margin: "0 0 10px" }}>@ {item.org}</p>
                      <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                    </div>
                  ) : <div />}
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
      </section>
    );
  }

  export default JourneySection