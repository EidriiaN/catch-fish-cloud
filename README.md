# Pește Prins - Conectăm pescarii cu locuri private de pescuit

Pește Prins este o aplicație web care conectează pescarii cu lacuri și bălți private. Platforma permite administratorilor să listeze lacurile/heleșteiele și să gestioneze rezervările, iar pescarilor să descopere, să rezerve și să lase recenzii pentru locații de pescuit.

## Project Overview

Acest proiect este construit cu Next.js 15+ și folosește Chakra UI pentru un design modern și responsiv. Este structurat pentru a oferi o experiență cursivă atât pescarilor care caută locuri premium, cât și proprietarilor care își administrează lacurile.

## Funcționalități cheie

- **Descoperă bălți și lacuri**: Răsfoiește o listă selectată de locații private cu informații detaliate
- **Filtrare avansată**: Găsește după preț, rating și facilități
- **Hărți interactive**: Vezi locația lacurilor și explorează heleșteiele cu Leaflet.js
- **Sistem de rezervări**: Programează din timp cu alegerea datei și a heleșteului
- **Panou utilizator**: Gestionează rezervările, recenziile și preferințele
- **Panou administrator**: Pentru proprietarii de lacuri – gestionare listări, rezervări și feedback
- **Recenzii și ratinguri**: Împărtășește-ți experiența și citește opiniile altora

## Tehnologii

- **Frontend**: Next.js cu React (JavaScript)
- **Stilizare**: Chakra UI
- **Autentificare**: Autentificare custom în dezvoltare → Firebase Auth
- **Bază de date**: Firebase (Firestore)
- **Hărți**: Leaflet.js cu OpenStreetMap → Google Maps API
- **Deploy**: Vercel

## Pornire rapidă

### Cerințe preliminare

- Node.js 18+ (recomandat LTS)
- npm sau yarn

### Instalare

1. Clonează repository-ul

```bash
git clone https://github.com/EidriiaN/catch-fish-cloud.git
cd catch-fish-cloud
```

2. Instalează dependențele

```bash
npm install
# or
yarn install
```

3. Rulează serverul de dezvoltare

```bash
npm run dev
# or
yarn dev
```

4. Deschide [http://localhost:3000](http://localhost:3000) în browser pentru a vedea aplicația

## Structura proiectului

```
src/
  app/                     # Next.js App Router structure
    api/                   # API routes
    auth/                  # Authentication pages
    lakes/                 # Lake listing and details
    dashboard/             # User and admin dashboards
  components/              # Reusable components
    layout/                # Layout components (Navbar, Footer)
    ui/                    # UI components (buttons, cards, etc.)
    maps/                  # Map-related components
    lakes/                 # Lake-specific components
    reservations/          # Reservation-related components
    reviews/               # Review-related components
  lib/                     # Utilities and services
    auth/                  # Authentication logic
    db/                    # Database operations
    utils/                 # Helper functions
    theme/                 # Chakra UI theme customization
```

## Starea dezvoltării

Proiectul este în dezvoltare activă. Iată o privire de ansamblu asupra stării curente:

### Finalizate

- ✅ Configurare proiect cu Next.js și Chakra UI
- ✅ Structură de pagini și navigație de bază
- ✅ Componente UI responsive și layout-uri
- ✅ Integrare mock data pentru dezvoltare
- ✅ Pagină listare lacuri cu filtre și căutare
- ✅ Rezolvate erori de hidratare și structură componente

### În lucru

- 🔄 Pagină detalii lac cu hărți și formular de rezervare
- 🔄 Panouri utilizator și administrator
- 🔄 Implementare sistem de rezervări
- 🔄 Adăugare și afișare recenzii

### Planificat

- Integrare Firebase pentru autentificare și stocare date
- Funcționalități hărți îmbunătățite cu selecție heleșteie
- Unelte admin pentru administrarea lacurilor
- Deploy și configurare producție

For a more detailed development plan, see [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md).

## Contribuții

Contribuțiile sunt binevenite! Poți deschide un Pull Request.

## Licență

Acest proiect este licențiat sub MIT – vezi fișierul [LICENSE](LICENSE) pentru detalii.

---

## Localizare (i18n)

Interfața utilizator este tradusă în limba română (ro-RO), inclusiv formatele de dată și monedă. Dacă dorești să revii temporar la engleză:

- Modifică `lang` din `src/app/layout.js` la `"en"` și ajustează textele statice după nevoie.
- Pentru o soluție scalabilă, recomandăm integrarea unui framework i18n (ex. `next-intl` sau `react-intl`) și extragerea textelor într-un dicționar.

Notă: formatul monetar folosește locale `ro-RO`, dar moneda rămâne cea definită în cod (implicit USD) – vezi `formatCurrency` în `src/lib/utils/format.js`.
