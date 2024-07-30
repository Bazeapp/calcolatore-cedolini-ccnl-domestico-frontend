// Aggiunge un ascoltatore di eventi al bottone con ID "sendRequest".
// Al click, viene chiamata la funzione submitChoices per inviare i dati scelti.
document.getElementById("sendRequest").addEventListener("click", function() {
    submitChoices();
});

// Aggiunge un ascoltatore di eventi al bottone con ID "nuovocalcolo".
// Al click, viene chiamata la funzione confermanuovo per avviare un nuovo calcolo.
document.getElementById("nuovocalcolo").addEventListener("click", function() {
    confermanuovo();
});

// Aggiunge un ascoltatore di eventi al bottone con ID "conferma".
// Al click, viene chiamata la funzione resetCalculator per resettare il calcolatore.
document.getElementById("conferma").addEventListener("click", function() {
    resetCalculator();
});

// Aggiunge un ascoltatore di eventi al bottone con ID "annulla".
// Al click, viene chiamata la funzione annullanuovo per annullare l'azione corrente.
document.getElementById("annulla").addEventListener("click", function() {
    annullanuovo();
});


document.getElementById('sendRequest').addEventListener('click', async () => {

    const data = {
        durataContratto: duratacontrattoselezionato,
        tipoContratto: tipocontrattoselezionato,
        livelloContratto: livellocontrattoselezionato,
        oreLunedi: document.getElementById("lunedi").value,
        oreMartedi: document.getElementById("martedi").value,
        oreMercoledi: document.getElementById("mercoledi").value,
        oreGiovedi:document.getElementById("giovedi").value,
        oreVenerdi: document.getElementById("venerdi").value,
        oreSabato: document.getElementById("sabato").value,
        oreDomenica: document.getElementById("domenica").value,
        paga: paga,
        bambino_6_anni: bambino,
        piu_persone: autosufficienti,
        certificato_uni: certificato,
        pranzo_natura: indennitaPranzoColazione,
        cena_natura: indennitaCena,
        alloggio_natura: indennitaAlloggio
    };
    console.log(JSON.stringify(data));


     // Funzione per controllare se tutti i campi sono pieni
     function areAllFieldsFilled(obj) {
        for (let key in obj) {
            if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
                return false;
            }
        }
        return true;
    }

    // Funzione per controllare se almeno un giorno ha ore > 0
    function isAtLeastOneDayGreaterThanZero(data) {
        return (
            data.oreLunedi > 0 || 
            data.oreMartedi > 0 || 
            data.oreMercoledi > 0 || 
            data.oreGiovedi > 0 || 
            data.oreVenerdi > 0 || 
            data.oreSabato > 0 || 
            data.oreDomenica > 0
        );
    }

    if (!areAllFieldsFilled(data)) {
        alert('Per favore effettuare tutte le scelte');
        return; // Termina la funzione qui se ci sono campi vuoti
    }

    if (!isAtLeastOneDayGreaterThanZero(data)) {
        alert('Per favore inserisci almeno un giorno di lavoro');
        return; // Termina la funzione qui se tutte le ore sono 0
    }

    
    document.getElementById('simulazione').style.display = 'block';
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('risultatisimulazione').style.display = 'none';
    const buttonCalcola = document.getElementById("buttonCalcola");
    buttonCalcola.textContent = "ATTENDI";
    
    var loadingDots = document.getElementById("loadingDots");
    loadingDots.style.visibility = 'visible'; // Show the dots

    var dotInterval = setInterval(function() {
        if (loadingDots.textContent.length < 3) {
            loadingDots.textContent += ".";
        } else {
            loadingDots.textContent = "";
        }
    }, 500); // Change dots every 500ms

    

    function sendToWebhook(data) {
        fetch('https://hook.eu1.make.com/asor6kjlu4bbl2eemv3nlbjhb5sr39hb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log('Success:', responseData);
            updateSimulazione(responseData);
            aprisimulazione();
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('risultatisimulazione').style.display='block';
            document.getElementById('nuovocalcolo').style.display = 'block';
                     // Riporta il testo del pulsante a "Calcola"
                     buttonCalcola.textContent = "CALCOLA 🧮";
            loadingDots.style.visibility = 'hidden'; // Hide the dots
            clearInterval(dotInterval); // Stop the interval
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
    }

    sendToWebhook(data);
    
                //far vedere attendi... mentre si carica la tabella
 /*
        try {
            const response = await fetch('https://europe-west3-baze-app-prod.cloudfunctions.net/calculator-ccnl', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${toki}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                timeout: 60000 // 60 seconds timeout
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            updateSimulazione(result);
            aprisimulazione();
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('risultatisimulazione').style.display='block';
            document.getElementById('nuovocalcolo').style.display = 'block';
            
            
            console.log(result);
        } catch (error) {
            console.error('There was an error!', error);
            document.getElementById('loadingMessage').style.display = 'none';
        }*/
    }); 
    
// Funzione per aggiornare il contenuto dei campi della simulazione in base ai risultati ottenuti
function updateSimulazione(result) {
    // Itera su ciascuna chiave nell'oggetto result
    for (const key in result) {
        // Seleziona tutti gli elementi HTML con l'ID che corrisponde alla chiave
        const elements = document.querySelectorAll(`#${key}`);
        // Aggiorna il contenuto testuale di ciascun elemento trovato
        elements.forEach(element => {
            element.textContent = result[key] + " €"; // Aggiunge l'unità di misura (Euro)
        });
    }
}

// Oggetto per memorizzare le selezioni dell'utente
let selections = {
    'Tipo contratto': null,
    'Livello': null,
    'Contratto': null,
    'Vitto e alloggio in natura': null,
    'Specifiche vitto e alloggio': [],
    'Bambino entro 6 anni': null,
    'Certificato UNI1176': null,
    'Autosufficienti': null
};

// Funzione per alternare la visualizzazione delle scelte in base all'ID fornito
function toggleChoices(choiceId) {
    const choices = document.getElementById(choiceId);
    choices.classList.toggle('show'); // Alterna la classe 'show' per mostrare/nascondere elementi
}

// Funzione per visualizzare la tabella con i risultati dei calcoli
function aprisimulazione() {
    const simulazioneBox = document.getElementById('simulazione');
    simulazioneBox.style.display = 'block'; // Rende visibile la simulazione
    // Scorre la pagina fino al simulazioneBox con un'animazione
    simulazioneBox.scrollIntoView({behavior: 'smooth'});
}


/**
 * Aggiorna la visibilità dei livelli in base al tipo di contratto selezionato.
 * Utilizza un approccio basato su mappatura per ridurre la ripetizione di codice.
 */
function sceltaLivello() {
    // Mappa di configurazione per determinare la visibilità degli elementi per ciascun tipo di contratto
    const visibilityMap = {
        'non-convivente': { a: 'block', as: 'block', b: 'block', bs: 'block', c: 'block', cs: 'block', d: 'block', ds: 'block', u: 'none' },
        'part-time':      { a: 'none',  as: 'none',  b: 'block', bs: 'block', c: 'block', cs: 'none',  d: 'none',  ds: 'none',  u: 'none' },
        'full-time':      { a: 'block', as: 'block', b: 'block', bs: 'block', c: 'block', cs: 'block', d: 'block', ds: 'block', u: 'none' },
        'sostituzione':   { a: 'none',  as: 'none',  b: 'none',  bs: 'none',  c: 'none',  cs: 'block', d: 'none',  ds: 'block', u: 'none' },
        'assistenza':     { a: 'none',  as: 'none',  b: 'none',  bs: 'block', c: 'none',  cs: 'block', d: 'none',  ds: 'block', u: 'none' },
        'presenza':       { a: 'none',  as: 'none',  b: 'none',  bs: 'none',  c: 'none',  cs: 'none',  d: 'none',  ds: 'none',  u: 'block' }
    };

    // Ottenere il tipo di contratto selezionato
    const contractType = selections['Tipo contratto'];
    
    // Ottenere la configurazione di visibilità per il tipo di contratto selezionato
    const settings = visibilityMap[contractType];

    // Aggiornare la visibilità per ogni elemento basato sulla configurazione
    if (settings) {
        for (const [elementId, displayStyle] of Object.entries(settings)) {
            document.getElementById(elementId).style.display = displayStyle;
        }
    }
}

// inizializzo le variabili che andrò a passare al backend
let livellocontrattoselezionato = "";
let tipocontrattoselezionato = "";
let duratacontrattoselezionato = "";  

/**
 * Aggiorna le selezioni dell'utente basate sulla categoria e applica le logiche dipendenti dalla scelta.
 * @param {string} category - Categoria della selezione (es. 'Tipo contratto', 'Livello', 'Contratto').
 * @param {string} choice - La scelta specifica fatta dall'utente per la data categoria.
 */
function selectChoice(category, choice) {
    // Aggiorna l'oggetto globale delle selezioni con la nuova scelta dell'utente.
    selections[category] = choice;

    // Gestione delle azioni basate sul tipo di contratto selezionato.
    if (category === 'Tipo contratto') {
        let newTipoContratto;

        // Assegna un valore specifico a newTipoContratto basato sul tipo di contratto selezionato.
        switch (selections['Tipo contratto']) {
            case 'full-time':
                newTipoContratto = 'convivente';
                break;
            case 'non-convivente':
                newTipoContratto = 'nonconvivente';
                break;
            case 'part-time':
                newTipoContratto = 'part-time';
                break;
            case 'sostituzione':
                newTipoContratto = 'sostituzione';
                break;
            case 'presenza':
                newTipoContratto = 'presenza';
                break;
            case 'assistenza':
                newTipoContratto = 'assistenza';
                break;
        }

        // Resetta il livello selezionato quando il tipo di contratto cambia.
        cambiotipo(livellocontrattoselezionato);
        // Esegue una funzione per gestire il cambio del tipo di contratto.
        onTipoContrattoChange(newTipoContratto);
    }

    // Gestione delle azioni basate sul livello selezionato.
    if (category === 'Livello') {
        livellocontrattoselezionato = choice;
        // Gestione della visibilità di box specifici basati sul livello scelto.
        document.getElementById('bambinoBox').style.display = choice === 'bs' ? 'block' : 'none';
        document.getElementById('certificatoBox').style.display = ['b', 'bs', 'cs', 'd'].includes(choice) && !['nonconvivente', 'sostituzione'].includes(tipocontrattoselezionato) ? 'block' : 'none';
        document.getElementById('autosufficientiBox').style.display = ['cs', 'ds'].includes(choice) ? 'block' : 'none';
        document.getElementById('vittoAlloggioBox').style.display = selections['Tipo contratto'] !== 'non-convivente' ? 'flex' : 'none';
        document.getElementById('vittoAlloggioBox').style.flexDirection = 'row-reverse';
    }

    // Gestione delle azioni basate sulla scelta del contratto.
    if (category === 'Contratto') {
        // Imposta la durata del contratto basata sulla scelta, usando underscore per gli spazi.
        duratacontrattoselezionato = choice.replace(' ', '_');
    }
}


/**
 * Gestisce il cambiamento del tipo di contratto selezionato.
 * @param {string} nuovo - Il nuovo tipo di contratto selezionato.
 */
function cambiotipo(nuovo) {
    // Controlla se il tipo di contratto attualmente selezionato è diverso dal nuovo tipo selezionato.
    if (tipocontrattoselezionato != nuovo) {
        // Resetta le selezioni di livello e durata del contratto a vuoto.
        livellocontrattoselezionato = "";
        duratacontrattoselezionato = "";

        // Trova e aggiorna il contenuto del box di selezione del livello del contratto.
        const boxlivello2 = document.getElementById('boxLivelloContratto');
        boxlivello2.firstChild.textContent = 'Seleziona Livello Contratto'; 

        // Trova e aggiorna il contenuto del box di selezione della durata del contratto.
        const boxdurata2 = document.getElementById('boxDurataContratto');
        boxdurata2.firstChild.textContent = 'Seleziona Tipo Contratto';
        // Nasconde il box della durata del contratto dato che il tipo di contratto è cambiato.
        boxdurata2.style.display = "none"; 

        // Rimuove le classi che mostrano le linee connettive tra elementi visivi per i livelli specificati.
        document.querySelectorAll('.cerchio22, .cerchio23').forEach(el => {
            el.classList.remove('show-line');
        });

        // Nasconde gli elementi visivi per i livelli specificati.
        document.querySelectorAll('.cerchio23, .cerchio24').forEach(el => {
            el.style.display = 'none';
        });

        // Mostra un alert per informare l'utente che deve selezionare nuovamente il livello e la durata del contratto.
        alert('Se cambi il tipo contratto seleziona nuovamente il livello e la durata del contratto');

        // Rimuove lo sfondo selezionato da tutte le box di selezione tipo contratto.
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.classList.remove('selected');
        });
    }
}


// quando si scegli tipo/livello/durata contratto allora il box cambia scritta
function scelto(boxId, newText) {
    const box = document.getElementById(boxId);
    box.firstChild.textContent='';
    box.firstChild.textContent = newText; // Cambia il testo del box
    box.classList.add('selected'); // Cambia il colore di sfondo

    if (boxId==='boxTipoContratto'){
        document.getElementById('boxLivelloContratto').style.display='inline-block';
        
    }
    if (boxId==='boxLivelloContratto'){
        document.getElementById('boxDurataContratto').style.display='inline-block';
    }
    if (boxId==='boxDurataContratto'){
        //document.getElementById('orariodilavoro').style.display='flex';
        //document.getElementById('sendRequest').style.display = 'flex';

    }
}




// variabili per la paga
const pagaconv_liva=729.25 ;//paga mensile minima lavoratori conviventi liv a
const pagaconv_livas=861.86 ;//paga mensile minima lavoratori conviventi liv as
const pagaconv_livb=928.15  ;//paga mensile minima lavoratori conviventi liv b
const pagaconv_livbs=994.44 ;//paga mensile minima lavoratori conviventi liv bs
const pagaconv_livc=1060.76 ;//paga mensile minima lavoratori conviventi liv c
const pagaconv_livcs=1127.04 ;//paga mensile minima lavoratori conviventi liv cs
const pagaconv_livd=1521.99  ;//paga mensile minima lavoratori conviventi liv d
const pagaconv_livds=1588.28 ;//paga mensile minima lavoratori conviventi liv ds
const pagapart_livb=662.96   ;//paga mensile minima lavoratori part-time liv b
const pagapart_livbs=696.13  ;//paga mensile minima lavoratori part-time liv bs
const pagapart_livc=769.02   ;//paga mensile minima lavoratori part-time liv c
const paganoconv_liva=5.30   ;//paga oraria minima lavoratori non conviventi liv a
const paganoconv_livas=6.24  ;//paga oraria minima lavoratori non conviventi liv as
const paganoconv_livb=6.62   ;//paga oraria minima lavoratori non conviventi liv b
const paganoconv_livbs=7.03  ;//paga oraria minima lavoratori non conviventi liv bs
const paganoconv_livc=7.42   ;//paga oraria minima lavoratori non conviventi liv c
const paganoconv_livcs=7.83  ;//paga oraria minima lavoratori non conviventi liv cs
const paganoconv_livd=9.03   ;//paga oraria minima lavoratori non conviventi liv d
const paganoconv_livds=9.41  ;//paga oraria minima lavoratori non conviventi liv ds
const pagaconvass_livbs=1143.60 ;//paga mensile minima lavoratori conviventi assistenza notturna liv bs
const pagaconvass_livcs=1296.09 ;//paga mensile minima lavoratori conviventi assistenza notturna liv cs
const pagaconvass_livds=1601.09 ;//paga mensile minima lavoratori conviventi assistenza notturna liv ds
const pagaconvpres_livu=765.71  ;//paga mensile minima lavoratori conviventi presenza notturna liv unico
const pagasost_livcs=8.41    ;//#paga oraria minima lavoratori in sostituzione liv ds
const pagasost_livds=10.15    ;//#paga oraria minima lavoratori in sostituzione liv ds  

let paga = 0;
/**
 * Imposta la visibilità degli input di paga e aggiorna i segnaposto in base al tipo e livello di contratto selezionati.
 */
function sceglipaga() {
    let livellopaga; // Variabile per tenere traccia dell'elemento di input corrente

    // Imposta la visibilità degli input box in base al tipo di contratto
    const isHourly = ["nonconvivente", "sostituzione"].includes(tipocontrattoselezionato);
    document.getElementById('InputpagaBoxora').style.display = isHourly ? 'inline-block' : 'none';
    document.getElementById('InputpagaBoxmese').style.display = isHourly ? 'none' : 'inline-block';

    // Seleziona l'elemento input appropriato basato sul tipo di contratto
    livellopaga = isHourly ? document.getElementById('InputpagaOra') : document.getElementById('InputpagaMese');

    // Mappa dei segnaposti basata su tipo e livello di contratto
    const placeholders = {
        "nonconvivente": { "a": paganoconv_liva, "as": paganoconv_livas, "b": paganoconv_livb, "bs": paganoconv_livbs, "c": paganoconv_livc, "cs": paganoconv_livcs, "d": paganoconv_livd, "ds": paganoconv_livds },
        "convivente": { "a": pagaconv_liva, "as": pagaconv_livas, "b": pagaconv_livb, "bs": pagaconv_livbs, "c": pagaconv_livc, "cs": pagaconv_livcs, "d": pagaconv_livd, "ds": pagaconv_livds },
        "part-time": { "b": pagapart_livb, "bs": pagapart_livbs, "c": pagapart_livc },
        "sostituzione": { "cs": pagasost_livcs, "ds": pagasost_livds },
        "presenza": { "u": pagaconvpres_livu },
        "assistenza": { "bs": pagaconvass_livbs, "cs": pagaconvass_livcs, "ds": pagaconvass_livds }
    };

    // Imposta il segnaposto per l'input basato sul tipo e livello di contratto
    if (placeholders[tipocontrattoselezionato] && placeholders[tipocontrattoselezionato][livellocontrattoselezionato]) {
        livellopaga.placeholder = placeholders[tipocontrattoselezionato][livellocontrattoselezionato];
    }
}

//funzione per il salvataggio della paga inserita
function salvaPaga(event) {
    var pagaInput = event.target;
    var pagaValue = parseFloat(pagaInput.value);
    var placeholderValue = parseFloat(pagaInput.placeholder);

    // Controlla se il valore supera il limite o non è un numero valido
    if (pagaValue > 4000 || isNaN(pagaValue)) {
    alert("Inserisci un valore valido per la paga.");
    resetPaga(pagaInput);
    return;
}

paga = pagaValue.toFixed(2);
document.getElementById('paga-netta').innerText = paga + ' €';
}

function formatPaga(event) {
var pagaInput = event.target;
var pagaValue = parseFloat(pagaInput.value);
var placeholderValue = parseFloat(pagaInput.placeholder);

// Se il valore è inferiore al placeholder, resetta al placeholder
if (!isNaN(placeholderValue) && pagaValue < placeholderValue) {
pagaInput.value = placeholderValue.toFixed(2);
} else if (!isNaN(pagaValue)) {
pagaInput.value = pagaValue.toFixed(2);
}
}


// Funzione per resettare la paga quando si inserisce un valore non valido
function resetPaga(inputElement) {
paga = 0;
inputElement.value = inputElement.placeholder;
document.getElementById('paga-netta').innerText = '';
}

document.addEventListener('DOMContentLoaded', (event) => {
var inputPagaOra = document.getElementById('InputpagaOra');
var inputPagaMese = document.getElementById('InputpagaMese');
inputPagaOra.addEventListener('input', salvaPaga);
inputPagaMese.addEventListener('input', salvaPaga);

inputPagaOra.addEventListener('blur', formatPaga);
inputPagaMese.addEventListener('blur', formatPaga);

// Quando la pagina è caricata, imposta il valore della paga al placeholder se l'input è vuoto
if (!inputPagaOra.value) {
inputPagaOra.value = inputPagaOra.placeholder;
}
if (!inputPagaMese.value) {
inputPagaMese.value = inputPagaMese.placeholder;
}

sceglipaga();
});


let indennitaPranzoColazione = "no";
let indennitaCena = "no";
let indennitaAlloggio = "no";

function selectvariabiliVittoAlloggio(value,choice) {
if (value === 'pranzo/colazione'){
    indennitaPranzoColazione = choice;
} else if (value === 'cena') {
    indennitaCena = choice;
} else if (value === 'alloggio') {
    indennitaAlloggio = choice;
}
}

function selectVittoAlloggio() {
var checkbox = document.getElementById('vittoAlloggioCheckbox');
var choice = checkbox.checked ? 'si' : 'no';
selections['Vitto e alloggio in natura'] = choice;
document.getElementById('specificaVittoAlloggioBox').style.display = (choice === 'no') ? 'block' : 'none';
if (choice === 'si') {
    deselectAllSpecifiche();
}
//displaySelections();
}

// Funzione per deselezionare tutte le specifiche checkbox
function deselectAllSpecifiche() {
indennitaPranzoColazione = "no";
indennitaCena = "no";
indennitaAlloggio = "no";
var checkboxes = document.querySelectorAll('#specificaVittoAlloggioBox input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
    var value = checkbox.value;
    selections[value] = 'no';
});
}


// Funzione per gestire il click fuori dal tooltip
document.addEventListener('click', function(event) {
var informativas = document.querySelectorAll('.informativa');
informativas.forEach(function(informativa) {
if (!informativa.contains(event.target)) {
informativa.classList.remove('active');
        }
    });
});

// Funzione per attivare/disattivare il tooltip al click
document.querySelectorAll('.informativa .circle').forEach(function(element) {
element.addEventListener('click', function(event) {
event.stopPropagation(); // Impedisce la propagazione dell'evento click
var informativa = this.parentElement;

// Toglie la classe 'active' da tutti gli altri tooltip
document.querySelectorAll('.informativa').forEach(function(otherInformativa) {
if (otherInformativa !== informativa) {
    otherInformativa.classList.remove('active');
}
});

// Attiva o disattiva il tooltip cliccato
informativa.classList.toggle('active');
});
});

// Funzione per chiudere il tooltip cliccando al di fuori
document.addEventListener('click', function(event) {
document.querySelectorAll('.informativa').forEach(function(informativa) {
if (!informativa.contains(event.target)) {
informativa.classList.remove('active');
}
});
});



// funzioni per le indennità aggiuntive
let bambino = "no";
function selectBambino() {
var checkbox = document.getElementById("bambinoCheckbox");
if (checkbox.checked) {
    bambino = "si";
} else {
    bambino = "no";
}
selections['Bambino entro 6 anni'] = bambino;
//displaySelections();
}
let certificato = "no";
function selectCertificato() {
var checkbox = document.getElementById("certificatoCheckbox");
if (checkbox.checked) {
    certificato = "si";
} else {
    certificato = "no";
}
selections['Certificato UNI1176'] = certificato;
//displaySelections();
}
let autosufficienti = "no";
function selectAutosuff() {
var checkbox = document.getElementById("autosufficientiCheckbox");
if (checkbox.checked) {
    autosufficienti = "si";
} else {
    autosufficienti = "no";
}
selections['Autosufficienti'] = autosufficienti;
//displaySelections();
}

/*
function displaySelections() {
var selectedItems = document.getElementById('selectedItems');
selectedItems.innerHTML = '';

for (let key in selections) {
    if (selections[key] !== null) {
        if (Array.isArray(selections[key]) && selections[key].length > 0) {
            selectedItems.innerHTML += '<p>' + key + ': ' + selections[key].join(', ') + '</p>';
        } else if (!Array.isArray(selections[key])) {
            selectedItems.innerHTML += '<p>' + key + ': ' + selections[key] + '</p>';
        }
    }
}
}*/
// Definizione dei limiti per ogni tipo di contratto
var  contractLimits = {
    convivente: { maxWeeklyHours: 54, maxDailyHours: 10 },
    nonconvivente: { maxWeeklyHours: 40, maxDailyHours: 8 },
    'part-time': { maxWeeklyHours: 30, maxDailyHours: 10 },
    sostituzione: { maxWeeklyHours: 40, maxDailyHours: 12 },
    presenza: { maxWeeklyHours: 54, maxDailyHours: 10 },
    assistenza: { maxWeeklyHours: 54, maxDailyHours: 10 }
};



// Funzione per gestire il cambio del tipo di contratto
function onTipoContrattoChange(newTipoContratto) {
    tipocontrattoselezionato = newTipoContratto;
    resetHours(); // Resetta le ore ogni volta che cambia il tipo di contratto
    updateTotals(); // Aggiorna i totali ogni volta che cambia il tipo di contratto
}

// Funzione per resettare tutte le ore
function resetHours() {
    const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
    days.forEach(day => {
    const input = document.getElementById(day);
    input.value = 0;
    updateButtonVisibility(day);
    });
    document.getElementById('totalHours').textContent = 0;
    document.getElementById('totalDays').textContent = 0;
}

// Funzione per l'incremento delle ore
function increaseHours(day) {
    const input = document.getElementById(day);
    if (input) {
        // Assicurati che 'tipocontrattoselezionato' sia definito e che la chiave esista in 'contractLimits'
        if (contractLimits && contractLimits[tipocontrattoselezionato]) {
            const maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;
            if (parseInt(input.value) < maxDailyHours) {
                input.value = parseInt(input.value) + 1;
                // Gestisci l'aggiornamento totale e la visibilità del pulsante
                if (!updateTotals()) {
                    input.value = parseInt(input.value) - 1;
                    updateTotals();
                } else {
                    updateButtonVisibility(day);
                }
            }
        } else {
            // Lancia un alert se il tipo di contratto selezionato non è valido
            alert("⚠️ Inserisci tipo di contratto prima di selezionare ore");
        }
    } else {
        // Lancia un alert se l'elemento input non è trovato
        console.log("Errore: elemento input non trovato.");
    }
}

// Funzione per il decremento delle ore
function decreaseHours(day) {
    const input = document.getElementById(day);
    if (input.value > 0) {
    input.value = parseInt(input.value) - 1;
    updateTotals();
    updateButtonVisibility(day);
    }
}

// Funzione per aggiornare i totali ore
function updateTotals() {
    const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
    let totalHours = 0;
    let totalDays = 0;
    let atLeastOneDayOff = false;
    let overTimeDaily = false;

    let maxWeeklyHours = contractLimits[tipocontrattoselezionato].maxWeeklyHours;
    let maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;

    days.forEach(day => {
    const input = document.getElementById(day);
    let value = parseInt(input.value);

    if (value > maxDailyHours) {
    overTimeDaily = true;
    }

    if (value > 0) {
    totalDays++;
    } else {
    atLeastOneDayOff = true;
    }
    totalHours += value;
    });

    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalDays').textContent = totalDays;

    // Mostra messaggio di errore se non c'è almeno un giorno di riposo
    if (!atLeastOneDayOff) {
        alert(" ⚠️ Bisogna lasciare almeno 1 giorno di riposo.");
        return false;
    }

    // Mostra messaggio di errore se il totale delle ore settimanali è maggiore del limite
    if (totalHours > maxWeeklyHours) {
        alert(`⚠️ Il lavoratore con tipo contratto ${tipocontrattoselezionato} non può fare più di ${maxWeeklyHours} ore settimanali.`);
        return false;
    }

    // Mostra messaggio di errore se un giorno ha più ore del limite giornaliero
    if (overTimeDaily) {
        alert(`⚠️ Il lavoratore con tipo contratto ${tipocontrattoselezionato} non può fare più di ${maxDailyHours} ore al giorno di lavoro.`);
        return false;
    }

    return true;
    }

    // Funzione per aggiornare la visibilità dei pulsanti
    function updateButtonVisibility(day) {
    const input = document.getElementById(day);
    const decreaseButton = input.previousElementSibling;
    if (input.value == 0) {
    decreaseButton.classList.add('hidden');
    } else {
    decreaseButton.classList.remove('hidden');
    }
}

// Aggiungi event listener per gli eventi di input sugli input specifici delle ore giornaliere
const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
days.forEach(day => {
const input = document.getElementById(day);

input.addEventListener('input', function() {
let value = parseInt(this.value);

const maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;

// Assicurati che il valore non sia superiore al limite giornaliero o inferiore a 0
if (value > maxDailyHours) {
this.value = maxDailyHours;
} else if (value < 0 || isNaN(value)) {
this.value = 0;
}

if (!updateTotals()) {
this.value = 0; // Reset solo della casella problematica
updateTotals();
}
updateButtonVisibility(day);
});

// Aggiungi anche un event listener per l'evento change per garantire che i totali siano aggiornati correttamente
input.addEventListener('change', function() {
let value = parseInt(this.value);

const maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;

if (value > maxDailyHours) {
this.value = maxDailyHours;
} else if (value < 0 || isNaN(value)) {
this.value = 0;
}

if (!updateTotals()) {
this.value = 0; // Reset solo della casella problematica
updateTotals();
}
updateButtonVisibility(day);
});
});

// Inizializza la visibilità dei pulsanti al caricamento della pagina
window.onload = function() {
days.forEach(day => {
updateButtonVisibility(day);
});
};

// Ascolta l'evento quando il DOM è completamente caricato.
document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti gli elementi con classe 'informativa'.
    const informativeElements = document.querySelectorAll('.informativa');

    // Aggiunge un listener per l'evento 'mouseenter' su ciascun elemento informativo.
    informativeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Trova l'elemento tooltip all'interno dell'elemento informativo.
            const tooltip = this.querySelector('.tooltip');
            // Ottiene le dimensioni e la posizione del tooltip.
            const tooltipRect = tooltip.getBoundingClientRect();
            // Ottiene la larghezza e l'altezza della finestra del browser.
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Ripristina la posizione predefinita del tooltip.
            tooltip.style.left = '50%';
            tooltip.style.right = 'auto';
            tooltip.style.transform = 'translateX(-50%)';

            // Verifica se il tooltip esce dal viewport a sinistra e aggiusta se necessario.
            if (tooltipRect.left < 0) {
                tooltip.style.left = '0';
                tooltip.style.transform = 'translateX(0)';
            } else if (tooltipRect.right > windowWidth) { // Controlla se esce a destra e corregge.
                tooltip.style.left = 'auto';
                tooltip.style.right = '0';
                tooltip.style.transform = 'translateX(0)';
            }

            // Controlla se il tooltip esce dal viewport in alto e corregge.
            if (tooltipRect.top < 0) {
                tooltip.style.bottom = 'auto';
                tooltip.style.top = '125%';
            } else if (tooltipRect.bottom > windowHeight) { // Controlla se esce in basso e corregge.
                tooltip.style.bottom = '125%';
                tooltip.style.top = 'auto';
            }
        });
    });
});



function accendiopzioni(){
    if(tipocontrattoselezionato!="" & livellocontrattoselezionato!="" & duratacontrattoselezionato!=""){
        //document.getElementById('opzioniaggiuntive').style.display='block';
    }else{
        //document.getElementById('opzioniaggiuntive').style.display='none';
    }
}


/**
 * Funzione per raccogliere e visualizzare le selezioni fatte dall'utente.
 * Mostra le selezioni in un elemento HTML identificato da 'result'.
 */
function submitChoices() {
    // Ottiene il riferimento all'elemento dove verranno visualizzati i risultati.
    var result = document.getElementById('result');
    
    // Inizializza il contenuto di 'result' con un'intestazione.
    result.innerHTML = '<h2>Risultati del Calcolo:</h2>';

    // Itera su ogni chiave nell'oggetto 'selections'.
    for (var key in selections) {
        // Controlla se il valore associato alla chiave non è null.
        if (selections[key] !== null) {
            // Gestisce il caso in cui il valore è un array con elementi.
            if (Array.isArray(selections[key]) && selections[key].length > 0) {
                result.innerHTML += '<p>' + key + ': ' + selections[key].join(', ') + '</p>';
            } else if (!Array.isArray(selections[key])) {
                // Gestisce il caso in cui il valore non è un array.
                result.innerHTML += '<p>' + key + ': ' + selections[key] + '</p>';
            }
        }
    }
    
    // Ottiene i valori per le ore e i giorni settimanali dall'utente e li aggiunge a 'result'.
    var totalHours = document.getElementById('totalHours').value;
    var totalDays = document.getElementById('totalDays').value;
    result.innerHTML += '<p>Ore Settimanali: ' + totalHours + '</p>';
    result.innerHTML += '<p>Giorni Settimanali: ' + totalDays + '</p>';
}


/**
 * Funzione per gestire la conferma di un'azione di reset.
 * Nasconde il bottone di nuovo calcolo e mostra il bottone per confermare il nuovo calcolo.
 */
function confermanuovo() {
    // Nasconde il bottone per iniziare un nuovo calcolo
    document.getElementById('nuovocalcolo').style.display = 'none';
    // Mostra il bottone per confermare il nuovo calcolo, chiedendo conferma all'utente
    document.getElementById('confermanuovocalcolo').style.display = 'block';
}

/**
 * Funzione per annullare l'azione di reset.
 * Mostra di nuovo il bottone di nuovo calcolo e nasconde il bottone di conferma del nuovo calcolo.
 */
function annullanuovo() {
    // Mostra di nuovo il bottone per iniziare un nuovo calcolo
    document.getElementById('nuovocalcolo').style.display = 'block';
    // Nasconde il bottone per confermare il nuovo calcolo, annullando la richiesta di conferma
    document.getElementById('confermanuovocalcolo').style.display = 'none';
}


//Funzione per resettare tutta la pagina e prepararla per un nuovo calcolo
function resetCalculator() {
    selections = {
        'Tipo contratto': null,
        'Livello': null,
        'Contratto': null,
        'Vitto e alloggio in natura': null,
        'Specifiche vitto e alloggio': [],
        'Bambino entro 6 anni': null,
        'Certificato UNI1176': null,
        'Autosufficienti': null
    };

        const boxtipo = document.getElementById('boxTipoContratto');
        boxtipo.firstChild.textContent = 'Seleziona Tipo Contratto'; 
        const boxlivello = document.getElementById('boxLivelloContratto');
        boxlivello.firstChild.textContent = 'Seleziona Livello Contratto'; 
        const boxdurata = document.getElementById('boxDurataContratto');
        boxdurata.firstChild.textContent = 'Seleziona Durata Contratto'; 



    //document.getElementById('selectedItems').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('choices1').classList.remove('show');
    document.getElementById('livello').classList.remove('show');
    document.getElementById('vittoAlloggioBox').style.display = 'none';
    document.getElementById('specificaVittoAlloggioBox').style.display = 'none';
    document.getElementById('bambinoBox').style.display = 'none';
    document.getElementById('certificatoBox').style.display = 'none';
    document.getElementById('autosufficientiBox').style.display = 'none';
    document.getElementById('a').style.display = 'none';
    document.getElementById('as').style.display = 'none';
    document.getElementById('b').style.display = 'none';
    document.getElementById('bs').style.display = 'none';
    document.getElementById('c').style.display = 'none';
    document.getElementById('cs').style.display = 'none';
    document.getElementById('d').style.display = 'none';
    document.getElementById('ds').style.display = 'none';
    document.getElementById('u').style.display = 'none';
    document.getElementById('simulazione').style.display = 'none';
    document.getElementById('InputpagaBoxora').style.display = 'none';
    document.getElementById('InputpagaBoxmese').style.display = 'none';
    document.getElementById('paga-netta').textContent = "";
    document.getElementById('confermanuovocalcolo').style.display = 'none';
    //document.getElementById('opzioniaggiuntive').style.display='none';
    //document.getElementById('orariodilavoro').style.display='none';
    document.getElementById('boxLivelloContratto').style.display='none';
    document.getElementById('boxDurataContratto').style.display='none';
    //document.getElementById('sendRequest').style.display = 'none';
    document.getElementById('nuovocalcolo').style.display = 'none';

    //tolgo le linee dei cerchi
    document.querySelectorAll('.cerchio21, .cerchio22,.cerchio23').forEach(el => {
        el.classList.remove('show-line');
    });
    document.querySelectorAll('.cerchio22, .cerchio23, .cerchio24').forEach(el => {
        el.style.display = 'none';
    });




    // Reset input values
    const inputPagaOra = document.getElementById('InputpagaOra');
    const inputPagaMese = document.getElementById('InputpagaMese');

    if (inputPagaOra) {
        inputPagaOra.value = "";
        inputPagaOra.placeholder = "paga";
    }

    if (inputPagaMese) {
        inputPagaMese.value = "";
        inputPagaMese.placeholder = "paga";
    }

    livellocontrattoselezionato = "";
    tipocontrattoselezionato = "";
    duratacontrattoselezionato = "";
    indennitaPranzoColazione = "no";
    indennitaCena = "no";
    indennitaAlloggio = "no";
    certificato = "no";
    bambino = "no";
    autosufficienti = "no";
    paga = 0;

    resetTable();

    // Reset hours and days
    const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
    days.forEach(function(day) {
        document.getElementById(day).value = 0;
    });
    document.getElementById('totalHours').textContent = 0;
    document.getElementById('totalDays').textContent = 0;

    // Reset radio buttons and checkboxes
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
        radio.checked = false;
    });

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    var vittoAlloggioCheckbox = document.getElementById('vittoAlloggioCheckbox');
    vittoAlloggioCheckbox.checked = true;

    // per rimuovere lo sfondo bianco dalle selezioni tipo contratto
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.remove('selected');
    });

    // per nasocndere i meno nella tabella delle ore
    resetHours();
}


/**
 * Resetta il contenuto testuale delle celle di una tabella specificando gli ID delle celle.
 * Questa funzione è utile per pulire i dati visualizzati dopo un calcolo o in preparazione
 * di un nuovo inserimento di dati.
 */
function resetTable() {
    const ids = [
        "pagalorda-lavoratore", "paga-netta", "indennita-tot", "indennita-cibo", "paga-domenica",
        "paga-festivo", "contributicolf-lavoratore", "contributiinps-lavoratore",
        "paganetta-lavoratore", "contributicolf-datore", "contributiinps-datore",
        "indennita-tfr", "indennita-ferie", "indennita-tredicesim", "costototale-datore"
    ];
    ids.forEach(id => {
        // Trova tutti gli elementi con l'ID specificato
        const elements = document.querySelectorAll(`#${id}`);
        // Pulisce il contenuto testuale di ciascun elemento trovato
        elements.forEach(element => {
            element.textContent = '';
        });
    });
}
