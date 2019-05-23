
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

    const urlEvents = "http://localhost:8080/events/afterNow";
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
        for (let i = 0; i < eventList.length; i++){
            const li = document.createElement("li");
            const a = document.createElement("a");
            const name = eventList[i].name;
            a.innerText = name;
            a.className = "btn";
            a.onclick = () => sendToEventPage(name);
            li.appendChild(a);
            htmlList.appendChild(li);
        }
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
        const htmlList = document.getElementById("searchResults");
        eventList = JSON.parse(requestEvent.response);
        for (let i = 0; i < eventList.length; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerText = eventList[i].name;
        a.className = "btn";
        a.onclick = () => sendToEventPage(eventList[i].name);
        li.appendChild(a);
        htmlList.appendChild(li);

        }
    };
}

function sendToUserPage(name){
    location.replace("http://localhost:63342/iprevia/webApp/user.html?name=" + name);
}

function sendToEventPage(name){
    location.replace("http://localhost:63342/iprevia/webApp/event.html?name=" + name);
}