// Sync Manager for Firebase
let firebase;
let database;
let trainerCode;

function initSyncManager(firebaseConfig) {
  try {
    firebase = window.firebase;
    
    // Initiera bara om ingen app finns ännu
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    database = firebase.database();
    trainerCode = localStorage.getItem('pt_trainer_code');
    
    if (trainerCode) {
      console.log('✅ Sync initialized:', trainerCode);
      updateSyncBadge(true);
    } else {
      console.log('✅ Sync Manager ready (no trainer code yet)');
    }
  } catch (error) {
    console.error('Sync Manager error:', error);
  }
}

function saveToFirebase(path, data) {
  if (!database || !trainerCode) {
    localStorage.setItem(path, JSON.stringify(data));
    return;
  }
  
  database.ref('coaches/' + trainerCode + '/' + path).set(data)
    .then(function() {
      console.log('✅ Saved:', path);
      updateSyncBadge(true);
    })
    .catch(function(error) {
      console.error('Error:', error);
      updateSyncBadge(false);
    });
}

function readFromFirebase(path, callback) {
  if (!database || !trainerCode) {
    var data = localStorage.getItem(path);
    callback(data ? JSON.parse(data) : null);
    return;
  }
  
  database.ref('coaches/' + trainerCode + '/' + path).on('value', function(snapshot) {
    callback(snapshot.val());
  });
}

function updateSyncBadge(synced) {
  var badge = document.getElementById('sync-status-badge');
  if (!badge) return;
  
  if (synced) {
    badge.textContent = '☁️ Synkat';
  } else {
    badge.textContent = '📱 Offline';
  }
}

window.addEventListener('online', function() { updateSyncBadge(true); });
window.addEventListener('offline', function() { updateSyncBadge(false); });

console.log('✅ Sync Manager ready');
