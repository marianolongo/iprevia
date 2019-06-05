
function loadDataForGuest(){
    if(window.sessionStorage.token !== undefined) {
        const url = "http://localhost:8080/events/getPublicEvents";
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            const htmlList = document.getElementById("public-events");
            while (htmlList.firstChild) {
                htmlList.removeChild(htmlList.firstChild)
            }
            const eventList = JSON.parse(request.response);
            console.log(request.response);
            for (let i = 0; i < eventList.length; i++) {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.innerText = eventList[i].name;
                a.href = "event.html";
                a.className = "btn";
                li.appendChild(a);
                htmlList.appendChild(li);
            }
        };
    }else{
        location.replace("index.html")
    }
}

function sendToLogin(){
    location.replace("login.html");
}