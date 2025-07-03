Ragusa IT-Consulting | Portfolio Website

Dies ist das offizielle Repository für die Portfolio-Website von Melvin Ragusa, einem Webentwickler, der sich auf React, Tailwind CSS, Shopify Store Setups und Automatisierung spezialisiert hat. Die Website wurde als moderne, interaktive Single-Page-Anwendung mit React und Tailwind CSS erstellt.

Live-Seite: ragusa-it.dev
✨ Features

Moderne Single-Page-Anwendung: Ein sauberes, professionelles Layout, das alle Informationen auf einer einzigen, scrollbaren Seite präsentiert.

Komponentenbasierte Architektur: Jeder Teil der Seite ist in wiederverwendbare React-Komponenten aufgeteilt, was die Wartung und Skalierbarkeit verbessert.

Performance-Optimierung: Nutzt Code-Splitting mit React.lazy und Suspense, um die Ladezeiten zu verkürzen, indem Komponenten nur bei Bedarf geladen werden.

Vollständig responsiv: Ein Design, das auf Desktops, Tablets und mobilen Geräten hervorragend aussieht und funktioniert.

Interaktiver Hintergrund: Eine dynamische Partikelanimation im Hintergrund, die auf Mausbewegungen reagiert und für ein ansprechendes visuelles Erlebnis sorgt.

Benutzerdefinierter Cursor: Ein einzigartiger, animierter Cursor, der das Benutzererlebnis verbessert und auf verschiedene Elemente (Links, Textfelder) reagiert.

Theme-Umschaltung (Hell/Dunkel): Ein sanfter Übergang zwischen einem hellen und einem dunklen Farbschema, verwaltet über React Context.

Netlify-gestütztes Kontaktformular: Ein funktionales Kontaktformular, das Einsendungen sicher an ein Netlify-Dashboard sendet, ohne dass ein Backend-Server erforderlich ist.

Impressum-Modal: Ein rechtlich erforderliches Impressum, das in einem sauberen Modal-Fenster angezeigt wird.

🛠️ Tech-Stack

Frontend: React (erstellt mit Create React App)

Styling: Tailwind CSS

State Management: React Context für das Theme-Management.

Icons: Lucide React

Deployment & Formularverarbeitung: Netlify

📂 Projektstruktur

Das Projekt ist in eine logische Ordnerstruktur unterteilt, um die Organisation zu verbessern:

src/
├── components/      # Einzelne UI-Komponenten (Header, Footer, Sections etc.)
├── context/         # React Context Provider (z.B. ThemeContext)
├── images/          # Statische Bild-Assets
├── App.js           # Haupt-App-Komponente, die das Layout zusammenfügt
├── index.css        # Globale Stile und Tailwind-Direktiven
└── index.js         # Einstiegspunkt der Anwendung

⚙️ Lokale Entwicklung

Um dieses Projekt auf Ihrem lokalen Rechner auszuführen, folgen Sie diesen Schritten:

Repository klonen:

git clone [https://github.com/0xWizardofSolz/react-website](https://github.com/0xWizardofSolz/react-website)
cd react-website

Abhängigkeiten installieren:
Dieses Projekt verwendet npm als Paketmanager.

npm install

Entwicklungsserver starten:
Dies startet die Anwendung auf http://localhost:3000.

npm start

📦 Statische Version exportieren

Da dieses Projekt mit Create React App erstellt wurde, können Sie ganz einfach eine statische, für die Produktion optimierte Version Ihrer Website erstellen.

Build-Befehl ausführen:
Führen Sie den folgenden Befehl in Ihrem Terminal aus:

npm run build

Ergebnis:
Dieser Befehl erstellt einen build-Ordner im Stammverzeichnis Ihres Projekts. Dieser Ordner enthält alle statischen Dateien (HTML, CSS, JavaScript), die für das Deployment benötigt werden.

Verwendung:
Der Inhalt des build-Ordners kann auf jeden beliebigen statischen Hosting-Anbieter wie Netlify, Vercel oder GitHub Pages hochgeladen werden.

🚀 Deployment

Diese Seite ist für ein einfaches Deployment mit Netlify konfiguriert.

Pushen Sie das Repository zu einem Git-Anbieter (GitHub, GitLab, etc.).

Verbinden Sie das Repository mit Netlify.

Verwenden Sie die folgenden Build-Einstellungen:

    Build-Befehl: npm run build

    Veröffentlichungsverzeichnis: build

Stellen Sie die Seite bereit. Netlify erkennt automatisch das data-netlify="true"-Attribut im Kontaktformular und verarbeitet die Einsendungen.

📞 Kontakt

Melvin Ragusa

E-Mail: kontakt@ragusa-it.dev

Website: ragusa-it.dev

