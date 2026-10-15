document.querySelectorAll(".contact-faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".contact-faq-item");
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".contact-faq-item").forEach((faq) => {
      faq.classList.remove("active");

      const faqButton = faq.querySelector(".contact-faq-question");
      faqButton.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }

    document.querySelectorAll(".contact-faq-item").forEach((faq) => {
      const faqButton = faq.querySelector(".contact-faq-question");
      const isOpen = faq.classList.contains("active");
      const iconName = isOpen ? "minus" : "plus";

      const oldIcon = faqButton.querySelector("i, svg");

      if (oldIcon) {
        const newIcon = document.createElement("i");
        newIcon.setAttribute("data-lucide", iconName);
        oldIcon.replaceWith(newIcon);
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
});
