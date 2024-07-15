document.getElementById("sendRequest").addEventListener("click", function() {
                submitChoices();
});
document.getElementById("nuovocalcolo").addEventListener("click", function() {
    confermanuovo();
});

    document.getElementById('sendRequest').addEventListener('click', async () => {
        const data = {
            durataContratto: duratacontrattoselezionato,
            tipoContratto: tipocontrattoselezionato,
            livelloContratto: livellocontrattoselezionato,
            oreLunedi: document.getElementById("lunedi").value,
            oreMartedi: document.getElementById("martedi").value,
            oreMercoledi: document.getElementById("mercoledi").value,
            oreGiovedi: document.getElementById("giovedi").value,
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
        
            /*function sendToWebhook(data) {
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
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    sendToWebhook(data);
    */
   

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
            
            console.log(result);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }); 
    
    function updateSimulazione(result) {
        // Itera su ciascuna chiave nell'oggetto result
        for (const key in result) {
            // Trova tutti gli elementi HTML con l'ID che corrisponde alla chiave
            const elements = document.querySelectorAll(`#${key}`);
            // Itera su ciascun elemento trovato e aggiorna il suo contenuto testuale
            elements.forEach(element => {
                element.textContent = result[key] + " €";
            });
        }
    }
    

        var selections = {
            'Tipo contratto': null,
            'Livello': null,
            'Contratto': null,
            'Vitto e alloggio in natura': null,
            'Specifiche vitto e alloggio': [],
            'Bambino entro 6 anni': null,
            'Certificato UNI1176': null,
            'Autosufficienti':null
        };

        // funzione per aprire la scelta del Tipocontratto e Tipolivello e Duratacontratto
        function toggleChoices(choiceId) {
            var choices = document.getElementById(choiceId);
            choices.classList.toggle('show');
        }
        //Funzione per aprire la tabella con i risultati dei calcoli
        function aprisimulazione() {
                document.getElementById('simulazione').style.display='block';
                }

        //funzione per far visualizzare i livelli giusti in base al tipo di contratto        
        function sceltalivello() {
            if(selections['Tipo contratto']==='non-convivente'){
                document.getElementById('a').style.display='block';
                document.getElementById('as').style.display='block';
                document.getElementById('b').style.display='block';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='block';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='block';
                document.getElementById('ds').style.display='block';
                document.getElementById('u').style.display='none';}

            if(selections['Tipo contratto']==='part-time'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='block';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='block';
                document.getElementById('cs').style.display='none';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='none';
                document.getElementById('u').style.display='none';}

            if(selections['Tipo contratto']==='full-time'){
                document.getElementById('a').style.display='block';
                document.getElementById('as').style.display='block';
                document.getElementById('b').style.display='block';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='block';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='block';
                document.getElementById('ds').style.display='block';
                document.getElementById('u').style.display='none';}

            if(selections['Tipo contratto']==='sostituzione'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='none';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='block';
                document.getElementById('u').style.display='none';}
            if(selections['Tipo contratto']==='assistenza'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='block';
                document.getElementById('u').style.display='none';}  
            if(selections['Tipo contratto']==='presenza'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='none';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='none';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='none';
                document.getElementById('u').style.display='block';}  
               }

            // inizializzo le variabili che andrò a passare al backend
let livellocontrattoselezionato = "";
let tipocontrattoselezionato = "";
let duratacontrattoselezionato = "";  

// Funzione per gestire la selezione
function selectChoice(category, choice) {
    selections[category] = choice;
    displaySelections();
    if (category === 'Tipo contratto') {
        let newTipoContratto;
        if (selections['Tipo contratto'] === 'full-time') {
            newTipoContratto = 'convivente';
        } else if (selections['Tipo contratto'] === 'non-convivente') {
            newTipoContratto = 'nonconvivente';
        } else if (selections['Tipo contratto'] === 'part-time') {
            newTipoContratto = 'part-time';
        } else if (selections['Tipo contratto'] === 'sostituzione') {
            newTipoContratto = 'sostituzione';
        } else if (selections['Tipo contratto'] === 'presenza') {
            newTipoContratto = 'presenza';
        } else if (selections['Tipo contratto'] === 'assistenza') {
            newTipoContratto = 'assistenza';
        }
        cambiotipo(livellocontrattoselezionato);//se cambia il tipo resetto il livello
        onTipoContrattoChange(newTipoContratto); // Cambia il tipo di contratto e resetta i valori orari
    }
    
    if (category === 'Livello') {
        livellocontrattoselezionato = choice;
    }
    
    if (category === 'Contratto') {
        if (choice === 'determinato in sostituzione') {
            duratacontrattoselezionato = 'determinato_in_sostituzione';
        }
        if (choice === 'determinato') {
            duratacontrattoselezionato = 'determinato';
        }
        if (choice === 'indeterminato') {
            duratacontrattoselezionato = 'indeterminato';
        }
    }

    if (category === 'Livello') {
        if (choice === 'bs') {
            document.getElementById('bambinoBox').style.display = 'block';
        } else {
            document.getElementById('bambinoBox').style.display = 'none';
        }

        if ((choice === 'b' || choice === 'bs' || choice === 'cs' || choice === 'd') &&
        (tipocontrattoselezionato !== 'nonconvivente' && tipocontrattoselezionato !== 'sostituzione'))
         {
         document.getElementById('certificatoBox').style.display = 'block';
        } else {
            document.getElementById('certificatoBox').style.display = 'none';
        }

        if (choice === 'cs' || choice === 'ds') {
            document.getElementById('autosufficientiBox').style.display = 'block';
        } else {
            document.getElementById('autosufficientiBox').style.display = 'none';
        }

        if (selections['Tipo contratto'] !== 'non-convivente') {
            document.getElementById('vittoAlloggioBox').style.display = 'block';
        }else{
            document.getElementById('vittoAlloggioBox').style.display = 'none';
        }
    }
}

    function cambiotipo(nuovo){
        if(tipocontrattoselezionato!=nuovo){
            const livelli = document.querySelectorAll('.boxrestaliv');
            livelli.forEach(livello => {
             livello.style.display = 'none';
            });
            const durati = document.querySelectorAll('.boxrestatempo');
            durati.forEach(durato => {
             durato.style.display = 'none';
            });
            livellocontrattoselezionato="";
            duratacontrattoselezionato="";
            alert('Se cambi il tipo contratto seleziona nuovamente il livello e la durata del contratto');
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

//funzione per mostrare l'input di paga e calcolo del placeholder
let paga = 0;
function sceglipaga() {
    var livellopaga;
    if (tipocontrattoselezionato === "nonconvivente") {
        document.getElementById('InputpagaBoxora').style.display = 'block';
        document.getElementById('InputpagaBoxmese').style.display = 'none';
        livellopaga = document.getElementById('InputpagaOra');
        if (livellocontrattoselezionato === "a") {
            livellopaga.placeholder = paganoconv_liva ;
        }
        if (livellocontrattoselezionato === "as") {
            livellopaga.placeholder = paganoconv_livas;
        }
        if (livellocontrattoselezionato === "b") {
            livellopaga.placeholder = paganoconv_livb ;
        }
        if (livellocontrattoselezionato === "bs") {
            livellopaga.placeholder = paganoconv_livbs;
        }
        if (livellocontrattoselezionato === "c") {
            livellopaga.placeholder = paganoconv_livc;
        }
        if (livellocontrattoselezionato === "cs") {
            livellopaga.placeholder = paganoconv_livcs;
        }
        if (livellocontrattoselezionato === "d") {
            livellopaga.placeholder = paganoconv_livd;
        }
        if (livellocontrattoselezionato === "ds") {
            livellopaga.placeholder = paganoconv_livds ;
        }
    }
    if (tipocontrattoselezionato === "convivente") {
        document.getElementById('InputpagaBoxmese').style.display = 'block';
        document.getElementById('InputpagaBoxora').style.display = 'none';
        livellopaga = document.getElementById('InputpagaMese');
        if (livellocontrattoselezionato === "a") {
            livellopaga.placeholder = pagaconv_liva ;
        }
        if (livellocontrattoselezionato === "as") {
            livellopaga.placeholder = pagaconv_livas ;
        }
        if (livellocontrattoselezionato === "b") {
            livellopaga.placeholder = pagaconv_livb;
        }
        if (livellocontrattoselezionato === "bs") {
            livellopaga.placeholder = pagaconv_livbs;
        }
        if (livellocontrattoselezionato === "c") {
            livellopaga.placeholder = pagaconv_livc;
        }
        if (livellocontrattoselezionato === "cs") {
            livellopaga.placeholder = pagaconv_livcs;
        }
        if (livellocontrattoselezionato === "d") {
            livellopaga.placeholder = pagaconv_livd ;
        }
        if (livellocontrattoselezionato === "ds") {
            livellopaga.placeholder = pagaconv_livds ;
        }
    }
    if (tipocontrattoselezionato === "part-time") {
        document.getElementById('InputpagaBoxmese').style.display = 'block';
        document.getElementById('InputpagaBoxora').style.display = 'none';
        livellopaga = document.getElementById('InputpagaMese');
        if (livellocontrattoselezionato === "b") {
            livellopaga.placeholder = pagapart_livb;
        }
        if (livellocontrattoselezionato === "bs") {
            livellopaga.placeholder = pagapart_livbs ;
        }
        if (livellocontrattoselezionato === "c") {
            livellopaga.placeholder = pagapart_livc;
        }
    }
    if (tipocontrattoselezionato === "sostituzione") {
        document.getElementById('InputpagaBoxora').style.display = 'block';
        document.getElementById('InputpagaBoxmese').style.display = 'none';
        livellopaga = document.getElementById('InputpagaOra');
        if (livellocontrattoselezionato === "cs") {
            livellopaga.placeholder = pagasost_livcs ;
        }
        if (livellocontrattoselezionato === "ds") {
            livellopaga.placeholder = pagasost_livds ;
        }
    }
    if (tipocontrattoselezionato === "presenza") {
        document.getElementById('InputpagaBoxmese').style.display = 'block';
        document.getElementById('InputpagaBoxora').style.display = 'none';
        livellopaga = document.getElementById('InputpagaMese');
        if (livellocontrattoselezionato === "u") {
            livellopaga.placeholder = pagaconvpres_livu ;
        }
    }
    if (tipocontrattoselezionato === "assistenza") {
        document.getElementById('InputpagaBoxmese').style.display = 'block';
        document.getElementById('InputpagaBoxora').style.display = 'none';
        livellopaga = document.getElementById('InputpagaMese');
        if (livellocontrattoselezionato === "bs") {
            livellopaga.placeholder = pagaconvass_livbs ;
        }
        if (livellocontrattoselezionato === "cs") {
            livellopaga.placeholder = pagaconvass_livcs;
        }
        if (livellocontrattoselezionato === "ds") {
            livellopaga.placeholder = pagaconvass_livds ;
        }
    }
}
//funzione per mostrare il livello scelto
function restalivello(acceso){
    const elementi = document.querySelectorAll('.boxrestaliv');
    // Itera su ciascun elemento e imposta display: none
    elementi.forEach(elemento => {
        elemento.style.display = 'none';
    });
    if (acceso==="a")
        document.getElementById('restaa').style.display="block";
    if (acceso==="as")
        document.getElementById('restaas').style.display="block";
    if (acceso==="b")
        document.getElementById('restab').style.display="block";
    if (acceso==="bs")
        document.getElementById('restabs').style.display="block";
    if (acceso==="c")
        document.getElementById('restac').style.display="block";
    if (acceso==="cs")
        document.getElementById('restacs').style.display="block";
    if (acceso==="d")
        document.getElementById('restad').style.display="block";
    if (acceso==="ds")
        document.getElementById('restads').style.display="block";
    if (acceso==="u")
        document.getElementById('restau').style.display="block";
}

//funzione per mostrare il tipocontratto scelto
function restatipo(acceso){
    const elementi2 = document.querySelectorAll('.boxrestatipo');
    // Itera su ciascun elemento e imposta display: none
    elementi2.forEach(elemento => {
        elemento.style.display = 'none';
    });
    if (acceso==="nc")
        document.getElementById('restanc').style.display="block";
    if (acceso==="ft")
        document.getElementById('restaft').style.display="block";
    if (acceso==="pt")
        document.getElementById('restapt').style.display="block";
    if (acceso==="so")
        document.getElementById('restaso').style.display="block";
    if (acceso==="an")
        document.getElementById('restaan').style.display="block";
    if (acceso==="pn")
        document.getElementById('restapn').style.display="block";
    
}

//funzione per mostrare il tipocontratto scelto
function restatempo(acceso){
    const elementi3 = document.querySelectorAll('.boxrestatempo');
    // Itera su ciascun elemento e imposta display: none
    elementi3.forEach(elemento => {
        elemento.style.display = 'none';
    });
    if (acceso==="ind")
        document.getElementById('restaind').style.display="block";
    if (acceso==="det")
        document.getElementById('restadet').style.display="block";
    if (acceso==="detsost")
        document.getElementById('restadetsost').style.display="block";
    
}

//funzione per il salvataggio della paga inserita
function salvaPaga(event) {
    var pagaInput = event.target;
    var pagaValue = parseFloat(pagaInput.value);
    var placeholderValue = parseFloat(pagaInput.placeholder);

    // Controlla se il valore supera il limite
    if (pagaValue > 4000 || isNaN(pagaValue)) {
        alert("Inserisci un valore valido per la paga.");
        resetPaga(pagaInput);
        return;
    }

    paga = pagaValue;
    document.getElementById('paga-netta').innerText = paga + ' €';
}

//funzione per resettare la paga quando si inserisce un valore non valido
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
            displaySelections();
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
            displaySelections();
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
            displaySelections();
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
            displaySelections();
        }

            
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
        }
// Definizione dei limiti per ogni tipo di contratto
const contractLimits = {
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
        document.getElementById(day).value = 0;
    });
    document.getElementById('totalHours').value = 0;
    document.getElementById('totalDays').value = 0;
}

// Funzione per l'incremento delle ore
function increaseHours(day) {
    const input = document.getElementById(day);
    const maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;
    if (parseInt(input.value) < maxDailyHours) {
        input.value = parseInt(input.value) + 1;
        if (!updateTotals()) {
            input.value = parseInt(input.value) - 1;
            updateTotals();
        }
    }
}

// Funzione per il decremento delle ore
function decreaseHours(day) {
    const input = document.getElementById(day);
    if (input.value > 0) {
        input.value = parseInt(input.value) - 1;
        updateTotals();
    }
}

// Funzione per aggiornare i totali ore
function updateTotals() {
    const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
    let totalHours = 0;
    let totalDays = 0;
    let atLeastOneDayOff = false;
    let overTimeDaily = false;

    const maxWeeklyHours = contractLimits[tipocontrattoselezionato].maxWeeklyHours;
    const maxDailyHours = contractLimits[tipocontrattoselezionato].maxDailyHours;

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
        alert("Bisogna lasciare almeno 1 giorno di riposo.");
        return false;
    }

    // Mostra messaggio di errore se il totale delle ore settimanali è maggiore del limite
    if (totalHours > maxWeeklyHours) {
        alert(`Il lavoratore con tipo contratto ${tipocontrattoselezionato} non può fare più di ${maxWeeklyHours} ore settimanali.`);
        return false;
    }

    // Mostra messaggio di errore se un giorno ha più ore del limite giornaliero
    if (overTimeDaily) {
        alert(`Il lavoratore con tipo contratto ${tipocontrattoselezionato} non può fare più di ${maxDailyHours} ore al giorno di lavoro.`);
        return false;
    }

    return true;
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
    });
});

// funzione per gestire i toolip e farli stare sempre dentro la pagina
document.addEventListener('DOMContentLoaded', function() {
    const informativeElements = document.querySelectorAll('.informativa');

    informativeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.tooltip');
            const tooltipRect = tooltip.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Reset tooltip position
            tooltip.style.left = '50%';
            tooltip.style.right = 'auto';
            tooltip.style.transform = 'translateX(-50%)';

            // Check if the tooltip is out of the viewport and adjust
            if (tooltipRect.left < 0) {
                tooltip.style.left = '0';
                tooltip.style.transform = 'translateX(0)';
            } else if (tooltipRect.right > windowWidth) {
                tooltip.style.left = 'auto';
                tooltip.style.right = '0';
                tooltip.style.transform = 'translateX(0)';
            }

            if (tooltipRect.top < 0) {
                tooltip.style.bottom = 'auto';
                tooltip.style.top = '125%';
            } else if (tooltipRect.bottom > windowHeight) {
                tooltip.style.bottom = '125%';
                tooltip.style.top = 'auto';
            }
        });
    });
});


        function accendiopzioni(){
            if(tipocontrattoselezionato!="" & livellocontrattoselezionato!="" & duratacontrattoselezionato!=""){
                document.getElementById('opzioniaggiuntive').style.display='block';
            }else{
                document.getElementById('opzioniaggiuntive').style.display='none';
            }
        }
       

        
        
        //fuznione per visualizzare le cose scelte nella selections
        function submitChoices() {
            var result = document.getElementById('result');
            result.innerHTML = '<h2>Risultati del Calcolo:</h2>';
            for (var key in selections) {
                if (selections[key] !== null) {
                    if (Array.isArray(selections[key]) && selections[key].length > 0) {
                        result.innerHTML += '<p>' + key + ': ' + selections[key].join(', ') + '</p>';
                    } else if (!Array.isArray(selections[key])) {
                        result.innerHTML += '<p>' + key + ': ' + selections[key] + '</p>';
                    }
                }
            }
            var totalHours = document.getElementById('totalHours').value;
            var totalDays = document.getElementById('totalDays').value;
            result.innerHTML += '<p>Ore Settimanali: ' + totalHours + '</p>';
            result.innerHTML += '<p>Giorni Settimanali: ' + totalDays + '</p>';
        }
        //funzioni per la conferma del reset
        function confermanuovo(){
            document.getElementById('nuovocalcolo').style.display = 'none';
            document.getElementById('confermanuovocalcolo').style.display = 'block';
        }
        function annullanuovo(){
            document.getElementById('nuovocalcolo').style.display = 'block';
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
        
            document.getElementById('selectedItems').innerHTML = '';
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
            document.getElementById('nuovocalcolo').style.display = 'block';
            document.getElementById('opzioniaggiuntive').style.display='none';

            // Nascondi il tipo e livello e Tempo scelti
            const elementiLiv = document.querySelectorAll('.boxrestaliv');
            elementiLiv.forEach(elemento => {
                elemento.style.display = 'none';
            });

            const elementiTipo = document.querySelectorAll('.boxrestatipo');
            elementiTipo.forEach(elemento => {
                elemento.style.display = 'none';
            });

            const elementiTempo = document.querySelectorAll('.boxrestatempo');
            elementiTempo.forEach(elemento => {
                elemento.style.display = 'none';
            });
            
            // Reset input values
            var inputPagaOra = document.getElementById('InputpagaOra');
            var inputPagaMese = document.getElementById('InputpagaMese');
            
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
            var days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
            days.forEach(function(day) {
                document.getElementById(day).value = 0;
            });
            document.getElementById('totalHours').textContent = 0;
            document.getElementById('totalDays').textContent = 0;
        
            // Reset radio buttons and checkboxes
            var radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(function(radio) {
                radio.checked = false;
            });
        
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
            var vittoAlloggioCheckbox = document.getElementById('vittoAlloggioCheckbox');
            vittoAlloggioCheckbox.checked = true;
        }
        
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
        