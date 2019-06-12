
function loadDataAndUser(){
    if(window.sessionStorage.token !== undefined) {
        const url = "http://localhost:8080/getUser";
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            const aux = JSON.parse(request.response);
            document.getElementById("username").innerText = aux.name;
        };


        const name = getQueryVariable(window.location.href);

        const urlUser = "http://localhost:8080/users/userByName/" + name;
        const requestUser = new XMLHttpRequest();
        requestUser.open("GET", urlUser, true);
        requestUser.setRequestHeader('Content-Type', 'application/json');
        requestUser.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        requestUser.setRequestHeader('Accept', 'application/json');
        requestUser.send();
        requestUser.onload = () => {
            const user = JSON.parse(requestUser.response);
            console.log(request.response);
            document.getElementById("user-name").innerText = user.name;
            document.getElementById("user-email").innerText = user.email;
            const aux = document.getElementById("rating").innerText;
            if(user.ratingAmount === 0){
                document.getElementById("rating").innerText = "Calificacion: " + 0 +aux;
            }else{
                document.getElementById("rating").innerText = "Calificacion: " + user.rating / user.ratingAmount + aux;
            }
        };

        const url2 = "http://localhost:8080/events/fromUser/" + name;
        const request2 = new XMLHttpRequest();
        request2.open("GET", url2, true);
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request2.setRequestHeader('Accept', 'application/json');
        request2.send();
        request2.onload = () => {
            const header = document.getElementById("header");
            header.innerText = "Eventos Creados";
            const htmlList = document.getElementById("publicEvents");
            while(htmlList.firstChild){
                htmlList.removeChild(htmlList.firstChild)
            }
            const eventList = JSON.parse(request2.response);
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
                    const eventId = eventList[i].id;
                    card.onclick = () => sendToEventPage(eventId);
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
        };
    }else{
        location.replace("index.html")
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