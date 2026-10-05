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

  if (savedDirection === "rtl") {
    html.setAttribute("dir", "rtl");
  } else {
    html.setAttribute("dir", "ltr");
  }

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

    const isRTL = html.getAttribute("dir") === "rtl";

    rtlToggle.innerHTML = isRTL
      ? '<i data-lucide="align-left"></i>'
      : '<i data-lucide="align-right"></i>';

    refreshIcons();
  }

  /* =====================================================
     RTL TOGGLE
     ===================================================== */

  rtlToggle?.addEventListener("click", () => {
    const isRTL = html.getAttribute("dir") === "rtl";

    html.setAttribute("dir", isRTL ? "ltr" : "rtl");

    localStorage.setItem("direction", isRTL ? "ltr" : "rtl");

    updateDirectionIcon();
  });

  /* =====================================================
     INITIALIZE
     ===================================================== */

  updateThemeIcon();

  updateDirectionIcon();

  refreshIcons();
});
