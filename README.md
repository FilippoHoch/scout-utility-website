# Scout Utility Website

Scout Utility Website è una raccolta di utility web statiche pensate per attività scout, con una prima base concreta pronta da aprire in locale e da estendere nel tempo.

## Obiettivo

Costruire un sito semplice, ordinato, responsive e facilmente mantenibile che raccolga strumenti utili per staff, capi e organizzazione pratica di attività, uscite e campi.

La prima utility già funzionante è `Sistemazione immagini`, pensata per:

- caricare immagini dal computer
- riordinarle
- rimuoverle singolarmente
- scegliere un layout essenziale di stampa
- stampare o salvare in PDF con il browser

Le altre pagine sono state predisposte come placeholder curati, gia coerenti con la struttura del progetto e pronti a ricevere funzionalita future.

## Tecnologie

- HTML
- CSS
- JavaScript vanilla

Nessun framework e nessuna dipendenza esterna obbligatoria.

## Struttura file

```text
scout-utility-website/
├── .gitignore
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── pages/
    ├── foglietti.html
    ├── immagini.html
    ├── libretti.html
    ├── menu.html
    ├── prepare.html
    └── programmi.html
```

## Cosa include questa prima versione

- Homepage con descrizione del progetto, navigazione chiara, card alle utility e sezione sviluppi futuri
- Header e menu presenti su tutte le pagine
- Footer condiviso
- Utility immagini utilizzabile in locale
- Pagine placeholder curate per gli sviluppi successivi

## Come aprire il progetto in locale

1. Apri la cartella `scout-utility-website`.
2. Avvia il file `index.html` nel browser.
3. Dalla homepage entra nella pagina `Sistemazione immagini`.

Il progetto è statico, quindi può essere aperto direttamente dal file system senza build e senza installazioni.

## Pubblicazione futura su GitHub Pages

Quando vorrai pubblicarlo:

1. Crea un repository GitHub chiamato `scout-utility-website`.
2. Inizializza o collega il repository locale.
3. Esegui il push del branch principale su GitHub.
4. Nelle impostazioni del repository abilita GitHub Pages.
5. Seleziona la pubblicazione dal branch principale e dalla root del progetto.

Dato che il sito usa solo file statici, la struttura corrente è già adatta a GitHub Pages.

## TODO / Roadmap

- Miglioramento dello strumento sistemazione immagini
- Pagina Prepare
- Pagina Menu
- Pagina Programmi campi / uscite
- Pagina per sistemare e impaginare foglietti
- Impaginatore libretti campi estivi
- Esportazione PDF più avanzata
- Salvataggio impostazioni localmente
- Temi di stampa predefiniti
- Aggiunta di altre utility future

## Nota di progetto

Questo progetto è pensato per crescere nel tempo come raccolta di utility utili al mondo scout. La struttura attuale privilegia semplicità, leggibilità del codice e facilità di estensione.
