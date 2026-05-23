const floatKeyframes = `
  @keyframes floatBlob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(0.9); opacity: 0.6; }
    70% { transform: scale(1.1); opacity: 0.1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;

const blobs = [
  { size: 180, top: 10, left: 70, dur: 8 },
  { size: 260, top: 50, left: 5,  dur: 12 },
  { size: 140, top: 70, left: 80, dur: 10 },
  { size: 320, top: 20, left: 40, dur: 14 },
  { size: 100, top: 80, left: 15, dur: 9 },
];

export default function HeroSection() {
  return (
    <section 
    style={{
        background:
          "linear-gradient(135deg, #1B1463 0%, #31285a 50%, #5a4ffe 100%)",
        position: "relative",
        top: "-120px",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <style>{floatKeyframes}</style>

      {blobs.map((b, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          width: b.size, height: b.size,
          top: `${b.top}%`, left: `${b.left}%`,
          animation: `floatBlob ${b.dur}s ease-in-out infinite`,
          animationDelay: `${i * 0.8}s`,
        }} />
      ))}

      <div className="container mx-auto px-6 py-20" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          {/* ── LEFT ── */}
          <div style={{ animation: "slideUp 0.9s ease forwards" }}>

            {/* Available pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100,
              padding: "6px 18px", marginBottom: "1.5rem",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Available for Consultation
              </span>
            </div>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              About Dr.
            </p>

            <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "1.2rem" }}>
              Kusum Lata
              <span style={{ display: "block", background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Bhardwaj
              </span>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 480 }}>
              MD – Obstetrics &amp; Gynaecology · MBBS · Laparoscopic Surgeon &amp; Obstetrician with{" "}
              <strong style={{ color: "#a78bfa" }}>17+ years</strong> of experience across PGIMER, AIIMS &amp; PGIMS.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/919289140812"
                target="_blank" rel="noreferrer"
                style={{ background: "linear-gradient(135deg,#5a4ffe,#7c6fff)", color: "#fff", padding: "14px 32px", borderRadius: 100, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(90,79,254,0.5)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(90,79,254,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 30px rgba(90,79,254,0.5)"; }}
              >
                📅 Book Appointment
              </a>
              <a
                href="tel:9289140812"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "14px 32px", borderRadius: 100, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }}
              >
                📞 Call Now
              </a>
            </div>
          </div>

          {/* ── RIGHT – Doctor image card ── */}
          <div style={{ display: "flex", justifyContent: "center", animation: "slideLeft 0.9s ease 0.2s both" }}>
            <div style={{ position: "relative" }}>

              {/* Pulse rings */}
              <div style={{ position: "absolute", inset: -20, borderRadius: 30, border: "2px solid rgba(167,139,250,0.4)", animation: "pulseRing 3s ease-in-out infinite" }} />
              <div style={{ position: "absolute", inset: -40, borderRadius: 40, border: "1px solid rgba(167,139,250,0.15)", animation: "pulseRing 3s ease-in-out infinite 1s" }} />

              {/* Photo */}
              <div style={{ width: 360, height: 460, borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
                <img
                  src="https://drkusumlata.in/Image/aboutus.webp"
                  alt="Dr. Kusum Lata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
                {/* Fallback */}
                <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg,#31285a,#5a4ffe)", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontSize: "5rem" }}>👩‍⚕️</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Dr. Kusum Lata</span>
                </div>
                {/* Overlay name */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(27,20,99,0.95), transparent)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>Dr. Kusum Lata</p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", margin: "4px 0 0" }}>MD (Obs &amp; Gyn) · Laparoscopic Surgeon</p>
                </div>
              </div>

             
            </div>
          </div>

        </div>
      </div>

      {/* Wave divider */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 80" style={{ display: "block", fill: "#f7f4ee" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}