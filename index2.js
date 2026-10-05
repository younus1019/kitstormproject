const orbitStage = document.getElementById("orbitStage");

if (orbitStage) {
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  orbitStage.addEventListener("pointermove", (event) => {
    if (motionPreference.matches || event.pointerType === "touch") {
      return;
    }

    const rect = orbitStage.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const moveX = (x / rect.width) * 50;
    const moveY = (y / rect.height) * 50;

    orbitStage.style.setProperty("--orbit-x", `${moveX}px`);
    orbitStage.style.setProperty("--orbit-y", `${moveY}px`);
  });

  orbitStage.addEventListener("pointerleave", () => {
    orbitStage.style.setProperty("--orbit-x", "0px");
    orbitStage.style.setProperty("--orbit-y", "0px");
  });
}


document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const section = document.querySelector(".home2-identity-section");
  const stage = document.querySelector("#identityStage");

  if (!section || !stage) return;

  const words = section.querySelectorAll(".identity-word");
  const details = section.querySelectorAll(".identity-detail");
  const kit = section.querySelector(".identity-kit");
  const centerText = section.querySelector(".identity-center-text");

  const reveal = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        words.forEach((word, index) => {
          setTimeout(() => {
            word.style.transform = "translateY(0)";
            word.style.opacity = "1";
          }, index * 180);
        });

        details.forEach((detail, index) => {
          setTimeout(() => {
            detail.style.opacity = "1";
          }, 450 + index * 180);
        });

        setTimeout(() => {
          if (centerText) {
            centerText.style.opacity = "1";
            centerText.style.transition = "opacity 0.8s ease";
          }
        }, 900);

        reveal.unobserve(section);
      });
    },
    {
      threshold: 0.3
    }
  );

  words.forEach(word => {
    word.style.opacity = "0";
    word.style.transform = "translateY(25px)";
  });

  details.forEach(detail => {
    detail.style.opacity = "0";
    detail.style.transition = "opacity 0.7s ease";
  });

  reveal.observe(section);

  stage.addEventListener("mousemove", event => {
    const rect = stage.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    if (window.innerWidth > 1024) {
      kit.style.transform =
        `translate(calc(-50% + ${x * 8}px), calc(-50% + ${y * 8}px))`;

      words.forEach((word, index) => {
        const strength = (index + 1) * 3;

        word.style.marginLeft = `${x * strength}px`;
        word.style.marginTop = `${y * strength}px`;
      });
    }
  });

  stage.addEventListener("mouseleave", () => {
    kit.style.transform = "translate(-50%, -50%)";

    words.forEach(word => {
      word.style.marginLeft = "0";
      word.style.marginTop = "0";
    });
  });
});
