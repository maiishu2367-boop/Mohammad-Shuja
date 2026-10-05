/* =========================================================
   M. SHUJA — COMPLETE INTERACTION SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. INTERACTIVE GLASS CARD GLOW
     ======================================================= */

  const cards = document.querySelectorAll(
    ".content-bar section, .contact-card, .education-item, .skill-item"
  );

  cards.forEach(card => {

    card.addEventListener("pointermove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background = `
        radial-gradient(
          180px circle at ${x}px ${y}px,
          rgba(22, 140, 255, 0.12),
          transparent 70%
        ),
        rgba(255, 255, 255, 0.035)
      `;

      card.style.boxShadow = `
        0 8px 30px rgba(0, 0, 0, 0.18),
        0 0 25px rgba(22, 140, 255, 0.08)
      `;
    });

    card.addEventListener("pointerleave", () => {
      card.style.background = "";
      card.style.boxShadow = "";
    });

  });


  /* =======================================================
     2. NAVIGATION CLICK ANIMATION
     ======================================================= */

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {

    link.addEventListener("click", function () {

      this.style.transform = "scale(0.88)";

      setTimeout(() => {
        this.style.transform = "";
      }, 180);

    });

  });


  /* =======================================================
     3. ACTIVE NAVIGATION
     ======================================================= */

  const sectionLinks = Array.from(navLinks).filter(link => {
    return link.getAttribute("href")?.startsWith("#");
  });

  const sections = sectionLinks
    .map(link => {
      const target = link.getAttribute("href");
      return document.querySelector(target);
    })
    .filter(Boolean);

  function updateActiveNav() {

    let currentSection = null;

    sections.forEach(section => {

      const rect = section.getBoundingClientRect();

      if (rect.top <= 180) {
        currentSection = section;
      }

    });

    sectionLinks.forEach(link => {
      link.classList.remove("active");
    });

    if (currentSection) {

      const activeLink = document.querySelector(
        `nav a[href="#${currentSection.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    }

  }

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  updateActiveNav();


  /* =======================================================
     4. SECTION REVEAL
     ======================================================= */

  const revealSections = document.querySelectorAll(
    ".content-bar section"
  );

  revealSections.forEach(section => {
    section.classList.add("reveal-section");
  });

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealSections.forEach(section => {
      revealObserver.observe(section);
    });

  } else {

    revealSections.forEach(section => {
      section.classList.add("visible");
    });

  }


  /* =======================================================
     5. CARD LIGHT-SWEEP
     ======================================================= */

  cards.forEach(card => {
    card.classList.add("interactive-card");
  });


  /* =======================================================
     6. 🫧 SATISFYING FLOATING BUBBLES
     ======================================================= */

  const bubbleCount = 12;

  for (let i = 0; i < bubbleCount; i++) {

    const bubble = document.createElement("div");

    bubble.className = "ambient-particle";

    /* Random bubble size */
    const size = 4 + Math.random() * 7;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    /* Random horizontal position */
    bubble.style.left =
      Math.random() * 100 + "vw";

    /* Start mostly near lower screen */
    bubble.style.top =
      55 + Math.random() * 45 + "vh";

    /* Different floating speeds */
    bubble.style.animationDuration =
      (9 + Math.random() * 8) + "s";

    /* Prevent synchronized movement */
    bubble.style.animationDelay =
      (-Math.random() * 14) + "s";

    document.body.appendChild(bubble);

  }


  /* =======================================================
     7. MOBILE / TOUCH RIPPLE
     ======================================================= */

  document.addEventListener(
    "pointerdown",
    event => {

      if (
        event.pointerType !== "touch" &&
        event.pointerType !== "pen"
      ) {
        return;
      }

      const ripple = document.createElement("div");

      ripple.className = "touch-ripple";

      ripple.style.left =
        event.clientX + "px";

      ripple.style.top =
        event.clientY + "px";

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);

    },
    {
      passive: true
    }
  );


  /* =======================================================
     8. SMOOTH NAVIGATION
     ======================================================= */

  navLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});/* =========================
   MINTO CIRCLE MODAL
========================= */

const mintoTrigger = document.querySelector(".minto-trigger");
const mintoModal = document.getElementById("mintoModal");
const mintoClose = document.getElementById("mintoClose");
const mintoBackdrop = document.querySelector(".school-modal-backdrop");

if (mintoTrigger && mintoModal) {

  mintoTrigger.addEventListener("click", () => {
    mintoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  const closeMintoModal = () => {
    mintoModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  mintoClose.addEventListener("click", closeMintoModal);
  mintoBackdrop.addEventListener("click", closeMintoModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMintoModal();
    }
  });

}