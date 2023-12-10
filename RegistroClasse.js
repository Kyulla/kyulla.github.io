//Inizio classe Studente
class Studente{
    constructor(nome, cognome){
        this.nome = nome;
        this.cognome = cognome;
        this.voti = [];
    }

    setVoto(voto ,data){
        this.voti.push({voto, data});
    }
}
//Fine classe Studente

//Inizio classe RegistroClasse
class RegistroClasse{
    constructor(){
        this.studenti = [];
    }

    static createFromLocalStorage(data) {
        const registro = new RegistroClasse();
        Object.assign(registro, data);
        registro.studenti = registro.studenti.map(studenteData => {
            const studente = new Studente();
            Object.assign(studente, studenteData);
            return studente;
        });
        return registro;
    }

    setStudente(nome, cognome){
        const nuovoStudente = new Studente(nome, cognome);
        this.studenti.push(nuovoStudente);
    }

    getStudente(){
        return this.studenti.map(studente => {
            return { nome: studente.nome, cognome: studente.cognome, voti: studente.voti, data: studente.data };
        });
    }

    modifyStudente(nome, cognome, nuovoNome, nuovoCognome){
        const modStudente = this.studenti.find(studente => studente.nome === nome && studente.cognome === cognome);
        if (modStudente){
            modStudente.nome = nuovoNome;
            modStudente.cognome = nuovoCognome;
        }
    }

    deleteStudente(nome, cognome){
        const delStudente = this.studenti.findIndex(studente => studente.nome === nome && studente.cognome === cognome);
        if (delStudente != -1){
            this.studenti.splice(delStudente, 1);
        }
    }

    aggiungiVotoAStudente(nome, cognome, voto, data) {
        const studente = this.studenti.find(
          (stud) => stud.nome === nome && stud.cognome === cognome
        );

        if (studente) {
          studente.setVoto(voto, data);
        }
    }
}
//Fine classe RegistroClasse

//Istanziamento della della classe RegistroClasse
var registro = new RegistroClasse();

//Funzione atta al salvataggio dei dati nel local storage
function saveToLocalStorage(){
    localStorage.setItem('registro', JSON.stringify(registro));
}

//Funzione atta al caricamento dei dati nel local storage
function loadFromLocalStorage() {
    const storedRegistro = localStorage.getItem('registro');
    registro = RegistroClasse.createFromLocalStorage(JSON.parse(storedRegistro));
}

//Richiamo della funzione per caricare i dati presenti nel local storage
loadFromLocalStorage();

//Inizio funzioni JavaScript per interagire con l'utente
//Event listener del form per controllare quale opzione si è scelta nel form
document.getElementById("option-selector").addEventListener("change", function(){
    const opzione = document.getElementById("option-selector").value;

    document.getElementById('result').innerHTML = '';

    var form = document.createElement("form");

    var button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Invio";

    //Switch case per gestire le varie opzioni
    switch (opzione){

        //Creazione di un form per aggiungere uno studente
        case "setStudente":
            var nome = document.createElement("input");
            nome.type = "text";
            nome.id = "nome";
            nome.placeholder = "Nome";
            nome.required = true;
            form.appendChild(nome);

            var cognome = document.createElement("input");
            cognome.type = "text";
            cognome.id = "cognome";
            cognome.placeholder = "Cognome"
            cognome.required = true;
            form.appendChild(cognome);

            form.appendChild(button);

            document.getElementById('result').appendChild(form);

            button.addEventListener("click", function(){
                registro.setStudente(
                    document.getElementById("nome").value,
                    document.getElementById("cognome").value);
                    saveToLocalStorage();
            });
            break;

        //Creazione di un form per aggiungere un voto ad uno studente
        case "aggiungiVotoAStudente":
            var nome = document.createElement("input");
            nome.type = "text";
            nome.id = "nome";
            nome.placeholder = "Nome";
            nome.required = true;
            form.appendChild(nome);

            var cognome = document.createElement("input");
            cognome.type = "text";
            cognome.id = "cognome";
            cognome.placeholder = "Cognome"
            cognome.required = true;
            form.appendChild(cognome);

            var voto = document.createElement("input");
            voto.type = "number";
            voto.id = "voto";
            voto.placeholder = "Voto";
            voto.required = true;
            form.appendChild(voto);

            var data = document.createElement("input");
            data.type = "date";
            data.id = "data";
            data.required = true;
            form.appendChild(data);

            form.appendChild(button);

            document.getElementById('result').appendChild(form);

            button.addEventListener("click", function(){
                registro.aggiungiVotoAStudente(
                    document.getElementById("nome").value,
                    document.getElementById("cognome").value,
                    document.getElementById("voto").value,
                    document.getElementById("data").value);
                saveToLocalStorage();
            });
                break;

        //Creazione di un form per modificare uno studente
        case "modifyStudente":
            var nome = document.createElement("input");
            nome.type = "text";
            nome.id = "nome";
            nome.placeholder = "Nome";
            nome.required = true;
            form.appendChild(nome);

            var cognome = document.createElement("input");
            cognome.type = "text";
            cognome.id = "cognome";
            cognome.placeholder = "Cognome"
            cognome.required = true;
            form.appendChild(cognome);

            var nomeNuovo = document.createElement("input");
            nomeNuovo.type = "text";
            nomeNuovo.id = "nomeNuovo";
            nomeNuovo.placeholder = "Nome nuovo";
            nomeNuovo.required = true;
            form.appendChild(nomeNuovo);

            var cognomeNuovo = document.createElement("input");
            cognomeNuovo.type = "text";
            cognomeNuovo.id = "cognomeNuovo";
            cognomeNuovo.placeholder = "Cognome nuovo"
            cognomeNuovo.required = true;
            form.appendChild(cognomeNuovo);
            
            form.appendChild(button);

            document.getElementById('result').appendChild(form);

            button.addEventListener("click", function(){
                registro.modifyStudente(
                    document.getElementById("nome").value,
                    document.getElementById("cognome").value,
                    document.getElementById("nomeNuovo").value,
                    document.getElementById("cognomeNuovo").value);
                saveToLocalStorage();
            });
            break;

        //Creazione di un form per eliminare uno studente
        case "deleteStudente":
            var nome = document.createElement("input");
            nome.type = "text";
            nome.id = "nome";
            nome.placeholder = "Nome";
            nome.required = true;
            form.appendChild(nome);

            var cognome = document.createElement("input");
            cognome.type = "text";
            cognome.id = "cognome";
            cognome.placeholder = "Cognome"
            cognome.required = true;
            form.appendChild(cognome);

            form.appendChild(button)

            document.getElementById('result').appendChild(form);

            button.addEventListener("click", function(){
                registro.deleteStudente(
                    document.getElementById("nome").value,
                    document.getElementById("cognome").value);
                saveToLocalStorage()
            });
            break;

        //Creazione di una tabella per mandare a video tutti gli studenti con gli eventuali voti.
        case "getStudente":
            function tabellaStudenti() {
                const arrayStudenti = registro.getStudente();
                var classeVoto;

                if (arrayStudenti.length === 0) {
                    return "<p>Nessuno studente trovato.</p>";
                }

                let tabellaHTML = '<table id="tableStudenti"><thead><tr><th>Nome</th><th>Cognome</th><th>Voti</th></tr></thead><tbody>';

                arrayStudenti.forEach(studente => {
                    tabellaHTML += '<tr>';
                    tabellaHTML += `<td>${studente.nome}</td>`;
                    tabellaHTML += `<td>${studente.cognome}</td>`;

                    if (studente.voti.length > 0) {
                        const voti = studente.voti.map(voti => {

                            if(voti.voto >= 6){
                                classeVoto = "voto-verde";
                            }

                            else{
                                classeVoto = "voto-rosso";
                            }

                            return `<li class="${classeVoto}">${voti.voto} (${voti.data})</li>`;
                        }).join('');
                        tabellaHTML += `<td><ul>${voti}</ul></td>`;
                    }

                    else {
                        tabellaHTML += '<td>Nessun voto</td>';
                    }
                    tabellaHTML += '</tr>';
                });
                tabellaHTML += '</tbody></table>';
                return tabellaHTML;
            }
            document.getElementById('result').innerHTML = tabellaStudenti();
            break;

        default:
            console.log("Errore, caso non gestito.");
            break;
    }
});
//Fine funzioni JavaScript per interagire con l'utente