document.getElementById("option-selector").addEventListener("change", function(){
    const opzione = document.getElementById("option-selector").value;
    alert(opzione);
    var form = document.createElement("form");

    switch (opzione){
        case "addStudent":
            var nome = document.createElement("input");
            nome.type = "text";
            nome.id = "nome";
            form.appendChild(nome);

            var cognome = document.createElement("input");
            cognome.type = "text";
            cognome.id = "cognome";
            form.appendChild(cognome);

            document.getElementById('result').appendChild(form);
            break;
        case "addVoto":
            break;
        case "changeStudent":
            break;
        case "deleteStudent":
            break;
        case "listStudent":
            break;
        default:
            alert("Errore, caso non gestito.");
            break;
    }
});

import { RegistroClasse, Studente } from "./registroClasse";