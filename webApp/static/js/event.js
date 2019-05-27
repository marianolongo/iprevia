
function loadDataAndEvent() {
    const today = new Date();
    const url = "http://localhost:8080/getUser";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        let aux = JSON.parse(request.response);
        document.getElementById("user_elem username").innerText = aux.name;
    };

    const id = getQueryVariable(window.location.href);

    const urlEvent = "http://localhost:8080/events/" + id;
    const requestEvent = new XMLHttpRequest();
    requestEvent.open("GET", urlEvent, true);
    requestEvent.setRequestHeader('Content-Type', 'application/json');
    requestEvent.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvent.setRequestHeader('Accept', 'application/json');
    requestEvent.send();
    requestEvent.onload = () => {
        let aux = JSON.parse(requestEvent.response);
        document.getElementById("nombre-evento").innerText = "Nombre del evento: " + aux.name;
        document.getElementById("descripcion-evento").innerText = "Descripcion: " + aux.description;
    };

    const urlEventFinished = "http://localhost:8080/events/" + id + "/checkDidFinished";
    const requestEventFinished = new XMLHttpRequest();
    requestEventFinished.open("GET", urlEventFinished, true);
    requestEventFinished.setRequestHeader('Content-Type', 'application/json');
    requestEventFinished.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEventFinished.setRequestHeader('Accept', 'application/json');
    requestEventFinished.send();
    requestEventFinished.onload = () => {
        if(requestEventFinished.response === "true"){
            const buttonHolder = document.getElementById("button-holder");
            const button = document.createElement("button");
            button.className = "btn btn-danger";
            button.innerText = "Votar";
            button.onclick = () => handleVote();
            buttonHolder.appendChild(button);
        }
    }
}
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        return pair[1];
    }
    return (false);
}


function handleAssist(){

    const id = getQueryVariable();
    const url = "http://localhost:8080/events/" + id + "/addGuest";
    const request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        if(request.status === 200){
            alert("Agregado")
        }
    }
}


function handleVote(){

    const id = getQueryVariable();
    const url = "http://localhost:8080/events/" + id + "/addVote";
    const request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        console.log(request.response);
        if(request.response === "true"){
            alert("Votacion enviada")
        }else{
            document.getElementById("warning-add-vote").innerText = "Usuario ya voto o no fue invitado"
        }
    }
}