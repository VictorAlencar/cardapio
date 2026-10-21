export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="hero-tag">🍗 O Banquete da Terra Média</span>
        <h1 className="hero-title">
          LORD OF THE <span>CHICKENS</span>
        </h1>
        <p className="hero-quote">
          &quot;Um anel para governá-los... um frango para conquistá-los&quot;
        </p>

        <div className="hero-features">
          <div className="feature-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>Delivery Rápido</span>
          </div>
          <div className="feature-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span>Pix, Cartão &amp; VR</span>
          </div>
          <div className="feature-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Frango 100% Crocante</span>
          </div>
        </div>
      </div>
    </section>
  );
}
