/**
 * PETANQUE TRÄNING - Language Manager
 * Copyright (c) 2026 Pär Johansson
 * All rights reserved - Proprietary and Confidential
 * https://petanquetraning.se
 * 
 * Enhetlig språkhantering för alla petanque-appar
 * Användning: <script src="lang-manager.js"></script>
 * Sedan: LanguageManager.set('en') eller LanguageManager.toggle()
 */

const LanguageManager = (() => {
  const STORAGE_KEY = 'petanque-lang';
  const DEFAULT_LANG = 'sv';
  const SUPPORTED_LANGS = ['sv', 'en', 'es'];

  let current = DEFAULT_LANG;
  let isInitialized = false;

  return {
    /**
     * Initiera språkhanteraren (kör automatiskt vid DOMContentLoaded)
     */
    init() {
      if (isInitialized) return;

      // Hämta sparad språkinställning
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && SUPPORTED_LANGS.includes(saved)) {
          current = saved;
        } else {
          // Försök använd browser-språk
          const browserLang = navigator.language?.slice(0, 2);
          if (browserLang && SUPPORTED_LANGS.includes(browserLang)) {
            current = browserLang;
          }
        }
      } catch (e) {
        console.warn('[Lang] Error reading saved language:', e.message);
      }

      // Applicera på HTML-element
      document.documentElement.lang = current;
      isInitialized = true;

      // Applicera translations
      this.applyTranslations();

      console.log(`[Lang] Initialized with language: ${current}`);
      return current;
    },

    /**
     * Hämta aktuellt språk
     */
    get() {
      return current;
    },

    /**
     * Sätt språk
     * @param {string} lang - 'sv' eller 'en'
     * @returns {boolean} Lyckades?
     */
    set(lang) {
      if (!SUPPORTED_LANGS.includes(lang)) {
        console.warn(`[Lang] Unsupported language: ${lang}`);
        return false;
      }

      if (lang === current) return true;

      try {
        current = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        
        // Applicera translations
        this.applyTranslations();
        
        // Dispatch event för lyssning
        window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
        
        console.log(`[Lang] Language changed to: ${lang}`);
        return true;
      } catch (e) {
        console.error('[Lang] Error setting language:', e.message);
        return false;
      }
    },

    /**
     * Byt mellan sv, en och es
     */
    toggle() {
      const index = SUPPORTED_LANGS.indexOf(current);
      const nextIndex = (index + 1) % SUPPORTED_LANGS.length;
      const newLang = SUPPORTED_LANGS[nextIndex];
      return this.set(newLang);
    },

    /**
     * Applicera translations från data-attribut
     * Targets: [data-sv], [data-en], [data-es]
     */
    applyTranslations() {
      try {
        document.querySelectorAll('[data-sv]').forEach(el => {
          // Hämta text baserat på aktuellt språk
          const content = el.dataset[current] || el.dataset.sv;
          
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = content || el.placeholder;
          } else if (el.dataset.html === 'true') {
            el.innerHTML = content || el.innerHTML;
          } else {
            el.textContent = content || el.textContent;
          }
        });

        // Update lang-buttons
        const langBtns = document.querySelectorAll('[data-lang-toggle]');
        langBtns.forEach(btn => {
          const langs = { sv: '🇸🇪 SV', en: '🇬🇧 EN', es: '🇪🇸 ES' }; 
          btn.textContent = langs[current] || '🌐';
        });

        console.log('[Lang] Translations applied for language: ' + current);
      } catch (e) {
        console.error('[Lang] Error applying translations:', e.message);
      }
    },

    /**
     * Få translation för en nyckel (för dynamisk content)
     * @param {string} key - Translation-nyckel
     * @param {Object} translations - {sv: '...', en: '...'}
     * @returns {string} Translated text
     */
    t(key, translations = {}) {
      if (typeof translations === 'string') {
        // Legacy: t('sv-text', 'en-text')
        return current === 'sv' ? arguments[0] : arguments[1];
      }

      return translations[current] || translations['sv'] || key;
    },

    /**
     * Registrera event-lyssnare för språkändringar
     * @param {Function} callback - Anropas när språk ändras
     */
    onLanguageChanged(callback) {
      window.addEventListener('language-changed', (e) => {
        callback(e.detail.lang);
      });
    },

    /**
     * Debug-info
     */
    debug() {
      return {
        current,
        supported: SUPPORTED_LANGS,
        storageKey: STORAGE_KEY,
        isInitialized,
        elementCount: document.querySelectorAll('[data-sv]').length
      };
    }
  };
})();

// Auto-init när DOM är klar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => LanguageManager.init(), 100);
  });
} else {
  // DOM redan lastad
  setTimeout(() => LanguageManager.init(), 100);
}

// Gör tillgänglig globalt
window.LanguageManager = LanguageManager;
