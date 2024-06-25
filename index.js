document.getElementById('sendRequest').addEventListener('click', async () => {
    console.log("LOOOOL")
    const token = toki; 
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
    console.log(data);

    try {
        const response = await fetch('https://europe-west3-baze-app-prod.cloudfunctions.net/calculator-ccnl', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
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
                    element.textContent = result[key];
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

            
            
            function sceglipaga() {
                    document.getElementById('pagabox').style.display = 'block';
            }
            function toggleManualSalaryInput(choice) {
                if (choice === 'si') {
                    document.getElementById('InputpagaBox').style.display = 'block';
                } else {
                    document.getElementById('InputpagaBox').style.display = 'none';
                }
            }
            let paga=0 ;
            function salvaPaga() {
                    paga = document.getElementById('Inputpaga').value;
                if (paga === "") {
                    alert("Inserisci un valore valido per la paga.");
                    return;
                }
                document.getElementById('paga-netta').innerText = paga+ ' €';
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

        function selectVittoAlloggio(choice) {
            selections['Vitto e alloggio in natura'] = choice;
            document.getElementById('specificaVittoAlloggioBox').style.display = (choice === 'no') ? 'block' : 'none';
            if (choice === 'si') {
                selections['Specifiche vitto e alloggio'] = [];
            }
            displaySelections();
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
        function selectBambino(choice) {
            selections['Bambino entro 6 anni'] = choice;
            bambino=choice;
            displaySelections();
        }
        let certificato = "no";
        function selectCertificato(choice) {
            selections['Certificato UNI1176'] = choice;
            certificato=choice;
            displaySelections();
        }
        let autosufficienti = "no";
        function selectAutosuff(choice) {
            selections['Autosufficienti'] = choice;
            autosufficienti=choice;
            displaySelections();
        }

            
        function displaySelections() {
            var selectedItems = document.getElementById('selectedItems');
            selectedItems.innerHTML = '';

            for (var key in selections) {
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
                'Autosufficienti':null
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
            document.getElementById('a').style.display='none';
            document.getElementById('as').style.display='none';
            document.getElementById('b').style.display='none';
            document.getElementById('bs').style.display='none';
            document.getElementById('c').style.display='none';
            document.getElementById('cs').style.display='none';
            document.getElementById('d').style.display='none';
            document.getElementById('ds').style.display='none';
            document.getElementById('u').style.display='none';
            document.getElementById('simulazione').style.display='none';
            document.getElementById('InputpagaBox').style.display='none';
            document.getElementById('pagabox').style.display='none';
            document.getElementById('paga-netta').value = "";
            document.getElementById('Inputpaga').value = "";
            livellocontrattoselezionato = "";
            tipocontrattoselezionato = "";
            duratacontrattoselezionato = "";  
            indennitaPranzoColazione = "no";
            indennitaCena = "no";
            indennitaAlloggio = "no";
            certificato = "no";
            bambino="no";
            autosufficienti="no";
            paga=0;
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
        
        

        
