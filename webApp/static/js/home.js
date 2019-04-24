

function getUsers(){
    const url = "http://localhost:8080/users";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("users");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const userList = JSON.parse(request.response);
        for (let i = 0; i < userList.length; i++) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = userList[i].name;
            li.appendChild(p);
            htmlList.appendChild(li);
        }
    }
}


function getEvents() {
    const url = "http://localhost:8080/events";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("events");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        for (let i = 0; i < eventList.length; i++) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = eventList[i].name;
            li.appendChild(p);
            htmlList.appendChild(li);
        }
    }
}

function crearEvento(){
    const url = "http://localhost:8080/events";
    const name = document.getElementById("nombre-evento").value;
    const description = document.getElementById("descripcion-evento").value;
    const event = JSON.stringify({"name": name, "description": description});
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send(event);
}


function showEventsFromUser(){
    const url = "http://localhost:8080/events/fromUser";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("events-from-user");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        for (let i = 0; i < eventList.length; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = eventList[i].name;
            li.appendChild(a);
            htmlList.appendChild(li);
        }
    }
}

function buscarEvento() {
    const name = document.getElementById("evento-buscado").value;
    const url = "http://localhost:8080/events/" + name;
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("evento");
        htmlList.innerHTML = request.responseText;
    }
}

function buscarUsuario() {
    const name = document.getElementById("usuario-buscado").value;
    const url = "http://localhost:8080/users/" + name;
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("usuario");
        htmlList.innerHTML = request.responseText;
    }
}
