// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
navbar.classList.toggle('scrolled', window.scrollY > 40);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const observerOpts = { rootMargin: '-30% 0px -60% 0px' };
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOpts);
sections.forEach(s => sectionObserver.observe(s));

// Card entrance animations
const animOpts = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, animOpts);

document.querySelectorAll(
  '.expertise-card, .process-step, .condition-tag, .about-grid > *, .cred-item'
).forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  el.classList.add('anim-fade');
  animObserver.observe(el);
});

// Form handling
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate submission (replace with real endpoint)
  setTimeout(() => {
    btn.textContent = 'Sent';
    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Enquiry';
      btn.disabled = false;
      successMsg.style.display = 'none';
    }, 5000);
  }, 1200);
});
