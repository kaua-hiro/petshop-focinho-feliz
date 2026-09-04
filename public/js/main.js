// ---- nav shadow + shrink, and reading progress bar ----
const nav = document.getElementById("nav");
const progressBar = document.getElementById("progressBar");
if (nav || progressBar) {
  const onScroll = () => {
    if (nav) {
      const scrolled = window.scrollY > 8;
      nav.style.boxShadow = scrolled ? "0 6px 18px -14px rgba(15, 32, 80, 0.5)" : "none";
      nav.classList.toggle("nav--scrolled", scrolled);
    }
    if (progressBar) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---- fade lazy images in once loaded ----
document.querySelectorAll(".fade-img").forEach((img) => {
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add("is-loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
  }
});

// ---- motion (spring physics via the Motion library, when it loaded) ----
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMotion = !prefersReducedMotion && typeof window.Motion !== "undefined";

// ---- hero entrance ----
if (hasMotion) {
  const { animate, stagger, spring } = window.Motion;
  animate(
    ".hero .eyebrow, .hero__title, .hero__lede, .hero__actions, .hero__chips, .hero__card",
    { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
    { delay: stagger(0.1), type: spring, bounce: 0.22, duration: 700 }
  );
}

// ---- dog line-drawing reveal (final CTA) ----
if (hasMotion) {
  const { inView, animate, stagger } = window.Motion;
  const dogWrap = document.querySelector("[data-dog-draw]");
  if (dogWrap) {
    const paths = Array.from(dogWrap.querySelectorAll("path"));
    inView(dogWrap, () => {
      animate(paths, { pathLength: [0, 1] }, { duration: 1.6, delay: stagger(0.12), easing: "ease-in-out" })
        .finished.then(() => {
          animate(paths, { fill: ["rgba(245,135,31,0)", "rgba(245,135,31,.16)"] }, { duration: 0.6 });
        });
    }, { amount: 0.5 });
  }
}

// ---- scroll reveal ----
if (hasMotion) {
  const { inView, animate, stagger, spring } = window.Motion;
  const revealKeyframes = { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0px)"] };
  const revealOptions = { type: spring, bounce: 0.2, duration: 600 };

  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    inView(group, () => {
      animate(Array.from(group.children), revealKeyframes, { ...revealOptions, delay: stagger(0.08) });
    }, { amount: 0.2, margin: "0px 0px -60px 0px" });
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    inView(el, () => { animate(el, revealKeyframes, revealOptions); }, { amount: 0.2, margin: "0px 0px -60px 0px" });
  });
} else if (!prefersReducedMotion && "IntersectionObserver" in window) {
  // fallback: plain CSS transition reveal if Motion didn't load
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    Array.from(group.children).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i * 90, 360)}ms`;
    });
  });
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

// ---- active nav link on scroll ----
const navLinks = Array.from(document.querySelectorAll(".nav__links a[href^='#']"));
if (navLinks.length && "IntersectionObserver" in window) {
  const sections = navLinks
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => navObserver.observe(section));
}

// ---- faq accordion (spring height, one open at a time) ----
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

const animateFaqHeight = (body, from, to) => {
  if (hasMotion) {
    return window.Motion.animate(
      body,
      { maxHeight: [`${from}px`, `${to}px`] },
      { type: window.Motion.spring, bounce: 0.18, duration: 420 }
    ).finished;
  }
  body.style.transition = "max-height .35s ease";
  body.style.maxHeight = `${to}px`;
  return new Promise((resolve) => {
    body.addEventListener("transitionend", resolve, { once: true });
  });
};

faqItems.forEach((item) => {
  const summary = item.querySelector("summary");
  const body = item.querySelector(".faq-item__body");
  if (!summary || !body) return;

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = item.hasAttribute("open");

    if (isOpen) {
      animateFaqHeight(body, body.scrollHeight, 0).then(() => item.removeAttribute("open"));
      return;
    }

    faqItems.forEach((other) => {
      if (other !== item && other.hasAttribute("open")) {
        const otherBody = other.querySelector(".faq-item__body");
        if (otherBody) animateFaqHeight(otherBody, otherBody.scrollHeight, 0);
        other.removeAttribute("open");
      }
    });

    item.setAttribute("open", "");
    animateFaqHeight(body, 0, body.scrollHeight);
  });
});

// ---- momentos lightbox ----
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = document.getElementById("lightboxImg");
  const lbCaption = document.getElementById("lightboxCaption");
  const lbLink = document.getElementById("lightboxLink");
  const lbClose = document.getElementById("lightboxClose");

  const openLightbox = (card) => {
    const img = card.querySelector(".ig-post__photo img");
    const caption = card.querySelector(".ig-post__caption");
    if (!img) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = caption ? caption.textContent : "";
    lbLink.href = card.href;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    if (hasMotion) {
      window.Motion.animate(
        ".lightbox__figure",
        { opacity: [0, 1], transform: ["scale(0.9)", "scale(1)"] },
        { type: window.Motion.spring, bounce: 0.3, duration: 500 }
      );
    }
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".ig-post:not(.ig-post--cta)").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(card);
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
}

// ---- instagram carousel ----
const igTrack = document.getElementById("igTrack");
if (igTrack) {
  const prevBtn = document.querySelector(".ig-carousel__nav--prev");
  const nextBtn = document.querySelector(".ig-carousel__nav--next");
  const step = (dir) => {
    const card = igTrack.querySelector(".ig-post");
    const amount = card ? card.getBoundingClientRect().width + 18 : igTrack.clientWidth * 0.8;
    igTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => step(1));
}

// ---- lead form -> WhatsApp ----
const WA_NUMBER = "5511947409090";
const leadForm = document.getElementById("leadForm");
const formSuccess = document.getElementById("formSuccess");

if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    Array.from(leadForm.elements).forEach((el) => {
      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLSelectElement)) return;
      if (!el.hasAttribute("required")) return;
      const field = el.closest(".field");
      const ok = el.checkValidity();
      if (field) field.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });

    if (!valid) return;

    const data = new FormData(leadForm);
    const nome = data.get("nome");
    const telefone = data.get("telefone");
    const cao = data.get("cao");
    const servico = data.get("servico");
    const mensagem = data.get("mensagem");

    let text = `Olá! Me chamo ${nome} e quero saber mais sobre a Anjos da Guarda.\n`;
    text += `Serviço de interesse: ${servico}\n`;
    if (cao) text += `Nome do cão: ${cao}\n`;
    text += `Meu WhatsApp: ${telefone}\n`;
    if (mensagem) text += `Mensagem: ${mensagem}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    if (formSuccess) formSuccess.classList.add("show");
    window.open(url, "_blank", "noopener");
    leadForm.reset();
  });
}

// ---- cookie banner (LGPD) ----
const cookieBar = document.getElementById("cookieBar");
const cookieAccept = document.getElementById("cookieAccept");
if (cookieBar && cookieAccept) {
  try {
    if (!localStorage.getItem("adg-cookie-consent")) {
      window.setTimeout(() => cookieBar.classList.add("show"), 600);
    }
  } catch (err) {
    window.setTimeout(() => cookieBar.classList.add("show"), 600);
  }
  cookieAccept.addEventListener("click", () => {
    cookieBar.classList.remove("show");
    try { localStorage.setItem("adg-cookie-consent", "1"); } catch (err) {}
  });
}
