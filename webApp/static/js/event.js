
function loadDataAndEvent() {
    if(window.sessionStorage.token !== undefined){
        let url = "http://localhost:8080/getUser";
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            let aux = JSON.parse(request.response);
            document.getElementById("username").innerText = aux.name;
        };

        const id = getQueryVariable(window.location.href);

        url = "http://localhost:8080/events/" + id;
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            let aux = JSON.parse(request.response);
            document.getElementById("nombre-evento").innerText = "Nombre del evento: " + aux.name;
            document.getElementById("descripcion-evento").innerText = "Descripcion: " + aux.description;
        };

        url = "http://localhost:8080/events/" + id + "/checkDidFinished";
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            if(request.response === "true"){
                const buttonHolder = document.getElementById("button-holder");
                const button = document.createElement("button");
                button.className = "btn btn-danger";
                button.innerText = "Votar";
                button.onclick = () => handleVote();
                buttonHolder.appendChild(button);
            }
        };

        url = "http://localhost:8080/users/getAllUsersFrom/" + id;
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
                    cardBody.appendChild(title);
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
        }
    }else{
        location.replace("login.html");
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