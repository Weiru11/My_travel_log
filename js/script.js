/* =========================
   1. Navbar background on scroll
   ========================= */

/* Select the fixed header */
const siteHeader = document.querySelector(".site-header");

/* Add background when the user scrolls down */
function updateHeaderOnScroll() {
  if (!siteHeader) return;

  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

/* Run once when the page loads */
updateHeaderOnScroll();

/* Run every time the user scrolls */
window.addEventListener("scroll", updateHeaderOnScroll);


/* =========================
   2. Places dropdown click interaction
   ========================= */

/* Select the dropdown button and dropdown container */
const dropdownButton = document.querySelector(".dropdown-button");
const dropdown = document.querySelector(".dropdown");

/* Toggle dropdown when the Places button is clicked */
if (dropdownButton && dropdown) {
  dropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("open");
  });

  /* Close dropdown when clicking outside it */
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
    }
  });
}


/* =========================
   3. Map marker interaction
   ========================= */

/* Only map markers should navigate to city pages.
   The SVG states should not navigate anywhere. */
   // find all map markers by their class and add a hover effect to indicate they are clickable
const mapMarkers = document.querySelectorAll(".map-marker");

/* Add a small active effect when hovering on map markers */
mapMarkers.forEach(function (marker) {
  marker.addEventListener("mouseenter", function () {
    marker.classList.add("active");
  });

  marker.addEventListener("mouseleave", function () {
    marker.classList.remove("active");
  });
});


/* =========================
   4. Photo slider with matching text
   ========================= */

/* Each travel section has its own photo slider.
   When the user changes the photo, the title and description change together. */
document.querySelectorAll(".travel-section").forEach(function (section) {
  const slider = section.querySelector(".photo-slider");
  const track = section.querySelector(".slider-track");
  const images = section.querySelectorAll(".slider-track img");
  const prevButton = section.querySelector(".slider-btn.prev");
  const nextButton = section.querySelector(".slider-btn.next");
  const counter = section.querySelector(".slider-counter");
  const title = section.querySelector(".slider-title");
  const description = section.querySelector(".slider-description");

  let currentIndex = 0;

  /* Stop if this section does not have a complete slider */
  if (!slider || !track || images.length === 0 || !prevButton || !nextButton) {
    return;
  }

  /* Update the photo position and matching text */
  function updateSlider() {
    const currentImage = images[currentIndex];

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    if (title && currentImage.dataset.title) {
      title.textContent = currentImage.dataset.title;
    }

    if (description && currentImage.dataset.description) {
      description.textContent = currentImage.dataset.description;
    }
  }

  /* Move to the next photo and text */
  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  });

  /* Move to the previous photo and text */
  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  });

  /* Allow keyboard arrow control */
  slider.setAttribute("tabindex", "0");

  slider.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    }

    if (event.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    }
  });

  /* Set the first photo and text when the page loads */
  updateSlider();
});