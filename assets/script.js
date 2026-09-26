/**
 * Mohd Jibraan — Portfolio Interactive Scripts
 * Pure Vanilla JavaScript: Custom Cursor, Canvas Particle Mesh, Tilt Physics,
 * Smooth Scroll, Live Hyderabad Clock, Clipboard Copy & Scroll Animations.
 * Performance Optimized:
 *   - All scroll listeners use { passive: true }
 *   - Scroll handler fully RAF-throttled (no DOM reads inside scroll callback)
 *   - Section positions cached and only updated on resize (debounced)
 *   - Canvas pauses when off-screen (IntersectionObserver) and when tab hidden
 *   - Reduced particle count on mobile (12 vs 35)
 *   - Lenis smooth scroll on desktop only
 *   - prefers-reduced-motion respected throughout
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------------
  // 1. Live Hyderabad Clock (IST: UTC+5:30)
  // ---------------------------------------------------------------------------
  function updateHyderabadTime() {
    const clockElements = document.querySelectorAll('.live-hyd-time');
    if (!clockElements.length) return;

    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedTime = formatter.format(new Date());

      clockElements.forEach(el => {
        el.textContent = `${formattedTime} IST`;
      });
    } catch {
      // Fallback manual calculation if Intl timezone fails
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      let hours = istTime.getHours();
      const minutes = String(istTime.getMinutes()).padStart(2, '0');
      const seconds = String(istTime.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formatted = `${hours}:${minutes}:${seconds} ${ampm} IST`;
      clockElements.forEach(el => {
        el.textContent = formatted;
      });
    }
  }

  updateHyderabadTime();
  setInterval(updateHyderabadTime, 1000);

  // ---------------------------------------------------------------------------
  // 2. Custom Cursor Physics (Desktop Only, Reduced Motion Respected)
  // ---------------------------------------------------------------------------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (!isTouchDevice && !prefersReducedMotion && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let cursorRafId = null;

    // Use transform instead of top/left to stay on compositor thread
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '0.75';
        isVisible = true;
      }

      // Dot follows exactly — no lag needed
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    // Spring Lerp Loop for follower ring — runs on RAF, never blocks scroll
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      cursorRafId = requestAnimationFrame(renderCursor);
    }
    cursorRafId = requestAnimationFrame(renderCursor);

    // Hover interactive scaling
    const hoverTargets = document.querySelectorAll('a, button, .service-card, .project-card, .skill-card, .pillar-card, .credential-card, .beyond-card, .achievements-strip, input, textarea');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      }, { passive: true });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      }, { passive: true });
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isVisible = false;
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Canvas Ambient Particle Grid / Constellation
  //    - Pauses when off-screen (IntersectionObserver)
  //    - Pauses when tab hidden (visibilitychange)
  //    - Reduced particle count on mobile (8) vs desktop (28)
  //    - Completely skipped when prefers-reduced-motion
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    // Reduced counts: mobile gets 8, desktop gets 28 (was 12/35)
    const particleCount = isMobile ? 8 : 28;
    const mouse = { x: -1000, y: -1000, radius: 120 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    }, { passive: true });

    // Only track mouse on non-touch devices (no extra work on mobile)
    if (!isTouchDevice) {
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }, { passive: true });
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (!isTouchDevice) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 255, 0, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isCanvasVisible = true;
    let isTabVisible = !document.hidden;
    let canvasRafId = null;

    function startCanvasAnimation() {
      if (!canvasRafId && isCanvasVisible && isTabVisible) {
        canvasRafId = requestAnimationFrame(animateParticles);
      }
    }

    function stopCanvasAnimation() {
      if (canvasRafId) {
        cancelAnimationFrame(canvasRafId);
        canvasRafId = null;
      }
    }

    // Pause canvas when scrolled off-screen (canvas is fixed, but this
    // catches when the user is deep in the page on low-end devices)
    if ('IntersectionObserver' in window) {
      const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible) {
            startCanvasAnimation();
          } else {
            stopCanvasAnimation();
          }
        });
      }, { threshold: 0 });

      canvasObserver.observe(canvas);
    }

    // Pause canvas when tab is hidden — saves battery significantly
    document.addEventListener('visibilitychange', () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startCanvasAnimation();
      } else {
        stopCanvasAnimation();
      }
    });

    // Use squared distance for connection check — avoids Math.sqrt in hot loop
    const maxLineDist = 100;
    const maxLineDistSq = maxLineDist * maxLineDist;

    function animateParticles() {
      if (!isCanvasVisible || !isTabVisible) {
        canvasRafId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Batch line drawing: draw all connections before all dots
      // This minimises context state switches (fillStyle vs strokeStyle)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxLineDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxLineDist) * 0.12;
            ctx.strokeStyle = `rgba(212, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      canvasRafId = requestAnimationFrame(animateParticles);
    }

    startCanvasAnimation();
  } else if (canvas && prefersReducedMotion) {
    // Hide canvas entirely for reduced-motion users
    canvas.style.display = 'none';
  }

  // ---------------------------------------------------------------------------
  // 4. Header Scroll State & Active Section Highlighting
  //    - scroll listener uses { passive: true }
  //    - RAF-throttled: zero DOM reads inside scroll callback
  //    - Section positions cached; only updated on resize (debounced 200ms)
  // ---------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cache section positions once; refresh only on resize
  let sectionPositions = [];
  function updateSectionPositions() {
    sectionPositions = Array.from(sections).map(sec => ({
      id: sec.getAttribute('id'),
      top: sec.offsetTop,
      bottom: sec.offsetTop + sec.offsetHeight
    }));
  }
  updateSectionPositions();

  let resizePosTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizePosTimeout);
    resizePosTimeout = setTimeout(updateSectionPositions, 200);
  }, { passive: true });

  // State tracked outside RAF to avoid redundant class toggles
  let isHeaderScrolled = false;
  let activeSectionId = '';
  let scrollTicking = false;

  function performScrollUpdate() {
    const scrollY = window.scrollY;

    // Only touch the DOM if state actually changed
    const shouldHeaderBeScrolled = scrollY > 40;
    if (shouldHeaderBeScrolled !== isHeaderScrolled) {
      isHeaderScrolled = shouldHeaderBeScrolled;
      if (header) {
        header.classList.toggle('scrolled', isHeaderScrolled);
      }
    }

    // Determine current section using cached positions — no layout reads
    const probeY = scrollY + 180;
    let currentId = '';
    for (let i = 0; i < sectionPositions.length; i++) {
      const pos = sectionPositions[i];
      if (probeY >= pos.top && probeY <= pos.bottom) {
        currentId = pos.id;
        break;
      }
    }

    if (currentId && currentId !== activeSectionId) {
      activeSectionId = currentId;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  }

  function handleScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        performScrollUpdate();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  // passive: true — browser never waits for JS before scrolling
  window.addEventListener('scroll', handleScroll, { passive: true });
  performScrollUpdate();

  // ---------------------------------------------------------------------------
  // 5. Mobile Drawer Navigation
  // ---------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const backdropOverlay = document.querySelector('.backdrop-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  function openMobileMenu() {
    mobileToggle?.classList.add('open');
    mobileDrawer?.classList.add('open');
    backdropOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove('open');
    mobileDrawer?.classList.remove('open');
    backdropOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (backdropOverlay) {
    backdropOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---------------------------------------------------------------------------
  // 6. Intersection Observer for Scroll Reveals
  //    - Elements revealed immediately for reduced-motion users
  //    - unobserves after first reveal to free resources
  // ---------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (prefersReducedMotion) {
    // Immediately show all elements — CSS @media also handles this
    revealElements.forEach(el => el.classList.add('revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve once revealed — stops observer overhead
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ---------------------------------------------------------------------------
  // 7. Interactive 3D Card Hover & Mouse Spotlights (Desktop Only)
  //    - RAF-throttled per card to avoid layout thrash
  //    - Skipped entirely on touch devices and reduced-motion
  // ---------------------------------------------------------------------------
  if (!isTouchDevice && !prefersReducedMotion) {
    const interactiveCards = document.querySelectorAll('.service-card, .project-card, .beyond-card');
    interactiveCards.forEach(card => {
      let cardTicking = false;
      card.addEventListener('mousemove', (e) => {
        if (cardTicking) return;
        cardTicking = true;
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          if (card.classList.contains('project-card')) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
          }
          cardTicking = false;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('project-card')) {
          card.style.transform = '';
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 8. Clipboard Copy with Toast Feedback
  // ---------------------------------------------------------------------------
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(text) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = text;
    toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2600);
  }

  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label}: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`${label}: ${text}`);
    } catch {
      showToast(`Copy failed. Value: ${text}`);
    }
    document.body.removeChild(textArea);
  }

  // ---------------------------------------------------------------------------
  // 9. Back To Top Button
  // ---------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Smooth Scroll — Lenis (Desktop Only, not reduced-motion)
  //     Falls back gracefully to native smooth scroll on mobile/reduced-motion
  // ---------------------------------------------------------------------------
  if (typeof Lenis !== 'undefined' && !isTouchDevice && !prefersReducedMotion) {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch {
      // Graceful fallback to browser scroll behavior
    }
  }

  // Anchor link smooth-scroll — respects reduced-motion
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
});

/* ==========================================================================
   Certificate Lightbox — image-only gallery with modal detail view
   Lightweight, no dependencies. Triggered by .cert-thumb-card[data-cert-*].
   ========================================================================== */
(function () {
  'use strict';

  const lightbox    = document.getElementById('cert-lightbox');
  const panel       = lightbox && lightbox.querySelector('.cert-lightbox-panel');
  const closeBtn    = document.getElementById('cert-lightbox-close');
  const backdrop    = lightbox && lightbox.querySelector('.cert-lightbox-backdrop');
  const modalImg    = document.getElementById('cert-lightbox-img');
  const modalTitle  = document.getElementById('cert-lightbox-title');
  const modalIssuer = document.getElementById('cert-lightbox-issuer');
  const modalDesc   = document.getElementById('cert-lightbox-desc');
  const modalLink   = document.getElementById('cert-lightbox-link');

  if (!lightbox) return; // Guard: section not present

  let previouslyFocused = null;

  /* ---------- Helpers ---------- */

  function openModal(card) {
    const type   = card.dataset.certType   || 'image';
    const src    = card.dataset.certSrc    || '';
    const title  = card.dataset.certTitle  || '';
    const issuer = card.dataset.certIssuer || '';
    const desc   = card.dataset.certDesc   || '';

    // Populate image
    const thumbImg = card.querySelector('img');
    if (type === 'pdf') {
      // For PDFs keep the thumbnail in the modal, open via button
      modalImg.src = thumbImg ? thumbImg.src : '';
      modalLink.href = src;
      modalLink.removeAttribute('hidden');
    } else {
      // For images swap to the full-res file
      modalImg.src = src;
      modalLink.setAttribute('hidden', '');
    }
    modalImg.alt = title;

    // Populate text
    modalTitle.textContent  = title;
    modalIssuer.textContent = issuer;
    modalDesc.textContent   = desc;

    // Show
    previouslyFocused = document.activeElement;
    lightbox.removeAttribute('hidden');
    // Trigger CSS transition on next paint
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lightbox.classList.add('cert-lightbox--open');
      });
    });

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    closeBtn.focus();
  }

  function closeModal() {
    lightbox.classList.remove('cert-lightbox--open');

    // Wait for CSS transition before hiding
    panel.addEventListener('transitionend', function handler() {
      panel.removeEventListener('transitionend', handler);
      lightbox.setAttribute('hidden', '');
    });

    // Restore scroll
    document.body.style.overflow = '';

    // Return focus to the card that opened the modal
    if (previouslyFocused) previouslyFocused.focus();
  }

  /* ---------- Event listeners ---------- */

  // Open on thumbnail card click
  document.querySelectorAll('.cert-thumb-card').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card); });
  });

  // Close on X button
  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  backdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // Trap focus inside modal when open
  lightbox.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || lightbox.hasAttribute('hidden')) return;
    var focusable = lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });

}());

/* ==========================================================================
   legezt AI Support Chat Widget
   - Lightweight, dependency-free vanilla JS
   - Connects to AWS API Gateway endpoint
   - Smooth transitions, auto-scrolling, typing indicator & suggestion chips
   ========================================================================== */
(function () {
  'use strict';

  function initChatWidget() {
    const trigger = document.getElementById('lcw-trigger');
    const panel = document.getElementById('lcw-panel');
    const closeBtn = document.getElementById('lcw-close');
    const messagesArea = document.getElementById('lcw-messages');
    const chipsArea = document.getElementById('lcw-chips');
    const form = document.getElementById('lcw-form');
    const input = document.getElementById('lcw-input');
    const sendBtn = form ? form.querySelector('.lcw-send') : null;

    if (!trigger || !panel || !messagesArea || !form || !input) return;

    const CHAT_ENDPOINT = 'https://l07aqoacd3.execute-api.us-east-1.amazonaws.com/chat';
    const GREETING_TEXT = "Hi there! I'm legezt AI support for Mohd Jibraan. Ask me anything about his skills, projects, experience, or how to get in touch!";

    let isWaitingForReply = false;
    let greetingShown = false;
    let transitionTimer = null;
    let typingElement = null;

    function isPanelOpen() {
      return !panel.hasAttribute('hidden') && panel.classList.contains('lcw-panel--open');
    }

    function scrollToBottom() {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = 'lcw-msg ' + (sender === 'user' ? 'lcw-msg--user' : 'lcw-msg--ai');
      msg.textContent = text;
      messagesArea.appendChild(msg);
      scrollToBottom();
      return msg;
    }

    function appendErrorMessage(text, retryQuery) {
      const msg = document.createElement('div');
      msg.className = 'lcw-msg lcw-msg--error';

      const textNode = document.createElement('div');
      textNode.textContent = text;
      msg.appendChild(textNode);

      if (retryQuery) {
        const retryBtn = document.createElement('button');
        retryBtn.type = 'button';
        retryBtn.className = 'lcw-retry-btn';
        retryBtn.textContent = 'Retry';
        retryBtn.addEventListener('click', function () {
          sendMessage(retryQuery);
        });
        msg.appendChild(retryBtn);
      }

      messagesArea.appendChild(msg);
      scrollToBottom();
    }

    function showTypingIndicator() {
      if (typingElement) return;
      typingElement = document.createElement('div');
      typingElement.className = 'lcw-typing';
      typingElement.setAttribute('aria-label', 'AI is typing');
      typingElement.innerHTML = '<span class="lcw-typing-dot"></span><span class="lcw-typing-dot"></span><span class="lcw-typing-dot"></span>';
      messagesArea.appendChild(typingElement);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
      }
      typingElement = null;
    }

    function hideChips() {
      if (chipsArea) {
        chipsArea.style.display = 'none';
      }
    }

    function openPanel() {
      if (transitionTimer) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
      }

      panel.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');

      // Double requestAnimationFrame ensures smooth transition
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.classList.add('lcw-panel--open');
        });
      });

      if (!greetingShown) {
        appendMessage('ai', GREETING_TEXT);
        greetingShown = true;
      }

      scrollToBottom();
      setTimeout(function () {
        input.focus();
      }, 80);
    }

    function closePanel() {
      panel.classList.remove('lcw-panel--open');
      trigger.setAttribute('aria-expanded', 'false');

      function onTransitionEnd(e) {
        if (e.target !== panel) return;
        panel.removeEventListener('transitionend', onTransitionEnd);
        if (!panel.classList.contains('lcw-panel--open')) {
          panel.setAttribute('hidden', '');
        }
      }
      panel.addEventListener('transitionend', onTransitionEnd);

      transitionTimer = setTimeout(function () {
        panel.setAttribute('hidden', '');
      }, 280);

      trigger.focus();
    }

    function togglePanel() {
      if (isPanelOpen()) {
        closePanel();
      } else {
        openPanel();
      }
    }

    async function sendMessage(text) {
      const trimmed = (text || '').trim();
      if (!trimmed || isWaitingForReply) return;

      isWaitingForReply = true;
      hideChips();

      // Clear input and reset height
      input.value = '';
      input.style.height = '';
      if (sendBtn) sendBtn.disabled = true;

      // Append user bubble
      appendMessage('user', trimmed);

      // Show typing indicator
      showTypingIndicator();

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bot: 'portfolio',
            message: trimmed
          })
        });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        const data = await response.json();
        removeTypingIndicator();

        if (data && typeof data.reply === 'string') {
          appendMessage('ai', data.reply);
        } else if (data && data.error) {
          appendErrorMessage('Sorry: ' + data.error + '. Please try again.', trimmed);
        } else {
          appendErrorMessage("Sorry, I couldn't process the response. Please try again.", trimmed);
        }
      } catch (err) {
        removeTypingIndicator();
        appendErrorMessage("Sorry, I couldn't reach the AI service right now. Please check your connection and try again.", trimmed);
      } finally {
        isWaitingForReply = false;
        if (sendBtn) sendBtn.disabled = false;
        if (isPanelOpen()) {
          input.focus();
        }
      }
    }

    // Trigger click
    trigger.addEventListener('click', togglePanel);

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
    }

    // Suggestion chips
    if (chipsArea) {
      const chipButtons = chipsArea.querySelectorAll('.lcw-chip');
      chipButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const query = btn.getAttribute('data-msg') || btn.textContent.trim();
          sendMessage(query);
        });
      });
    }

    // Enter sends, Shift+Enter inserts newline
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    // Auto-grow textarea up to 100px
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Form submit button
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sendMessage(input.value);
    });

    // Escape key closes panel
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isPanelOpen()) {
        closePanel();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
}());
