const backToTop = document.getElementById("backToTop");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) { // show button after scrolling 100px
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none"; // hide at top
  }
});

// Scroll smoothly to top when clicked
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});