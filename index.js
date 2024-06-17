document.getElementById('sendRequest').addEventListener('click', async () => {
    console.log("LOOOOL")
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NGRiYmE4ZmFlZTY5YWNhZTFiYzFiZTE5MDQ1MzY3OGY0NzI4MDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAxMjIyMjQ2MjkzMDE2Mzg1ODI4IiwiaGQiOiJiYXplYXBwLml0IiwiZW1haWwiOiJkYXJpby52YWxhc3Ryb0BiYXplYXBwLml0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJvMkZLUHYtRzFsbDZpUF90VVBVaG13IiwiaWF0IjoxNzE3NzY3NjMzLCJleHAiOjE3MTc3NzEyMzN9.UnvqLNXiK2nfAFDb3qnPpfYthR3z8bLLkkL_t1Jty8JkXMGQv44uLrSAbf60SuVdmXfxUXkmPICFbNzBYHTmDkGoT0fO11PzcUbd9dhj9gsXE4PVMSX0d-w6k_FIUXZmdQ2vYZKFOsiS5UmNDWfEE7dPno66iWku8An3sROnGqesqlM_th7H3bPzBUc7lBji5-Zl5sKbmXLlULvt2bZ8yfqzITR-5x_twjYFNe5gmNDeJMiiiLk8lGDH_mfe5G5fokhUocuuVRZa8GeSSrfglsCwgLdK3ytMmZuS48v8GsLQQm7wTLJREkc3wcJk756sEhBNZtsbZ0116bUOj8mYIA'; // Replace with the actual token

    const data = {
        durataContratto: "indeterminato",
        tipoContratto: "convivente",
        livelloContratto: "A",
        oreLunedi: "9",
        oreMartedi: "4",
        oreMercoledi: "2",
        oreGiovedi: "0",
        oreVenerdi: "0",
        oreSabato: "0",
        oreDomenica: "0",
        paga: "730",
        bambino_6_anni: "si",
        piu_persone: "no",
        certificato_uni: "si",
        pranzo_natura: "si",
        cena_natura: "si",
        alloggio_natura: "no"
    };

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
        console.log(result);
    } catch (error) {
        console.error('There was an error!', error);
    }
}); 

        var selections = {
            'Tipo contratto': null,
            'Livello': null,
            'Contratto': null,
            'Vitto e alloggio in natura': null,
            'Specifiche vitto e alloggio': [],
            'Bambino entro 6 anni': null,
            'Certificato UNI1176': null,
            'Autosufficienti':null,
            'Inputpaga':0
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
                document.getElementById('lu').style.display='none';}

            if(selections['Tipo contratto']==='part-time'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='block';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='block';
                document.getElementById('cs').style.display='none';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='none';
                document.getElementById('lu').style.display='none';}

            if(selections['Tipo contratto']==='full-time'){
                document.getElementById('a').style.display='block';
                document.getElementById('as').style.display='block';
                document.getElementById('b').style.display='block';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='block';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='block';
                document.getElementById('ds').style.display='block';
                document.getElementById('lu').style.display='none';}

            if(selections['Tipo contratto']==='sostituzione'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='none';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='block';
                document.getElementById('lu').style.display='none';}
            if(selections['Tipo contratto']==='assistenza'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='block';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='block';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='block';
                document.getElementById('lu').style.display='none';}  
            if(selections['Tipo contratto']==='presenza'){
                document.getElementById('a').style.display='none';
                document.getElementById('as').style.display='none';
                document.getElementById('b').style.display='none';
                document.getElementById('bs').style.display='none';
                document.getElementById('c').style.display='none';
                document.getElementById('cs').style.display='none';
                document.getElementById('d').style.display='none';
                document.getElementById('ds').style.display='none';
                document.getElementById('lu').style.display='block';}  
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
            function salvaPaga() {
                var paga = document.getElementById('Inputpaga').value;
                if (paga === "") {
                    alert("Inserisci un valore valido per la paga.");
                    return;
                }
                document.getElementById('pagaImporto').innerText = paga+ ' €';
            }



        function selectChoice(category, choice) {
        selections[category] = choice;
        displaySelections();

        if (category === 'Tipo contratto') {
         updateLevelChoices(choice);
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

        function selectBambino(choice) {
            selections['Bambino entro 6 anni'] = choice;
            displaySelections();
        }

        function selectCertificato(choice) {
            selections['Certificato UNI1176'] = choice;
            displaySelections();
        }

        function selectAutosuff(choice) {
            selections['Autosufficienti'] = choice;
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
            var input = document.getElementById(day);
            var value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
                updateTotalHoursAndDays();
            }
        }

        function decreaseHours(day) {
            var input = document.getElementById(day);
            var value = parseInt(input.value);
            if (value > 0) {
                input.value = value - 1;
                updateTotalHoursAndDays();
            }
        }

        function updateTotalHoursAndDays() {
            var days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
            var totalHours = 0;
            var totalDays = 0;

            days.forEach(function(day) {
                var input = document.getElementById(day);
                var value = parseInt(input.value);
                totalHours += value;
                if (value > 0) {
                    totalDays += 1;
                }
            });

            document.getElementById('totalHours').value = totalHours;
            document.getElementById('totalDays').value = totalDays;
        }

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
            document.getElementById('lu').style.display='none';
            document.getElementById('simulazione').style.display='none';
            document.getElementById('InputpagaBox').style.display='none';
            document.getElementById('pagabox').style.display='none';
            document.getElementById('Inputpaga').value = "0";
            
                

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

        document.addEventListener('DOMContentLoaded', function () {
            fetch('/dati')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('pagalorda-lavoratore').innerText = data['pagalorda-lavoratore']+ ' €';
                    document.getElementById('contributicolf-lavoratore').innerText = data['contributicolf-lavoratore']+ ' €';
                    document.getElementById('contributiinps-lavoratore').innerText = data['contributiinps-lavoratore']+ ' €';
                    document.getElementById('paganetta-lavoratore').innerText = data['paganetta-lavoratore']+ ' €';
                    document.getElementById('contributicolf-datore').innerText = data['contributicolf-datore']+ ' €';
                    document.getElementById('contributiinps-datore').innerText = data['contributiinps-datore']+ ' €';
                    document.getElementById('indennita-tfr').innerText = data['indennita-tfr']+ ' €';
                    document.getElementById('indennita-ferie').innerText = data['indennita-ferie']+ ' €';
                    document.getElementById('indennita-tredicesim').innerText = data['indennita-tredicesim']+ ' €';
                    document.getElementById('costototale-datore').innerText = data['costototale-datore']+ ' €';
                });
        });
