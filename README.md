# ⚫ Petanque Träning

> **Gratis träningsplattform för petanquespelare** — Spåra ditt spel, förbättra dina färdigheter och konkurrera med vänner.

![Petanque Ball](https://img.shields.io/badge/Petanque-Träning-FFD700?style=flat-square) ![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?style=flat-square) ![PWA Ready](https://img.shields.io/badge/PWA-Ready-green?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-red?style=flat-square)

**🌐 Besök:** [petanquetraning.se](https://petanquetraning.se)

---

## 📱 Om projektet

**Petanque Träning** är en komplett webb- och PWA-baserad träningsplattform designad för petanquespelare i alla nivåer. Appen hjälper dig att:

✅ **Träna skjutning** — Registrera miss, träff och carreau med detaljerad statistik per avstånd  
✅ **Träna läggning** — Fokusera på tre övningstyper med zondlade resultat  
✅ **Spåra matcher** — Använd den digitala poängräknaren för singel och lagmatcher (2v2/3v3)  
✅ **Föra dagbok** — Logga träningspass och följa din utveckling över tid  
✅ **Analysera precision** — Testa dina färdigheter med precisionsskyttet enligt SBF-regler  
✅ **Hantera serier** — Admin-panel för ligahantering och matchresultat (Firebase)

**Allt utan registrering** — Data sparas lokalt på din enhet och synkroniseras offline.

---

## 🎯 Funktioner

### 🎯 **Skjutträning** (`skjuttraning.html`)
- Välj avstånd (6, 7, 8, 9m) och antal skott (10–50)
- Registrera miss/träff/carreau i realtid
- Progressbar och live-statistik
- **Statistik per avstånd** med trend och medelvärde
- Historik, rekord och grafvy
- Kalenderöversikt över träningspass
- **Export/import** av träningsdata som JSON

### 🎯 **Läggträning** (`laggtraning.html`)
- **3 övningstyper:** Precisionsmål, Avståndszoner, 3-boulerserie
- Zonindelning: Nära (0–20cm), Mitt (20–40cm), Långt (40–60cm)
- Anpassningsbar antal kast och avstånd
- Historik och statistik per övningstyp

### 🎯 **Poängräknare** (`tavlingssimulator.html`)
- Digital räknare för **singel** och **lag** (2v2/3v3)
- Anpassningsbar målpoäng och bollar per spelare
- Progressbars med bump-animation
- Rundlista med ångra-funktion

### 🎯 **Träningsdagbok** (`dagbok.html`)
- Logga datum, plats, träningstyp och känsla (1–5 stjärnor)
- Månadskalender med färgkodade dagar
- Listvy med möjlighet att ta bort inlägg
- Spåra långsiktig utveckling

### 🎯 **Precisionsskytte** (`precisionsskytte.html`)
- Baserad på **Svenska Petanqueförbundets regler** (SBF 2021-1)
- 20 skott: 5 stationer × 4 avstånd (6/7/8/9m)
- Poängregler (0/1/3/5p) visas per station
- Resultat och historik sparas

### 🏆 **Ligahantering** (`serie/`)
- **Publikvy** (`serie/index.html`) — Live-tabeller och omgångsresultat
- **Admin-panel** (`serie/admin.html`) — Skapa divisioner, lägg till lag, mata in resultat
- Set-format med automatisk aktivering
- Firebase Realtime Database som backend
- Arkivfunktion för tidigare säsonger

---

## 🛠️ Teknisk Stack

| Teknik | Användning |
|--------|-----------|
| **HTML5** | Struktur och UI |
| **CSS3** | Responsiv design, mörkt tema |
| **JavaScript (ES6)** | Logik och interaktivitet |
| **Service Worker** | Offline-support och PWA |
| **localStorage** | Lokal datalagring |
| **Firebase** | Backend för ligasystemet |
| **GitHub Pages** | Hosting |

### Design
- 🌙 **Mörkt designsystem** för ögonkomfort
- 💛 **Gul accentfärg** (#e8ff47) för visuell fokus
- 🔤 **Barlow Condensed** för displaytext
- 📱 **Fullständigt responsiv** — Fungerar på alla enheter

---

## 📦 Struktur

```
petanque-repo/
├── index.html                 # Portalsida med applokal
├── skjuttraning.html         # Skjutträningsapp
├── laggtraning.html          # Läggträningsapp
├── tavlingssimulator.html    # Poängräknare
├── dagbok.html               # Träningsdagbok
├── precisionsskytte.html     # Precisionsskytte
├── manifest.json             # PWA-manifest
├── sw.js                     # Service Worker
├── storage-manager.js        # Universal storage API
├── lang-manager.js           # Språkhantering (SV/EN)
├── offline-indicator.js      # Offline-status badge
├── serie/
│   ├── index.html           # Ligatabeller (publik)
│   └── admin.html           # Admin-panel (inloggning)
├── dokumentation/
│   ├── manual.pdf           # Användarhandbok
│   ├── QUICK-START-Checklist.md
│   ├── GA4-Dashboard-Guide.md
│   └── Avhoppningsanalys-Guide.md
├── js/
│   └── ga4-event-tracking.js # Google Analytics 4
└── icon-192.png, icon-512.png # PWA-ikoner
```

---

## 🚀 Kom igång

### Online (direkt)
Besök **[petanquetraning.se](https://petanquetraning.se)** i din webbläsare — ingen installation krävs!

### Installera som app
1. **Android:** Öppna i Chrome → "Installera app"
2. **iOS:** Öppna i Safari → Dela (↗) → "Lägg till på hemskärmen"
3. **Desktop:** Klicka "Installera" i webbläsaren

### Offline-drift
Appen fungerar **offline** när den väl är installerad. All data sparas lokalt på din enhet.

---

## 💾 Datahantering

### Lagring
- **Lokal lagring:** localStorage (ingen molnsynkronisering per default)
- **Sessioner:** Sparas automatiskt när du använder appar
- **Export:** Ladda ned data som JSON-fil
- **Import:** Importera tidigare exporterad data

### Sekuritet
- ✅ Ingen inloggning för träningsappar (bara lokalt)
- ✅ Firebase API-nyckel begränsad till `petanquetraning.se`
- ✅ Ligadministration skyddad med Firebase Authentication
- ✅ Inga känsliga personuppgifter sparas

---

## 🌍 Språkstöd

Appen stöder **svenska, engelska och spanska** med intelligent språkväljare:
- 🔘 **Språk-knapp i toppraden:** 🇸🇪 SV | 🇬🇧 EN | 🇪🇸 ES
- 🌐 **Browser-språk detekteras automatiskt**
- 💾 **Inställning sparas i localStorage**
- ✨ **Professionell spansk översättning** — Relevant för petanque-spelare i Spanien

### Spanska Översättningar
- **Petanque Träning** → Entrenamiento Petanca
- **Skjutträning** → Entrenamiento de Tiro
- **Läggträning** → Entrenamiento de Colocación
- **Poängräknare** → Contador de Puntos
- **Träningsdagbok** → Diario de Entrenamiento
- **Precisionsskytte** → Tiro de Precisión

## 🔔 Push-Notiser (OneSignal)

Appen stöder **push-notiser** via OneSignal för PWA:
- 📱 Installera appen → Få notiser om nya funktioner
- 🔔 Notiser fungerar offline (sparas lokalt)
- 📲 Fungerar på Android PWA och webbläsare
- ✅ **Testad och fungerar** på Pixel 8 Pro

**Installation:** Appen frågar om notiser när du installerar den.

---

## 📊 Analytics & Statistik

### Google Analytics 4
- **Aktiva användare:** 231+ (maj 2026)
- **Nya användare:** 227+ denna månad
- **Engagering:** 1m 15s genomsnittlig engagemangstid
- **Populäraste app:** Skjutträning (204 användare, 8% avvisning)

### Trafikskällor
- **Direct (92%)** — Folk skriver in URL direkt
- **Facebook (30%)** — Från Facebook-grupper
- **Google Organic (6%)** — Sökmotorer (kan förbättras)
- **Instagram (1%)** — Från Reels (kan förbättras)

**Ingen personlig data samlas in** — bara aggregerad statistik.

---

## 🔄 PWA & Offline

Appen är en **Progressive Web App** (PWA) med:
- 📥 Installeras på hemskärmen
- ⚡ Snabb lastning med Service Worker-caching
- 🔌 Fungerar offline efter första besöket
- 🔄 Stale-While-Revalidate caching-strategi
- 📱 App-liknande upplevelse på mobil

**Service Worker-version:** `v{YYYYMMDD}` — uppdateras automatiskt dagligen.

---

## 🔧 Development

### Senaste förbättringar (April 2026)

#### ✨ **UI & UX**
- ✅ **Större CTA-knapp** ("BÖRJA TRÄNA NU") — Mer synlig, lägre avvisningsfrekvens
- ✅ **Förbättrad footer** — Copyright-information tydlig, länk till LICENSE
- ✅ **Responsiv design** — Optimerad för alla skärmstorlekar

#### 🐛 **Bugfixar**
- ✅ **Träffprocent-beräkning fixad** — Räknar nu rätt (traff + carreau)
- ✅ **localStorage-nycklar korrigerade** — Konsistent datalagrng
- ✅ **Dubbelsparning åtgärdad** — sessionSaved-flagga + deduplicateHistory()
- ✅ **Email-skydd** — Base64-kodad kontaktinfo i footer

#### 🎨 **Design & Branding**
- ✅ **Ny logotyp** — Modern, minimalistisk design (Adobe Firefly)
- ✅ **PWA-ikoner uppdaterade** — 192x192 och 512x512 PNG
- ✅ **Färgschema** — Mörkblå (#0A0E27) + gul accent (#e8ff47)

#### 📱 **Performance & PWA**
- ✅ **Service Worker optimerad** — Stale-While-Revalidate caching
- ✅ **Filstorlek reducerad** — 19% mindre (167KB → 136KB)
- ✅ **Offline-funktionalitet** — Testad och fungerar
- ✅ **OneSignal push-notiser** — Fungerar på Android PWA

#### 🌍 **Internationalisering**
- ✅ **Spansk support tillagd** — Completa UI på spanska
- ✅ **Språk-knapp uppdaterad** — 🇸🇪 SV | 🇬🇧 EN | 🇪🇸 ES
- ✅ **Petanque-termer korrekt översatta**

### Förutsättningar
- Node.js (optional, för lokal development)
- Git
- En webbläsare

### Lokal körning
```bash
# Klona repositoryt
git clone https://github.com/johanssonbvp/skyttetraning.git
cd skyttetraning

# Servera lokalt (eller öppna index.html direkt i webbläsaren)
python3 -m http.server 8000
# Sedan besök http://localhost:8000
```

### Firebase-setup (för ligasystemet)
1. Skapa ett Firebase-projekt på [console.firebase.google.com](https://console.firebase.google.com)
2. Aktivera **Realtime Database** och **Authentication** (Email/Password)
3. Uppdatera API-nyckel i `serie/index.html` och `serie/admin.html`
4. Deploy till Firebase Hosting:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy
   ```

---

## 📝 Dokumentation

Se mappen `dokumentation/` för detaljerade guider:
- 📖 **manual.pdf** — Fullständig användarhandbok
- ⚡ **QUICK-START-Checklist.md** — Snabbstart för nya användare
- 📊 **GA4-Dashboard-Guide.md** — Hur man tolkar analytics
- 📉 **Avhoppningsanalys-Guide.md** — Analysera användarflöde

---

## 🚀 Deploy

Projektet är hostat på **GitHub Pages** och distribueras automatiskt när du pushar till `main`:

```bash
git add .
git commit -m "Uppdateringar"
git push origin main
```

Webbsidan uppdateras automatiskt inom några sekunder på [petanquetraning.se](https://petanquetraning.se).

---

## 📧 Kontakt & Support

- **Utvecklare:** Pär Johansson
- **GitHub:** [johanssonbvp](https://github.com/johanssonbvp)
- **Webbsida:** [petanquetraning.se](https://petanquetraning.se)

---

## 🤝 Bidra

Har du idéer, bug-rapporter eller funktionförfrågningar?

1. **Öppna en Issue** på GitHub
2. **Forka projektet** och skapa en Pull Request
3. **Kontakta** utvecklaren direkt

---

## 🛍️ Merch & Community

### Petanque Träning Merch (Planerat)
- 👕 **T-shirts** — Med logotypen
- 🎒 **Tygväskor** — Perfekt för att bära bollar
- 🧢 **Kepsar** — Snygg marknadsföring på banorna
- 💧 **Vattenflaskor** — Klassisk sportutrustning
- 🧣 **Sweatshirts** — För kallare dagar
- 🏷️ **Klistermärken** — Gratis marknadsföring!

**Tillverkare:** Printful.com / Demitasse.se

### Marknadsföring & Spridning
- 📱 **Instagram Reels** — Träningsvideos och tips
- 🎬 **TikTok** — Kort format content för ungdom
- 📘 **Facebook** — Kontakt med petanque-grupper och klubbar
- 🇪🇸 **Spanien/Portugal** — Target marknad (nu med spansk UI!)
- 🏆 **Svenska Petanqueförbundet** — Officiell länkning (planerat)

**Målgrupp:** Petanquespelare i Sverige, Spanien, Portugal och Tyskland

### Användar-statistik
- **Aktiva användare:** 231+ (maj 2026)
- **Nya användare/månad:** 227+
- **Främsta städer:** Stockholm (31%), Göteborg (10%), Malmö (5%)
- **Populäraste app:** Skjutträning (88% av användarflödet)

---

## 📄 Licens

**PROPRIETARY AND CONFIDENTIAL** — Pär Johansson, 2026

Se [LICENSE](LICENSE) för detaljer.

**Juridisk skydd:**
- ✅ **Copyright © 2026 Pär Johansson** — Alla rättigheter förbehållna
- ✅ **Proprietary License** — Appen kan inte kopieras eller säljas utan tillstånd
- ✅ **GitHub License-fil** — Officiell juridisk skyddning
- 📝 **Varumärke registrerat hos Svenska Varumärkesverket**

**Användning:** 
- ❌ Inte tillåtet att kopiera eller ändra koden
- ❌ Inte tillåtet att sälja appen eller merch utan tillstånd
- ✅ Gratis att användera appen

---

## 🏆 Tack!

Tack för att du använder Petanque Träning! Din feedback hjälper oss att göra appen bättre. 

**Lycka till med träningen och mycket bollspel!** 🎯⚫

---

### Snabblänkar
- 🌐 [Besök webbsidan](https://petanquetraning.se)
- 📖 [Läs handboken](https://petanquetraning.se/dokumentation/manual.pdf)
- 🐛 [Rapportera bug](https://github.com/johanssonbvp/skyttetraning/issues)
- 💾 [Ladda ned data](https://petanquetraning.se)

---

**Senast uppdaterad:** 3 maj 2026  
**Uppdateringar denna version:**
- ✅ Spansk språkstöd tillagd (ES)
- ✅ Juridiskt skydd implementerat (PROPRIETARY License)
- ✅ Push-notiser via OneSignal (testad)
- ✅ CTA-knapp förbättrad (större & mer lysande)
- ✅ Copyright-information tillagd i alla filer
- ✅ Footer-design uppdaterad

**Projektet är aktivt underhållet** ✨  
**Utvecklare:** Pär Johansson  
**Licens:** PROPRIETARY — Alla rättigheter förbehållna © 2026  
**GitHub:** [johanssonbvp/skyttetraning](https://github.com/johanssonbvp/skyttetraning)
