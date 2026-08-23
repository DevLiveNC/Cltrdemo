const links = document.querySelectorAll('[data-nav]');
const current = window.location.pathname.split('/').pop() || 'index.html';
links.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

const yearTarget = document.querySelector('[data-year]');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
