
let id;
let guestName;

function handleClickViaMail() {
    const url = "http://localhost:8080/add/" + id + "/" + guestName;
    const request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        if(request.status === 200){
            console.log("Se agrego")
        }
    };
}

function getEventAndGuest(idMail, name) {
    id = idMail;
    guestName = name;
}