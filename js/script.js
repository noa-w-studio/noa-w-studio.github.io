//セクションアニメーション
const sections = document.querySelectorAll('article');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

sections.forEach((section) => {
  observer.observe(section);
});




//ヘッダーアニメーション

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const pageTop = document.querySelector(".page-top");

  if (!header || !pageTop) return;

  const threshold = 100;
  const directionThreshold = 5;
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateScrollState = () => {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    pageTop.classList.toggle("is-visible", currentY > threshold);

    if (currentY <= threshold) {
      header.classList.remove("is-visible", "is-hidden");
    } else if (diff < -directionThreshold) {
      header.classList.add("is-visible");
      header.classList.remove("is-hidden");
    } else if (diff > directionThreshold) {
      header.classList.add("is-hidden");
      header.classList.remove("is-visible");
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  updateScrollState();

  pageTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
