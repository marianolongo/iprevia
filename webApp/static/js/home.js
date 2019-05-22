
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
    let eventList;
    request.onload = () => {
        const htmlList = document.getElementById("events");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        eventList = JSON.parse(request.response);
        for (let i = 0; i < eventList.length; i++) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = eventList[i].name;
            li.appendChild(p);
            htmlList.appendChild(li);
        }
    };
    return eventList;
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
    let userList;
    request.onload = () => {
        const htmlList = document.getElementById("evento");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        userList = JSON.parse(request.response);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = userList.name;
        a.href = "event.html";
        li.appendChild(a);
        htmlList.appendChild(li);
    };
    return userList;
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


function signOut() {
    const url = "http://localhost:8081/oauth/remove-token";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = () => {
        location.replace("index.html");
        sessionStorage.removeItem("token");
    }
}

function loadData() {
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
}

function handleSearch(e){
    e.preventDefault();
    let userList;
    let eventList;
    const inputText = document.getElementById("searchBar").value;
    const url = "http://localhost:8080/users/containing/" + inputText;
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("searchResults");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        userList = JSON.parse(request.response);
        for (let i = 0; i < userList.length; i++){
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = userList[i].name;
            a.href = "user.html";
            li.appendChild(a);
            htmlList.appendChild(li);
        }
    };

    const urlEvent = "http://localhost:8080/events/containing/" + inputText;
    const requestEvent = new XMLHttpRequest();
    requestEvent.open("GET", urlEvent, true);
    requestEvent.setRequestHeader('Content-Type', 'application/json');
    requestEvent.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvent.setRequestHeader('Accept', 'application/json');
    requestEvent.send();
    requestEvent.onload = () => {
        const htmlList = document.getElementById("searchResults");
        eventList = JSON.parse(requestEvent.response);
        for (let i = 0; i < eventList.length; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = eventList[i].name;
        a.href = "event.html";
        li.appendChild(a);
        htmlList.appendChild(li);

        }

    };
}