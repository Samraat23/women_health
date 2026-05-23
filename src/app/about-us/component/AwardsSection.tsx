import { AnimBox} from "../../../../utils/AnimBox";

function AwardsSection({awards}:any) {
    return (
      <section style={{ background: "#f7f4ee", padding: "5rem 0" }}>
        <div className="container mx-auto px-6">
          <AnimBox>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "var(--primary-text)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>Recognition</p>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "var(--primary-text-color)", margin: 0 }}>Awards &amp; Achievements</h2>
            </div>
          </AnimBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {awards.map((a:any, i:number) => (
              <AnimBox key={i} delay={i * 0.12}>
                <div style={{ background: "#fff", borderRadius: "20px", padding: "2.5rem 2rem", boxShadow: "0 8px 32px rgba(27,20,99,0.08)", border: "1px solid rgba(90,79,254,0.06)", height: "100%" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "20px", background: "linear-gradient(135deg,rgba(90,79,254,0.1),rgba(90,79,254,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", marginBottom: "1.2rem", border: "1px solid rgba(90,79,254,0.12)" }}>{a.icon}</div>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "var(--primary-text-color)", fontSize: "1rem", marginBottom: "0.75rem" }}>{a.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: 1.7, margin: 0 }}>{a.body}</p>
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
      </section>
    );
  }

  export default AwardsSection