document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  const rtlToggle = document.getElementById("rtlToggle");
  const darkToggle = document.getElementById("darkToggle");

  /* =====================================================
     SAVED SETTINGS
     ===================================================== */

  const savedTheme = localStorage.getItem("theme");
  const savedDirection = localStorage.getItem("direction");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  html.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");

  /* =====================================================
     REFRESH LUCIDE ICONS
     ===================================================== */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* =====================================================
     DARK MODE ICON
     ===================================================== */

  function updateThemeIcon() {
    if (!darkToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    darkToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    refreshIcons();
  }

  /* =====================================================
     DARK MODE TOGGLE
     ===================================================== */

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeIcon();
  });

  /* =====================================================
     RTL ICON
     ===================================================== */

  function updateDirectionIcon() {
    if (!rtlToggle) return;

    rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';

    refreshIcons();
  }

  /* =====================================================
     RTL TOGGLE
     ===================================================== */

  rtlToggle?.addEventListener("click", () => {
    const currentDirection = html.getAttribute("dir") || "ltr";

    const newDirection = currentDirection === "rtl" ? "ltr" : "rtl";

    html.setAttribute("dir", newDirection);

    localStorage.setItem("direction", newDirection);

    updateDirectionIcon();
  });

  /* =====================================================
     INITIALIZE
     ===================================================== */

  updateThemeIcon();
  updateDirectionIcon();
  refreshIcons();
});
