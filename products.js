// =========================================================
// PROJECTS PAGE JAVASCRIPT
// Custom Team Jersey & Sports Apparel Printer
// =========================================================


// =========================================================
// PRODUCT DATA
// =========================================================

const teamProducts = [
  {
    id: 1,
    name: "Elite Football Jersey",
    sport: "football",
    type: "jerseys",
    category: "Match Jersey",
    description:
      "Custom football jersey with team colors, player names, numbers, and club branding.",
    image: "images/product img.png",
  },

  {
    id: 2,
    name: "Football Match Shorts",
    sport: "football",
    type: "shorts",
    category: "Match Shorts",
    description:
      "Lightweight custom shorts designed to complete your football match-day kit.",
    image: "images/product img 1.png",
  },

  {
    id: 3,
    name: "Custom Cricket Jersey",
    sport: "cricket",
    type: "jerseys",
    category: "Cricket Jersey",
    description:
      "Personalized cricket jerseys featuring player names, numbers, logos, and team colors.",
    image: "images/product img 3.png",
  },

  {
    id: 4,
    name: "Cricket Training Top",
    sport: "cricket",
    type: "training",
    category: "Training Wear",
    description:
      "Comfortable training apparel created for cricket practice and team sessions.",
    image: "images/product img 4.png",
  },

  {
    id: 5,
    name: "Pro Basketball Jersey",
    sport: "basketball",
    type: "jerseys",
    category: "Basketball Jersey",
    description:
      "Bold basketball jerseys with custom numbers, names, graphics, and team identity.",
    image: "images/generated image 1.png",
  },

  {
    id: 6,
    name: "Basketball Game Shorts",
    sport: "basketball",
    type: "shorts",
    category: "Game Shorts",
    description:
      "Performance-focused basketball shorts designed for movement and comfort.",
    image: "images/kitstorm 10.png",
  },

  {
    id: 7,
    name: "Volleyball Team Jersey",
    sport: "volleyball",
    type: "jerseys",
    category: "Volleyball Jersey",
    description:
      "Custom volleyball jerseys built around your team's colors and visual identity.",
    image: "images/product 6.png",
  },

  {
    id: 8,
    name: "Volleyball Team Jacket",
    sport: "volleyball",
    type: "jackets",
    category: "Team Jacket",
    description:
      "Coordinated team jackets perfect for warm-ups, travel, and tournament days.",
    image: "images/product 8.png",
  },

  {
    id: 9,
    name: "Performance Running Singlet",
    sport: "running",
    type: "training",
    category: "Running Apparel",
    description:
      "Lightweight running singlet customized with your club colors, logo, and athlete details.",
    image: "images/kitstorm 2.png",
  },

  {
    id: 10,
    name: "Running Team Jacket",
    sport: "running",
    type: "jackets",
    category: "Running Jacket",
    description:
      "Custom lightweight jackets designed for running clubs and outdoor team events.",
    image: "images/product 10.png",
  },

  {
    id: 11,
    name: "Custom Team Cap",
    sport: "cricket",
    type: "accessories",
    category: "Team Accessory",
    description:
      "Personalized team caps featuring your club logo and matching team colors.",
    image: "images/kitstorm 1.png",
  },

  {
    id: 12,
    name: "Team Training T-Shirt",
    sport: "football",
    type: "training",
    category: "Training Apparel",
    description:
      "Custom training T-shirt designed for warm-ups, practice sessions, and team events.",
    image: "images/product 9.png",
  },
];


// =========================================================
// DOM ELEMENTS
// =========================================================

const teamProjectsGrid =
  document.getElementById("team-projects-grid");

const teamProjectsCount =
  document.getElementById("team-projects-count");

const teamProjectsEmpty =
  document.getElementById("team-projects-empty");

const teamProjectsClear =
  document.getElementById("team-projects-clear");

const teamProjectsReset =
  document.getElementById("team-projects-reset");

const sportFilterButtons =
  document.querySelectorAll(
    ".team-projects-filter-button"
  );

const typeFilterButtons =
  document.querySelectorAll(
    ".team-projects-type-button"
  );

const sportCards =
  document.querySelectorAll(
    ".team-shop-by-sport-card"
  );


// =========================================================
// FILTER STATE
// =========================================================

let selectedSport = "all";

let selectedType = "all";


// =========================================================
// SPORT LABELS
// =========================================================

const sportLabels = {
  football: "Football",
  cricket: "Cricket",
  basketball: "Basketball",
  volleyball: "Volleyball",
  running: "Running"
};


// =========================================================
// TYPE LABELS
// =========================================================

const typeLabels = {
  jerseys: "Jerseys",
  shorts: "Shorts",
  training: "Training Wear",
  jackets: "Jackets",
  accessories: "Accessories"
};


// =========================================================
// RENDER PRODUCTS
// =========================================================

function renderTeamProducts(products) {

  if (!teamProjectsGrid) {
    return;
  }


  // Clear existing cards

  teamProjectsGrid.innerHTML = "";


  // No products

  if (!products.length) {

    if (teamProjectsEmpty) {
      teamProjectsEmpty.hidden = false;
    }

    return;
  }


  // Hide empty state

  if (teamProjectsEmpty) {
    teamProjectsEmpty.hidden = true;
  }


  // Create product cards

  products.forEach((product) => {

    const card =
      document.createElement("article");

    card.className =
      "team-product-card";


    card.dataset.sport =
      product.sport;

    card.dataset.type =
      product.type;


    card.innerHTML = `

      <div class="team-product-image-wrap">

        <img
          src="${product.image}"
          alt="${product.name}"
          class="team-product-image"
          loading="lazy"
        />

        <span class="team-product-sport">
          ${sportLabels[product.sport] || product.sport}
        </span>

        <span class="team-product-type">
          ${typeLabels[product.type] || product.type}
        </span>

      </div>


      <div class="team-product-content">

        <div class="team-product-meta">

          <span class="team-product-category">
            ${product.category}
          </span>

        </div>


        <h3 class="team-product-name">
          ${product.name}
        </h3>


        <p class="team-product-description">
          ${product.description}
        </p>


        <a
          href="contact.html"
          class="team-product-link"
        >
          <span>
            Customize This
          </span>

          <i data-lucide="arrow-up-right"></i>
        </a>

      </div>

    `;


    teamProjectsGrid.appendChild(card);

  });


  // Update icons

  refreshLucideIcons();

}


// =========================================================
// FILTER PRODUCTS
// =========================================================

function filterTeamProducts() {

  const filteredProducts =
    teamProducts.filter((product) => {

      const matchesSport =
        selectedSport === "all" ||
        product.sport === selectedSport;


      const matchesType =
        selectedType === "all" ||
        product.type === selectedType;


      return matchesSport && matchesType;

    });


  renderTeamProducts(filteredProducts);


  updateProductCount(filteredProducts.length);

}


// =========================================================
// UPDATE PRODUCT COUNT
// =========================================================

function updateProductCount(count) {

  if (!teamProjectsCount) {
    return;
  }

  teamProjectsCount.textContent = count;

}


// =========================================================
// UPDATE SPORT BUTTONS
// =========================================================

function updateSportButtons() {

  sportFilterButtons.forEach((button) => {

    const buttonSport =
      button.dataset.sport;


    button.classList.toggle(
      "is-active",
      buttonSport === selectedSport
    );

  });

}


// =========================================================
// UPDATE TYPE BUTTONS
// =========================================================

function updateTypeButtons() {

  typeFilterButtons.forEach((button) => {

    const buttonType =
      button.dataset.type;


    button.classList.toggle(
      "is-active",
      buttonType === selectedType
    );

  });

}


// =========================================================
// SPORT FILTER CLICK
// =========================================================

sportFilterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      selectedSport =
        button.dataset.sport || "all";


      updateSportButtons();

      filterTeamProducts();

    }
  );

});


// =========================================================
// APPAREL TYPE FILTER CLICK
// =========================================================

typeFilterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      selectedType =
        button.dataset.type || "all";


      updateTypeButtons();

      filterTeamProducts();

    }
  );

});


// =========================================================
// RESET FILTERS
// =========================================================

function resetTeamFilters() {

  selectedSport = "all";

  selectedType = "all";


  updateSportButtons();

  updateTypeButtons();

  filterTeamProducts();

}


// =========================================================
// RESET BUTTON
// =========================================================

if (teamProjectsClear) {

  teamProjectsClear.addEventListener(
    "click",
    resetTeamFilters
  );

}


if (teamProjectsReset) {

  teamProjectsReset.addEventListener(
    "click",
    resetTeamFilters
  );

}


// =========================================================
// SHOP BY SPORT CARDS
// =========================================================

sportCards.forEach((card) => {

  card.addEventListener(
    "click",
    () => {

      const sport =
        card.dataset.shopSport;


      if (!sport) {
        return;
      }


      selectedSport = sport;

      selectedType = "all";


      updateSportButtons();

      updateTypeButtons();

      filterTeamProducts();


      // Scroll to product collection

      const collection =
        document.getElementById(
          "projects-collection"
        );


      if (collection) {

        collection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

});


// =========================================================
// LUCIDE ICON REFRESH
// =========================================================

function refreshLucideIcons() {

  if (
    typeof lucide !== "undefined" &&
    lucide.createIcons
  ) {

    lucide.createIcons();

  }

}


// =========================================================
// BACK TO TOP
// =========================================================

document.addEventListener(
  "click",
  (event) => {

    const topButton =
      event.target.closest(".top-btn");


    if (!topButton) {
      return;
    }


    event.preventDefault();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


// =========================================================
// INITIAL LOAD
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderTeamProducts(teamProducts);

    updateSportButtons();

    updateTypeButtons();

    updateProductCount(
      teamProducts.length
    );

    refreshLucideIcons();

  }
);


// =========================================================
// HANDLE IMAGE ERRORS
// =========================================================

document.addEventListener(
  "error",
  (event) => {

    const image = event.target;


    if (
      image.tagName !== "IMG" ||
      !image.classList.contains(
        "team-product-image"
      )
    ) {
      return;
    }


    image.style.objectFit = "contain";

    image.style.padding = "40px";

    image.style.background =
      "var(--surface)";

  },
  true
);