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
   4. Photo slider for travel sections
   ========================= */

/* This code works for every .photo-slider on the page.
   Each slider is independent. */
document.querySelectorAll(".photo-slider").forEach(function (slider) {
  const track = slider.querySelector(".slider-track");
  const images = slider.querySelectorAll(".slider-track img");
  const prevButton = slider.querySelector(".slider-btn.prev");
  const nextButton = slider.querySelector(".slider-btn.next");
  const counter = slider.querySelector(".slider-counter");

  let currentIndex = 0;

  /* Stop if the slider does not have enough elements */
  if (!track || images.length === 0 || !prevButton || !nextButton) {
    return;
  }

  /* Update image position and counter text */
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }

  /* Show next image */
  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  });

  /* Show previous image */
  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  });

  /* Allow keyboard navigation when the slider is focused */
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

  /* Set initial slider state */
  updateSlider();
});