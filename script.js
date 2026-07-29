document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".nav");
  const revealElements = document.querySelectorAll(".reveal");
  const mobileLightbox = document.querySelector(".mobile-image-lightbox");
  const mobileLightboxImage = mobileLightbox?.querySelector("img");
  const mobileLightboxClose = mobileLightbox?.querySelector(
    ".mobile-image-lightbox-close",
  );
  const mobileViewport = window.matchMedia("(max-width: 767px)");
  let lastLightboxTrigger = null;

  const closeMenu = () => {
    navigation?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = navigation?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });

  const closeMobileLightbox = () => {
    if (!mobileLightbox || mobileLightbox.hidden) return;
    mobileLightbox.hidden = true;
    mobileLightbox.setAttribute("aria-hidden", "true");
    mobileLightboxImage?.classList.remove("is-zoomed");
    if (mobileLightboxImage) mobileLightboxImage.src = "";
    document.body.classList.remove("mobile-lightbox-open");
    lastLightboxTrigger?.focus();
    lastLightboxTrigger = null;
  };

  document.querySelectorAll("[data-mobile-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!mobileViewport.matches || !mobileLightbox || !mobileLightboxImage) {
        return;
      }

      lastLightboxTrigger = trigger;
      mobileLightboxImage.src = trigger.dataset.mobileLightbox;
      mobileLightboxImage.alt = trigger.dataset.lightboxAlt ?? "";
      mobileLightboxImage.classList.remove("is-zoomed");
      mobileLightbox.hidden = false;
      mobileLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("mobile-lightbox-open");
      mobileLightboxClose?.focus();
    });
  });

  mobileLightboxClose?.addEventListener("click", closeMobileLightbox);

  mobileLightbox?.addEventListener("click", (event) => {
    if (event.target === mobileLightbox) closeMobileLightbox();
  });

  mobileLightboxImage?.addEventListener("click", () => {
    mobileLightboxImage.classList.toggle("is-zoomed");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileLightbox();
  });

  mobileViewport.addEventListener?.("change", (event) => {
    if (!event.matches) closeMobileLightbox();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
});
