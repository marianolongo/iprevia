
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
    if(window.sessionStorage.token !== undefined){
        const url = "http://localhost:8080/getUser";
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            let aux = JSON.parse(request.response);
            document.getElementById("username").innerText = aux.name;
        };

        const urlEvents = "http://localhost:8080/events/afterNow";
        const requestEvents = new XMLHttpRequest();
        requestEvents.open("GET", urlEvents, true);
        requestEvents.setRequestHeader('Content-Type', 'application/json');
        requestEvents.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        requestEvents.setRequestHeader('Accept', 'application/json');
        requestEvents.send();
        requestEvents.onload = () => {
            const htmlList = document.getElementById("publicEvents");
            const eventList = JSON.parse(requestEvents.response);
            let k = 0;
            while (k < eventList.length) {
                const row = document.createElement("div");
                row.className = "row";
                let i = k;
                while (i < k+4 && i < eventList.length){
                    const col = document.createElement("div");
                    col.className = "col-md-3";
                    const card = document.createElement("div");
                    card.className = "card pointer";
                    card.onclick = () => sendToEventPage(eventList[i].id);
                    const img = document.createElement("img");
                    img.className = "card-img-top";
                    img.src = "static/images/profile-img.jpg";
                    img.alt = "Card image cap";
                    card.appendChild(img);
                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";
                    const title = document.createElement("h6");
                    title.className = "card-title";
                    title.innerText = eventList[i].name;
                    const desc = document.createElement("p");
                    desc.innerText = eventList[i].description;
                    desc.className = "card-text";
                    cardBody.appendChild(title);
                    cardBody.appendChild(desc);
                    card.appendChild(cardBody);
                    col.appendChild(card);
                    row.appendChild(col);
                    i = i + 1;
                }
                htmlList.appendChild(row);
                const br = document.createElement("br");
                htmlList.appendChild(br);
                k = k+4;
            }
        };
    }else{
        location.replace("login.html");
        document.getElementById("message").innerText = "Se necesita hacer login para ver esa pagina";
    }
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
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        userList = JSON.parse(request.response);
        for (let i = 0; i < userList.length; i++){
            const li = document.createElement("li");
            const a = document.createElement("a");
            const name = userList[i].name;
            a.innerText = name;
            a.className = "btn";
            a.onclick = () => sendToUserPage(name);
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
        const htmlList = document.getElementById("publicEvents");
        eventList = JSON.parse(requestEvent.response);
        for (let i = 0; i < eventList.length; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = eventList[i].name;
        a.className = "btn";
        a.onclick = () => sendToEventPage(eventList[i].id);
        li.appendChild(a);
        htmlList.appendChild(li);
        }
    };
}

function sendToUserPage(name){
    location.replace("http://localhost:63342/iprevia/webApp/user.html?name=" + name);
}

function sendToEventPage(id){
    location.replace("http://localhost:63342/iprevia/webApp/event.html?id=" + id);
}


function sendToHomePage(){
    location.replace("home.html")
}

function getAllPrivateEvents() {
    const urlEvents = "http://localhost:8080/events/getPrivateEvents";
    const requestEvents = new XMLHttpRequest();
    requestEvents.open("GET", urlEvents, true);
    requestEvents.setRequestHeader('Content-Type', 'application/json');
    requestEvents.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvents.setRequestHeader('Accept', 'application/json');
    requestEvents.send();
    requestEvents.onload = () => {
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(requestEvents.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card";
                const img = document.createElement("img");
                img.className = "card-img-top";
                img.src = "static/images/profile-img.jpg";
                img.alt = "Card image cap";
                card.appendChild(img);
                const cardBody = document.createElement("div");
                cardBody.className = "card-body";
                const title = document.createElement("h6");
                title.className = "card-title";
                title.innerText = eventList[i].name;
                const desc = document.createElement("p");
                desc.innerText = eventList[i].description;
                desc.className = "card-text";
                cardBody.appendChild(title);
                cardBody.appendChild(desc);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
                i = i + 1;
            }
            htmlList.appendChild(row);
            const br = document.createElement("br");
            htmlList.appendChild(br);
            k = k + 4;
        }
    };
}

function crearEvento(){
    const url = "http://localhost:8080/events";
    const name = document.getElementById("nombre-evento").value;
    const description = document.getElementById("descripcion-evento").value;
    const isPrivate = document.getElementById("privateEvent").checked;
    const date = document.getElementById("date").value;
    const event = JSON.stringify({"name": name, "description": description, "date": date, "isPrivate": isPrivate === true});
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send(event);
    alert("Evento Creado");
    location.replace("template.html")
}