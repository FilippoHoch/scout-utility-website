# Scout Utility Website

Scout Utility Website è una raccolta di utility web statiche pensate per attività scout, pronta da aprire in locale e da estendere nel tempo.

## Obiettivo

Costruire un sito semplice, ordinato, responsive e facilmente mantenibile che raccolga strumenti utili per staff, capi e organizzazione pratica di attività, uscite e campi.

La prima utility già funzionante è `Immagini`.

Questa prima utility è pensata per:

- lavorare su PDF e fotografie in locale
- comprimere documenti PDF
- comprimere immagini in JPG
- ritagliare fotografie prima dell'esportazione
- salvare i file finali dal browser

Le altre pagine sono presenti come base per sviluppi futuri, ma al momento restano non attive nell'interfaccia.

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
    └── programmi.html
```

## Cosa include questa prima versione

- Homepage essenziale con accesso diretto allo strumento attivo
- Header con menu compatto e scalabile
- Footer condiviso
- Utility immagini direttamente disponibile nella pagina dedicata
- Pagine predisposte per strumenti futuri, non ancora abilitate dall'interfaccia

## Come aprire il progetto in locale

1. Apri la cartella `scout-utility-website`.
2. Avvia il file `index.html` nel browser.
3. Dalla homepage entra nella pagina `Immagini`.

Il progetto è statico, quindi può essere aperto direttamente dal file system senza build e senza installazioni.

## TODO / Roadmap

- Miglioramento dello strumento immagini
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
