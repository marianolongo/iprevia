
function loadDataAndEvent() {
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

        const id = getQueryVariable(window.location.href);

        const url2 = "http://localhost:8080/events/" + id;
        const request2 = new XMLHttpRequest();
        request2.open("GET", url2, true);
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request2.setRequestHeader('Accept', 'application/json');
        request2.send();
        request2.onload = () => {
            let aux = JSON.parse(request2.response);
            document.getElementById("nombre-evento").innerText = aux.name;
            document.getElementById("descripcion-evento").innerText = aux.description;
            document.getElementById("creador-evento").innerText = "Host: " + aux.host.name
        };


        const url3 = "http://localhost:8080/events/" + id + "/checkDidFinished";
        const request3 = new XMLHttpRequest();
        request3.open("GET", url3, true);
        request3.setRequestHeader('Content-Type', 'application/json');
        request3.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request3.setRequestHeader('Accept', 'application/json');
        request3.send();
        request3.onload = () => {
            if(request3.response === "false"){
                const dropdown = document.getElementById("dropdown");
                while (dropdown.firstChild){
                    dropdown.removeChild(dropdown.firstChild);
                }
            }
        };

        const url4 = "http://localhost:8080/users/getAllUsersFrom/" + id;
        const request4 = new XMLHttpRequest();
        request4.open("GET", url4, true);
        request4.setRequestHeader('Content-Type', 'application/json');
        request4.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request4.setRequestHeader('Accept', 'application/json');
        request4.send();
        request4.onload = () => {
            const header = document.getElementById("header");
            header.innerText = "Usuarios";
            const htmlList = document.getElementById("publicEvents");
            while(htmlList.firstChild){
                htmlList.removeChild(htmlList.firstChild)
            }
            const eventList = JSON.parse(request4.response);
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
        location.replace("index.html");
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

// function getHostUserById(id){
//     const url = "http://localhost:8080/users/" + id;
//     const request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
//     request.setRequestHeader('Accept', 'application/json');
//     request.send();
//     return request.response;
// }


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
            alert(request.response)
        }
    }
}


function handleVote(e){
    e.preventDefault();
    const id = getQueryVariable();
    const input = document.getElementById("choice-dropdown").innerText;
    const url = "http://localhost:8080/events/" + id + "/addVote/" + input;
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        console.log(request.response);
        if(request.response === "true"){
            const  choice = document.getElementById("choice-dropdown");
            choice.innerText = "Elegir Opcion";
            alert("Votacion enviada")
        }else{
            document.getElementById("warning-add-vote").innerText = "Usuario ya voto o no fue invitado"
        }
    };
}

function editEvent(){
    const url = "http://localhost:8080/getUser";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        let aux = JSON.parse(request.response);
        const userId = aux.id;
        const id = getQueryVariable(window.location.href);

        const name = document.getElementById("nuevo-nombre-evento").value;
        const description = document.getElementById("nueva-descripcion-evento").value;
        const isPrivate = document.getElementById("new-privateEvent").checked;
        const date = document.getElementById("new-date").value;
        const time =  document.getElementById("new-timeInput").value;
        const dateAndTime = date + "T" + time + ":00.000Z";
        const event = JSON.stringify({"name": name, "description": description, "date": dateAndTime, "isPrivate": isPrivate === true});

        const url2 = "http://localhost:8080/events/" + userId + "/events/" + id;
        const request2 = new XMLHttpRequest();
        request2.open("PUT", url2, true);
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request2.setRequestHeader('Accept', 'application/json');
        request2.send(event);
        location.reload();
    };
}

function toggleFirstChoice() {
    const choice2 = document.getElementById("choice-2");
    choice2.checked = false;
    const choice3 = document.getElementById("choice-3");
    choice3.checked = false;
    const choice4 = document.getElementById("choice-4");
    choice4.checked = false;
    const choice5 = document.getElementById("choice-5");
    choice5.checked = false;

    document.getElementById("choice-dropdown").innerText = "1"
}

function toggleSecondChoice() {
    const choice1 = document.getElementById("choice-1");
    choice1.checked = false;
    const choice3 = document.getElementById("choice-3");
    choice3.checked = false;
    const choice4 = document.getElementById("choice-4");
    choice4.checked = false;
    const choice5 = document.getElementById("choice-5");
    choice5.checked = false;

    document.getElementById("choice-dropdown").innerText = "2"
}

function toggleThirdChoice() {
    const choice2 = document.getElementById("choice-2");
    choice2.checked = false;
    const choice1 = document.getElementById("choice-1");
    choice1.checked = false;
    const choice4 = document.getElementById("choice-4");
    choice4.checked = false;
    const choice5 = document.getElementById("choice-5");
    choice5.checked = false;

    document.getElementById("choice-dropdown").innerText = "3"
}
function toggleFourthChoice() {
    const choice2 = document.getElementById("choice-2");
    choice2.checked = false;
    const choice1 = document.getElementById("choice-1");
    choice1.checked = false;
    const choice3 = document.getElementById("choice-3");
    choice3.checked = false;
    const choice5 = document.getElementById("choice-5");
    choice5.checked = false;

    document.getElementById("choice-dropdown").innerText = "4"
}

function toggleFifthChoice() {
    const choice2 = document.getElementById("choice-2");
    choice2.checked = false;
    const choice1 = document.getElementById("choice-1");
    choice1.checked = false;
    const choice3 = document.getElementById("choice-3");
    choice3.checked = false;
    const choice4 = document.getElementById("choice-4");
    choice4.checked = false;

    document.getElementById("choice-dropdown").innerText = "5"
}