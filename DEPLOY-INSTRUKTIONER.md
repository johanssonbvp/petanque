# 🚀 Deploy Firebase-version till GitHub

## **ALLT ÄR KLART!** ✅

Jag har uppdaterat alla filerna. Du behöver bara pushas till GitHub.

---

## **Steg-för-steg:**

### **1. Ladda ned alla filer från outputs:**
- `sync-manager.js` 
- `index-firebase.html` → Döp om till `index.html`
- `skjuttraning.html`
- `laggtraning.html`
- `dagbok.html`
- `precisionsskytte.html`
- `tavlingssimulator.html`

### **2. Uppdatera ditt GitHub-repo:**

```bash
# Gå till ditt repo
cd /path/to/skyttetraning

# Ersätt de gamla filerna
cp /downloads/sync-manager.js ./
cp /downloads/index-firebase.html ./index.html
cp /downloads/skjuttraning.html ./
cp /downloads/laggtraning.html ./
cp /downloads/dagbok.html ./
cp /downloads/precisionsskytte.html ./
cp /downloads/tavlingssimulator.html ./
```

### **3. Uppdatera Service Worker (sw.js):**

Öppna `sw.js` och ändra versionsnumret på översta raden:

**INNAN:**
```javascript
const CACHE_VERSION = 'v14';
```

**EFTER:**
```javascript
const CACHE_VERSION = 'v15';
```

### **4. Commit och push:**

```bash
git add .
git commit -m "feat: Add Firebase integration with trainer code login and auto-sync"
git push origin main
```

### **5. GitHub Pages uppdateras automatiskt** ⏳

Det tar 1-2 minuter. Sedan kan du:

1. Öppna `https://petanquetraning.se`
2. Se login-modal
3. Ange en tränarkod (t.ex. `GBGPETANQUE`)
4. All gammal data migreras automatiskt
5. Öppna en träningsapp → Data sparas med Firebase

---

## **VAD SOM ÄNDRATS:**

### ✅ **index.html (ny)**
- Tränar-login med kod
- Sync-status badge
- Auto-migrering av gammal data

### ✅ **sync-manager.js (ny fil)**
- Global Firebase-synk
- Offline-queue
- Auto-sync när internet återkommer

### ✅ **Alla app-filer uppdaterade:**
- `skjuttraning.html` - använder `syncManager.save('shooting', ...)`
- `laggtraning.html` - använder `syncManager.save('pointing', ...)`
- `dagbok.html` - använder `syncManager.save('diary', ...)`
- `precisionsskytte.html` - använder `syncManager.save('precision', ...)`
- `tavlingssimulator.html` - använder `syncManager.save('matches', ...)`

Alla har även en **sync-status badge** som visar: 📱/⏳/☁️/📵

---

## **FIREBASE DATASTRUKTUR**

Data sparas under:
```
coaches/
  GBGPETANQUE/              ← Tränarkod
    shooting/
      pt_s: {...}           ← Aktuell session
      pt_h: [...]           ← Historik
    pointing/
      pt_lagg_history: [...]
    diary/
      pt_dagbok: [...]
    precision/
      pt_precision_data: [...]
    matches/
      pt_matches: [...]
```

---

## **TESTA OFFLINE/ONLINE:**

### Test 1: Offline sparning
1. Stäng internet på telefonen
2. Öppna appen
3. Gör en träning
4. Data sparas lokalt (badge: 📱 Lokalt)

### Test 2: Auto-sync
1. Öppna internet igen
2. Badge ändras automatiskt till ☁️ Synkat
3. Firebase Console → Realtime Database → Du bör se data under `coaches/GBGPETANQUE/`

---

## **PROBLEM?**

### **Q: Data synkas inte?**
- Checka att `sync-manager.js` ligger i samma mapp som HTML-filerna
- Checka Firebase Console → Realtime Database Rules är rätt inställda:
```json
{
  "rules": {
    "coaches": {
      "$trainerCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

### **Q: Login fungerar inte?**
- Checka webbläsarens console för errors
- `syncManager` bör finnas när du skriver `syncManager` i console

### **Q: Gamla data försvann?**
- Data migrerades till Firebase under `coaches/[KOD]/`
- Checka Firebase Console för att verifiera

---

## **NÄSTA STEG (FRAMTIDEN):**

- 🔐 Firebase Authentication (email/lösenord)
- 👥 Dela tränarkoden med tränare
- 📊 Tränardashboard (se alla spelares statistik)
- 🔔 Push-notifikationer för matchuppdateringar

---

**Du är redo! Push till GitHub och testa på mobil!** 🎉

Några frågor? Säg till! 🚀
