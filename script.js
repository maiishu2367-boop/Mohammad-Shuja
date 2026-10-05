/* =========================================
   M. SHUJA — INTERACTIVE GLASS GLOW
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(
    ".content-bar section, .contact-card, .education-item, .skill-item"
  );

  cards.forEach(card => {

    card.addEventListener("pointermove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      card.style.background = `
        radial-gradient(
          180px circle at ${x}px ${y}px,
          rgba(22,140,255,0.12),
          transparent 70%
        ),
        rgba(255,255,255,0.035)
      `;

      card.style.boxShadow = `
        0 8px 30px rgba(0,0,0,0.18),
        0 0 25px rgba(22,140,255,0.08)
      `;
    });

    card.addEventListener("pointerleave", () => {

      card.style.background = "";
      card.style.boxShadow = "";

    });

  });

});