# Google Analytics 4 Dashboard Setup
## Veckorapporter för din Petanque-träningsapp

---

## 📊 DASHBOARD INSTALLATION (3 minuter)

### STEG 1: Gå in i Google Analytics 4
1. Logga in på [analytics.google.com](https://analytics.google.com)
2. Välj din Petanque-app-egendom ("seriehanterare")
3. Klicka på **"Rapporter"** i vänstermenyn

---

## 🎯 DASHBOARD 1: SNABB ÖVERBLICK (Huvuddashboard)

**Vad du ska se:**

```
┌─────────────────────────────────────────────────────────┐
│  PETANQUE TRÄNINGSAPP - VECKOÖVERSIKT                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Aktiva användare denna vecka:     [182]  ↑ 5% från förra│
│  Nya användare:                    [45]   ↑ 12%          │
│  Genomsnittlig engagemangstid:     [63 min] ↑ 3%        │
│  Totala events denna vecka:        [1948]  ↑ 8%         │
│                                                           │
├─────────────────────────────────────────────────────────┤
│  VILKA TRÄNINGAR ANVÄNDS MEST?                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1️⃣  Petanque Träning                  498 visningar    │
│  2️⃣  Skjutträning                      120 visningar    │
│  3️⃣  Läggträning                        53 visningar    │
│  4️⃣  Träningsdagbok                     38 visningar    │
│  5️⃣  Poängräknare                       26 visningar    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Hur du skapar detta:**

1. Klicka **"Anpassat dashboard"** (eller "+ " vid Dashboard)
2. Klicka **"Skapa nytt dashboard"**
3. Ge det namn: **"Veckoöversikt"**

Lägg till dessa kort (widgets):

| Kort | Mått | Dimension |
|------|------|-----------|
| Aktiva användare | Aktiva användare | - |
| Nya användare | Nya användare | - |
| Engagemangstid | Genomsnittlig engagemangstid | - |
| Events | Antal händelser | - |
| Sidor | Sidrubrik | Visningar |

---

## 🔍 DASHBOARD 2: EVENT TRACKING (Viktigaste!)

**DEN HÄR VISAR DINA 3 NYCKELÅTGÄRDER:**

```
┌─────────────────────────────────────────────────────────┐
│  EVENT SPÅRNING - DIN ANVÄNDARRESA                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  START_TRAINING (Startar träning)                       │
│  ├─ Shooting_training        →  87 users               │
│  ├─ Throw_training           →  32 users               │
│  └─ Precision_shooting       →  8 users                │
│                                                           │
│  COMPLETE_TRAINING (Slutför träning)                    │
│  ├─ Shooting_training        →  72 users (83%)         │
│  ├─ Throw_training           →  25 users (78%)         │
│  └─ Precision_shooting       →  6 users (75%)          │
│                                                           │
│  VIEW_RESULTS (Ser resultat)                            │
│  ├─ Session_results          →  68 users               │
│  ├─ Weekly_stats             →  42 users               │
│  └─ All_time_stats           →  28 users               │
│                                                           │
│  AVGÅNGSHASTIGHET (Hoppar av):                          │
│  └─ Shooting: 15 av 87 (17%)                           │
│     Throw: 7 av 32 (22%)                                │
│     Precision: 2 av 8 (25%)                             │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Hur du skapar detta:**

1. Gå till **"Rapporter" → "Engagemang" → "Evenemål"**
2. Du bör se dina custom events här när du implementerat spårningen
3. Klicka på varje event för att se mer detaljer

**MEN FÖRST:** Du måste registrera dina custom events i GA4:

### ⚠️ REGISTRERA CUSTOM EVENTS (Viktigt!)

Google Analytics behöver veta om dina custom events. Gör såhär:

1. Gå till **Admin → Egenskap → Custom definitions**
2. Klicka **"Create custom event"**
3. Lägg till dessa events:

```
Event name: start_training
Parameters: training_type

Event name: complete_training
Parameters: training_type, duration_minutes, score, difficulty

Event name: view_results
Parameters: result_type, training_type

Event name: training_abandoned
Parameters: training_type, duration_before_abandonment
```

---

## 📈 DASHBOARD 3: ANVÄNDARRESOR (Förstå avhoppningen!)

**Visa hur användare flödar genom appen:**

1. Gå till **"Rapporter" → "Engagemang" → "Användarresor"**
2. Sätt "Dimension" till: **Event**
3. Du ser då: 
   - Vilka events som följer varandra
   - Var användare hoppar av (inte fler events efter)

**Exempel på vad du letar efter:**

```
start_training 
  ↓
complete_training (82% gjorde detta)
  ↓
view_results (79% gjorde detta)
  ↓
(silence - 21% hoppar av här)
```

---

## 🎯 DASHBOARD 4: KOHORT-ANALYS (Varför dag 25-26 var så bra!)

**Spåra samma användargrupp över tid:**

1. Gå till **"Rapporter" → "Användaröversikt" → "Kohort"**
2. Du ser då vilken vecka användare kom och hur många som återkommer

**Vad att leta efter:**
- Vilken vecka hade störst inflöde av nya användare? (Din dag 25-26!)
- Återkommer de senare?
- Skillnad mellan nya och gamla användare?

---

## 🚨 DASHBOARD 5: AVHOPPNINGSANALYS (Det du behöver!)

**Hitta var användare hoppar av:**

1. Gå till **"Rapporter" → "Engagemang" → "Sidor och skärmar"**
2. Sortera på: **Avvisningsfrekvens** (högsta först)
3. Du ser:

```
Precisionsskytte        - 0% avvisning (för låg traffic - 9 sidor)
Poängräknare            - 0% avvisning (låg traffic - 26)
Läggträning             - 4.4% avvisning ✅ Bra!
Skjutträning            - 6% avvisning ✅ OK
Petanque Träning        - 42% avvisning ⚠️ MÅNGA HOPPAR AV HÄR
```

**Problemet:** 42% av alla som landar på Petanque Träning hoppar av utan att göra något!

**Lösning:** Förbättra den sidan! Det är din gateway, så om den inte konverterar till events mister du nästan hälften.

---

## 📅 VECKORAPPORTER (AUTOMATISERA!)

### Skapa en veckorapport som mailas till dig:

1. Gå till **"Rapporter" → Dashboard"**
2. Klicka på **⋮ (tre prickar)** på ett dashboard
3. Välj **"Schemalägga e-post"**
4. Välj:
   - Frekvens: **Veckovis**
   - Dag: **Fredagar kl 09:00**
   - Mottagare: **Din e-mail**

---

## 💾 EXPORTERA DATA VARJE VECKA

Gör såhär för att få samma data som CSV/PDF:

1. Öppna valfri rapport
2. Klicka **📥 (nedladdningsikon)**
3. Välj format: **CSV** eller **PDF**
4. Spara med namn: **"Petanque_Rapport_V{veckanummer}"**

**Rekommendation:** Exportera dessa varje fredag:
- Evenemål (Events)
- Användarresor
- Sidor och skärmar
- Kohortanalys

---

## 🔧 TEST AV EVENT TRACKING

Innan du går live, testa att allt fungerar:

### I Google Analytics:

1. Gå till **"Admin" → "Debug View"** (eller "DebugView" i vänstermenyn)
2. Öppna din app i en ny flik
3. Klicka på en knapp som ska spåra ett event
4. I Debug View bör du se eventet dyka upp inom 1-2 sekunder!

### I DevTools (F12):

1. Öppna appen
2. Tryck **F12** → gå till **Network**-fliken
3. Filtrera på **"collect"** eller **"google"**
4. Klicka på en spårad knapp
5. Du bör se en request till Google Analytics!

---

## ✅ CHECKLISTA - NÄSTA STEG

- [ ] Implementera event-tracking-koden (ga4-event-tracking.js)
- [ ] Registrera custom events i GA4 Admin
- [ ] Skapa "Veckoöversikt" dashboard
- [ ] Testa events i Debug View
- [ ] Sätta upp veckorapport via mail
- [ ] Spara första exporterade rapporten för jämförelse

---

## 📞 VIKTIGA FRÅGOR ATT SVARA PÅ SENARE

Med denna data kan du svar på:

1. **"Varför hade vi spike på dag 25-26?"**
   - Kolla Kohort-analysen - vilka användargrupper växte då?

2. **"Varför hoppar 42% av på huvudsidan?"**
   - Kolla Användarresor - vad var deras nästa event? (eller ingen)
   - Förbättra UX på den sidan

3. **"Vilka träningar är mest populära?"**
   - Events per träningstyp

4. **"Återkommer användarna?"**
   - Jämför "Nya" vs "Returning" i Kohort-analysen

5. **"Var är flaskhalsen i träningsflödet?"**
   - Användarresor: start_training → complete_training konvertering

---

## 💡 PRO TIPS

**Tip 1:** Skapa en "Jämförare"-rapport för att se skillnad mellan veckor
- Använd "Datumjämförelse" i rapportinställningarna

**Tip 2:** Gör Filter för bara "Returning Users"
- Sätt filter: User type = Returning
- Jämför med "New Users"

**Tip 3:** Använd Segment för att gruppera användare
- Skapa segment: "Completed Training" 
- Spara: event name = complete_training

**Tip 4:** Exportera samma rapport varje vecka för trending
- Gör en mapp: "Analytics Exports"
- Spara: Petanque_Rapport_V16.csv, V17.csv, V18.csv osv
- Efter 4-5 veckor ser du trends! 📈
