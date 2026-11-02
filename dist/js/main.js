/**
 * FRANCE LAURE • HAUTE COIFFURE & VISAGISME
 * Master JavaScript Controller: Motion, Logic, Interactivity & Booking Wizard
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. DATA DICTIONARIES
  // ==========================================================================
  const SERVICES_DATA = {
    femmes: [
      { id: 'f-1', name: 'Coupe Visagiste & Brushing Signature', price: '48 €', duration: '55 min', desc: 'Diagnostic morphologique, shampoing massant Kérastase, coupe couture et brushing sculpté.' },
      { id: 'f-2', name: 'Shampoing Soin & Brushing Haute Définition', price: '28 €', duration: '35 min', desc: 'Mise en forme lisse ou wavy naturel avec thermo-protecteur nourrissant.' },
      { id: 'f-3', name: 'Coupe Transformation & Conseil Relooking', price: '58 €', duration: '1h15', desc: 'Changement de style complet, dégradé papillon, frange rideau sur mesure.' },
      { id: 'f-4', name: 'Chignon Cocktail & Attache Haute Festivité', price: 'Dès 65 €', duration: '1h00', desc: 'Chignon flou, attaches tressées ou glamour événementiel.' }
    ],
    balayage: [
      { id: 'b-1', name: 'Balayage Lumière Prestige & Patine Gloss', price: 'Dès 125 €', duration: '2h30 à 3h00', desc: 'Fondu sans démarcation, blond lumineux ou doré, patine neutralisante et soin protecteur.' },
      { id: 'b-2', name: 'Baby-Lights & Éclaircissement Délicat', price: 'Dès 105 €', duration: '2h00', desc: 'Micro-mèches ultra fines pour un effet coup de soleil très naturel.' },
      { id: 'b-3', name: 'Hair Contouring & Éclaircissement Face-Framing', price: '75 €', duration: '1h15', desc: 'Éclaircissement concentré sur le pourtour du visage pour illuminer le regard.' }
    ],
    couleur: [
      { id: 'c-1', name: 'Coloration Racines & Bain de Brillance', price: '49 €', duration: '1h15', desc: '100% couverture des cheveux blancs, nuance sur mesure et brillance intense.' },
      { id: 'c-2', name: 'Gloss Miroir & Neutralisation de Reflets', price: '42 €', duration: '45 min', desc: 'Sublime le balayage, neutralise les reflets chauds indésirables, brillance miroir.' },
      { id: 'c-3', name: 'Coloration Totale Longueurs & Nuance Couture', price: 'Dès 69 €', duration: '1h30', desc: 'Nuances riches (chocolat, cuivré intense, marron glacé) des racines aux pointes.' }
    ],
    soins: [
      { id: 's-1', name: 'Protocole Sauvetage & Reconstruction Profonde', price: '65 €', duration: '50 min', desc: 'SOS cheveux cassants et sensibilisés par décoloration. Reconstruit la fibre interne.' },
      { id: 's-2', name: 'Rituel Kérastase Fusio-Dose™ Double Action', price: '35 €', duration: '25 min', desc: 'Concentré actif sur mesure (Nutrition, Force ou Brillance) et massage crânien.' },
      { id: 's-3', name: 'Soin Botox Capillaire Rajeunissant & Anti-Frizz', price: 'Dès 95 €', duration: '1h30', desc: 'Acide hyaluronique pur et kératine végétale, dompte les frisottis pendant 8 semaines.' }
    ],
    hommes: [
      { id: 'h-1', name: 'Coupe Homme Précision & Coiffage', price: '25 €', duration: '30 min', desc: 'Ciseaux et tondeuse, finitions au rasoir, shampoing purifiant mentholé.' },
      { id: 'h-2', name: 'Fade Américain & Soin Cuir Chevelu', price: '28 €', duration: '35 min', desc: 'Dégradé à blanc progressif et coiffage structuré mat.' },
      { id: 'h-3', name: 'Taille & Sculptage de Barbe Traditionnelle', price: '18 €', duration: '20 min', desc: 'Contours nets, serviette chaude et huile adoucissante.' }
    ]
  };

  // Schedule matrix: 0=Dim, 1=Lun, 2=Mar, 3=Mer, 4=Jeu, 5=Ven, 6=Sam
  const SALON_SCHEDULE = {
    0: { open: false, label: 'Dimanche', name: 'Dimanche' },
    1: { open: false, label: 'Lundi', name: 'Lundi' },
    2: { open: false, label: 'Mardi', name: 'Mardi' },
    3: { open: true, start: 8.5, end: 18.0, text: '08:30 – 18:00', name: 'Mercredi' },
    4: { open: true, start: 8.5, end: 18.0, text: '08:30 – 18:00', name: 'Jeudi' },
    5: { open: true, start: 8.5, end: 18.0, text: '08:30 – 18:00', name: 'Vendredi' },
    6: { open: true, start: 7.5, end: 16.0, text: '07:30 – 16:00', name: 'Samedi' }
  };

  // ==========================================================================
  // 2. LIVE SALON STATUS & OPERATING HOURS
  // ==========================================================================
  function updateSalonStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const drawerPill = document.getElementById('drawerStatusPill');
    
    // Get current date/time in Brussels timezone
    const now = new Date();
    // Convert to Brussels local hour and day
    const brusselsTimeStr = now.toLocaleString("en-US", { timeZone: "Europe/Brussels" });
    const brusselsDate = new Date(brusselsTimeStr);
    const day = brusselsDate.getDay();
    const currentDecimalHour = brusselsDate.getHours() + (brusselsDate.getMinutes() / 60);

    const todayRule = SALON_SCHEDULE[day];
    let isOpenNow = false;
    let message = '';

    if (todayRule.open && currentDecimalHour >= todayRule.start && currentDecimalHour < todayRule.end) {
      isOpenNow = true;
      const closingTime = day === 6 ? '16h00' : '18h00';
      message = `Ouvert aujourd'hui jusqu'à ${closingTime} • Réservez votre créneau`;
    } else {
      isOpenNow = false;
      // Determine next opening
      let nextDay = (day + 1) % 7;
      let daysCount = 1;
      while (!SALON_SCHEDULE[nextDay].open && daysCount < 7) {
        nextDay = (nextDay + 1) % 7;
        daysCount++;
      }
      const nextSchedule = SALON_SCHEDULE[nextDay];
      const nextHourStr = nextDay === 6 ? '07h30' : '08h30';
      
      if (todayRule.open && currentDecimalHour < todayRule.start) {
        message = `Ouvre aujourd'hui à ${todayRule.start === 7.5 ? '07h30' : '08h30'}`;
      } else if (daysCount === 1) {
        message = `Fermé actuellement • Réouverture demain à ${nextHourStr}`;
      } else {
        message = `Fermé actuellement • Réouverture ${nextSchedule.name} à ${nextHourStr}`;
      }
    }

    if (statusDot && statusText) {
      if (isOpenNow) {
        statusDot.className = 'status-dot pulse';
        statusText.innerHTML = `<strong>Ouvert</strong> • ${message}`;
      } else {
        statusDot.className = 'status-dot closed';
        statusText.innerHTML = message;
      }
    }

    if (drawerPill) {
      const dot = drawerPill.querySelector('.status-dot');
      const label = drawerPill.querySelector('.drawer-status-label');
      if (dot) dot.className = isOpenNow ? 'status-dot pulse' : 'status-dot closed';
      if (label) label.textContent = isOpenNow ? 'Salon ouvert actuellement' : 'Salon actuellement fermé';
    }

    // Highlight today in schedule table
    const scheduleRows = document.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.classList.add('today');
        const dayNameEl = row.querySelector('.day-name');
        if (dayNameEl && !dayNameEl.querySelector('.today-badge')) {
          const badge = document.createElement('span');
          badge.className = 'today-badge';
          badge.style.cssText = 'font-size:0.65rem; background:var(--gold-primary); color:#0E0E12; font-weight:700; padding:1px 5px; border-radius:4px; margin-left:6px; vertical-align:middle;';
          badge.textContent = "AUJ";
          dayNameEl.appendChild(badge);
        }
      } else {
        row.classList.remove('today');
      }
    });
  }

  updateSalonStatus();
  // Check every 60 seconds
  setInterval(updateSalonStatus, 60000);

  // ==========================================================================
  // 3. CUSTOM MAGNETIC CURSOR
  // ==========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderFollower = () => {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(renderFollower);
    };
    requestAnimationFrame(renderFollower);

    // Hover triggers
    const interactiveTargets = document.querySelectorAll('a, button, input, select, textarea, .pricing-row, .gallery-card, .tab-btn, .filter-btn');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ==========================================================================
  // 4. STICKY HEADER & SCROLL SPY
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Scrollspy
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // ==========================================================================
  // 6. SUBTLE HERO PARALLAX TILT
  // ==========================================================================
  const heroVisual = document.querySelector('.hero-visual');
  const parallaxNodes = document.querySelectorAll('[data-parallax]');

  if (heroVisual && window.matchMedia('(min-width: 992px)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      parallaxNodes.forEach(node => {
        const factor = parseFloat(node.getAttribute('data-parallax') || '0.05');
        const moveX = x * factor * 100;
        const moveY = y * factor * 100;
        node.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      parallaxNodes.forEach(node => {
        node.style.transform = 'translate3d(0, 0, 0)';
        node.style.transition = 'transform 0.5s ease';
      });
    });
  }

  // ==========================================================================
  // 7. PRICING TABS SWITCHER
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.pricing-tabs-nav .tab-btn');
  const tabPanels = document.querySelectorAll('.pricing-tabs-content .tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(`tab-${tabTarget}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 8. INTERACTIVE GALLERY & FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 9. LIGHTBOX MODAL CONTROLLER
  // ==========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxBookBtn = document.getElementById('lightboxBookBtn');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));

  function showLightbox(index) {
    const visible = visibleGalleryItems();
    if (!visible.length) return;

    currentGalleryIndex = (index + visible.length) % visible.length;
    const targetItem = visible[currentGalleryIndex];

    const imgSrc = targetItem.getAttribute('data-img') || targetItem.querySelector('img')?.src;
    const title = targetItem.getAttribute('data-title') || 'Création Haute Coiffure';
    const desc = targetItem.getAttribute('data-desc') || 'Réalisation au salon France Laure Molenbeek';
    const cat = targetItem.querySelector('.gallery-badge')?.textContent || 'France Laure';

    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    if (lightboxCategory) lightboxCategory.textContent = cat;

    lightboxModal?.classList.add('active');
    lightboxModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal?.classList.remove('active');
    lightboxModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, idx) => {
    const card = item.querySelector('.gallery-card');
    card?.addEventListener('click', () => {
      const visible = visibleGalleryItems();
      const visibleIdx = visible.indexOf(item);
      showLightbox(visibleIdx !== -1 ? visibleIdx : idx);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => showLightbox(currentGalleryIndex - 1));
  lightboxNext?.addEventListener('click', () => showLightbox(currentGalleryIndex + 1));

  // Lightbox Book Button
  lightboxBookBtn?.addEventListener('click', () => {
    closeLightbox();
    openBookingModal();
  });

  // ==========================================================================
  // 10. TESTIMONIALS SLIDER
  // ==========================================================================
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewSlides = document.querySelectorAll('.review-slide');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const sliderDotsContainer = document.getElementById('sliderDots');

  let currentSlide = 0;
  const totalSlides = reviewSlides.length;
  let autoplayTimer = null;

  // Build dots
  if (sliderDotsContainer && totalSlides > 0) {
    sliderDotsContainer.innerHTML = '';
    reviewSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Aller à l'avis ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      sliderDotsContainer.appendChild(dot);
    });
  }

  function updateSlidePosition() {
    if (!reviewsTrack) return;
    reviewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    const dots = sliderDotsContainer?.querySelectorAll('.slider-dot');
    dots?.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlidePosition();
  }

  sliderPrev?.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoplay();
  });

  sliderNext?.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoplay();
  });

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  const sliderWrap = document.querySelector('.reviews-slider-wrap');
  sliderWrap?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  sliderWrap?.addEventListener('mouseleave', startAutoplay);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  sliderWrap?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrap?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    } else if (touchEndX - touchStartX > 45) {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();

  // ==========================================================================
  // 11. INTERACTIVE BOOKING MODAL & WIZARD
  // ==========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const bookingTriggers = document.querySelectorAll('.btn-book-trigger');
  const bookServiceBtns = document.querySelectorAll('.btn-book-service');

  // Wizard Elements
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const stepPanels = [
    document.getElementById('stepPanel1'),
    document.getElementById('stepPanel2'),
    document.getElementById('stepPanel3'),
    document.getElementById('stepPanelSuccess')
  ];

  const bookingCategorySelect = document.getElementById('bookingCategory');
  const bookingServiceSelect = document.getElementById('bookingService');
  const previewServiceName = document.getElementById('previewServiceName');
  const previewServicePrice = document.getElementById('previewServicePrice');

  const bookingDateInput = document.getElementById('bookingDate');
  const bookingTimeSelect = document.getElementById('bookingTime');
  const dateValidationHint = document.getElementById('dateValidationHint');
  const operatingReminderText = document.getElementById('operatingReminderText');

  const clientNameInput = document.getElementById('clientName');
  const clientPhoneInput = document.getElementById('clientPhone');
  const clientEmailInput = document.getElementById('clientEmail');
  const clientNotesInput = document.getElementById('clientNotes');

  const recapService = document.getElementById('recapService');
  const recapDateTime = document.getElementById('recapDateTime');

  const nextToStep2 = document.getElementById('nextToStep2');
  const backToStep1 = document.getElementById('backToStep1');
  const nextToStep3 = document.getElementById('nextToStep3');
  const backToStep2 = document.getElementById('backToStep2');
  const bookingForm = document.getElementById('bookingForm');

  const successClientName = document.getElementById('successClientName');
  const successServiceName = document.getElementById('successServiceName');
  const successDate = document.getElementById('successDate');
  const whatsappSendBtn = document.getElementById('whatsappSendBtn');

  // Populate services based on category
  function populateServices(category, preselectedServiceName = null) {
    if (!bookingServiceSelect) return;
    bookingServiceSelect.innerHTML = '';

    const list = SERVICES_DATA[category] || SERVICES_DATA.balayage;
    list.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = item.name;
      opt.setAttribute('data-price', item.price);
      opt.setAttribute('data-duration', item.duration);
      opt.textContent = `${item.name} (${item.price})`;
      if (preselectedServiceName && item.name.toLowerCase().includes(preselectedServiceName.toLowerCase())) {
        opt.selected = true;
      } else if (!preselectedServiceName && idx === 0) {
        opt.selected = true;
      }
      bookingServiceSelect.appendChild(opt);
    });

    updateSelectedServicePreview();
  }

  function updateSelectedServicePreview() {
    const selectedOpt = bookingServiceSelect?.options[bookingServiceSelect.selectedIndex];
    if (selectedOpt) {
      const name = selectedOpt.value;
      const price = selectedOpt.getAttribute('data-price') || '';
      const dur = selectedOpt.getAttribute('data-duration') || '';
      if (previewServiceName) previewServiceName.textContent = name;
      if (previewServicePrice) previewServicePrice.textContent = `${price} • Durée estimée : ${dur} • Diagnostic offert`;
      if (recapService) recapService.textContent = `${name} (${price})`;
    }
  }

  bookingCategorySelect?.addEventListener('change', () => {
    populateServices(bookingCategorySelect.value);
  });

  bookingServiceSelect?.addEventListener('change', updateSelectedServicePreview);

  // Initialize service options with default 'balayage'
  populateServices('balayage');

  // Date picker minimum date (tomorrow)
  if (bookingDateInput) {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    const yyyy = tmrw.getFullYear();
    const mm = String(tmrw.getMonth() + 1).padStart(2, '0');
    const dd = String(tmrw.getDate()).padStart(2, '0');
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Date validation check
  function validateSelectedDate() {
    if (!bookingDateInput || !bookingDateInput.value) return false;
    const parts = bookingDateInput.value.split('-');
    const pickedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const day = pickedDate.getDay();

    if (day === 0 || day === 1 || day === 2) {
      if (dateValidationHint) {
        dateValidationHint.innerHTML = `<span style="color:var(--status-closed)">⚠️ Le salon est fermé le dimanche, lundi et mardi. Choisissez du mercredi au samedi.</span>`;
      }
      return false;
    } else {
      if (dateValidationHint) {
        dateValidationHint.innerHTML = `<span style="color:var(--status-open)">✓ Date valide (${SALON_SCHEDULE[day].name})</span>`;
      }
      // Adapt hours if Saturday (closes at 16:00, starts at 07:30)
      if (day === 6) {
        if (operatingReminderText) operatingReminderText.textContent = "Horaires Samedi : 07h30 – 16h00 (Fermeture anticipée)";
      } else {
        if (operatingReminderText) operatingReminderText.textContent = "Horaires Mercredi à Vendredi : 08h30 – 18h00";
      }
      return true;
    }
  }

  bookingDateInput?.addEventListener('change', validateSelectedDate);

  // Switch Wizard Step
  function setWizardStep(stepNum) {
    stepPanels.forEach((panel, i) => {
      if (panel) panel.classList.toggle('active', i === (stepNum - 1));
    });

    stepNodes.forEach(node => {
      const nodeStep = parseInt(node.getAttribute('data-step') || '1', 10);
      node.classList.toggle('active', nodeStep <= stepNum);
    });

    // Update recap
    if (stepNum === 3) {
      const dateVal = bookingDateInput?.value || '';
      const timeVal = bookingTimeSelect?.value || '';
      if (recapDateTime) {
        if (dateVal && timeVal) {
          const parts = dateVal.split('-');
          const d = new Date(parts[0], parts[1] - 1, parts[2]);
          const dateStr = d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
          recapDateTime.textContent = `${dateStr} à ${timeVal.replace(':', 'h')}`;
        } else {
          recapDateTime.textContent = 'Date à préciser lors de l’échange';
        }
      }
    }
  }

  // Wizard step navigation
  nextToStep2?.addEventListener('click', () => setWizardStep(2));
  backToStep1?.addEventListener('click', () => setWizardStep(1));

  nextToStep3?.addEventListener('click', () => {
    if (!bookingDateInput?.value) {
      alert("Veuillez sélectionner une date souhaitée pour votre rendez-vous.");
      bookingDateInput?.focus();
      return;
    }
    if (!validateSelectedDate()) {
      alert("Le salon est fermé le dimanche, lundi et mardi. Veuillez choisir un mercredi, jeudi, vendredi ou samedi.");
      return;
    }
    if (!bookingTimeSelect?.value) {
      alert("Veuillez sélectionner un créneau horaire indicatif.");
      bookingTimeSelect?.focus();
      return;
    }
    setWizardStep(3);
  });

  backToStep2?.addEventListener('click', () => setWizardStep(2));

  // Form Submit
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = clientNameInput?.value.trim() || 'Cliente';
    const phone = clientPhoneInput?.value.trim() || '';
    const email = clientEmailInput?.value.trim() || '';
    const notes = clientNotesInput?.value.trim() || '';
    const service = bookingServiceSelect?.value || 'Prestation Coiffure';
    const dateVal = bookingDateInput?.value || '';
    const timeVal = bookingTimeSelect?.value || '';

    if (!phone) {
      alert("Veuillez renseigner votre numéro de téléphone afin que nous puissions confirmer votre créneau.");
      clientPhoneInput?.focus();
      return;
    }

    // Populate success panel
    if (successClientName) successClientName.textContent = name;
    if (successServiceName) successServiceName.textContent = service;
    if (successDate) successDate.textContent = `${dateVal} à ${timeVal}`;

    // Generate WhatsApp text
    const waText = encodeURIComponent(
      `Bonjour France Laure Coiffure,\n\nJe souhaite réserver un rendez-vous :\n` +
      `• Nom : ${name}\n` +
      `• Téléphone : ${phone}\n` +
      `• Prestation : ${service}\n` +
      `• Date souhaitée : ${dateVal}\n` +
      `• Heure souhaitée : ${timeVal}\n` +
      (notes ? `• Remarques : ${notes}\n` : '') +
      `\nMerci de me confirmer la disponibilité du créneau.`
    );

    if (whatsappSendBtn) {
      whatsappSendBtn.href = `https://wa.me/3224106004?text=${waText}`;
    }

    // Show success panel
    setWizardStep(4);
  });

  // Modal Open / Close
  function openBookingModal(preselectedService = null, categoryHint = null) {
    if (categoryHint && SERVICES_DATA[categoryHint]) {
      bookingCategorySelect.value = categoryHint;
      populateServices(categoryHint, preselectedService);
    } else if (preselectedService) {
      // Find category
      let foundCat = 'balayage';
      for (const [catKey, sList] of Object.entries(SERVICES_DATA)) {
        if (sList.some(s => s.name.toLowerCase().includes(preselectedService.toLowerCase()))) {
          foundCat = catKey;
          break;
        }
      }
      bookingCategorySelect.value = foundCat;
      populateServices(foundCat, preselectedService);
    }

    setWizardStep(1);
    bookingModal?.classList.add('active');
    bookingModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideBookingModal() {
    bookingModal?.classList.remove('active');
    bookingModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  bookingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      const cat = btn.getAttribute('data-category');
      openBookingModal(service, cat);
    });
  });

  bookServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      openBookingModal(service);
    });
  });

  closeBookingModal?.addEventListener('click', hideBookingModal);
  cancelModalBtn?.addEventListener('click', hideBookingModal);
  closeSuccessModalBtn?.addEventListener('click', hideBookingModal);

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal?.classList.contains('active')) hideBookingModal();
      if (lightboxModal?.classList.contains('active')) closeLightbox();
      if (mobileDrawer?.classList.contains('active')) closeDrawer();
    } else if (e.key === 'ArrowLeft' && lightboxModal?.classList.contains('active')) {
      showLightbox(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight' && lightboxModal?.classList.contains('active')) {
      showLightbox(currentGalleryIndex + 1);
    }
  });

  // ==========================================================================
  // 12. SCROLL REVEAL ANIMATIONS & STAT COUNTERS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const countElements = document.querySelectorAll('.stat-number');
  let countsAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Animate stat counters
  const statsSection = document.querySelector('.about-stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countsAnimated) {
        countsAnimated = true;
        countElements.forEach(el => {
          const rawCount = el.getAttribute('data-count');
          if (!rawCount) return;

          const target = parseFloat(rawCount);
          const isDecimal = rawCount.includes('.');
          const duration = 1600;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeOut = 1 - (1 - progress) * (1 - progress);
            const currentVal = easeOut * target;

            if (isDecimal) {
              el.textContent = currentVal.toFixed(1) + '/5';
            } else if (target >= 1000) {
              el.textContent = '+' + Math.floor(currentVal);
            } else if (target === 100) {
              el.textContent = Math.floor(currentVal) + '%';
            } else {
              el.textContent = Math.floor(currentVal) + '+';
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        });
      }
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }

  // ==========================================================================
  // 13. DYNAMIC YEAR
  // ==========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
