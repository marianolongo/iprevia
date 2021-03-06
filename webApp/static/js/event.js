
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
            let userAux = JSON.parse(request.response);
            document.getElementById("username").innerText = userAux.name;
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
            let eventAux = JSON.parse(request2.response);
            document.getElementById("nombre-evento").innerText = "" + eventAux.name;
            document.getElementById("descripcion-evento").innerText =eventAux.description;
            document.getElementById("creador-evento").innerText = "Host: " + eventAux.host.name;
            if (eventAux.private === true){
                document.getElementById("ifPrivate").innerText = "Evento privado";
            }
            else { document.getElementById("ifPrivate").innerText = "Evento publico";}
            document.getElementById("fecha-hora").innerText = eventAux.date.substr(0,10) +" a las " + eventAux.date.substr(11,5);
            if (document.getElementById("nuevo-nombre-evento") !== null) {
                document.getElementById("nuevo-nombre-evento").value = eventAux.name;
                document.getElementById("nueva-descripcion-evento").value = eventAux.description;
                document.getElementById("new-date").value = eventAux.date.substr(0, 10);
                document.getElementById("new-timeInput").value = eventAux.date.substr(11, 8);
            }
            if (eventAux.private === true){
                document.getElementById("new-privateEvent").checked = true;
            }
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
                if (document.getElementById("edit-button-holder") !== null) {
                    const editButtonHolder = document.getElementById("edit-button-holder");

                    const editButton = document.createElement("button");
                    editButton.innerText = "Editar Evento";
                    editButton.className = "btn btn-danger";
                    editButton.dataset.toggle = "collapse";
                    editButton.dataset.target = "#collapseExample";

                    editButtonHolder.appendChild(editButton);
                }
                const dropdown = document.getElementById("dropdown");
                if (dropdown !== null) {
                    while (dropdown.firstChild) {
                        dropdown.removeChild(dropdown.firstChild);
                    }
                }
            }else {

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
            header.innerText = "Lista de Invitados";
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

            const url5 = "http://localhost:8080/questions/" + id + "/getAllQuestionsFromEvent";
            const request5 = new XMLHttpRequest();
            request5.open("GET", url5, true);
            request5.setRequestHeader('Content-Type', 'application/json');
            request5.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
            request5.setRequestHeader('Accept', 'application/json');
            request5.send();
            request5.onload = () => {
                const questionList = JSON.parse(request5.response);
                const forum = document.getElementById("forum");
                for (let i = 0; i < questionList.length; i++){
                    const question = questionList[i];
                    const aux = document.createElement("li");
                    aux.className = "commentList mt-2";

                    const commentText = document.createElement("div");
                    commentText.className = "commentText";
                    const author = document.createElement("a");
                    author.className = "sub-text";
                    author.innerText = question.author;
                    author.onclick = () => sendToUserPage(question.author);

                    const date = document.createElement("p");
                    date.innerText = timeago.format(question.date, 'en_US', new Date());
                    date.className = "commentDate";
                    const p = document.createElement("p");
                    p.innerText = question.description;

                    commentText.appendChild(author);
                    commentText.appendChild(p);
                    commentText.appendChild(date);

                    const commenterImage = document.createElement('div');
                    commenterImage.className = 'commenterImage';
                    const img = document.createElement("img");
                    img.id = question.author + "-" + "image";
                    img.setAttribute('src', 'static/images/profile-img.jpg');

                    commenterImage.appendChild(img);
                    aux.appendChild(commenterImage);
                    aux.appendChild(commentText);
                    forum.appendChild(aux);
                }
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
            document.getElementById("assistMessage").innerText = request.response;
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
    const id = getQueryVariable(window.location.href);

    const name = document.getElementById("nuevo-nombre-evento").value;
    const description = document.getElementById("nueva-descripcion-evento").value;
    const isPrivate = document.getElementById("new-privateEvent").checked;
    const date = document.getElementById("new-date").value;
    const time =  document.getElementById("new-timeInput").value;
    const dateAndTime = date + "T" + time + ".000Z";
    const event = JSON.stringify({"name": name, "description": description, "date": dateAndTime, "isPrivate": isPrivate === true});

    const url2 = "http://localhost:8080/events/" + id;
    const request2 = new XMLHttpRequest();
    request2.open('PUT', url2, true);
    request2.setRequestHeader('Content-Type', 'application/json');
    request2.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request2.setRequestHeader('Accept', 'application/json');
    request2.send(event);
    location.reload();
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


function _getAllComments() {

    const url5 = "http://localhost:8080/questions/" + id + "/getAllQuestionsFromEvent";
    const request5 = new XMLHttpRequest();
    request5.open("GET", url5, true);
    request5.setRequestHeader('Content-Type', 'application/json');
    request5.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request5.setRequestHeader('Accept', 'application/json');
    request5.send();
    request5.onload = () => {
        const questionList = JSON.parse(request5.response);
        const forum = document.getElementById("forum");
        for (let i = 0; i < questionList.length; i++){
            const question = questionList[i];
            const aux = document.createElement("li");
            aux.className = "commentList";

            const commentText = document.createElement("div");
            commentText.className = "commentText color-white";
            const author = document.createElement("a");
            author.className = "sub-text";
            author.innerText = question.author;
            author.onclick = () => sendToUserPage(question.author);
            const p = document.createElement("p");
            p.innerText = question.description;

            commentText.appendChild(p);
            commentText.appendChild(author);

            aux.appendChild(commentText);
            forum.appendChild(aux);
        }
    }
}
function addComment(e) {
    e.preventDefault();
    const id = getQueryVariable();
    const url = "http://localhost:8080/questions/" + id + "/addQuestion";
    const input = document.getElementById("commentInput").value
    const comment = JSON.stringify({description: input});
    const request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send(comment);

    location.reload();
}