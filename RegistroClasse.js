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

    listaStudente(){
        return this.studenti.map(studente => {
            return { nome: studente.nome, cognome: studente.cognome, voti: studente.voti, data: studente.data };
        });
    }    

    getStudente(){
        const stringaStudenti = this.listaStudente();
        return JSON.stringify(stringaStudenti, null, 2);
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

var registro = new RegistroClasse();

function saveToLocalStorage(){
    localStorage.setItem('registro', JSON.stringify(registro));
}

function loadFromLocalStorage() {
    const storedRegistro = localStorage.getItem('registro');
    registro = RegistroClasse.createFromLocalStorage(JSON.parse(storedRegistro));
}

loadFromLocalStorage();
document.getElementById("option-selector").addEventListener("change", function(){
    const opzione = document.getElementById("option-selector").value;

    var form = document.createElement("form");

    var button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Invio";

    switch (opzione){

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

        case "getStudente":
            var lista = document.createElement("p");
            var studentiString = registro.getStudente();
            
            if (studentiString && studentiString.trim() !== "") {
                lista.textContent = studentiString;
            } else {
                lista.textContent = "Nessun studente trovato.";
            }
        
            document.getElementById('result').appendChild(lista);
            break;

        default:
            console.log("Errore, caso non gestito.");
            break;
    }
});

