(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const brand = config.brand || {};
  const contact = config.contact || {};
  const institutional = config.institutional || {};
  const formConfig = config.form || {};
  const analytics = config.analytics || {};
  const theme = (config.theme && config.theme.colors) || {};
  const root = document.documentElement;
  const header = document.querySelector(".site-header");

  // Aplica os tokens definidos no arquivo central de configuração.
  const cssTokens = {
    "--color-bg": theme.background,
    "--color-surface": theme.surface,
    "--color-text": theme.text,
    "--color-muted": theme.muted,
    "--color-border": theme.border,
    "--color-accent": theme.accent,
    "--color-accent-hover": theme.accentHover,
    "--color-accent-soft": theme.accentSoft
  };
  Object.entries(cssTokens).forEach(([name, value]) => {
    if (typeof value === "string" && value.trim()) root.style.setProperty(name, value.trim());
  });

  // Conteúdos institucionais que podem ser editados em site.config.js.
  document.querySelectorAll("[data-brand-short]").forEach((el) => { el.textContent = brand.shortName || "Valle"; });
  document.querySelectorAll("[data-brand-descriptor]").forEach((el) => { el.textContent = brand.descriptor || "BPO Financeiro"; });
  document.querySelectorAll("[data-brand-full]").forEach((el) => { el.textContent = brand.name || "Valle BPO Financeiro"; });
  document.querySelectorAll("[data-brand-concept]").forEach((el) => { el.textContent = brand.concept || ""; el.hidden = !brand.concept; });
  document.querySelectorAll("[data-brand-tagline]").forEach((el) => { el.textContent = brand.tagline || ""; el.hidden = !brand.tagline; });
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Só cria a URL canônica quando um endereço real tiver sido configurado.
  const canonical = institutional.canonicalUrl || (institutional.domain ? institutional.domain.replace(/\/$/, "") + "/" : "");
  if (canonical && /^https:\/\//i.test(canonical)) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    ogUrl.content = canonical;
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);
    const absoluteRoot = canonical.endsWith("/") ? canonical : canonical + "/";
    const shareImage = absoluteRoot + "assets/img/og-valle.svg";
    [["og:image", shareImage], ["twitter:image", shareImage]].forEach(([property, value]) => {
      const selector = property.startsWith("og:") ? 'meta[property="' + property + '"]' : 'meta[name="' + property + '"]';
      const meta = document.querySelector(selector) || document.createElement("meta");
      meta.setAttribute(property.startsWith("og:") ? "property" : "name", property);
      meta.content = value;
      if (!meta.parentNode) document.head.appendChild(meta);
    });
  }

  // Dados estruturados sem endereço, telefone, domínio ou outros dados não informados.
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name || "Valle BPO Financeiro",
    description: "Organização e acompanhamento das rotinas financeiras contratadas para prestadores de serviços."
  };
  if (canonical) organizationData.url = canonical;
  if (contact.email) organizationData.email = contact.email;
  if (contact.phone) organizationData.telephone = contact.phone;
  const faqEntities = Array.from(document.querySelectorAll(".faq-question")).map((button) => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    return {
      "@type": "Question",
      name: button.textContent.trim(),
      acceptedAnswer: { "@type": "Answer", text: answer ? answer.textContent.trim() : "" }
    };
  }).filter((item) => item.name && item.acceptedAnswer.text);
  const graph = [organizationData];
  if (faqEntities.length) graph.push({ "@type": "FAQPage", mainEntity: faqEntities });
  const structuredScript = document.createElement("script");
  structuredScript.type = "application/ld+json";
  structuredScript.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph.map(({ "@context": ignored, ...item }) => item) });
  document.head.appendChild(structuredScript);

  // Ganchos opcionais de analytics. Não carrega scripts de terceiros automaticamente.
  function trackEvent(eventName, detail) {
    if (!analytics.googleAnalyticsId && !analytics.tagManagerId) return;
    window.dispatchEvent(new CustomEvent("valle:analytics", { detail: { event: eventName, ...(detail || {}) } }));
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => trackEvent("section_navigation", { target: link.getAttribute("href") }));
  });

  // Cabeçalho discreto com borda após rolagem.
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // WhatsApp: se não houver número real, os links conduzem ao formulário.
  const whatsappNumber = String(contact.whatsapp || "").replace(/\D/g, "");
  const validWhatsapp = whatsappNumber.length >= 10 && whatsappNumber.length <= 15;
  const defaultMessage = contact.defaultMessage || "Olá! Vim pelo site da Valle BPO Financeiro e gostaria de conversar sobre ";
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message = link.getAttribute("data-message") || defaultMessage;
    if (validWhatsapp) {
      link.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.addEventListener("click", () => trackEvent("whatsapp_click", { message_context: message }));
    } else {
      link.href = "#formulario-contato";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-label", "Ir para o formulário de contato da Valle BPO Financeiro");
      if (/whatsapp/i.test(link.textContent)) {
        Array.from(link.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.textContent = node.textContent.replace(/Falar no WhatsApp/gi, "Ver opções de contato");
        });
      }
    }
  });
  const floatLink = document.querySelector("[data-mobile-float]");
  if (floatLink && validWhatsapp) floatLink.setAttribute("data-visible", "true");
  else if (floatLink) floatLink.remove();

  // Canais institucionais são exibidos apenas quando informados.
  const footerContact = document.getElementById("footer-contact");
  if (footerContact) {
    const items = [];
    if (validWhatsapp) items.push({ label: "WhatsApp", href: "https://wa.me/" + whatsappNumber, external: true });
    if (contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) items.push({ label: contact.email, href: "mailto:" + contact.email });
    if (contact.phone) items.push({ label: contact.phone, href: "tel:" + contact.phone.replace(/[^+\d]/g, "") });
    if (contact.city) items.push({ label: contact.city });
    if (contact.address) items.push({ label: contact.address });
    Object.entries(institutional.social || {}).forEach(([network, url]) => {
      if (url && /^https:\/\//i.test(url)) items.push({ label: network.charAt(0).toUpperCase() + network.slice(1), href: url, external: true });
    });
    items.forEach((item) => {
      const el = item.href ? document.createElement("a") : document.createElement("span");
      el.textContent = item.label;
      if (item.href) el.href = item.href;
      if (item.external) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
      footerContact.appendChild(el);
    });
    if (!items.length) footerContact.hidden = true;
  }
  const footerLegal = document.getElementById("footer-legal");
  if (footerLegal) {
    const legalEntries = [
      ["CNPJ", institutional.cnpj],
      ["Razão social", institutional.legalName],
      ["Endereço", contact.address]
    ].filter((entry) => entry[1]);
    legalEntries.forEach(([label, value]) => {
      const span = document.createElement("span");
      span.textContent = label + ": " + value;
      footerLegal.appendChild(span);
    });
  }

  // Menu mobile acessível: foco inicial, ESC, contenção de foco e retorno ao acionador.
  const menu = document.getElementById("menu-mobile");
  const menuOpenButton = document.querySelector("[data-menu-open]");
  const menuCloseButton = document.querySelector("[data-menu-close]");
  let lastFocus = null;
  function getMenuFocusables() {
    if (!menu) return [];
    return Array.from(menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter((element) => !element.hasAttribute("hidden") && element.offsetParent !== null);
  }
  function openMenu() {
    if (!menu || !menuOpenButton) return;
    lastFocus = document.activeElement;
    menu.hidden = false;
    document.body.classList.add("nav-is-open");
    menuOpenButton.setAttribute("aria-expanded", "true");
    menuCloseButton && menuCloseButton.focus();
  }
  function closeMenu(restoreFocus) {
    if (!menu || !menuOpenButton) return;
    menu.hidden = true;
    document.body.classList.remove("nav-is-open");
    menuOpenButton.setAttribute("aria-expanded", "false");
    if (restoreFocus && lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }
  if (menuOpenButton) menuOpenButton.addEventListener("click", openMenu);
  if (menuCloseButton) menuCloseButton.addEventListener("click", () => closeMenu(true));
  if (menu) {
    menu.querySelectorAll("[data-menu-link]").forEach((link) => link.addEventListener("click", () => closeMenu(false)));
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { event.preventDefault(); closeMenu(true); return; }
      if (event.key !== "Tab") return;
      const focusables = getMenuFocusables();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu && !menu.hidden) closeMenu(true);
  });

  // FAQ com botões, aria-expanded e regiões associadas.
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const answerId = button.getAttribute("aria-controls");
      const answer = answerId ? document.getElementById(answerId) : null;
      button.setAttribute("aria-expanded", String(!isExpanded));
      if (answer) answer.hidden = isExpanded;
    });
  });

  // Formulário: validação no cliente, campo honeypot e envio real ou fallback verdadeiro.
  const form = document.getElementById("formulario-contato");
  if (!form) return;
  const status = document.getElementById("form-status");
  const submitButton = document.getElementById("form-submit");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactValue = form.querySelector('[name="contato"]');

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state || "";
  }
  function setFieldError(name, message) {
    const error = form.querySelector('[data-error-for="' + name + '"]');
    if (error) error.textContent = message || "";
    const field = form.elements.namedItem(name);
    if (field && field.setAttribute) {
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  }
  function validateForm() {
    let valid = true;
    ["nome", "atividade", "contato", "servico", "mensagem", "consentimento"].forEach((name) => setFieldError(name, ""));
    const values = new FormData(form);
    const name = String(values.get("nome") || "").trim();
    const activity = String(values.get("atividade") || "").trim();
    const personContact = String(values.get("contato") || "").trim();
    const service = String(values.get("servico") || "").trim();
    if (name.length < 2) { setFieldError("nome", "Informe seu nome (pelo menos 2 caracteres)."); valid = false; }
    if (!activity) { setFieldError("atividade", "Informe sua empresa ou atividade profissional."); valid = false; }
    if (!personContact) {
      setFieldError("contato", "Informe um e-mail ou telefone para contato."); valid = false;
    } else {
      const digits = personContact.replace(/\D/g, "");
      if (!emailPattern.test(personContact) && (digits.length < 8 || digits.length > 15)) {
        setFieldError("contato", "Informe um e-mail válido ou um telefone com DDD."); valid = false;
      }
    }
    if (!service) { setFieldError("servico", "Selecione o serviço de interesse."); valid = false; }
    const consent = form.querySelector('[name="consentimento"]');
    if (!consent || !consent.checked) { setFieldError("consentimento", "Marque o consentimento para continuar."); valid = false; }
    return valid;
  }
  function formDetails() {
    const values = new FormData(form);
    const entries = [
      ["Nome", values.get("nome")],
      ["Empresa ou atividade", values.get("atividade")],
      ["Contato", values.get("contato")],
      ["Serviço de interesse", values.get("servico")],
      ["Mensagem", values.get("mensagem")]
    ];
    return entries.filter((entry) => String(entry[1] || "").trim()).map(([label, value]) => label + ": " + String(value).trim()).join("\n");
  }
  function makeWhatsappUrl(body) {
    const selectedService = String(form.elements.namedItem("servico").value || "meu financeiro");
    const message = (contact.defaultMessage || "Olá! Vim pelo site da Valle BPO Financeiro e gostaria de conversar sobre ") + selectedService + ".\n\n" + body;
    return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }
  function openContactFallback(body) {
    if (validWhatsapp) {
      const url = makeWhatsappUrl(body);
      setStatus("A conversa foi preparada no WhatsApp. Revise os dados e envie a mensagem pelo próprio WhatsApp.", "");
      trackEvent("form_fallback_whatsapp", { service: form.elements.namedItem("servico").value });
      window.open(url, "_blank", "noopener,noreferrer");
      return true;
    }
    const recipient = String(formConfig.destinationEmail || contact.email || "").trim();
    if (recipient && emailPattern.test(recipient)) {
      const subject = "Contato pelo site — Valle BPO Financeiro";
      const url = "mailto:" + encodeURIComponent(recipient) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus("Seu aplicativo de e-mail deve abrir com a mensagem preparada. Revise e envie por lá.", "");
      trackEvent("form_fallback_email", { service: form.elements.namedItem("servico").value });
      window.location.href = url;
      return true;
    }
    setStatus("O formulário ainda não tem um canal de envio configurado. Antes de publicar, preencha o WhatsApp, o e-mail ou um endpoint em site.config.js. Nenhum dado foi enviado.", "error");
    return false;
  }

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      if (field.name) setFieldError(field.name, "");
      if (status && status.dataset.state === "error") setStatus("", "");
    });
    field.addEventListener("change", () => {
      if (field.name) setFieldError(field.name, "");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("", "");
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value.trim()) {
      setStatus("Não foi possível processar este formulário. Revise os dados e tente novamente.", "error");
      return;
    }
    if (!validateForm()) {
      setStatus("Confira os campos destacados antes de continuar.", "error");
      const invalid = form.querySelector('[aria-invalid="true"]');
      if (invalid) invalid.focus();
      return;
    }
    const body = formDetails();
    trackEvent("form_submit_attempt", { service: form.elements.namedItem("servico").value });
    const endpoint = String(formConfig.endpoint || "").trim();
    if (!endpoint) {
      openContactFallback(body);
      return;
    }
    if (!/^https:\/\//i.test(endpoint)) {
      setStatus("O endpoint configurado precisa usar HTTPS. Revise site.config.js antes de tentar novamente.", "error");
      return;
    }
    const originalText = submitButton ? submitButton.innerHTML : "";
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Enviando…"; }
    setStatus("Enviando suas informações…", "");
    try {
      const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } });
      if (!response.ok) throw new Error("O endpoint respondeu com status " + response.status);
      setStatus("Mensagem enviada. O serviço de formulário confirmou o recebimento.", "success");
      trackEvent("form_submit_success", { service: form.elements.namedItem("servico").value });
      form.reset();
      ["nome", "atividade", "contato", "servico", "mensagem", "consentimento"].forEach((name) => setFieldError(name, ""));
    } catch (error) {
      console.error("Não foi possível confirmar o envio do formulário:", error);
      const usedFallback = openContactFallback(body);
      if (!usedFallback) setStatus("Não foi possível confirmar o envio. Nenhum sucesso foi registrado; configure um canal de contato ou verifique o endpoint.", "error");
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = originalText; }
    }
  });

  // Diagnóstico de desenvolvimento; não expõe dados pessoais do visitante.
  if (!validWhatsapp) console.warn("Valle BPO: número de WhatsApp pendente em site.config.js. Os links direcionam ao formulário.");
  if (!formConfig.endpoint && !contact.email && !validWhatsapp) console.warn("Valle BPO: nenhum canal de envio configurado. Configure WhatsApp, e-mail ou endpoint antes de publicar.");
  if (!canonical) console.info("Valle BPO: URL canônica pendente. Configure domain/canonicalUrl em site.config.js antes de anunciar o domínio.");
})();
