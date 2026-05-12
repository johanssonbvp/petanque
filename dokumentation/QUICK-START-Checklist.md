# ✅ QUICK START CHECKLIST
## Implementera Google Analytics Event Tracking - 30 minuter

---

## 🚀 STEG 1: Förbered (5 min)

- [ ] Öppna din HTML-fil där du vill spåra events
- [ ] Lokalisera knapparna för:
  - Starta träning
  - Slutföra träning  
  - Se resultat
- [ ] Ha Google Analytics 4 öppet i en annan flik
- [ ] Öppna Developer Tools (F12)

---

## 🔧 STEG 2: Implementera Tracking-kod (10 min)

### Option A: Separat JavaScript-fil
1. Skapa fil: `ga4-event-tracking.js`
2. Kopiera all kod från `ga4-event-tracking.js` filen
3. Lägg filen i samma mapp som din HTML
4. I din HTML, före `</body>` tag, lägg till:
```html
<script src="ga4-event-tracking.js"></script>
```

### Option B: Direkt i HTML
1. Mellan `<script>` tags i din HTML, kopiera koden
2. Exempel:
```html
<body>
  <!-- Din app här -->
  
  <script>
    // Kopiera allt från ga4-event-tracking.js här
  </script>
</body>
```

---

## 🎯 STEG 3: Uppdatera Knapparna (10 min)

Hitta dina tre knapparna och uppdatera dem såhär:

### KNAPP 1: "Starta träning"

**INNAN:**
```html
<button onclick="startTraining()">Starta träning</button>
```

**EFTER:**
```html
<button onclick="trackStartTraining('shooting_training'); startTraining();">
  Starta träning
</button>
```

**Eller om du använder addEventListener:**
```javascript
// INNAN:
document.getElementById('start-btn').addEventListener('click', startTraining);

// EFTER:
document.getElementById('start-btn').addEventListener('click', function() {
  trackStartTraining('shooting_training');
  startTraining();
});
```

---

### KNAPP 2: "Slutföra träning" 

**INNAN:**
```html
<button onclick="saveResults()">Spara resultat</button>
```

**EFTER:**
```html
<button onclick="trackCompleteTraining('shooting_training', 25, 87, 'medium'); saveResults();">
  Spara resultat
</button>
```

**Förklaring av parametrar:**
- `'shooting_training'` = träningstypen (eller 'throw_training', 'precision_shooting')
- `25` = hur många minuter träningen tog
- `87` = användarens poäng (eller vilken metric du mäter)
- `'medium'` = svårighetsnivå ('easy', 'medium', 'hard')

---

### KNAPP 3: "Se resultat"

**INNAN:**
```html
<button onclick="viewResults()">Se resultaten</button>
```

**EFTER:**
```html
<button onclick="trackViewResults('session_results', 'shooting_training'); viewResults();">
  Se resultaten
</button>
```

**Förklaring av parametrar:**
- `'session_results'` = vilken resultattyp ('session_results', 'weekly_stats', 'all_time_stats')
- `'shooting_training'` = träningstypen

---

## 🧪 STEG 4: Testa (5 min)

### Test 1: Browser-konsolen
1. Öppna Developer Tools (F12)
2. Gå till **Console** fliken
3. Klicka på "Starta träning" knappen
4. Du bör se:
   ```
   ✅ Google Analytics 4 är aktivt
   📊 Event spårat: start_training (shooting_training)
   ```

### Test 2: Google Analytics Debug View
1. Logga in på [analytics.google.com](https://analytics.google.com)
2. Gå till din Petanque-app egendom
3. Gå till **Admin** → **Debug View** (eller Realtime)
4. Öppna din app i en ny flik
5. Klicka på en knapp i appen
6. **Inom 1-2 sekunder** bör eventet dyka upp i Debug View!

---

## 📋 DINA EVENTS

Här är alla events du spårar:

```
1. START_TRAINING
   Spåras när: Användare klickar "Starta träning"
   Parametrar: training_type
   Exempel: trackStartTraining('shooting_training')

2. COMPLETE_TRAINING
   Spåras när: Användare slutför träning och sparar
   Parametrar: training_type, duration_minutes, score, difficulty
   Exempel: trackCompleteTraining('shooting_training', 25, 87, 'medium')

3. VIEW_RESULTS
   Spåras när: Användare tittar på sina resultat
   Parametrar: result_type, training_type
   Exempel: trackViewResults('session_results', 'shooting_training')

4. TRAINING_ABANDONED (Valfritt)
   Spåras när: Användare hoppar av en träning
   Parametrar: training_type, duration_before_abandonment
   Exempel: trackTrainingAbandoned('shooting_training', 8)
```

---

## ⚠️ VANLIGA MISSTAG

### ❌ Misstag 1: Glömt att importera filen
```html
<!-- FELAKTIG - Script importeras inte -->
<body>
  <button onclick="trackStartTraining('shooting_training')">Start</button>
</body>

<!-- KORREKT -->
<body>
  <button onclick="trackStartTraining('shooting_training')">Start</button>
  <script src="ga4-event-tracking.js"></script>
</body>
```

### ❌ Misstag 2: Fel träningstyp-namn
```javascript
// FELAKTIG - Typo i namn
trackStartTraining('shootingTraining'); // camelCase

// KORREKT - Använd snake_case
trackStartTraining('shooting_training');

// RÄTT:
trackStartTraining('shooting_training');     ✅
trackStartTraining('throw_training');        ✅
trackStartTraining('precision_shooting');    ✅
```

### ❌ Misstag 3: Glömt duration_minutes parameter
```javascript
// FELAKTIG - Saknar duration
trackCompleteTraining('shooting_training', 87, 'medium');

// KORREKT - duration före score
trackCompleteTraining('shooting_training', 25, 87, 'medium');
                                           ^^
                                       DURATION!
```

---

## 🆘 FELSÖKNING

### Problem: "Unexpected token <" i konsolen
**Lösning:** Du importerar filen från fel plats
- Kontrollera att `ga4-event-tracking.js` ligger i samma mapp som HTML-filen
- Eller använd full sökväg: `<script src="/js/ga4-event-tracking.js"></script>`

### Problem: "trackStartTraining is not defined"
**Lösning:** Script-taggen är inte i HTML
- Kontrollera att `<script src="ga4-event-tracking.js"></script>` finns innan `</body>`
- Eller kopiera all kod direkt i `<script>`-taggen

### Problem: Events dyker inte upp i Debug View
**Lösning:** 
1. Kontrollera att GA4 är installerat (gtag bör finnas)
2. Vänta 2-3 sekunder innan du kollar Debug View
3. Uppdatera sidan i Debug View
4. Testa event igen

---

## 📊 NÄSTA STEG EFTER IMPLEMENTATION

1. **Vänta 3-4 dagar** för att samla data
2. **Kolla rapporter** på Google Analytics (Rapporter → Engagemang)
3. **Exportera första gången** för baseline
4. **Läs avhoppningsanalys-guiden** för att förstå datan
5. **Gör ändringar** baserat på vad du lärt dig

---

## 💾 SPARA DENNA CHECKLIST

Skriv ut eller spara denna sida så du kan gå tillbaka till den senare! 🚀

---

**Du är nu redo att börja spåra! Lycka till! 🎯**
