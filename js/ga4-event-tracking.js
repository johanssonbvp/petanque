/**
 * Google Analytics 4 Event Tracking för Petanque Träningsapp
 * 
 * Denna fil innehåller all kod du behöver för att spåra:
 * 1. Starta träning (start_training)
 * 2. Slutföra träning (complete_training)
 * 3. Se resultat (view_results)
 * 
 * INSTALLATION:
 * 1. Kopiera denna kod till din HTML fil eller i en separat .js fil
 * 2. Kolla att du redan har Google Analytics 4 installerat (gtag)
 * 3. Uppdatera knapparna i din HTML enligt exemplet nedan
 */

// ========================================
// INITIALISERING - Kolla att GA4 är laddat
// ========================================

function initializeGATracking() {
  // Verifiera att gtag finns (GA4 är installerad)
  if (typeof gtag === 'undefined') {
    console.error('Google Analytics 4 är inte installerat. Kolla script-taggen i din HTML.');
    return false;
  }
  console.log('✅ Google Analytics 4 är aktivt');
  return true;
}

// Kör initialisering när sidan laddar
document.addEventListener('DOMContentLoaded', initializeGATracking);

// ========================================
// EVENT 1: STARTA TRÄNING
// ========================================

function trackStartTraining(trainingType) {
  /*
   * trainingType ska vara en av dessa:
   * - "shooting_training" (Skjutträning)
   * - "throw_training" (Läggträning) 
   * - "precision_shooting" (Precisionsskytte)
   * - "other"
   */
  
  gtag('event', 'start_training', {
    'training_type': trainingType,
    'timestamp': new Date().toISOString(),
    'session_id': getSessionId()
  });
  
  console.log('📊 Event spårat: start_training (' + trainingType + ')');
}

// HTML EXEMPEL:
// <button onclick="trackStartTraining('shooting_training')">
//   Starta Skjutträning
// </button>


// ========================================
// EVENT 2: SLUTFÖRA TRÄNING
// ========================================

function trackCompleteTraining(trainingType, duration, score, difficulty) {
  /*
   * Parametrar:
   * - trainingType: samma som ovan
   * - duration: träningens längd i minuter (ex: 15, 30, 45)
   * - score: användarens poäng/resultat (number)
   * - difficulty: "easy", "medium", "hard"
   */
  
  gtag('event', 'complete_training', {
    'training_type': trainingType,
    'duration_minutes': duration,
    'score': score,
    'difficulty': difficulty,
    'timestamp': new Date().toISOString(),
    'session_id': getSessionId()
  });
  
  console.log('📊 Event spårat: complete_training (' + trainingType + ', ' + duration + 'min, Score: ' + score + ')');
}

// HTML EXEMPEL (när träning är klar):
// <button onclick="trackCompleteTraining('shooting_training', 25, 87, 'medium')">
//   Spara resultatet
// </button>


// ========================================
// EVENT 3: SE RESULTAT
// ========================================

function trackViewResults(resultType, trainingType) {
  /*
   * Parametrar:
   * - resultType: "session_results" (idag), "weekly_stats", "all_time_stats"
   * - trainingType: vilken träningstyp användaren tittar på resultat för
   */
  
  gtag('event', 'view_results', {
    'result_type': resultType,
    'training_type': trainingType,
    'timestamp': new Date().toISOString(),
    'session_id': getSessionId()
  });
  
  console.log('📊 Event spårat: view_results (' + resultType + ')');
}

// HTML EXEMPEL:
// <button onclick="trackViewResults('session_results', 'shooting_training')">
//   Se idag's resultat
// </button>


// ========================================
// EXTRA EVENTS - Valfritt men användbara
// ========================================

function trackTrainingAbandoned(trainingType, durationBefore) {
  /*
   * Spåra när användare hoppar av en träning
   * durationBefore = hur länge de tränade innan de hoppade av (minuter)
   */
  
  gtag('event', 'training_abandoned', {
    'training_type': trainingType,
    'duration_before_abandonment': durationBefore,
    'timestamp': new Date().toISOString(),
    'session_id': getSessionId()
  });
  
  console.log('📊 Event spårat: training_abandoned');
}

function trackPageView(pageName) {
  /*
   * Spåra när användare navigerar till viktiga sidor
   * pageName: "home", "training_selection", "results_dashboard", "settings"
   */
  
  gtag('event', 'page_view', {
    'page_name': pageName,
    'timestamp': new Date().toISOString(),
    'session_id': getSessionId()
  });
  
  console.log('📊 Event spårat: page_view (' + pageName + ')');
}


// ========================================
// HJÄLPFUNKTIONER
// ========================================

function getSessionId() {
  /*
   * Generera eller hämta ett unikt session ID
   * Detta hjälper dig förstå användarresor bättre
   */
  
  let sessionId = sessionStorage.getItem('ga_session_id');
  
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('ga_session_id', sessionId);
  }
  
  return sessionId;
}

function trackUserProperty(propertyName, propertyValue) {
  /*
   * Spåra anpassade användaregenskaper (valfritt)
   * Ex: användarens träningsnivå, ålder, etc.
   */
  
  gtag('set', {
    'user_property_' + propertyName: propertyValue
  });
  
  console.log('📊 Användar-property satt: ' + propertyName + ' = ' + propertyValue);
}


// ========================================
// DEBUG MODE - För testning
// ========================================

function enableGADebugMode() {
  /*
   * Slå på debug mode för att se events i konsolen
   * Öppna DevTools (F12) och gå till Network-fliken
   */
  
  window.gtag('config', 'G-XT4NB1HR2J', {
    'debug_mode': true
  });
  
  console.log('🐛 GA4 Debug mode är PÅ - se events i Network-fliken');
}


// ========================================
// EXEMPEL: KOMPLETT TRÄNINGSFLÖDE
// ========================================

/*
EXEMPEL på hur ett helt träningsflöde ser ut med spårning:

1. Användare klickar "Starta träning"
   -> trackStartTraining('shooting_training')

2. Användare tränar i 20 minuter

3. Användare slutför träningen med 85 poäng
   -> trackCompleteTraining('shooting_training', 20, 85, 'medium')

4. Användare tittar på sina resultatsidor
   -> trackViewResults('session_results', 'shooting_training')

5. Om användaren hoppar av manuellt
   -> trackTrainingAbandoned('shooting_training', 8)
*/


// ========================================
// INTEGRATIONSEXEMPEL - HTML
// ========================================

/*
KOPIERA DENNA HTML I DIN SIDA:

<div class="training-app">
  
  <!-- STEG 1: VÄLJ TRÄNING -->
  <section id="training-selection">
    <h2>Välj träning</h2>
    <button onclick="trackStartTraining('shooting_training')">
      🎯 Starta Skjutträning
    </button>
    <button onclick="trackStartTraining('throw_training')">
      🎪 Starta Läggträning
    </button>
    <button onclick="trackStartTraining('precision_shooting')">
      🔫 Starta Precisionsskytte
    </button>
  </section>

  <!-- STEG 2: TRÄNING PÅGÅR (dold fram till användare startar) -->
  <section id="training-active" style="display:none;">
    <h2>Träning pågår...</h2>
    <p id="training-timer">00:00</p>
    <button onclick="trackTrainingAbandoned('shooting_training', 5)">
      Avbryt träning
    </button>
  </section>

  <!-- STEG 3: RESULTAT -->
  <section id="training-complete" style="display:none;">
    <h2>Träning slutförd!</h2>
    <p>Ditt resultat: <span id="final-score">0</span> poäng</p>
    <button onclick="trackCompleteTraining('shooting_training', 25, 87, 'medium')">
      Spara resultatet
    </button>
  </section>

  <!-- STEG 4: RESULTATÖVERSIKT -->
  <section id="results-view">
    <h2>Dina resultat</h2>
    <button onclick="trackViewResults('session_results', 'shooting_training')">
      Se dagens resultat
    </button>
    <button onclick="trackViewResults('weekly_stats', 'shooting_training')">
      Se veckans statistik
    </button>
  </section>

</div>

<script src="ga4-event-tracking.js"></script>
*/
