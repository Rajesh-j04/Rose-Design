/**
 * ROSEDSIGNS — Creative & Digital Studio
 * Core Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNavigation();
  initScrollReveal();
  initBackToTop();
  initPortfolioFilters();
  initCaseStudyModal();
  initServicesAccordion();
  initProjectEstimator();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Behaviour
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Hamburger Navigation
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !hamburgerBtn.classList.contains('active');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileDrawer.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  };

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animation
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* --------------------------------------------------------------------------
   4. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.footer-back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Portfolio Filter System
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Case Study Modal with Full Project Details
   -------------------------------------------------------------------------- */
const CASE_STUDIES_DATA = {
  'a2b-perth': {
    title: 'A2B Perth — Adyar Ananda Bhavan',
    category: 'Brand Identity & Digital Dining Experience',
    client: 'A2B Western Australia',
    timeline: '12 Weeks',
    location: 'Perth (Yokine & Harrisdale), WA',
    heroImage: 'assets/images/project-a2b.svg',
    overview: 'Adyar Ananda Bhavan (A2B) is an internationally cherished South Indian vegetarian culinary institution with over three decades of royal tradition. RoseDsigns was commissioned to craft their brand extension for Western Australia, including bilingual dining menus, premium restaurant signage, online table reservation UX, and high-performance digital ordering.',
    challenge: 'Preserving the hallowed cultural heritage and flavor authenticity of Chennai while establishing a sophisticated, contemporary dining presence that resonates deeply with Perth food lovers and multicultural families.',
    solution: 'We synthesized traditional brass tones and royal spice motifs into a minimalist editorial identity. We engineered a responsive web platform with instant table booking, interactive visual menus, allergen filtering, and Google local SEO integration.',
    deliverables: [
      'Visual Identity System & Brand Standards',
      'Custom Bilingual Restaurant Menus (Print & Digital)',
      'Responsive Web Architecture & Reservation Engine',
      'Signage, Packaging & Takeaway Brand Collateral',
      'Social Launch Campaign & Local Perth SEO'
    ],
    outcome: 'Seamless launch across two flagship Perth locations (Yokine and Harrisdale), resulting in a 140% surge in online table bookings and top organic search ranking for Indian vegetarian dining in WA.'
  },
  'thirai-flicks': {
    title: 'Thirai Flicks — Theatrical Film Distribution',
    category: 'Entertainment Branding & Digital Promotion',
    client: 'Thirai Flicks Oceania',
    timeline: '10 Weeks',
    location: 'Australia, New Zealand & Pacific',
    heroImage: 'assets/images/project-thirai.svg',
    overview: 'Thirai Flicks is a premier film distribution house bringing blockbuster Indian cinema (Tamil, Telugu, Malayalam, Hindi, Kannada) to cinema lovers across Australia, New Zealand, and the Pacific. RoseDsigns built an integrated brand identity and high-impact theatrical marketing platform.',
    challenge: 'Cinematic distribution requires lightning-fast promotional cycles, theatre booking coordination across Hoyts and Event Cinemas, and captivating visuals that ignite ticket sales within hours of trailer drops.',
    solution: 'We developed a dynamic midnight navy and antique gold visual language with bespoke film reel emblems. A high-converting web portal powers live cinema showtimes, city-by-city ticketing links, press assets, and automated distributor booking inquiries.',
    deliverables: [
      'Theatrical Brand Identity & Motion Emblem',
      'Showtime Ticketing Web Platform',
      'Digital Cinema Campaign Collateral (Hoyts/Event)',
      'Distributor Partner Portal & Press Kit Engine',
      'Multi-Language Social Media Rollout Kit'
    ],
    outcome: 'Over 45 successful theatrical releases across 120+ screens in Australasia, establishing Thirai Flicks as one of the most reliable and culturally impactful Indian film distributors in the Pacific.'
  },
  'biriyani-box': {
    title: 'Biriyani Box — Elevated QSR Culinary Brand',
    category: 'QSR Branding & Packaging Architecture',
    client: 'Biriyani Box Pty Ltd',
    timeline: '8 Weeks',
    location: 'Australia',
    heroImage: 'assets/images/project-biriyani.svg',
    overview: 'Biriyani Box reimagined the authentic slow-dum biryani dining experience for the modern, fast-paced consumer. RoseDsigns shaped their entire brand ecosystem: from custom biodegradable thermal packaging to ordering app wireframes.',
    challenge: 'Creating a fast-casual brand that feels authentically artisanal and luxurious rather than generic fast food, ensuring that unboxing a takeaway meal feels like a royal dining ritual.',
    solution: 'Using rich Burgundy and warm Antique Gold, we crafted bespoke packaging with stamped seals, custom greaseproof botanical wrappers, and an intuitive, mobile-optimized direct ordering web app.',
    deliverables: [
      'Comprehensive Brand Identity & Monogram',
      'Custom Structural Packaging & Delivery Boxes',
      'Digital Menu UI & Direct Ordering App Interface',
      'In-Store Menu Displays & Retail Uniforms',
      'Social Launch Strategy & Photography Direction'
    ],
    outcome: '30% increase in repeat direct orders compared to third-party delivery apps, with widespread customer praise for the heat-retaining luxury packaging.'
  },
  'reflections': {
    title: 'Reflections — The Resilience of Extraordinary Lives',
    category: 'Documentary Storytelling & Digital Monograph',
    client: 'Reflections Project',
    timeline: 'Coming Soon / In Production',
    location: 'Australia & International',
    heroImage: 'assets/images/project-reflections.svg',
    overview: 'An ambitious documentary and editorial storytelling project exploring the resilience of extraordinary lives. RoseDsigns is directing the visual brand identity, digital publication architecture, and interactive narrative archive.',
    challenge: 'Weaving profound human narratives and oral histories into an intimate, dignified digital monograph that honors each subject with artistic gravitas.',
    solution: 'Crafting a contemplative midnight navy and antique gold visual language with bespoke typography, immersive chapter-by-chapter reading UX, and high-fidelity archival imagery.',
    deliverables: [
      'Editorial Monograph Identity & Monogram',
      'Interactive Storytelling Web Architecture',
      'Digital Publication & Audio-Visual Archive',
      'Printed Monograph & Exhibition Collateral',
      'Documentary Launch Campaign Materials'
    ],
    outcome: 'Currently in active studio production — Scheduled for public unveiling on the horizon.'
  },
  'palayam-peppers': {
    title: 'Palayam Peppers — A New Story',
    category: 'Heritage Spices & Artisanal Culinary Brand',
    client: 'Palayam Peppers',
    timeline: 'Coming Soon / In Development',
    location: 'India & Global Export',
    heroImage: 'assets/images/project-palayam.svg',
    overview: 'Palayam Peppers is a new chapter in the preservation and elevated presentation of authentic regional spices. RoseDsigns is sculpting their complete identity ecosystem from heritage emblem to tactile packaging.',
    challenge: 'Modernizing traditional agrarian spice heritage into an ultra-premium, design-forward brand for discerning international chefs and home epicureans.',
    solution: 'Deep British green and antique gold botanical visual architecture, custom-embossed airtight spice canister dielines, and an editorial direct-to-consumer digital store.',
    deliverables: [
      'Artisanal Heritage Monogram & Seal',
      'Bespoke Structural Packaging & Canisters',
      'DTC E-Commerce Store & Culinary Stories',
      'Regional Provenance Certification Labels',
      'Global Launch Identity Suite'
    ],
    outcome: 'Currently in active development — Scheduled for seasonal harvest launch.'
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.querySelector('.case-modal-overlay');
  const modalCloseBtn = document.querySelector('.case-modal-close');
  const projectCards = document.querySelectorAll('.portfolio-card[data-project-id]');

  if (!modalOverlay) return;

  const openModal = (projectId) => {
    const data = CASE_STUDIES_DATA[projectId];
    if (!data) return;

    const modalHeroImg = modalOverlay.querySelector('.case-modal-hero-img');
    const modalCategory = modalOverlay.querySelector('.case-modal-category');
    const modalTitle = modalOverlay.querySelector('.case-modal-title');
    const modalClient = modalOverlay.querySelector('.case-meta-client');
    const modalTimeline = modalOverlay.querySelector('.case-meta-timeline');
    const modalLocation = modalOverlay.querySelector('.case-meta-location');
    const modalOverview = modalOverlay.querySelector('.case-modal-overview');
    const modalChallenge = modalOverlay.querySelector('.case-modal-challenge');
    const modalSolution = modalOverlay.querySelector('.case-modal-solution');
    const modalOutcome = modalOverlay.querySelector('.case-modal-outcome');
    const modalDeliverables = modalOverlay.querySelector('.case-modal-deliverables-list');

    if (modalHeroImg) modalHeroImg.src = data.heroImage;
    if (modalHeroImg) modalHeroImg.alt = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalClient) modalClient.textContent = data.client;
    if (modalTimeline) modalTimeline.textContent = data.timeline;
    if (modalLocation) modalLocation.textContent = data.location;
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalChallenge) modalChallenge.textContent = data.challenge;
    if (modalSolution) modalSolution.textContent = data.solution;
    if (modalOutcome) modalOutcome.textContent = data.outcome;

    if (modalDeliverables) {
      modalDeliverables.innerHTML = '';
      data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.className = 'case-deliverable-item';
        li.textContent = item;
        modalDeliverables.appendChild(li);
      });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Services Accordion
   -------------------------------------------------------------------------- */
function initServicesAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  if (!accordionHeaders.length) return;

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close other accordions in the same group
      const parentGroup = item.parentElement;
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Project Scope Estimator / Explorer
   -------------------------------------------------------------------------- */
function initProjectEstimator() {
  const estimatorContainer = document.querySelector('.estimator-card');
  if (!estimatorContainer) return;

  const options = estimatorContainer.querySelectorAll('.estimator-option');
  const resultTimeline = estimatorContainer.querySelector('.est-timeline-val');
  const resultDeliverables = estimatorContainer.querySelector('.est-count-val');

  const updateEstimation = () => {
    const selected = estimatorContainer.querySelectorAll('.estimator-option.selected');
    let totalWeeks = 3; // Base discovery
    let totalCount = 0;

    selected.forEach(opt => {
      const weeks = parseInt(opt.getAttribute('data-weeks') || '2', 10);
      totalWeeks += weeks;
      totalCount += 1;
    });

    if (selected.length === 0) {
      if (resultTimeline) resultTimeline.textContent = 'Select disciplines below';
      if (resultDeliverables) resultDeliverables.textContent = '0 selected';
    } else {
      if (resultTimeline) resultTimeline.textContent = `Approx. ${totalWeeks}–${totalWeeks + 2} Weeks`;
      if (resultDeliverables) resultDeliverables.textContent = `${totalCount} Discipline${totalCount > 1 ? 's' : ''}`;
    }
  };

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('selected');
      const checkbox = opt.querySelector('.estimator-checkbox');
      if (checkbox) {
        checkbox.textContent = opt.classList.contains('selected') ? '✓' : '';
      }
      updateEstimation();
    });
  });

  updateEstimation();
}

/* --------------------------------------------------------------------------
   9. Contact Form & Client-Side Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-project-form');
  if (!form) return;

  const nameInput = form.querySelector('#contactName');
  const emailInput = form.querySelector('#contactEmail');
  const subjectInput = form.querySelector('#contactSubject');
  const messageInput = form.querySelector('#contactMessage');
  const servicePills = form.querySelectorAll('.service-pill-btn');
  const selectedServiceInput = form.querySelector('#selectedService');
  const successAlert = form.querySelector('.form-alert.success');
  const errorAlert = form.querySelector('.form-alert.error');
  const submitBtn = form.querySelector('.form-submit-btn');

  // Service Pill selection
  servicePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      servicePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (selectedServiceInput) {
        selectedServiceInput.value = pill.getAttribute('data-service') || pill.textContent.trim();
      }
    });
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const setError = (input, msg) => {
    input.classList.add('error');
    const parent = input.closest('.form-group');
    if (parent) {
      let errEl = parent.querySelector('.form-error-msg');
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'form-error-msg visible';
        parent.appendChild(errEl);
      }
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  };

  const clearError = (input) => {
    input.classList.remove('error');
    const parent = input.closest('.form-group');
    if (parent) {
      const errEl = parent.querySelector('.form-error-msg');
      if (errEl) {
        errEl.classList.remove('visible');
        errEl.textContent = '';
      }
    }
  };

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => clearError(inp));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false;

    // Validate Name
    if (!nameInput || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please enter your full name or company name.');
      hasError = true;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    if (!emailInput || !validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please provide a valid email address.');
      hasError = true;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput || subjectInput.value.trim().length < 3) {
      setError(subjectInput, 'Please enter a project subject or title.');
      hasError = true;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Please provide brief details about your project (at least 10 characters).');
      hasError = true;
    } else {
      clearError(messageInput);
    }

    if (hasError) {
      if (errorAlert) {
        errorAlert.textContent = 'Please fill out all required fields marked in red.';
        errorAlert.style.display = 'block';
      }
      if (successAlert) successAlert.style.display = 'none';
      return;
    }

    // Simulate submission state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Project Brief...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Project Brief';
      }
      if (errorAlert) errorAlert.style.display = 'none';
      if (successAlert) {
        successAlert.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
          Your creative project brief has been received. Our studio team in Perth & Chennai will review your scope and respond within 24 business hours.
        `;
        successAlert.style.display = 'block';
      }
      form.reset();
      servicePills.forEach(p => p.classList.remove('active'));
      if (servicePills[0]) servicePills[0].classList.add('active');
    }, 1000);
  });
}
