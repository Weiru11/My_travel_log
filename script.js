const siteHeader = document.querySelector(".site-header");

function updateHeaderBackground() {
  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderBackground);
updateHeaderBackground();



Object.entries(mapLinks).forEach(([stateId, page]) => {
  const stateShape = document.getElementById(stateId);

  if (stateShape) {
    stateShape.setAttribute("tabindex", "0");
    stateShape.setAttribute("role", "link");
    stateShape.setAttribute("aria-label", `Go to ${page.replace(".html", "")} page`);

    stateShape.addEventListener("click", () => {
      window.location.href = page;
    });

    stateShape.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        window.location.href = page;
      }
    });
  }
});
