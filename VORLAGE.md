# 🏛️ Bürgerbrief – Vorlage für neue Kommunen

Diese Vorlage erklärt, welche Dateien und Stellen angepasst werden müssen, um eine neue Instanz der Bürgerbrief-Seite für eine andere Kommune / einen anderen Ansprechpartner zu erstellen.

---

## Schnellstart

1. **Repo klonen / kopieren**
2. **Bilder austauschen** (siehe unten)
3. **8 Dateien anpassen** (siehe Checkliste)
4. **`.env`-Datei anlegen** mit `GEMINI_API_KEY=...`
5. **GitHub Repo erstellen**, pushen, GitHub Pages auf "GitHub Actions" stellen
6. Fertig! 🚀

---

## 📁 Projektstruktur

```
├── index.html                  ← Seitentitel
├── vite.config.ts              ← base-Pfad (= GitHub Repo-Name)
├── .env                        ← GEMINI_API_KEY (nicht einchecken!)
├── public/
│   ├── hero-bg.png             ← Hero-Hintergrundbild
│   └── alexander-rheindorf.jpg ← Foto des Ansprechpartners
├── src/
│   ├── App.tsx                 ← Footer-Text + Modal-Steuerung
│   ├── index.css               ← Farben (Magenta + Gelb)
│   ├── main.tsx                ← Einstiegspunkt (unverändert)
│   ├── components/
│   │   ├── Hero.tsx            ← Überschrift, Beschreibung, Name
│   │   ├── Contact.tsx         ← Name, Bild, Beschreibung, E-Mail
│   │   ├── Form.tsx            ← Kommunen-Dropdown + Bild-Upload
│   │   └── LegalModals.tsx     ← Impressum & Datenschutz (Name, Adresse, E-Mail)
│   └── services/
│       └── gemini.ts           ← KI-Prompt (Region + Name) + Bild-KI
└── .github/workflows/
    └── deploy.yml              ← Deployment (normalerweise unverändert)
```

---

## ✏️ Checkliste: Was muss angepasst werden?

### 1. `index.html` – Seitentitel
```html
<title>Bürgerbrief ___KOMMUNE___</title>
```

**Zeile:** 7

### 2. `vite.config.ts` – GitHub Pages Base-Pfad
```ts
base: '/___REPO_NAME___/',
```
> Muss dem GitHub-Repository-Namen entsprechen, z.B. `/Buergerbrief-Bruehl/`

**Zeile:** 9

### 3. `public/` – Bilder austauschen

| Datei | Beschreibung |
|-------|-------------|
| `hero-bg.png` | Hintergrundbild der Hero-Section (Landschaft o.ä.) |
| `alexander-rheindorf.jpg` | Foto des Ansprechpartners (Hochformat, mind. 800px breit) |

> **Tipp:** Bilddateinamen können geändert werden, dann müssen aber auch die `src`-Pfade in `Hero.tsx` und `Contact.tsx` angepasst werden.

### 4. `src/components/Hero.tsx` – Überschrift & Beschreibung

```diff
  <h1>
    Ihre Stimme im
-   <span>Rhein-Erft-Kreis</span>
+   <span>___KOMMUNE___</span>
  </h1>

- Gestalte deine Heimat aktiv mit. Schreibe deinen Bürgerbrief direkt an mich...
+ ___BESCHREIBUNG___

- Über Alexander Rheindorf
+ Über ___NAME___
```

**Zeilen:** 26–29, 44

### 5. `src/components/Contact.tsx` – Ansprechpartner-Daten

```diff
- src={`${import.meta.env.BASE_URL}alexander-rheindorf.jpg`}
+ src={`${import.meta.env.BASE_URL}___BILDDATEI___`}

- alt="Alexander Rheindorf"
+ alt="___NAME___"

- <h3>Alexander Rheindorf</h3>
+ <h3>___NAME___</h3>

- Als engagierter Kommunalpolitiker im Rhein-Erft-Kreis...
+ Als engagierter Kommunalpolitiker in ___KOMMUNE___...

- alexander.rheindorf@fdp-rek.de
+ ___EMAIL___
```

> **Hinweis:** In der aktuellen Version enthält `Contact.tsx` **keine** Adresse und Telefonnummer mehr – nur noch E-Mail. Falls gewünscht, können diese wieder ergänzt werden.

**Zeilen:** 20–21, 41, 45, 51, 64–65

### 6. `src/components/Form.tsx` – Kommunen-Dropdown

```diff
  const KOMMUNEN = [
-   "Bedburg", "Bergheim", "Brühl", ...
+   "___KOMMUNE_1___", "___KOMMUNE_2___", ...
  ];
```

**Zeilen:** 6–17

### 7. `src/components/LegalModals.tsx` – Impressum & Datenschutz

```diff
- Alexander Rheindorf
+ ___NAME___

- Pankratiusstraße 31
- 50129 Bergheim
+ ___STRASSE___
+ ___PLZ_ORT___

- alexander.rheindorf@fdp-rek.de
+ ___EMAIL___
```

> **Hinweis:** Suchen Sie in der Datei nach „Alexander Rheindorf", „Pankratiusstraße 31", „50129 Bergheim" und der E-Mail-Adresse und ersetzen Sie diese durch die neuen Daten. Diese kommen jeweils im Impressum (oben in der Datei) und nochmal im Datenschutz (unten in der Datei) vor.

**Zeilen:** 54–56, 62, 67–69, 105–108, 161

### 8. `src/services/gemini.ts` – KI-Prompt

```diff
- ...an den Kommunalpolitiker Alexander Rheindorf.
+ ...an den Kommunalpolitiker ___NAME___.

- in ${kommune} (Rhein-Erft-Kreis)
+ in ${kommune} (___REGION___)
```

**Zeilen:** 24, 30

### 9. `src/App.tsx` – Footer

```diff
- © 2026 Bürgerbrief Rhein-Erft-Kreis.
+ © 2026 Bürgerbrief ___KOMMUNE___.
```

**Zeile:** 25

---

## 🎨 Design-System (CSS)

Die Farben sind in `src/index.css` definiert:

```css
@theme {
  --color-rek-gelb: #ffed00;     /* Gelb – Akzente, Buttons, Highlights */
  --color-rek-magenta: #e5007d;  /* Magenta – Primärfarbe, Links, CTA */
}
```

Diese Farben werden überall via Tailwind-Klassen verwendet:
- `bg-rek-magenta` / `text-rek-magenta` – Primärfarbe
- `bg-rek-gelb` / `text-rek-gelb` – Sekundärfarbe
- Hero-Gradient: `from-[#e5007d]/80 to-[#ffed00]/60` in `Hero.tsx` Zeile 14

> Um die Farben zu ändern, reicht es `index.css` + den Hero-Gradient anzupassen.

---

## 🚀 Deployment

1. Neues GitHub-Repo erstellen
2. `vite.config.ts` → `base` auf den Repo-Namen setzen
3. `.env`-Datei mit `GEMINI_API_KEY` anlegen (lokal + als GitHub Secret)
4. Pushen
5. GitHub → Settings → Pages → Source: **"GitHub Actions"**
6. Seite ist live unter `https://___USER___.github.io/___REPO___/`

Die `.github/workflows/deploy.yml` muss **nicht** angepasst werden.

---

## 📋 Beispiel: Neue Seite für "Brühl"

| Feld | Wert |
|------|------|
| Kommune | Brühl |
| Ansprechpartner | Max Mustermann |
| Repo-Name | `Buergerbrief-Bruehl` |
| Bild | `max-mustermann.jpg` |
| Adresse (Impressum) | Uhlstr. 3, 50321 Brühl |
| E-Mail | max@fdp-bruehl.de |
| Kommunen im Dropdown | nur "Brühl" |
