// main.js – Final Version 3.1

$(document).on("click", ".themeBtn", function(){ $(".theme").toggle(); $(".vgsom").hide(); });
$(document).on("click", ".vgsomBtn", function(){ $(".theme").hide(); $(".vgsom").toggle(); });



document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  const aboutCards = document.querySelectorAll(".fade-reveal");
  const committeeCarousel = document.querySelector(".committee-carousel");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  /* ---------------- Navbar scroll effect ---------------- */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  });

  /* ---------------- Fade-in About Cards ---------------- */
  function revealOnScroll() {
    aboutCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) card.classList.add("visible");
      else card.classList.remove("visible");
    });
  }
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  /* ---------------- Committee Overlay Logic ---------------- */
  const toggleButtons = document.querySelectorAll(".toggle-profile");
  const closeButtons = document.querySelectorAll(".close-overlay");
  let activeOverlay = null;

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".committee-card");
      const overlay = card.querySelector(".profile-overlay");

      // Close other overlays
      if (activeOverlay && activeOverlay !== overlay) {
        activeOverlay.classList.remove("active");
        const activeBtn = activeOverlay.closest(".committee-card").querySelector(".toggle-profile");
        if (activeBtn) activeBtn.textContent = "View Profile";
        activeOverlay = null;
      }

      // Toggle current overlay
      if (overlay.classList.contains("active")) {
        overlay.classList.remove("active");
        btn.textContent = "View Profile";
        activeOverlay = null;
      } else {
        overlay.classList.add("active");
        btn.textContent = "Hide Profile";
        activeOverlay = overlay;

        // Scroll to this card on mobile
        if (window.innerWidth < 992 && committeeCarousel) {
          const item = card.closest(".committee-item");
          const centerPos =
            item.offsetLeft + item.offsetWidth / 2 - committeeCarousel.clientWidth / 2;
          committeeCarousel.scrollTo({ left: centerPos, behavior: "smooth" });
        }
      }
    });
  });

  /* ---------------- Close Button inside Overlay ---------------- */
  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const overlay = closeBtn.closest(".profile-overlay");
      const btn = overlay.closest(".committee-card").querySelector(".toggle-profile");
      overlay.classList.remove("active");
      btn.textContent = "View Profile";
      activeOverlay = null;
    });
  });

  /* ---------------- Carousel Arrow Navigation (Mobile only) ---------------- */
  function scrollToCard(direction) {
    if (window.innerWidth >= 992) return;
    const items = Array.from(document.querySelectorAll(".committee-item"));
    if (!committeeCarousel || items.length === 0) return;

    const center = committeeCarousel.scrollLeft + committeeCarousel.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDist = Infinity;

    items.forEach((it, idx) => {
      const itCenter = it.offsetLeft + it.offsetWidth / 2;
      const dist = Math.abs(itCenter - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIndex = idx;
      }
    });

    let targetIndex = nearestIndex + direction;
    targetIndex = Math.max(0, Math.min(targetIndex, items.length - 1));
    const target = items[targetIndex];
    const targetCenter =
      target.offsetLeft + target.offsetWidth / 2 - committeeCarousel.clientWidth / 2;
    committeeCarousel.scrollTo({ left: targetCenter, behavior: "smooth" });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => scrollToCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollToCard(1));

  /* ---------------- Auto-center Prof. Suman Chakraborty ---------------- */
  window.addEventListener("load", () => {
    if (window.innerWidth < 992 && committeeCarousel) {
      const firstItem = committeeCarousel.querySelector(".committee-item");
      if (firstItem) {
        const centerPos =
          firstItem.offsetLeft + firstItem.offsetWidth / 2 - committeeCarousel.clientWidth / 2;
        committeeCarousel.scrollTo({ left: centerPos, behavior: "smooth" });
      }
    }
  });
});

