document.getElementById('sendRequest').addEventListener('click', async () => {
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