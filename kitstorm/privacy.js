document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  const rtlToggle = document.getElementById("rtlToggle");
  const darkToggle = document.getElementById("darkToggle");

  const legalLinks = document.querySelectorAll(".legal-nav a");
  const sections = document.querySelectorAll(".legal-section[id]");

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  /* ================================
     LUCIDE ICONS
  ================================= */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* ================================
     LOAD SAVED THEME
  ================================= */

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  /* ================================
     LOAD SAVED DIRECTION
  ================================= */

  html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

  /* ================================
     DARK MODE ICON
  ================================= */

  function updateThemeIcon() {
    if (!darkToggle) return;

    const isDark = body.classList.contains("dark-mode");

    darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    refreshIcons();
  }

  /* ================================
     DARK MODE TOGGLE
  ================================= */

  darkToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeIcon();
  });

  /* ================================
     RTL ICON
  ================================= */

  function updateDirectionIcon() {
    if (!rtlToggle) return;

    const isRTL = html.getAttribute("dir") === "rtl";

    rtlToggle.innerHTML = isRTL
      ? '<i data-lucide="align-left"></i>'
      : '<i data-lucide="align-right"></i>';

    refreshIcons();
  }

  /* ================================
     RTL TOGGLE
  ================================= */

  rtlToggle?.addEventListener("click", () => {
    const isRTL = html.getAttribute("dir") === "rtl";

    const newDirection = isRTL ? "ltr" : "rtl";

    html.setAttribute("dir", newDirection);

    localStorage.setItem("direction", newDirection);

    updateDirectionIcon();
  });

  /* ================================
     LEGAL NAVIGATION
  ================================= */

  legalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = 30;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ================================
     ACTIVE SECTION
  ================================= */

  function updateActiveSection() {
    let currentSection = "";

    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    legalLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  /* ================================
     SCROLL LISTENER
  ================================= */

  let scrollTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();

          scrollTicking = false;
        });

        scrollTicking = true;
      }
    },
    { passive: true },
  );

  /* ================================
     INITIALIZE
  ================================= */

  updateThemeIcon();
  updateDirectionIcon();
  updateActiveSection();
  refreshIcons();
});
