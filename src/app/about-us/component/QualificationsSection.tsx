import { AnimBox} from "../../../../utils/AnimBox";


function QualificationsSection({qualifications}:any) {
    return (
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container mx-auto px-6">
          <AnimBox>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "var(--primary-text)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>Education</p>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "var(--primary-text-color)", margin: 0 }}>Qualifications</h2>
            </div>
          </AnimBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", maxWidth: 800, margin: "0 auto" }}>
            {qualifications.map((q:any, i:number) => (
              <AnimBox key={i} delay={i * 0.1}>
                <div style={{ background: "linear-gradient(135deg,#1B1463,#31285a)", borderRadius: "20px", padding: "2.5rem 2rem", textAlign: "center", boxShadow: "0 12px 40px rgba(27,20,99,0.2)" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", fontSize: "1.8rem" }}>🎓</div>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{q.degree}</p>
                  <p style={{ color: "#a78bfa", fontWeight: 600, fontSize: "0.85rem", margin: "0 0 6px" }}>{q.institute}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{q.year}</p>
                </div>
              </AnimBox>
            ))}
          </div>
        </div>
      </section>
    );
  }

  export default QualificationsSection