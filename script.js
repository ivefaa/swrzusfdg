// SMK Muhammadiyah Pakem — script.js (efek interaktif)
document.documentElement.classList.add("js");

const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section[id]");

// Navbar berubah warna & tombol ke atas muncul saat digulir
function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 600);

  // Tandai menu aktif sesuai bagian yang sedang dilihat
  let current = "beranda";
  sections.forEach((s) => { if (y >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach((a) => {
    if (a.classList.contains("btn")) return;
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", onScroll);
onScroll();

// Tutup menu HP setelah link diklik
navLinks.forEach((a) => a.addEventListener("click", () => { menuToggle.checked = false; }));

// Animasi muncul saat digulir
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Angka statistik berhitung naik
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const start = target > 1000 ? target - 60 : 0;
    const duration = 1600;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

// Lightbox galeri
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbCap = lightbox.querySelector(".lb-caption");
document.querySelectorAll(".g-item").forEach((fig) => {
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = fig.querySelector("figcaption").textContent;
    lightbox.classList.add("open");
  });
});
lightbox.addEventListener("click", (e) => {
  if (e.target !== lbImg) lightbox.classList.remove("open");
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("open"); });
