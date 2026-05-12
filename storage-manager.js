/**
 * PETANQUE TRÄNING - Storage Manager
 * Copyright (c) 2026 Pär Johansson
 * All rights reserved - Proprietary and Confidential
 * https://petanquetraning.se
 * 
 * Robust localStorage med validering, deduplication och error handling
 * Använd denna i alla appar för konsistent lagring
 */

const StorageManager = (() => {
  const VERSION = 1;
  const CONFIG = {
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 dagar
    quotaWarningThreshold: 0.9, // Varning vid 90% användning
    autoCleanup: true
  };

  return {
    /**
     * Hämta data från localStorage med validering
     * @param {string} key - Storage-nyckel
     * @param {*} defaultValue - Default om data saknas/är ogiltig
     * @returns {*} Sparad data eller default
     */
    get(key, defaultValue = null) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return defaultValue;

        const data = JSON.parse(raw);
        
        // Validera struktur
        if (data && typeof data === 'object' && data.version === VERSION) {
          // Kontrollera age
          if (data.timestamp && Date.now() - data.timestamp > CONFIG.maxAge) {
            console.warn(`[Storage] Data too old (${key}), removing`);
            localStorage.removeItem(key);
            return defaultValue;
          }
          return data.data || defaultValue;
        }

        // Fallback: gamla data utan wrapper
        if (Array.isArray(data) || (data && typeof data === 'object' && !data.version)) {
          return data;
        }

        console.warn(`[Storage] Invalid data structure (${key})`);
        return defaultValue;
      } catch (e) {
        console.error(`[Storage] Error reading ${key}:`, e.message);
        return defaultValue;
      }
    },

    /**
     * Spara data med metadata och error handling
     * @param {string} key - Storage-nyckel
     * @param {*} value - Data att spara
     * @returns {boolean} Lyckades spara?
     */
    set(key, value) {
      try {
        const wrapped = {
          version: VERSION,
          timestamp: Date.now(),
          data: value
        };
        
        localStorage.setItem(key, JSON.stringify(wrapped));
        
        // Kontrollera kvot
        if (this._checkQuota()) {
          console.warn('[Storage] Quota warning: cleanup recommended');
        }
        
        return true;
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.warn('[Storage] QuotaExceeded, attempting cleanup...');
          this._cleanup();
          
          // Försök igen
          try {
            const wrapped = { version: VERSION, timestamp: Date.now(), data: value };
            localStorage.setItem(key, JSON.stringify(wrapped));
            return true;
          } catch (e2) {
            console.error('[Storage] Still full after cleanup:', e2.message);
            return false;
          }
        }
        
        console.error(`[Storage] Error writing ${key}:`, e.message);
        return false;
      }
    },

    /**
     * Ta bort data
     * @param {string} key - Storage-nyckel
     */
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error(`[Storage] Error removing ${key}:`, e.message);
        return false;
      }
    },

    /**
     * Rensa alla nycklar med prefix
     * @param {string} prefix - Prefix att matcha
     */
    clearPrefix(prefix) {
      try {
        const keys = Object.keys(localStorage);
        const matching = keys.filter(k => k.startsWith(prefix));
        matching.forEach(k => localStorage.removeItem(k));
        console.log(`[Storage] Cleared ${matching.length} keys with prefix: ${prefix}`);
        return true;
      } catch (e) {
        console.error('[Storage] Error clearing prefix:', e.message);
        return false;
      }
    },

    /**
     * Deduplicate array av items
     * @param {Array} array - Array att deduplicate
     * @param {Function} keyFunc - Funktion som returnerar unik nyckel
     * @returns {Array} Deduplicated array
     */
    deduplicate(array, keyFunc) {
      if (!Array.isArray(array)) return array;
      
      const seen = new Set();
      const deduped = array.filter(item => {
        const key = keyFunc(item);
        if (seen.has(key)) {
          console.warn('[Storage] Duplicate found:', key);
          return false;
        }
        seen.add(key);
        return true;
      });

      if (deduped.length < array.length) {
        console.log(`[Storage] Removed ${array.length - deduped.length} duplicates`);
      }
      return deduped;
    },

    /**
     * Validera array mot schema
     * @param {Array} array - Array att validera
     * @param {Object} schema - {field: 'type'} definition
     * @returns {Array} Filtrerad array med endast giltiga items
     */
    validate(array, schema) {
      if (!Array.isArray(array)) return [];
      
      return array.filter(item => {
        for (const [field, expectedType] of Object.entries(schema)) {
          if (typeof item[field] !== expectedType && item[field] !== undefined) {
            console.warn(`[Storage] Invalid type for ${field}:`, typeof item[field], 'expected:', expectedType);
            return false;
          }
        }
        return true;
      });
    },

    /**
     * Export all data för säkerhetskopiera (debugging)
     * @returns {Object} Alla lagrede data
     */
    export() {
      try {
        const data = {};
        Object.keys(localStorage).forEach(key => {
          data[key] = this.get(key);
        });
        return data;
      } catch (e) {
        console.error('[Storage] Export error:', e.message);
        return {};
      }
    },

    /**
     * Import data (varning: skriver över befintlig data)
     * @param {Object} data - Data att importera
     * @param {boolean} merge - True = merge, False = replace
     */
    import(data, merge = false) {
      try {
        if (!merge) {
          console.warn('[Storage] Clearing existing data before import');
          localStorage.clear();
        }
        
        Object.entries(data).forEach(([key, value]) => {
          this.set(key, value);
        });
        
        console.log('[Storage] Import complete');
        return true;
      } catch (e) {
        console.error('[Storage] Import error:', e.message);
        return false;
      }
    },

    /**
     * PRIVATE: Kontrollera lagringsutrymme
     */
    _checkQuota() {
      try {
        if (navigator.storage && navigator.storage.estimate) {
          navigator.storage.estimate().then(estimate => {
            const used = estimate.usage;
            const quota = estimate.quota;
            const pct = used / quota;
            
            if (pct > CONFIG.quotaWarningThreshold) {
              console.warn(
                `[Storage] Quota ${(pct * 100).toFixed(1)}% used (${(used / 1024 / 1024).toFixed(1)}MB / ${(quota / 1024 / 1024).toFixed(1)}MB)`
              );
              return true;
            }
          });
        }
        return false;
      } catch (e) {
        return false;
      }
    },

    /**
     * PRIVATE: Rensa gamla data
     */
    _cleanup() {
      try {
        const keys = Object.keys(localStorage);
        let removed = 0;

        // 1. Ta bort items äldre än maxAge
        keys.forEach(key => {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.timestamp && Date.now() - data.timestamp > CONFIG.maxAge) {
              console.log(`[Storage] Removing old data: ${key}`);
              localStorage.removeItem(key);
              removed++;
            }
          } catch (e) {}
        });

        // 2. Om fortfarande fullt, ta bort de äldsta items
        if (removed === 0) {
          const items = keys
            .map(key => {
              try {
                const data = JSON.parse(localStorage.getItem(key));
                return { key, timestamp: data?.timestamp || 0 };
              } catch {
                return { key, timestamp: 0 };
              }
            })
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(0, Math.floor(keys.length * 0.2)); // Ta bort 20% äldsta

          items.forEach(item => {
            console.log(`[Storage] Force removing: ${item.key}`);
            localStorage.removeItem(item.key);
            removed++;
          });
        }

        console.log(`[Storage] Cleanup: removed ${removed} items`);
        return true;
      } catch (e) {
        console.error('[Storage] Cleanup error:', e.message);
        return false;
      }
    }
  };
})();

// Export för use i Node om behövs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
