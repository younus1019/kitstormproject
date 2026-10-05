document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const homeDropdownToggle = document.getElementById("homeDropdownToggle");

  const navActions = document.querySelector(".nav-actions");
  const quoteBtn = document.querySelector(".quote-btn");

  /* =========================
     THEME
  ========================= */

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  if (savedTheme === "dark") {
    html.classList.add("dark");
  }

  if (savedDirection === "rtl") {
    html.setAttribute("dir", "rtl");
  }

  function updateThemeIcon() {
    if (!themeToggle) return;

    themeToggle.innerHTML = html.classList.contains("dark")
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  themeToggle?.addEventListener("click", () => {
    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light",
    );

    updateThemeIcon();
  });

  /* =========================
     RTL
  ========================= */

  rtlToggle?.addEventListener("click", () => {
    const isRTL = html.getAttribute("dir") === "rtl";

    if (isRTL) {
      html.removeAttribute("dir");
      localStorage.setItem("direction", "ltr");
    } else {
      html.setAttribute("dir", "rtl");
      localStorage.setItem("direction", "rtl");
    }
  });

  /* =========================
     MOBILE MENU
  ========================= */

  menuToggle?.addEventListener("click", () => {
    const isOpening = !navMenu?.classList.contains("open");

    navMenu?.classList.toggle("open");

    /* Move existing Get a Quote button */
    if (quoteBtn && navMenu && navActions) {
      if (isOpening) {
        navMenu.appendChild(quoteBtn);
        quoteBtn.classList.add("mobile-quote-active");
      } else {
        navActions.insertBefore(quoteBtn, menuToggle);
        quoteBtn.classList.remove("mobile-quote-active");

        /* Close Home dropdown when menu closes */
        const navDropdown = homeDropdownToggle?.closest(".nav-dropdown");

        navDropdown?.classList.remove("open");

        homeDropdownToggle?.setAttribute("aria-expanded", "false");

        const icon = homeDropdownToggle?.querySelector("svg");

        if (icon) {
          icon.style.transform = "rotate(0deg)";
        }
      }
    }

    const isOpen = navMenu?.classList.contains("open");

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });

  /* =========================
     HOME DROPDOWN
  ========================= */

  homeDropdownToggle?.addEventListener("click", (event) => {
    /* Keep desktop hover behavior unchanged */
    if (window.innerWidth > 1024) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const navDropdown = homeDropdownToggle.closest(".nav-dropdown");

    if (!navDropdown) return;

    const isOpen = navDropdown.classList.toggle("open");

    homeDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    const icon = homeDropdownToggle.querySelector("svg");

    if (icon) {
      icon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
    }
  });

  /* =========================
     ACTIVE NAV LINK
  ========================= */

  function setActiveNav() {
    let currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) {
      currentPage = "index.html";
    }

    currentPage = currentPage.toLowerCase();

    /* Remove existing active classes */

    document.querySelectorAll(".nav-menu .nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    document.querySelectorAll(".dropdown-menu a").forEach((link) => {
      link.classList.remove("active");
    });

    homeDropdownToggle?.classList.remove("active");

    /* Normal nav links */

    document.querySelectorAll(".nav-menu > a.nav-link").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });

    /* Home dropdown links */

    document.querySelectorAll(".dropdown-menu a").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      if (linkPage === currentPage) {
        link.classList.add("active");
        homeDropdownToggle?.classList.add("active");
      }
    });

    /* Home active fallback */

    if (currentPage === "index.html" || currentPage === "") {
      homeDropdownToggle?.classList.add("active");
    }
  }

  setActiveNav();

  /* =========================
     LUCIDE
  ========================= */

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  updateThemeIcon();
});
