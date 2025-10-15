// jQuery is loaded via CDN; Bootstrap bundle is included as well.

// Theme toggles
$(document).on("click", ".themeBtn", function(){ $(".theme").show(); $(".vgsom").hide(); });
$(document).on("click", ".vgsomBtn", function(){ $(".theme").hide(); $(".vgsom").show(); });

// Navbar scroll effect + active link state on scroll
const nav = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar .nav-link');

const setActiveByHash = () => {
  const hash = window.location.hash || '';
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === hash);
  });
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  // Section-based active highlighting
  const sections = [...document.querySelectorAll('section[id]')];
  let current = null;
  const offset = 120; // navbar height buffer
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top + window.scrollY - offset;
    if (window.scrollY >= top) current = s.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href').replace('#','') === current));
});

// Highlight on hash change / initial load
window.addEventListener('hashchange', setActiveByHash);
window.addEventListener('load', () => {
  setActiveByHash();
  if (window.scrollY > 24) nav.classList.add('scrolled');
});
