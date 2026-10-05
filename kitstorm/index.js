document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

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

    lucide.createIcons();
  }

  themeToggle?.addEventListener("click", () => {
    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light",
    );

    updateThemeIcon();
  });

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

  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");

    const isOpen = navMenu?.classList.contains("open");

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
  });

  lucide.createIcons();
  updateThemeIcon();
});

const sportItems = document.querySelectorAll(".sport-item");
const sportImage = document.getElementById("sportShowcaseImage");
const sportImageNumber = document.querySelector(".sport-image-label span");

sportItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const image = item.dataset.image;

    if (image && sportImage) {
      sportImage.src = image;
    }

    if (sportImageNumber) {
      sportImageNumber.textContent =
        item.querySelector(".sport-number").textContent;
    }

    sportItems.forEach((sport) => sport.classList.remove("active"));
    item.classList.add("active");
  });
});
