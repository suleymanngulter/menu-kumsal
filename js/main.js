const menuRoot = document.getElementById("menu-root");
const navButtons = document.querySelectorAll(".nav__btn");
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "kumsal-theme";

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Açık moda geç" : "Koyu moda geç"
  );
}

themeToggle.addEventListener("click", () => {
  setTheme(getTheme() === "dark" ? "light" : "dark");
});

setTheme(getTheme());

function formatPrice(price) {
  if (price === null || price === undefined) {
    return '<span class="price price--na">—</span>';
  }
  const formatted = price.toLocaleString("tr-TR");
  return `<span class="price">${formatted}<span class="price__currency">₺</span></span>`;
}

function renderMenu(activeCategory = "all") {
  const sections =
    activeCategory === "all"
      ? MENU_SECTIONS
      : MENU_SECTIONS.filter((section) => section.id === activeCategory);

  menuRoot.innerHTML = sections
    .map(
      (section) => `
    <section class="section" data-category="${section.id}">
      <h2 class="section__title">${section.title}</h2>
      <ul class="price-list">
        ${section.items
          .map(
            (item) => `
          <li class="price-list__item">
            <span class="price-list__name">${item.name}</span>
            <span class="price-list__leader" aria-hidden="true"></span>
            ${formatPrice(item.price)}
          </li>
        `
          )
          .join("")}
      </ul>
    </section>
  `
    )
    .join("");
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderMenu(button.dataset.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

renderMenu();
