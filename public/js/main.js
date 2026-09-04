// ---- nav shadow on scroll ----
const nav = document.getElementById("nav");
if (nav) {
  const setScrolled = () => {
    nav.style.boxShadow = window.scrollY > 8
      ? "0 6px 18px -14px rgba(15, 32, 80, 0.5)"
      : "none";
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
}

// ---- instagram carousel ----
const igTrack = document.getElementById("igTrack");
if (igTrack) {
  const prevBtn = document.querySelector(".ig-carousel__nav--prev");
  const nextBtn = document.querySelector(".ig-carousel__nav--next");
  const step = (dir) => {
    const card = igTrack.querySelector(".polaroid");
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
