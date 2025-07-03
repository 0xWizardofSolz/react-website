# Ragusa IT-Consulting | Portfolio Website

Dies ist das offizielle Repository für die Portfolio-Website von **Melvin Ragusa**, einem IT-Berater, der sich auf Webentwicklung, IT-Beratung und Automatisierung spezialisiert hat. Die Website wurde als moderne, interaktive Single-Page-Anwendung mit React und Tailwind CSS erstellt.

**Live-Seite:** [**ragusa-it.dev**](https://ragusa-it.dev)

---

## ✨ Features

- **Modernes Single-Page-Design:** Ein sauberes, professionelles Layout, das alle Informationen auf einer einzigen, scrollbaren Seite präsentiert.
- **Vollständig responsiv:** Ein Design, das auf Desktops, Tablets und mobilen Geräten hervorragend aussieht und funktioniert.
- **Interaktiver Hintergrund:** Eine dynamische Partikelanimation im Hintergrund, die auf Mausbewegungen reagiert und für ein ansprechendes visuelles Erlebnis sorgt.
- **Benutzerdefinierter Cursor:** Ein einzigartiger, animierter Cursor, der das Benutzererlebnis verbessert und auf verschiedene Elemente (Links, Textfelder) reagiert.
- **Theme-Umschaltung (Hell/Dunkel):** Ein sanfter Übergang zwischen einem hellen und einem dunklen Farbschema, um den Vorlieben des Benutzers gerecht zu werden.
- **Dynamische Sektionen:** Spezielle Abschnitte für:
  - **Hero:** Eine überzeugende Einführung in die angebotenen Dienstleistungen.
  - **Über mich:** Eine persönliche Biografie, um eine Verbindung zu potenziellen Kunden herzustellen.
  - **Leistungen:** Eine detaillierte Aufschlüsselung von "Webentwicklung", "IT-Beratung" und "Automatisierung".
  - **Portfolio:** Eine Präsentation aktueller Projekte mit Bildern und Beschreibungen.
  - **Testimonials:** Kundenstimmen, um Vertrauen und Glaubwürdigkeit aufzubauen.
- **Netlify-gestütztes Kontaktformular:** Ein funktionales Kontaktformular, das Einsendungen sicher an ein Netlify-Dashboard sendet, ohne dass ein Backend-Server erforderlich ist.
- **Impressum-Modal:** Ein rechtlich erforderliches Impressum für in Deutschland ansässige Unternehmen, das in einem sauberen Modal-Fenster angezeigt wird.

---

## 🛠️ Tech-Stack

- **Frontend:** [React](https://reactjs.org/) (erstellt mit [Create React App](https://create-react-app.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/react)
- **Deployment & Formularverarbeitung:** [Netlify](https://www.netlify.com/)

---

## ⚙️ Lokale Entwicklung

Um dieses Projekt auf Ihrem lokalen Rechner auszuführen, folgen Sie diesen Schritten:

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/0xWizardofSolz/react-website](https://github.com/0xWizardofSolz/react-website)
    cd react-website
    ```

2.  **Abhängigkeiten installieren:**
    Dieses Projekt verwendet `npm` als Paketmanager.
    ```bash
    npm install
    ```

3.  **Entwicklungsserver starten:**
    Dies startet die Anwendung auf `http://localhost:3000`.
    ```bash
    npm start
    ```

---


## 📦 Statische Version exportieren

Da dieses Projekt mit Create React App erstellt wurde, können Sie ganz einfach eine statische, für die Produktion optimierte Version Ihrer Website erstellen.

1.  **Build-Befehl ausführen:**
    Führen Sie den folgenden Befehl in Ihrem Terminal aus:
    ```bash
    npm run build
    ```

2.  **Ergebnis:**
    Dieser Befehl erstellt einen `build`-Ordner im Stammverzeichnis Ihres Projekts. Dieser Ordner enthält alle statischen Dateien (HTML, CSS, JavaScript), die für das Deployment benötigt werden.

3.  **Verwendung:**
    Der Inhalt des `build`-Ordners kann auf jeden beliebigen statischen Hosting-Anbieter wie Netlify, Vercel oder GitHub Pages hochgeladen werden.

---

## 🚀 Deployment

Diese Seite ist für ein einfaches Deployment mit Netlify konfiguriert.

1.  Pushen Sie das Repository zu einem Git-Anbieter (GitHub, GitLab, etc.).
2.  Verbinden Sie das Repository mit Netlify.
3.  Verwenden Sie die folgenden Build-Einstellungen:
    - **Build-Befehl:** `npm run build`
    - **Veröffentlichungsverzeichnis:** `build`
4.  Stellen Sie die Seite bereit. Netlify erkennt automatisch das `data-netlify="true"`-Attribut im Kontaktformular und verarbeitet die Einsendungen.

---

## 📞 Kontakt

**Melvin Ragusa**

-   **E-Mail:** [kontakt@ragusa-it.dev](mailto:kontakt@ragusa-it.dev)
-   **Website:** [ragusa-it.dev](https://ragusa-it.dev)

