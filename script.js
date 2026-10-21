const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".case-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const detail = button.parentElement.querySelector(".case-detail");
    const isHidden = detail.hasAttribute("hidden");
    if (isHidden) detail.removeAttribute("hidden");
    else detail.setAttribute("hidden", "");
    button.setAttribute("aria-expanded", String(isHidden));
    button.querySelector("span").textContent = isHidden ? "−" : "＋";
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
