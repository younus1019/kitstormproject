document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const rtlToggle = document.getElementById("rtlToggle");
  const darkToggle = document.getElementById("darkToggle");

  /* =====================================================
     INITIAL SETTINGS
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
     ICON RENDER
     ===================================================== */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  /* =====================================================
     DARK MODE
     ===================================================== */

  function updateThemeIcon() {
    if (!darkToggle) return;

    darkToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    refreshIcons();
  }

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeIcon();
  });

  /* =====================================================
     RTL
     ===================================================== */

function updateDirectionIcon() {
  if (!rtlToggle) return;

  rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';

  refreshIcons();
}

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
