// lang-manager.js - Petanque Träning
// Språkstöd: Svenska (sv), Engelska (en), Franska (fr)

const langMgr = {
  lang: localStorage.getItem('petanque-lang') || localStorage.getItem('pt_lang') || localStorage.getItem('lang') || 'sv',

  apply() {
    document.querySelectorAll('[data-sv]').forEach(el => {
      const sv = el.dataset.sv;
      const en = el.dataset.en;
      const fr = el.dataset.fr;

      if (this.lang === 'en' && en) {
        el.textContent = en;
      } else if (this.lang === 'fr' && fr) {
        el.textContent = fr;
      } else {
        el.textContent = sv;
      }
    });

    // Uppdatera html lang-attribut
    document.documentElement.lang = this.lang;

    // Uppdatera aktiv knapp om det finns lang-knappar
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.lang);
    });
  },

  set(lang) {
    this.lang = lang;
    localStorage.setItem('petanque-lang', lang);
    localStorage.setItem('pt_lang', lang);
    localStorage.setItem('lang', lang);
    this.apply();
  },

  toggle() {
    const langs = ['sv', 'en', 'fr'];
    const next = langs[(langs.indexOf(this.lang) + 1) % langs.length];
    this.set(next);
  },

  // Hämta översatt text för en nyckel
  t(svText) {
    const el = document.querySelector(`[data-sv="${svText}"]`);
    if (!el) return svText;
    if (this.lang === 'en' && el.dataset.en) return el.dataset.en;
    if (this.lang === 'fr' && el.dataset.fr) return el.dataset.fr;
    return svText;
  }
};

// Initiera direkt
document.addEventListener('DOMContentLoaded', () => langMgr.apply());
