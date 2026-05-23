
"use client"
import { AnimBox, useInView } from "../../../../utils/AnimBox";


function ClinicSection() {
    return (
      <section style={{ background: "linear-gradient(135deg,#5a4ffe,#31285a)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div className="container mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <AnimBox from="left">
              <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>Established 2021</p>
              <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Dr. Kusum<br />
                <span style={{ color: "#a78bfa" }}>Gynecology Centre</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.97rem" }}>
                Founded in 2021 with a mission to provide <strong style={{ color: "#fff" }}>affordable, world-class women's healthcare</strong> across Delhi NCR. Located in the heart of Golf Course Road, Gurgaon, Sector 55.
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.97rem" }}>
                The clinic specialises in outpatient consultations, while laparoscopic and gynecological procedures are performed at associated hospitals. Dr. Kusum is renowned across the region for her precision in treating <strong style={{ color: "#fff" }}>endometriosis, fibroids, and ovarian cysts</strong>.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {["📍 Sushant Lok-2, Sec 55, Gurgaon", "📞 +91 92891 40812"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                    {item}
                  </div>
                ))}
              </div>
            </AnimBox>
  
            <AnimBox from="right" delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { icon: "💰", title: "Affordable Care", desc: "World-class treatment at accessible prices for all women" },
                  { icon: "🔬", title: "Minimally Invasive", desc: "Advanced laparoscopic surgery with faster recovery" },
                  { icon: "❤️", title: "Compassionate", desc: "Genuine empathy and personalised attention for every patient" },
                  { icon: "🏆", title: "Nationally Awarded", desc: "Recognised at national conferences for research excellence" },
                ].map((card, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "1.5rem" }}>
                    <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 10 }}>{card.icon}</span>
                    <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", margin: "0 0 6px" }}>{card.title}</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                  </div>
                ))}
              </div>
            </AnimBox>
          </div>
        </div>
      </section>
    );
  }


  export default ClinicSection