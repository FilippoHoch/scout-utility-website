# Scout Utility Website

Scout Utility Website è una raccolta di utility web statiche pensate per attività scout, pronta da aprire in locale e da estendere nel tempo.

## Obiettivo

Costruire un sito semplice, ordinato, responsive e facilmente mantenibile che raccolga strumenti utili per staff, capi e organizzazione pratica di attività, uscite e campi.

Le utility già funzionanti sono `Immagini` e `Foglietti`.

La sezione `Immagini` è pensata per:

- lavorare su PDF e fotografie in locale
- comprimere documenti PDF
- comprimere immagini in JPG
- ritagliare fotografie prima dell'esportazione
- salvare i file finali dal browser

La sezione `Foglietti` è pensata per:

- caricare PDF, immagini e documenti Word `.docx`
- preparare foglietti A5 stampati due per foglio A4
- gestire copie finali, solo fronte o fronte/retro
- usare un retro separato oppure derivarlo dallo stesso file
- generare un nuovo PDF pronto da stampare o salvare

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
│   ├── icons/
│   │   ├── brand-giglio.svg
│   │   └── favicon.svg
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

- Homepage essenziale con accesso diretto agli strumenti attivi
- Header con menu compatto e scalabile
- Footer condiviso
- Utility immagini direttamente disponibile nella pagina dedicata
- Utility foglietti con generazione PDF e stampa A5 su A4
- Pagine predisposte per strumenti futuri, non ancora abilitate dall'interfaccia

## Come aprire il progetto in locale

1. Apri la cartella `scout-utility-website`.
2. Avvia il file `index.html` nel browser.
3. Dalla homepage entra nella pagina `Immagini` o `Foglietti`.

Il progetto è statico, quindi può essere aperto direttamente dal file system senza build e senza installazioni.

## TODO / Roadmap

- Miglioramento dello strumento immagini
- Pagina Menu
- Pagina Programmi campi / uscite
- Impaginatore libretti campi estivi
- Esportazione PDF più avanzata
- Salvataggio impostazioni localmente
- Temi di stampa predefiniti
- Miglioramento del tool Foglietti con preset di stampa e gestione copie avanzata
- Aggiunta di altre utility future

## Nota di progetto

Questo progetto è pensato per crescere nel tempo come raccolta di utility utili al mondo scout. La struttura attuale privilegia semplicità, leggibilità del codice e facilità di estensione.
