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
            timeout: 60000 // 70 seconds timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        updateSimulazione(result);
        
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
                    element.textContent = result[key]+" €";
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

        function toggleChoices(choiceId) {
            var choices = document.getElementById(choiceId);
            choices.classList.toggle('show');
        }
        function aprisimulazione() {
                document.getElementById('simulazione').style.display='block';
                }


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

               let livellocontrattoselezionato = "";
               let tipocontrattoselezionato = "";
               let duratacontrattoselezionato = "";  
               
               function selectChoice(category, choice) {
               selections[category] = choice;
               displaySelections();
               if (category === 'Tipo contratto') {
                   if(selections['Tipo contratto']==='full-time'){
                   tipocontrattoselezionato = 'convivente';}
                   if(selections['Tipo contratto']==='non-convivente'){
                       tipocontrattoselezionato = 'nonconvivente';}
                   if(selections['Tipo contratto']==='part-time'){
                       tipocontrattoselezionato = 'part-time';} 
                   if(selections['Tipo contratto']==='sostituzione'){
                   tipocontrattoselezionato = 'sostituzione';}
                   if(selections['Tipo contratto']==='presenza'){
                   tipocontrattoselezionato = 'presenza';} 
                   if(selections['Tipo contratto']==='assistenza'){
                   tipocontrattoselezionato = 'assistenza';}      
               }
               if (category === 'Livello') {
                   livellocontrattoselezionato = choice;
               }
               if (category === 'Contratto') {
                   if(choice==='determinato in sostituzione'){
                   duratacontrattoselezionato = 'determinato_in_sostituzione';}
                   if(choice==='determinato'){
                   duratacontrattoselezionato = 'determinato';}
                   if(choice==='indeterminato'){
                   duratacontrattoselezionato = 'indeterminato';}    
               }    
       
               if (category === 'Tipo contratto') {
               
               } else if (category === 'Livello') {    
               if (choice === 'bs') {
                   document.getElementById('bambinoBox').style.display = 'block';
               } else {
                   document.getElementById('bambinoBox').style.display = 'none';
               }
       
               if (choice === 'b' || choice==='bs' || choice === 'cs' || choice==='d') {
                   document.getElementById('certificatoBox').style.display = 'block';
               } else {
                   document.getElementById('certificatoBox').style.display = 'none';
               }
       
               if (choice === 'cs' || choice==='ds') {
                   document.getElementById('autosufficientiBox').style.display = 'block';
               } else {
                   document.getElementById('autosufficientiBox').style.display = 'none';
               }
       
               if (selections['Tipo contratto'] !== 'non-convivente') {
                   document.getElementById('vittoAlloggioBox').style.display = 'block';
               }
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

            function sceglipaga() {
                    //mettiamo il livello minimo nel placeholder
                    var livellopaga=document.getElementById('Inputpaga');

                    if(tipocontrattoselezionato==="nonconvivente"){
                    document.getElementById('InputpagaBoxora').style.display = 'block';
                    document.getElementById('InputpagaBoxmese').style.display = 'none';
                    if(livellocontrattoselezionato==="a"){
                        livellopaga.placeholder= paganoconv_liva + "€";
                    }
                    if(livellocontrattoselezionato==="as"){
                        livellopaga.placeholder= paganoconv_livas + "€";
                    }
                    if(livellocontrattoselezionato==="b"){
                        livellopaga.placeholder= paganoconv_livb + "€";
                    }
                    if(livellocontrattoselezionato==="bs"){
                        livellopaga.placeholder= paganoconv_livbs + "€";
                    }
                    if(livellocontrattoselezionato==="c"){
                        livellopaga.placeholder= paganoconv_livc + "€";
                    }
                    if(livellocontrattoselezionato==="cs"){
                        livellopaga.placeholder= paganoconv_livcs + "€";
                    }
                    if(livellocontrattoselezionato==="d"){
                        livellopaga.placeholder= paganoconv_livd + "€";
                    }
                    if(livellocontrattoselezionato==="ds"){
                        livellopaga.placeholder= paganoconv_livds + "€";
                    }
                    }
                    if(tipocontrattoselezionato==="convivente"){
                        document.getElementById('InputpagaBoxmese').style.display = 'block';
                        document.getElementById('InputpagaBoxora').style.display = 'none';
                        if(livellocontrattoselezionato==="a"){
                            livellopaga.placeholder= pagaconv_liva + "€";
                        }
                        if(livellocontrattoselezionato==="as"){
                            livellopaga.placeholder= pagaconv_livas + "€";
                        }
                        if(livellocontrattoselezionato==="b"){
                            livellopaga.placeholder= pagaconv_livb + "€";
                        }
                        if(livellocontrattoselezionato==="bs"){
                            livellopaga.placeholder= pagaconv_livbs + "€";
                        }
                        if(livellocontrattoselezionato==="c"){
                            livellopaga.placeholder= pagaconv_livc + "€";
                        }
                        if(livellocontrattoselezionato==="cs"){
                            livellopaga.placeholder= pagaconv_livcs + "€";
                        }
                        if(livellocontrattoselezionato==="d"){
                            livellopaga.placeholder= pagaconv_livd + "€";
                        }
                        if(livellocontrattoselezionato==="ds"){
                            livellopaga.placeholder= pagaconv_livds + "€";
                        }
                    }
                    if(tipocontrattoselezionato==="part-time"){
                        document.getElementById('InputpagaBoxmese').style.display = 'block';
                        document.getElementById('InputpagaBoxora').style.display = 'none';
                        if(livellocontrattoselezionato==="b"){
                            livellopaga.placeholder= pagapart_livb + "€";
                        }
                        if(livellocontrattoselezionato==="bs"){
                            livellopaga.placeholder= pagapart_livbs + "€";
                        }
                        if(livellocontrattoselezionato==="c"){
                            livellopaga.placeholder= pagapart_livc + "€";
                        }
                    }
                    if(tipocontrattoselezionato==="sostituzione"){
                        document.getElementById('InputpagaBoxora').style.display = 'block';
                        document.getElementById('InputpagaBoxora').style.display = 'none';
                        if(livellocontrattoselezionato==="cs"){
                            livellopaga.placeholder= pagasost_livcs + "€";
                        }
                        if(livellocontrattoselezionato==="ds"){
                            livellopaga.placeholder= pagasost_livds + "€";
                        }
                    }
                    if(tipocontrattoselezionato==="presenza"){
                        document.getElementById('InputpagaBoxmese').style.display = 'block';
                        document.getElementById('InputpagaBoxora').style.display = 'none';
                        if(livellocontrattoselezionato==="u"){
                            livellopaga.placeholder= pagaconvpres_livu + "€";
                        }
                    } 
                    if(tipocontrattoselezionato==="assistenza"){
                        document.getElementById('InputpagaBoxmese').style.display = 'block';
                        document.getElementById('InputpagaBoxora').style.display = 'none';
                        if(livellocontrattoselezionato==="bs"){
                            livellopaga.placeholder= pagaconvass_livbs + "€";
                        }
                        if(livellocontrattoselezionato==="cs"){
                            livellopaga.placeholder= pagaconvass_livcs + "€";
                        }
                        if(livellocontrattoselezionato==="ds"){
                            livellopaga.placeholder= pagaconvass_livds + "€";
                        }
                    }   
                 
            }
            let paga = 0;
        
            function salvaPaga() {
            let pagaInput = document.getElementById('Inputpaga').value;

            // Controlla se l'input è vuoto
            if (pagaInput === "") {
                alert("Inserisci un valore valido per la paga.");
                resetPaga();
                return;
            }

            // Controlla se l'input è un numero
            if (!/^\d+$/.test(pagaInput)) {
                alert("Inserisci solo numeri per la paga.");
                resetPaga();
                return;
            }

            paga = parseFloat(pagaInput);

            // Controlla se il valore supera il limite
            if (paga > 2000) {
                alert("Inserisci un valore valido per la paga.");
                resetPaga();
                return;
            }

            document.getElementById('paga-netta').innerText = paga + ' €';
        }

        function resetPaga() {
            paga = 0;
            document.getElementById('Inputpaga').value = "";
            document.getElementById('paga-netta').innerText ='';
        }
    
            document.addEventListener('DOMContentLoaded', (event) => {
                var inputPaga = document.getElementById('Inputpaga');
                inputPaga.addEventListener('input', salvaPaga);  // Usa 'input' invece di 'change' per aggiornamenti in tempo reale
            })


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
                selections['Specifiche vitto e alloggio'] = [];
            }else{
                deselectAllSpecifiche();
            }
            displaySelections();
        }

        function deselectAllSpecifiche() {
            // Deseleziona tutte le specifiche checkbox
            var checkboxes = document.querySelectorAll('#specificaVittoAlloggioBox input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
                var value = checkbox.value;
                selections[value] = 'no';
            });
        }

        function selectSpecificaVittoAlloggio(option) {
            var index = selections['Specifiche vitto e alloggio'].indexOf(option);
            if (index === -1) {
                selections['Specifiche vitto e alloggio'].push(option);
            } else {
                selections['Specifiche vitto e alloggio'].splice(index, 1);
            }
            displaySelections();
        }


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
        function increaseHours(day) {
            const input = document.getElementById(day);
            if (input.value < 10) {
                input.value = parseInt(input.value) + 1;
                updateTotals();
            }
        }
        
        function decreaseHours(day) {
            const input = document.getElementById(day);
            if (input.value > 0) {
                input.value = parseInt(input.value) - 1;
                updateTotals();
            }
        }
        
        function updateTotals() {
            const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
            let totalHours = 0;
            let totalDays = 0;
        
            days.forEach(day => {
                const input = document.getElementById(day);
                let value = parseInt(input.value);
        
                // Assicurati che il valore non sia superiore a 10
                if (value > 10) {
                    value = 10;
                    input.value = 10;
                }
        
                if (value > 0) {
                    totalDays++;
                }
                totalHours += value;
            });
        
            document.getElementById('totalHours').value = totalHours;
            document.getElementById('totalDays').value = totalDays;
        }
        
        // Aggiungi event listener per gli eventi di input sugli input specifici delle ore giornaliere
        const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
        days.forEach(day => {
            const input = document.getElementById(day);
        
            input.addEventListener('input', function() {
                let value = parseInt(this.value);
        
                // Assicurati che il valore non sia superiore a 10 o inferiore a 0
                if (value > 10) {
                    this.value = 10;
                } else if (value < 0 || isNaN(value)) {
                    this.value = 0;
                }
        
                updateTotals();
            });
        
            // Aggiungi anche un event listener per l'evento change per garantire che i totali siano aggiornati correttamente
            input.addEventListener('change', function() {
                let value = parseInt(this.value);
        
                if (value > 10) {
                    this.value = 10;
                } else if (value < 0 || isNaN(value)) {
                    this.value = 0;
                }
        
                updateTotals();
            });
        });
        
        
        
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
            document.getElementById('InputpagaBox').style.display = 'none';
            document.getElementById('paga-netta').textContent = "";
            document.getElementById('Inputpaga').value = "";
        
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
            document.getElementById('totalHours').value = 0;
            document.getElementById('totalDays').value = 0;
        
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
        