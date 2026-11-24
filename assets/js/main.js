(function () {
  "use strict";
  const config = window.SITE_CONFIG || {};
  const brand = config.brand || {};
  const contact = config.contact || {};
  const institutional = config.institutional || {};
  const whatsapp = String(contact.whatsapp || "").replace(/\D/g, "");
  const validWhatsapp = whatsapp.length >= 10 && whatsapp.length <= 15;
  const defaultMessage = contact.defaultMessage || "Olá! Vim pelo site da Valle BPO Financeiro e gostaria de conversar sobre ";
  document.querySelectorAll("[data-brand-short]").forEach(el => el.textContent = brand.shortName || "Valle");
  document.querySelectorAll("[data-brand-descriptor]").forEach(el => el.textContent = brand.descriptor || "BPO Financeiro");
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const message = link.getAttribute("data-message") || defaultMessage + "a organização do meu financeiro.";
    if (validWhatsapp) {
      link.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.hidden = true;
    }
  });
  const footer = document.getElementById("footer-contact");
  if (footer) {
    const entries = [];
    if (validWhatsapp) entries.push({ label: "WhatsApp", href: "https://wa.me/" + whatsapp, external: true });
    if (contact.phone) entries.push({ label: contact.phone });
    if (contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) entries.push({ label: contact.email });
    Object.entries(institutional.social || {}).forEach(([name, url]) => {
      if (url && /^https:\/\//i.test(url)) entries.push({ label: name.charAt(0).toUpperCase() + name.slice(1), href: url, external: true });
    });
    entries.forEach(entry => {
      const node = entry.href ? document.createElement("a") : document.createElement("span");
      node.textContent = entry.label;
      if (entry.href) node.href = entry.href;
      if (entry.external) { node.target = "_blank"; node.rel = "noopener noreferrer"; }
      footer.appendChild(node);
    });
    if (!entries.length) footer.hidden = true;
  }

  const menu = document.getElementById("menu-mobile");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  function closeMenu() {
    if (!menu || !openButton) return;
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");
  }
  if (openButton && menu) openButton.addEventListener("click", () => {
    menu.hidden = false;
    document.body.classList.add("menu-open");
    openButton.setAttribute("aria-expanded", "true");
    if (closeButton) closeButton.focus();
  });
  if (closeButton) closeButton.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("[data-menu-link]").forEach(link => link.addEventListener("click", closeMenu));
    menu.addEventListener("click", event => { if (event.target === menu) closeMenu(); });
  }
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
    if (menu && !menu.hidden) closeMenu();
  }));
})();
