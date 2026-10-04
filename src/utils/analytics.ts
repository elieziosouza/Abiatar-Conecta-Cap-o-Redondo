// Google Analytics 4 & Meta Pixel Tracker for Abiatar Conecta Landing Page
// Supports both simulated events and live tracking tags with custom IDs

export interface AnalyticsConfig {
  gaId: string;
  pixelId: string;
  gtmId?: string;
}

const DEFAULT_CONFIG: AnalyticsConfig = {
  gaId: 'G-ABIATAR2026', // Can be customized in Settings
  pixelId: '109876543210987', // Can be customized in Settings
  gtmId: ''
};

const CONFIG_STORAGE_KEY = 'abiatar_analytics_config';

export function getAnalyticsConfig(): AnalyticsConfig {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read analytics config:', e);
  }
  return DEFAULT_CONFIG;
}

export function saveAnalyticsConfig(config: Partial<AnalyticsConfig>): AnalyticsConfig {
  const current = getAnalyticsConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
    initAnalytics(updated);
  } catch (e) {
    console.warn('Could not save analytics config:', e);
  }
  return updated;
}

// Global window declarations
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: any;
    fbq?: any;
    _fbq?: any;
    __pixelEventsLog?: Array<{ type: string; event: string; data?: any; time: string }>;
  }
}

export function initAnalytics(config?: AnalyticsConfig) {
  const current = config || getAnalyticsConfig();
  if (typeof window === 'undefined') return;

  // Initialize event audit log for transparent monitoring
  if (!window.__pixelEventsLog) {
    window.__pixelEventsLog = [];
  }

  // 1. Setup Google Tag / GA4
  if (current.gaId && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', current.gaId, {
      send_page_view: true,
      page_title: 'Abiatar Conecta - Lançamento Capão Redondo',
      content_group: 'Real Estate Landing Page'
    });

    // Inject async script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${current.gaId}`;
    gaScript.id = 'ga4-tag-script';
    if (!document.getElementById('ga4-tag-script')) {
      document.head.appendChild(gaScript);
    }
  }

  // 2. Setup Meta Pixel (fbq)
  if (current.pixelId && !window.fbq) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      t.id = 'meta-pixel-script';
      s = b.getElementsByTagName(e)[0];
      if (!b.getElementById('meta-pixel-script')) {
        s.parentNode.insertBefore(t, s);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    if (window.fbq) {
      window.fbq('init', current.pixelId);
      window.fbq('track', 'PageView');
    }
  }

  logEvent('System', 'Init', { gaId: current.gaId, pixelId: current.pixelId });
}

function logEvent(channel: string, eventName: string, data?: any) {
  const entry = {
    type: channel,
    event: eventName,
    data,
    time: new Date().toLocaleTimeString('pt-BR')
  };
  if (window.__pixelEventsLog) {
    window.__pixelEventsLog.unshift(entry);
    if (window.__pixelEventsLog.length > 50) {
      window.__pixelEventsLog.pop();
    }
  }
}

// Track high-conversion Lead event (Form Submitted)
export function trackLeadSubmission(leadData: {
  name: string;
  email: string;
  whatsapp: string;
  unitInterest?: string;
}) {
  // Google Analytics 4 & Google Ads event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Leads',
      event_label: 'Formulário Abiatar Conecta',
      value: 100.0,
      currency: 'BRL',
      user_data: {
        lead_name: leadData.name,
        lead_interest: leadData.unitInterest
      }
    });

    // Google Ads conversion event
    window.gtag('event', 'conversion', {
      send_to: 'AW-17116199141',
      value: 100.0,
      currency: 'BRL',
      transaction_id: 'lead_' + Date.now()
    });
  }

  // Meta Pixel conversion event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Abiatar Conecta - Capão Redondo',
      content_category: 'Empreendimento Imobiliário',
      value: 100.0,
      currency: 'BRL',
      unit_type: leadData.unitInterest || '2 Dormitórios'
    });
  }

  logEvent('Meta Pixel & GA4', 'Lead (Formulário Enviado)', leadData);
}

// Track WhatsApp Click event (Crucial for retargeting non-completers)
export function trackWhatsAppClick(source: string, additionalContext?: string) {
  // GA4 event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', {
      event_category: 'Engagement',
      event_label: `WhatsApp - ${source}`,
      method: 'WhatsApp',
      context: additionalContext
    });
  }

  // Meta Pixel Contact event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: `WhatsApp Direto (${source})`,
      content_category: 'Atendimento Consultor',
      source: source
    });
  }

  logEvent('Meta Pixel & GA4', 'Contact (Clique WhatsApp)', { source, additionalContext });
}

// Track Simulator Engagement (High Purchase Intent signal for Remarketing)
export function trackSimulatorUsage(renda: number, fgts: number, parcela: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      event_category: 'Simulator',
      event_label: 'Simulação MCMV',
      value: parcela,
      currency: 'BRL'
    });
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'SimulatorCompleted', {
      income_range: renda,
      has_fgts: fgts > 0,
      estimated_installment: parcela
    });
  }

  logEvent('Meta Pixel & GA4', 'Simulação Financiamento', { renda, fgts, parcela });
}

// Track Floor Plan View
export function trackFloorPlanView(planName: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: `Planta: ${planName}`,
      content_type: 'floor_plan'
    });
  }

  logEvent('Meta Pixel', 'ViewContent (Planta)', { planName });
}

// Helper to get tracked events log
export function getTrackedEvents() {
  if (typeof window !== 'undefined' && window.__pixelEventsLog) {
    return [...window.__pixelEventsLog];
  }
  return [];
}
