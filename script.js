/* =========================================================
   PETIFY — interactivity
   Sample/demo data only. No backend is connected.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Sample data ---------- */

  const REGISTRY = {
    'PTF-482913': {
      name: 'Maple',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '3 yrs',
      status: 'Active',
      owner: 'Jordan Reyes',
      contact: '+1 (555) 019-2244',
      address: 'Portland, OR',
      photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80'
    },
    'PTF-119042': {
      name: 'Biscuit',
      species: 'Cat',
      breed: 'Domestic Shorthair',
      age: '2 yrs',
      status: 'Active',
      owner: 'Priya Nair',
      contact: '+1 (555) 048-7731',
      address: 'Austin, TX',
      photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=200&q=80'
    }
  };

  const COMMUNITY = [
    { name: 'Maple', id: 'PTF-482913', species: 'Dog', location: 'Portland, OR', status: 'Active',
      img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Biscuit', id: 'PTF-119042', species: 'Cat', location: 'Austin, TX', status: 'Active',
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80' },
    { name: 'Rocket', id: 'PTF-330217', species: 'Dog', location: 'Denver, CO', status: 'Active',
      img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80' },
    { name: 'Pepper', id: 'PTF-205588', species: 'Cat', location: 'Seattle, WA', status: 'Active',
      img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80' },
    { name: 'Milo', id: 'PTF-481902', species: 'Dog', location: 'Quezon City, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80' },
    { name: 'Luna', id: 'PTF-617304', species: 'Cat', location: 'Makati, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1656060841232-1e6357780ad4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Toby', id: 'PTF-925810', species: 'Dog', location: 'Pasig, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Nala', id: 'PTF-734629', species: 'Cat', location: 'Taguig, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1652990251361-8d4061f6d724?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bruno', id: 'PTF-164275', species: 'Dog', location: 'Manila, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cleo', id: 'PTF-856491', species: 'Cat', location: 'Marikina, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1627230123262-27ccd4a6038b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Coco', id: 'PTF-348127', species: 'Dog', location: 'Parañaque, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mochi', id: 'PTF-209563', species: 'Cat', location: 'Mandaluyong, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1654606108404-1d8fd3cf0320?auto=format&fit=crop&w=400&q=80' }
  ];

  const STRAY_CATS = [
    { name: 'Dog', id: 'PTF-ST-0417', location: 'Quezon City, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cat', id: 'PTF-ST-0392', location: 'Makati, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1656060841232-1e6357780ad4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Squirrel', id: 'PTF-ST-0448', location: 'Manila, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1652489994639-961ff24edcf7?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dog', id: 'PTF-ST-0286', location: 'Pasig, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cat', id: 'PTF-ST-0513', location: 'Taguig, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1652990251361-8d4061f6d724?auto=format&fit=crop&w=400&q=80' },
    { name: 'Squirrel', id: 'PTF-ST-0528', location: 'Marikina, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1600704090840-533fc2be4f1d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dog', id: 'PTF-ST-0534', location: 'Parañaque, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cat', id: 'PTF-ST-0541', location: 'Mandaluyong, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1627230123262-27ccd4a6038b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Squirrel', id: 'PTF-ST-0557', location: 'San Juan, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1738600335064-6de352f993d2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dog', id: 'PTF-ST-0569', location: 'Manila, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80' },
    { name: 'Cat', id: 'PTF-ST-0573', location: 'Pasay, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1654606108404-1d8fd3cf0320?auto=format&fit=crop&w=400&q=80' },
    { name: 'Squirrel', id: 'PTF-ST-0586', location: 'Caloocan, PH', status: 'Active',
      img: 'https://images.unsplash.com/photo-1624295550231-06453b87801f?auto=format&fit=crop&w=400&q=80' }
  ];

  /* ---------- Utilities ---------- */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  /* ---------- Mobile menu ---------- */

  const burgerBtn = $('#burgerBtn');
  const mobileMenu = $('#mobileMenu');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    $$('#mobileMenu a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Modals ---------- */

  const overlay = $('#modalOverlay');
  const modals = { signup: $('#signupModal'), contact: $('#contactModal') };

  function openModal(name) {
    const modal = modals[name];
    if (!modal || !overlay) return;
    Object.values(modals).forEach((m) => m && m.setAttribute('hidden', ''));
    modal.removeAttribute('hidden');
    overlay.classList.add('is-open');
    const firstField = modal.querySelector('input, textarea');
    if (firstField) setTimeout(() => firstField.focus(), 50);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    Object.values(modals).forEach((m) => m && m.setAttribute('hidden', ''));
  }

  $$('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-open-modal')));
  });

  $$('[data-close-modal]').forEach((btn) => btn.addEventListener('click', closeModal));

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  $$('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('This is a design preview — no data was submitted.');
      form.reset();
    });
  });

  /* ---------- Verify PETIFY ID ---------- */

  const verifyForm = $('#verifyForm');
  const verifyInput = $('#petifyIdInput');
  const verifyResult = $('#verifyResult');

  function renderVerified(id, pet) {
    verifyResult.classList.remove('is-error');
    verifyResult.innerHTML = `
      <div class="verify-card__top">
        <img class="verify-card__photo" src="${pet.photo}" alt="Photo of ${pet.name}">
        <div>
          <p class="verify-card__name">${pet.name}</p>
          <span class="verify-card__badge">✓ PETIFY ID verified</span>
        </div>
      </div>
      <dl class="verify-card__grid">
        <div><dt>PETIFY ID</dt><dd>${id}</dd></div>
        <div><dt>Species</dt><dd>${pet.species}</dd></div>
        <div><dt>Breed</dt><dd>${pet.breed}</dd></div>
        <div><dt>Age</dt><dd>${pet.age}</dd></div>
        <div><dt>Status</dt><dd>${pet.status}</dd></div>
        <div><dt>Registered location</dt><dd>${pet.address}</dd></div>
        <div><dt>Owner</dt><dd>${pet.owner}</dd></div>
        <div><dt>Contact</dt><dd>${pet.contact}</dd></div>
      </dl>
    `;
    verifyResult.hidden = false;
  }

  function renderNotFound(id) {
    verifyResult.classList.add('is-error');
    verifyResult.innerHTML = `
      <p class="verify__error-title">No record found for "${id}"</p>
      <p class="verify__error-text">Double-check the PETIFY ID and try again, or try one of the sample IDs above.</p>
    `;
    verifyResult.hidden = false;
  }

  if (verifyForm) {
    verifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = verifyInput.value.trim().toUpperCase();
      if (!raw) return;
      const pet = REGISTRY[raw];
      if (pet) {
        renderVerified(raw, pet);
      } else {
        renderNotFound(raw);
      }
      verifyResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  $$('[data-fill-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-fill-id');
      verifyInput.value = id;
      verifyForm.dispatchEvent(new Event('submit', { cancelable: true }));
    });
  });

  /* ---------- Populate community + stray cat grids ---------- */

  function petCardHTML(entry, statusClass) {
    return `
      <article class="p-card">
        <div class="p-card__img">
          <img src="${entry.img}" alt="${entry.name}" loading="lazy">
        </div>
        <div class="p-card__body">
          <div class="p-card__name-row">
            <span class="p-card__name">${entry.name}</span>
            <span class="p-card__id">${entry.id}</span>
          </div>
          <p class="p-card__meta">${entry.species ? entry.species + ' · ' : ''}${entry.location}</p>
          <span class="p-card__status ${statusClass || ''}">${entry.status}</span>
        </div>
      </article>
    `;
  }

  const communityGrid = $('#communityGrid');
  if (communityGrid) {
    communityGrid.innerHTML = COMMUNITY.map((p) => petCardHTML(p)).join('');
  }

  const catsGrid = $('#catsGrid');
  if (catsGrid) {
    catsGrid.innerHTML = STRAY_CATS
      .map((c) => petCardHTML(c, c.status === 'Reported' ? 'p-card__status--found' : ''))
      .join('');
  }

  /* ---------- Sticky nav shadow on scroll ---------- */

  const nav = $('.nav');
  if (nav) {
    let lastState = false;
    const onScroll = () => {
      const scrolled = window.scrollY > 8;
      if (scrolled !== lastState) {
        nav.style.boxShadow = scrolled ? '0 4px 20px -8px rgba(28,36,48,0.12)' : 'none';
        lastState = scrolled;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
