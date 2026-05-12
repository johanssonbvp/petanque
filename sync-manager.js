// ============================================
// SYNC MANAGER - Global Firebase + LocalStorage
// ============================================

class SyncManager {
  constructor(firebaseConfig) {
    this.firebaseConfig = firebaseConfig;
    this.trainerCode = null;
    this.db = null;
    this.syncQueue = [];
    this.isSyncing = false;
    this.syncStatus = 'idle'; // 'idle', 'syncing', 'offline', 'error'
    this.statusListeners = [];
    
    this.initFirebase();
    this.setupNetworkListener();
  }

  // ============ FIREBASE INIT ============
  initFirebase() {
    if (!window.firebase) {
      console.error('Firebase SDK not loaded!');
      return;
    }
    
    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.database();
    console.log('✅ Firebase initialized');
  }

  // ============ LOGIN & SETUP ============
  async login(trainerCode) {
    this.trainerCode = trainerCode.toUpperCase();
    localStorage.setItem('pt_trainer_code', this.trainerCode);
    
    console.log(`🔑 Logged in as: ${this.trainerCode}`);
    
    // Migrera gammal data från localStorage → Firebase
    await this.migrateLocalToFirebase();
    
    // Hämta all data från Firebase
    await this.loadFromFirebase();
    
    return this.trainerCode;
  }

  logout() {
    this.trainerCode = null;
    localStorage.removeItem('pt_trainer_code');
    this.syncQueue = [];
    console.log('🚪 Logged out');
  }

  getTrainerCode() {
    return this.trainerCode || localStorage.getItem('pt_trainer_code');
  }

  // ============ MIGRERING: localStorage → Firebase ============
  async migrateLocalToFirebase() {
    if (!this.trainerCode) return;

    const modules = ['shooting', 'pointing', 'precision', 'diary', 'matches'];
    let migratedCount = 0;

    for (const module of modules) {
      // Gamla localStorage-nycklar
      const oldKeys = {
        shooting: ['pt_h', 'pt_shooting_sessions'],
        pointing: ['pt_lagg_history'],
        precision: ['pt_precision_data'],
        diary: ['pt_dagbok'],
        matches: ['pt_matches']
      };

      for (const key of oldKeys[module] || []) {
        const data = localStorage.getItem(key);
        
        if (data) {
          try {
            const parsed = JSON.parse(data);
            
            // Spara till Firebase
            const ref = this.db.ref(`coaches/${this.trainerCode}/${module}/${key}`);
            await ref.set({
              data: parsed,
              migratedAt: new Date().toISOString(),
              source: 'localStorage'
            });
            
            console.log(`✅ Migrated ${key} → Firebase`);
            migratedCount++;
          } catch (e) {
            console.error(`❌ Failed to migrate ${key}:`, e);
          }
        }
      }
    }

    if (migratedCount > 0) {
      this.notifyStatusChange('migration_complete', `Migrerade ${migratedCount} dataposter`);
    }
  }

  // ============ LOAD DATA: Firebase → RAM ============
  async loadFromFirebase() {
    if (!this.trainerCode || !navigator.onLine) return;

    try {
      this.syncStatus = 'syncing';
      this.notifyStatusChange();

      const ref = this.db.ref(`coaches/${this.trainerCode}`);
      const snapshot = await ref.once('value');
      const data = snapshot.val();

      if (data) {
        // Ladda in all data i RAM
        window.PT_FIREBASE_DATA = data;
        console.log('☁️ Data loaded from Firebase:', data);
      }

      this.syncStatus = 'idle';
      this.notifyStatusChange();
    } catch (e) {
      console.error('❌ Failed to load from Firebase:', e);
      this.syncStatus = 'error';
      this.notifyStatusChange();
    }
  }

  // ============ SPARA: localStorage → Firebase (async) ============
  async save(module, key, data) {
    if (!this.trainerCode) {
      console.warn('⚠️ No trainer code set. Saving to localStorage only.');
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    // 1. Spara DIREKT lokalt (snabbt)
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`📱 Saved locally: ${key}`);

    // 2. Lägg i sync-kö (för Firebase)
    this.addToQueue({
      module,
      key,
      data,
      timestamp: Date.now()
    });

    // 3. Försök synka om online
    if (navigator.onLine) {
      this.processSyncQueue();
    } else {
      this.syncStatus = 'offline';
      this.notifyStatusChange();
    }
  }

  // ============ SYNC-KÖ ============
  addToQueue(item) {
    // Kollar om objektet redan finns i kön (uppdatera istället för att duplicera)
    const existing = this.syncQueue.findIndex(q => q.key === item.key);
    
    if (existing > -1) {
      this.syncQueue[existing] = item;
    } else {
      this.syncQueue.push(item);
    }

    console.log(`⏳ Sync queue: ${this.syncQueue.length} items`);
  }

  async processSyncQueue() {
    if (this.isSyncing || this.syncQueue.length === 0) return;

    this.isSyncing = true;
    this.syncStatus = 'syncing';
    this.notifyStatusChange();

    while (this.syncQueue.length > 0) {
      if (!navigator.onLine) {
        this.syncStatus = 'offline';
        this.notifyStatusChange();
        this.isSyncing = false;
        return;
      }

      const item = this.syncQueue.shift();

      try {
        const ref = this.db.ref(`coaches/${this.trainerCode}/${item.module}/${item.key}`);
        await ref.set(item.data);
        console.log(`☁️ Synced: ${item.key}`);
      } catch (e) {
        console.error(`❌ Sync failed for ${item.key}:`, e);
        // Lägg tillbaka i kön
        this.syncQueue.unshift(item);
        break;
      }
    }

    this.isSyncing = false;
    this.syncStatus = this.syncQueue.length > 0 ? 'offline' : 'idle';
    this.notifyStatusChange();
  }

  // ============ NETWORK LISTENER ============
  setupNetworkListener() {
    window.addEventListener('online', () => {
      console.log('🌐 Back online!');
      this.syncStatus = 'syncing';
      this.notifyStatusChange();
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      console.log('📵 Offline mode');
      this.syncStatus = 'offline';
      this.notifyStatusChange();
    });

    // Checka vid start
    if (!navigator.onLine) {
      this.syncStatus = 'offline';
      this.notifyStatusChange();
    }
  }

  // ============ STATUS NOTIFIKATION ============
  onStatusChange(callback) {
    this.statusListeners.push(callback);
  }

  notifyStatusChange(type = null, message = null) {
    const status = {
      status: this.syncStatus,
      type,
      message,
      queueLength: this.syncQueue.length,
      isOnline: navigator.onLine,
      trainerCode: this.trainerCode
    };

    this.statusListeners.forEach(cb => cb(status));
    
    // Update UI badge
    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = document.getElementById('sync-status-badge');
    if (!badge) return;

    let icon = '📱';
    let text = 'Lokalt';
    let color = '#999';

    if (!navigator.onLine) {
      icon = '📵';
      text = 'Offline';
      color = '#ff6b6b';
    } else if (this.syncStatus === 'syncing') {
      icon = '⏳';
      text = 'Synkar...';
      color = '#e8ff47';
    } else if (this.syncQueue.length > 0) {
      icon = '⏳';
      text = `${this.syncQueue.length} väntande`;
      color = '#ffa500';
    } else if (this.syncStatus === 'idle') {
      icon = '☁️';
      text = 'Synkat';
      color = '#4caf50';
    }

    badge.textContent = `${icon} ${text}`;
    badge.style.color = color;
  }

  // ============ HELPER: Hämta data ============
  getFromLocal(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // ============ DEBUG ============
  logStatus() {
    console.log({
      trainerCode: this.trainerCode,
      syncStatus: this.syncStatus,
      queueLength: this.syncQueue.length,
      isOnline: navigator.onLine,
      queue: this.syncQueue
    });
  }
}

// ============ GLOBAL INSTANCE ============
let syncManager = null;

function initSyncManager(firebaseConfig) {
  syncManager = new SyncManager(firebaseConfig);
  window.syncManager = syncManager; // För debug
  return syncManager;
}
