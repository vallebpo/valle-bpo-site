/*
 * CONFIGURAÇÃO CENTRAL DA VALLE BPO FINANCEIRO
 * Edite apenas este arquivo para preencher dados institucionais e contatos.
 * Deixe campos sem informação como string vazia (""). Não publique dados fictícios.
 */
window.SITE_CONFIG = {
  brand: {
    name: "Valle BPO Financeiro",
    shortName: "Valle",
    descriptor: "BPO Financeiro",
    concept: "Organização financeira com método e proximidade.",
    tagline: "Digital por padrão. Próxima quando necessário."
  },
  contact: {
    // WhatsApp internacional: somente números, incluindo país e DDD. Ex.: 55 + DDD + número.
    whatsapp: "5561999045027",
    defaultMessage: "Olá! Vim pelo site da Valle BPO Financeiro e gostaria de conversar sobre ",
    email: "",
    phone: "",
    city: "",
    address: ""
  },
  institutional: {
    legalName: "",
    cnpj: "",
    domain: "",       // Ex.: https://www.seudominio.com.br
    canonicalUrl: "", // URL canônica da página inicial, sem barra final se preferir.
    social: {
      instagram: "",
      linkedin: "",
      facebook: ""
    }
  },
  form: {
    // Endpoint HTTPS de um serviço de formulários (ex.: endpoint próprio ou Formspree).
    // Sem endpoint, o formulário tentará usar o WhatsApp ou e-mail configurado acima.
    endpoint: "",
    destinationEmail: "" // Usado no assunto/corpo do fallback de e-mail; não cria um backend.
  },
  analytics: {
    // IDs opcionais. Nenhuma ferramenta de analytics é carregada por padrão.
    googleAnalyticsId: "",
    tagManagerId: ""
  },
  theme: {
    colors: {
      background: "#F7F7F4",
      surface: "#FFFFFF",
      text: "#252A2D",
      muted: "#62696E",
      border: "#E7E9E7",
      accent: "#315D58",
      accentHover: "#244944",
      accentSoft: "#EAF0EE"
    }
  }
};
