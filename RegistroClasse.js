class Studente{
    constructor(nome, cognome){
        this.nome = nome;
        this.cognome = cognome;
        this.voti = [];
    }

    setVoto(voto ,data){
        this.voti.push({voto, data});
        console.log("Voto aggiunto con successo");
    }
}

class RegistroClasse{
    constructor(){
        this.studenti = [];
    }

    setStudente(nome, cognome){
        const nuovoStudente = new Studente(nome, cognome);
        this.studenti.push(nuovoStudente);
        console.log("Studente aggiunto con successo");
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
            console.log("Studente modificato con successo");
        }
    }

    deleteStudente(nome, cognome){
        const delStudente = this.studenti.findIndex(studente => studente.nome === nome && studente.cognome === cognome);
        if (delStudente != -1){
            this.studenti.splice(delStudente, 1);
            console.log("Utente rimosso con successo");
        }
    }

    aggiungiVotoAStudente(nome, cognome, voto, data) {
        const studente = this.studenti.find(
          (stud) => stud.nome === nome && stud.cognome === cognome
        );

        if (studente) {
          studente.setVoto(voto, data);
          console.log("Studente trovato.")
        }
    }
}

const readline = require('readline');
const registro = new RegistroClasse();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function gestioneSwitch(){
    rl.question("\n1)Aggiungi studente\n2)Aggiungi voto\n3)Modifica studente\n4)Elimina utente\n5)Lista degli studenti\n0)Esci\nChe operazione vuoi svolgere?: ", (r) =>{

    switch(r){
        case "1":
            rl.question("\nDigita il nome dello studente: ", (nome) =>{
                rl.question("\nDigita il cognome dello studente: ", (cognome)=>{
                    registro.setStudente(nome, cognome);
                    gestioneSwitch()
                });
            });
            break;
        
        case "2":
            rl.question("\nDigita il nome dello studente: ", (nome) =>{
                rl.question("\nDigita il cognome dello studente: ", (cognome)=>{
                    rl.question("\nDigita il voto da aggiungere: ", (voto) =>{
                        rl.question("\nDigita la data del voto: ", (data)=>{
                            registro.aggiungiVotoAStudente(nome, cognome, voto, data);
                            gestioneSwitch()
                        })
                    })
                });
            });
            break;

        case "3":
            rl.question("\nDigita il nome dello studente: ", (nome) =>{
                rl.question("\nDigita il cognome dello studente: ", (cognome)=>{
                    rl.question("\nDigita il nuovo nome dello studente: ", (nuovoNome) =>{
                        rl.question("\nDigita il nuovo cognome dello studente: ", (nuovoCognome)=>{
                            registro.modifyStudente(nome, cognome, nuovoNome, nuovoCognome);
                            gestioneSwitch()
                        });
                    });
                });
            });
            break;

        case "4":
            rl.question("\nDigita il nome dello studente: ", (nome) =>{
                rl.question("\nDigita il cognome dello studente: ", (cognome)=>{
                    registro.deleteStudente(nome, cognome);
                    gestioneSwitch()
                });
            });
            break;

        case "5":
            console.log("Registro studenti: " + registro.getStudente());
            gestioneSwitch();
            break;

        case "0":
            rl.close();
            break;

        default:
            console.log("Errore, caso non gestito.");
            gestioneSwitch();
            break;
    }
    })
}

gestioneSwitch();
