document.querySelectorAll(".contact-faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".contact-faq-item");
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".contact-faq-item").forEach((faq) => {
      faq.classList.remove("active");

      const faqButton = faq.querySelector(".contact-faq-question");
      const icon = faqButton.querySelector("i");

      faqButton.setAttribute("aria-expanded", "false");

      if (icon) {
        icon.setAttribute("data-lucide", "plus");
      }
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");

      const icon = button.querySelector("i");

      if (icon) {
        icon.setAttribute("data-lucide", "minus");
      }
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  });
});
