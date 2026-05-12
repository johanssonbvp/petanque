/**
 * PETANQUE TRÄNING - Offline Indicator
 * Copyright (c) 2026 Pär Johansson
 * All rights reserved - Proprietary and Confidential
 * https://petanquetraning.se
 * 
 * Visar offline-status i alla appar med en konsistent badge
 * Använd: <script src="offline-indicator.js"></script>
 */

const OfflineIndicator = (() => {
  const CONFIG = {
    showDelay: 300, // ms innan visa offline-badge
    hideDelay: 500, // ms innan gömma efter online
    position: 'fixed', // eller 'sticky'
    zIndex: 25
  };

  let badge = null;
  let isOffline = false;

  return {
    /**
     * Initiera offline-indicatorn
     */
    init() {
      // Skapa badge-element om det inte redan finns
      if (!document.getElementById('offline-badge')) {
        badge = document.createElement('div');
        badge.id = 'offline-badge';
        badge.setAttribute('role', 'status');
        badge.setAttribute('aria-live', 'polite');
        
        badge.style.cssText = `
          display: none;
          position: ${CONFIG.position};
          top: ${CONFIG.position === 'sticky' ? 'auto' : '70px'};
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          background: rgba(88, 86, 124, 0.95);
          color: #a0a0c0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 999px;
          z-index: ${CONFIG.zIndex};
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          animation: slideDown 0.3s ease-out;
          white-space: nowrap;
          pointer-events: none;
        `;

        // Lägg till CSS för animation
        if (!document.getElementById('offline-badge-styles')) {
          const style = document.createElement('style');
          style.id = 'offline-badge-styles';
          style.textContent = `
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
              }
              to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
              }
            }
            
            #offline-badge.hide-animation {
              animation: slideUp 0.3s ease-out forwards;
            }
          `;
          document.head.appendChild(style);
        }

        document.body.appendChild(badge);
      } else {
        badge = document.getElementById('offline-badge');
      }

      // Lyssna på online/offline-events
      window.addEventListener('offline', () => this._onOffline());
      window.addEventListener('online', () => this._onOnline());

      // Initial status-check
      this.update();

      console.log('[Offline] Indicator initialized');
    },

    /**
     * Uppdatera status baserat på navigator.onLine
     */
    update() {
      if (navigator.onLine) {
        this._show(false);
      } else {
        this._show(true);
      }
    },

    /**
     * PRIVATE: Handle offline-event
     */
    _onOffline() {
      console.warn('[Offline] Network status changed to offline');
      isOffline = true;
      this._show(true);
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('network-status', { 
        detail: { online: false, timestamp: Date.now() } 
      }));
    },

    /**
     * PRIVATE: Handle online-event
     */
    _onOnline() {
      console.log('[Offline] Network status changed to online');
      isOffline = false;
      
      // Delayed hide för att undvika flimmer vid kort avbrott
      setTimeout(() => {
        this._show(false);
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('network-status', { 
          detail: { online: true, timestamp: Date.now() } 
        }));
      }, CONFIG.hideDelay);
    },

    /**
     * PRIVATE: Visa/dölj badge
     */
    _show(shouldShow) {
      if (!badge) return;

      if (shouldShow) {
        badge.style.display = 'block';
        badge.innerHTML = '⚡ <span data-sv="Offline-läge" data-en="Offline mode">Offline-läge</span>';
        badge.classList.remove('hide-animation');
      } else {
        badge.classList.add('hide-animation');
        setTimeout(() => {
          badge.style.display = 'none';
        }, 300);
      }
    },

    /**
     * Manuell kontroll - visa badge
     */
    show() {
      this._show(true);
    },

    /**
     * Manuell kontroll - dölj badge
     */
    hide() {
      this._show(false);
    },

    /**
     * Få status
     */
    isOnline() {
      return navigator.onLine;
    },

    /**
     * Debug-info
     */
    debug() {
      return {
        online: navigator.onLine,
        badgeExists: badge !== null,
        badgeVisible: badge?.style.display === 'block',
        timelineSupport: 'onLine' in navigator
      };
    }
  };
})();

// Auto-init när DOM är klar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    OfflineIndicator.init();
  });
} else {
  OfflineIndicator.init();
}

// Gör tillgänglig globalt
window.OfflineIndicator = OfflineIndicator;
