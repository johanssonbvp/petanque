// lang-manager.js - Petanque Träning
// Språkstöd: Svenska (sv), Engelska (en), Franska (fr)

const langMgr = {
  lang: localStorage.getItem('petanque-lang') 
     || localStorage.getItem('pt_lang') 
     || localStorage.getItem('lang') 
     || 'sv',

  apply() {
    document.querySelectorAll('[data-sv]').forEach(el => {
      if (this.lang === 'fr' && el.dataset.fr) {
        el.textContent = el.dataset.fr;
      } else if (this.lang === 'en' && el.dataset.en) {
        el.textContent = el.dataset.en;
      } else {
        el.textContent = el.dataset.sv;
      }
    });
    document.documentElement.lang = this.lang;
  },

  set(lang) {
    this.lang = lang;
    // Spara i alla keys för kompatibilitet
    localStorage.setItem('petanque-lang', lang);
    localStorage.setItem('pt_lang', lang);
    localStorage.setItem('lang', lang);
    this.apply();
  },

  toggle() {
    const langs = ['sv', 'en', 'fr'];
    const next = langs[(langs.indexOf(this.lang) + 1) % langs.length];
    this.set(next);
  }
};

document.addEventListener('DOMContentLoaded', () => langMgr.apply());
