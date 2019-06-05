
let id;
let guestName;

function handleClickViaMail() {
    const url = "http://localhost:8080/events/addUserViaConfirmation/" + id + "/" + guestName;
    const request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        if(request.status === 200){
            sendToHomePage();
        }
    };
}

function getEventAndGuest() {
    id = getQueryVariable("id");
    guestName = getQueryVariable("username");
    document.getElementById("guestName").innerText = guestName;

    const url = "http://localhost:8080/events/" + id;
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const aux = JSON.parse(request.response);
        document.getElementById("event").innerText = aux.name;
    }
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}

function handleInscriptionClick() {
    sendToUserPage(guestName);
}