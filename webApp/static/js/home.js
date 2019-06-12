
function getUsers(){
    const url = "http://localhost:8080/users";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Usuarios";
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                const userName = eventList[i].name;
                card.onclick = () => sendToUserPage(userName);
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
                const mail = document.createElement("p");
                mail.innerText = eventList[i].email;
                mail.className = "card-text";
                cardBody.appendChild(title);
                cardBody.appendChild(mail);
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


function getEvents() {
    const url = "http://localhost:8080/events";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Eventos";
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

function getAllEventsAfterNow() {
    const urlEvents = "http://localhost:8080/events/afterNow";
    const requestEvents = new XMLHttpRequest();
    requestEvents.open("GET", urlEvents, true);
    requestEvents.setRequestHeader('Content-Type', 'application/json');
    requestEvents.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvents.setRequestHeader('Accept', 'application/json');
    requestEvents.send();
    requestEvents.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Eventos mas proximos";
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
            while (i < k+4 && i < eventList.length){
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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
            const header = document.getElementById("header");
            header.innerText = "Eventos mas proximos";
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
                    card.className = "card pointer text-center";
                    card.eventId = eventList[i].id;
                    card.onclick = () => sendToEventPage(card.eventId);
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
                    desc.innerText = eventList[i].host.name;
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
        location.replace("index.html");
        document.getElementById("message").innerText = "Se necesita hacer login para ver esa pagina";
    }
}

function searchUsersOrEvents(e) {
    const userFilter = document.getElementById("user-filter").checked;
    const eventFilter = document.getElementById("event-filter").checked;
    if(userFilter){
        return searchUsers(e);
    }
    else if(eventFilter){
        return searchEvents(e)
    }else {
        e.preventDefault();
        console.log("No se selecciono una opcion");
    }
}
function searchUsers(e){
    e.preventDefault();
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
        const header = document.getElementById("header");
        header.innerText = "Usuarios encontrados";
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const userList = JSON.parse(request.response);
        let k = 0;
        while (k < userList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < userList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.userName = userList[i].name;
                card.onclick = () => sendToUserPage(card.userName);
                const img = document.createElement("img");
                img.className = "card-img-top";
                img.src = "static/images/profile-img.jpg";
                img.alt = "Card image cap";
                card.appendChild(img);
                const cardBody = document.createElement("div");
                cardBody.className = "card-body";
                const title = document.createElement("h6");
                title.className = "card-title";
                title.innerText = userList[i].name;
                const mail = document.createElement("p");
                mail.innerText = userList[i].email;
                mail.className = "card-text";
                cardBody.appendChild(title);
                cardBody.appendChild(mail);
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

function searchEvents(e){
    e.preventDefault();
    let eventList;
    const inputText = document.getElementById("searchBar").value;
    const urlEvent = "http://localhost:8080/events/containing/" + inputText;
    const requestEvent = new XMLHttpRequest();
    requestEvent.open("GET", urlEvent, true);
    requestEvent.setRequestHeader('Content-Type', 'application/json');
    requestEvent.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvent.setRequestHeader('Accept', 'application/json');
    requestEvent.send();
    requestEvent.onload = () => {
        const htmlList = document.getElementById("publicEvents");
        const header = document.getElementById("header");
        header.innerText = "Eventos encontrados";
        eventList = JSON.parse(requestEvent.response);
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

// function handleSearch(e){
//     e.preventDefault();
//     let userList;
//     let eventList;
//     const inputText = document.getElementById("searchBar").value;
//     const url = "http://localhost:8080/users/containing/" + inputText;
//     const request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
//     request.setRequestHeader('Accept', 'application/json');
//     request.send();
//     request.onload = () => {
//         const htmlList = document.getElementById("publicEvents");
//         while(htmlList.firstChild){
//             htmlList.removeChild(htmlList.firstChild)
//         }
//         userList = JSON.parse(request.response);
//         for (let i = 0; i < userList.length; i++){
//             const li = document.createElement("li");
//             const a = document.createElement("a");
//             const name = userList[i].name;
//             a.innerText = name;
//             a.className = "btn";
//             a.onclick = () => sendToUserPage(name);
//             li.appendChild(a);
//             htmlList.appendChild(li);
//         }
//     };
//
//     const urlEvent = "http://localhost:8080/events/containing/" + inputText;
//     const requestEvent = new XMLHttpRequest();
//     requestEvent.open("GET", urlEvent, true);
//     requestEvent.setRequestHeader('Content-Type', 'application/json');
//     requestEvent.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
//     requestEvent.setRequestHeader('Accept', 'application/json');
//     requestEvent.send();
//     requestEvent.onload = () => {
//         const htmlList = document.getElementById("publicEvents");
//         eventList = JSON.parse(requestEvent.response);
//         for (let i = 0; i < eventList.length; i++){
//         const li = document.createElement("li");
//         const a = document.createElement("a");
//         a.innerText = eventList[i].name;
//         a.className = "btn";
//         a.onclick = () => sendToEventPage(eventList[i].id);
//         li.appendChild(a);
//         htmlList.appendChild(li);
//         }
//     };
// }

function sendToUserPage(name){
    location.replace("user.html?name=" + name);
}

function sendToEventPage(id){
    location.replace("event.html?id=" + id);
}

function sendToMyEventPage(id){
    location.replace("my_event.html?id=" + id);
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
        const header = document.getElementById("header");
        header.innerText = "Eventos Privados";
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
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

function getAllPublicEvents() {
    const urlEvents = "http://localhost:8080/events/getPublicEvents";
    const requestEvents = new XMLHttpRequest();
    requestEvents.open("GET", urlEvents, true);
    requestEvents.setRequestHeader('Content-Type', 'application/json');
    requestEvents.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvents.setRequestHeader('Accept', 'application/json');
    requestEvents.send();
    requestEvents.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Eventos Publicos";
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
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

function getAllPastEvents() {
    const urlEvents = "http://localhost:8080/events/getPastEvents";
    const requestEvents = new XMLHttpRequest();
    requestEvents.open("GET", urlEvents, true);
    requestEvents.setRequestHeader('Content-Type', 'application/json');
    requestEvents.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestEvents.setRequestHeader('Accept', 'application/json');
    requestEvents.send();
    requestEvents.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Eventos Pasados";
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
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

function getMyEvents(){
    const url = "http://localhost:8080/events/fromUser";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Mis Eventos";
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToMyEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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

function toggleUserFilter() {
    const event = document.getElementById("event-filter");
    event.checked = false;
    document.getElementById("search-dropdown").innerText = "Usuario"
}

function toggleEventFilter() {
    const user = document.getElementById("user-filter");
    user.checked = false;
    document.getElementById("search-dropdown").innerText = "Evento"
}

function getMostVotedUsers() {
    const url = "http://localhost:8080/users/getAllOrderedByRating";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Usuarios mas votados";
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                const userName = eventList[i].name;
                card.onclick = () => sendToUserPage(userName);
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
                const mail = document.createElement("p");
                mail.innerText = eventList[i].email;
                mail.className = "card-text";
                cardBody.appendChild(title);
                cardBody.appendChild(mail);
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

function getAllEventsAssisted() {
    const url = "http://localhost:8080/events/getAllEventsIfUserIsGuest";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const header = document.getElementById("header");
        header.innerText = "Eventos asistidos";
        const htmlList = document.getElementById("publicEvents");
        while(htmlList.firstChild){
            htmlList.removeChild(htmlList.firstChild)
        }
        const eventList = JSON.parse(request.response);
        let k = 0;
        while (k < eventList.length) {
            const row = document.createElement("div");
            row.className = "row";
            let i = k;
            while (i < k + 4 && i < eventList.length) {
                const col = document.createElement("div");
                col.className = "col-md-3";
                const card = document.createElement("div");
                card.className = "card pointer text-center";
                card.eventId = eventList[i].id;
                card.onclick = () => sendToEventPage(card.eventId);
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
                desc.innerText = eventList[i].host.name;
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