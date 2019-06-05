function crearEvento(){
    const url = "http://localhost:8080/events";
    const name = document.getElementById("nombre-evento").value;
    const description = document.getElementById("descripcion-evento").value;
    const isPrivate = document.getElementById("privateEvent").checked;
    const date = document.getElementById("date").value;
    const time =  document.getElementById("timeInput").value;
    const dateAndTime = date + "T" + time + ":00.000Z";
    const event = JSON.stringify({"name": name, "description": description, "date": dateAndTime, "isPrivate": isPrivate === true});
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send(event);
    location.replace("home.html")
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
    }else{
        location.replace("index.html");
        document.getElementById("message").innerText = "Se necesita hacer login para ver esa pagina";
    }
}
