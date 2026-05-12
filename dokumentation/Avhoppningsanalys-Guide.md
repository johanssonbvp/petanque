# 🔍 Avhoppningsanalys & Dag 25-26 Investigation
## Handbok för att förstå användarnas beteende

---

## 📌 PROBLEM 1: Dag 25-26 Viral Spike

**Vad hände:** 
- Dag 25: **37 nya användare** (normal siffra: 1-5)
- Dag 26: **62 nya användare** (normal siffra: 1-5)
- **99 nya användare på bara 2 dagar = 4x normal tillväxt!**

### 🎯 Undersökningsplan:

#### STEG 1: Kolla Facebook-aktivitet
1. Gå till **"Rapporter" → "Traffic Acquisition"** (eller "Källa/Medium")
2. Filtrera på datum: **Dag 25-26**
3. Kolla: Kom alla från Facebook? Vilka Facebook-sidor?

**Vad att förvänta sig:**
```
Facebook skulle vara 80%+ av trafiken den dagen
(normalt är den ~60%)
```

#### STEG 2: Kolla vilka sidor de besökte
1. **"Rapporter" → "Engagement" → "Pages"**
2. Filtrera: Användarens första interaktion = dag 25-26
3. Vilken sida landade de på? (Troligt: "Petanque Träning")

#### STEG 3: Gjorde de något?
1. Kolla **Events** för dag 25-26
2. Fråga: Startar de träning? Eller bara kommer och går?
3. Jämför konverteringsgrad:
   - Dag 25-26 nya användare: Hur många startar träning?
   - Andra dagar nya användare: Hur många startar träning?

**Hypotesis:** Om dag 25-26-användarna har LÄGRE konvertering = de var "quality leads" som inte konverterade.

---

## 🔴 PROBLEM 2: Låg Avkastning från Dag 25-26 Spike

**Data visar:**
- Du fick 99 nya användare på 2 dagar
- Men din totala "aktiva användare" steg bara från ~160 till 182
- **Var tog de vägen?**

### 🎯 Undersökningsplan:

#### STEG 1: Kohort-analys av dag 25-26 användare
1. Gå till **"Rapporter" → "User type/Cohort"** 
2. Sortera efter: **Startdatum**
3. Hitta: Alla användare som började dag 25-26
4. Fråga: **Returnerar de senare?**

**Vad att förvänta sig:**
```
Dag 25-26 kohort (99 användare):
├─ Dag 0-1 (samma dag): 87 var aktiva
├─ Dag 2-3: 23 återkom
├─ Dag 4-7: 8 återkom  
├─ Dag 8-30: 2 återkom

= 98% FALL-OFF! Mycket dåligt.
```

#### STEG 2: Vad gjorde dessa 99?
1. Filtrera: Event = "start_training", Datum = dag 25-26
2. Svar: Hur många av 99 gjorde detta?
   - Om <20: De konverterade inte alls
   - Om 50-70: De konverterade bra
   - Om >80: Perfekt!

---

## ⚠️ PROBLEM 3: 42% Avhoppning på Huvudsidan

**Vad det betyder:**
- Du skickar folk till "Petanque Träning" sidan
- 42% lämnar utan att göra något
- 58% gör något (start_training, view_results, etc)

### 🎯 Vad gör den avhoppande 42%?

**Hypoteser att testa:**

1. **Hypotes A: De är bara nyfikna, inte intresserade**
   - Solution: Förbättra copy/description på sidan
   - Test: A/B test två versioner av sidan

2. **Hypotes B: Gränssnittet är förvirrande**
   - Solution: Lägg till tydligare CTA (Call-to-action) knapp
   - Test: Gör knappen större, mer framträdande

3. **Hypotes C: De kommer från fel källa (inte rätt målgrupp)**
   - Solution: Ändra Facebook-annonser
   - Test: Se vem som hoppar av mest (vilken källa?)

4. **Hypotes D: De förväntar sig något annat**
   - Solution: Lägg till en "Guide" eller "Tutorial"
   - Test: Lägg till 10-sekunders video

### 🔍 Hur du testar detta med Analytics:

#### TEST 1: Kolla vilka som hoppar av
```
Gå till: "Rapporter" → "Engagemang" → "Pages"

Hitta: "Petanque Träning"

Sortera på: "Avvisningsfrekvens" (42%)

Kolla sedan: Event completion rate
├─ Hur många startar träning efter?
├─ Hur många ser resultat?
└─ Hur många gör INGET?
```

#### TEST 2: Jämför med andra sidor
```
Avvisningsfrekvens per sida:
├─ Petanque Träning: 42% ← HÖGT
├─ Skjutträning: 6% ← lågt - varför?
├─ Läggträning: 4% ← lågt - varför?
└─ Poängräknare: 0% ← mycket lågt

INSIKT: Sidor med SPECIFIK träningstyp är mycket bättre!
LÖSNING: Gör huvudsidan mer specifik, eller lägg till "Quick Start"
```

#### TEST 3: Kolla användarresor
```
Gå till: "Rapporter" → "User Journeys"

Sätt: Starting event = Page view (Petanque Träning)

Se: Vad är nästa event?
├─ 58% gör något (start_training, view_results)
└─ 42% INGET (hoppar av)

Nu fråga: Vilka är dessa 42%?
├─ Nya eller återvändande?
├─ Från mobil eller desktop?
├─ Från Facebook eller organic?
```

---

## ✅ ACTIONPLAN - NÄSTA 4 VECKOR

### VECKA 1: DIAGNOSTISERA
- [ ] Implementera event tracking (ga4-event-tracking.js)
- [ ] Vänta 3-4 dagar på data
- [ ] Kolla Debug View för att konfirmera events spåras
- [ ] Exportera första baseline-raporten

### VECKA 2: ANALYSERA
- [ ] Köra kohort-analys på dag 25-26 användare
- [ ] Se konverteringsgrad för dessa
- [ ] Jämför med andra dagars användare
- [ ] Hypotesera varför dag 25-26 var speciell

### VECKA 3: TEST
- [ ] Implementera små ändringar baserat på data
  - Exempel: Större "Start Training" knapp
  - Eller: Bättre copy på huvudsidan
- [ ] Track eventet: "training_abandoned" för att se var folk hoppar av
- [ ] Jämför avhoppningen före och efter ändringen

### VECKA 4: RAPPORT & NÄSTA ITERATION
- [ ] Exportera veckorapport
- [ ] Jämför med tidigare veckor
- [ ] Dokumentera vad som fungerade
- [ ] Planera nästa experiment

---

## 📊 KONKRETA METRIKKER ATT FÖLJA

Skapa en Excel-fil (veckovis uppdatering):

```
VECKA | Nya | Aktiva | Start% | Complete% | Return% | Notes
------|-----|--------|--------|-----------|---------|--------
 15   | 177 |  182   |  48%   |   82%     |  12%    | Baseline
 16   | 145 |  176   |  51%   |   85%     |  15%    | Testad ny knapp
 17   | 156 |  198   |  55%   |   88%     |  18%    | Uppdaterad copy
 18   | 182 |  215   |  62%   |   90%     |  22%    | Lagt till guide
```

**Målsiffror att skjuta efter:**
- Start training: >50% (från nya användare som landar)
- Complete training: >80% (från de som startar)
- Return rate: >20% (återvändande användare vecka 2+)

---

## 🔧 DEBUGGING-TOOLS

### I Browser-konsolen (F12):
```javascript
// Kolla om tracking är aktiv
console.log(window.gtag); // Bör visa en funktion

// Testa ett event manuellt
gtag('event', 'test_event', {
  'test_param': 'hello'
});

// Kolla session ID
console.log(sessionStorage.getItem('ga_session_id'));
```

### I Google Analytics Debug View:
1. Logga in → Din egendom → Admin → DebugView
2. Eller: Rapporter → Realtime (högst upp i menyn)
3. Klicka på något i din app
4. Det bör dyka upp här inom 1-2 sekunder

---

## 🎯 KÖP-BEROENDEFRÅGOR ATT STÄLLA

För att förstå varför vissa dagar är bättre:

**Dag 25-26 spike:**
- [ ] Vad var du på Facebook den dagen? Delad en post?
- [ ] Var det någon viral post från en influencer?
- [ ] Var det en gruppdiskussion om Petanque?
- [ ] Lagga du en annons?

**42% avhoppning på huvudsidan:**
- [ ] Hur tydlig är "Start Training" knappen?
- [ ] Är förklaringen tillräckligt bra?
- [ ] Behöver ny användare en tutorial?
- [ ] Är sidan responsiv på mobil?

---

## 💡 PRO-TIPS

**Tip 1: Skapa segment**
```
Gå till: Rapporter → Rätt kolumn → "+ Lägg till segment"

Skapa segment:
- "Completed Training Users" 
- "Abandoned Users"
- "Day 25-26 Cohort"
- "Mobile Only Users"

Jämför dessa segment - du lär dig mycket!
```

**Tip 2: Använd Comparison feature**
```
Gå till: Valfri rapport → "Lägg till jämförelse"
Jämför: "Denna vecka" vs "Förra vecka"
Eller: "Nya användare" vs "Returning"
```

**Tip 3: Exportera och spåra manuellt**
```
Vecka 15: Petanque_Export_V15.csv
Vecka 16: Petanque_Export_V16.csv
Vecka 17: Petanque_Export_V17.csv

Drag-och-släpp dessa i Excel och gör ett diagram!
```

---

## 🚨 RED FLAGS ATT HÅLLA KÖP EFTER

```
⚠️ Start_training: <30%
   → Användare startar inte träning!
   → Problem med sidan eller UX

⚠️ Complete_training: <70%
   → Folk hoppar av medan de tränar!
   → Problem med själva träningen
   → Är den för svår? För lång? Buggy?

⚠️ Return rate: <5%
   → Nästan ingen kommer tillbaka!
   → App är inte engagerande nog
   → Behöver notiser, achievements, stats

⚠️ Mobile conversion: 20% lägre än desktop
   → App funkar dåligt på mobil!
   → Prioritera mobile fixes
```

---

## 📋 NEXT STEPS

1. **Denna vecka:** 
   - Implementera tracking-koden
   - Sätta upp dashboards

2. **Nästa vecka:**
   - Analysera baslinjedata
   - Hypotesera om dag 25-26

3. **Vecka 3:**
   - Implementera en liten förbättring
   - Track resultatet

4. **Vecka 4:**
   - Mät effekten
   - Planera nästa experiment

---

**Lycka till! 🚀 Du har nu allt du behöver för att förstå din app.**
