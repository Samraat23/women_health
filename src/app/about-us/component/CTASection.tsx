import { AnimBox } from "../../../../utils/AnimBox";

function CTASection() {
    return (
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container mx-auto px-6">
          <AnimBox>
            <div style={{ background: "linear-gradient(135deg,#1B1463,#31285a,#5a4ffe)", borderRadius: "28px", padding: "4rem 3rem", textAlign: "center", boxShadow: "0 20px 60px rgba(27,20,99,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(90,79,254,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>💬</span>
                <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem" }}>
                  Ready to Take the First Step?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7 }}>
                  Consult Dr. Kusum Lata for expert, compassionate gynecological care. Book your appointment today.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://wa.me/919289140812" target="_blank" rel="noreferrer"
                    style={{ background: "#25D366", color: "#fff", padding: "14px 36px", borderRadius: "100px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 8px 24px rgba(37,211,102,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
                    💬 WhatsApp Us
                  </a>
                  <a href="tel:9289140812"
                    style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "14px 36px", borderRadius: "100px", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }}>
                    📞 +91 92891 40812
                  </a>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: "1.5rem 0 0" }}>
                  287, Fourth Floor, A1 Block, Sushant Lok-2, Sector 55, Gurgaon – 122011
                </p>
              </div>
            </div>
          </AnimBox>
        </div>
      </section>
    );
  }

  export default CTASection