
function loadDataAndEvents(){

    const urlUser = "http://localhost:8080/getUser";
    const requestUser = new XMLHttpRequest();
    requestUser.open("GET", urlUser, true);
    requestUser.setRequestHeader('Content-Type', 'application/json');
    requestUser.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    requestUser.setRequestHeader('Accept', 'application/json');
    requestUser.send();
    requestUser.onload = () => {
        let aux = JSON.parse(requestUser.response);
        document.getElementById("user_elem username").innerText = aux.name;
    };

    const url = "http://localhost:8080/events/fromUser";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {
        const htmlList = document.getElementById("events-from-user");

        const col = document.createElement("div");
        col.className = "col-md-12";
        const eventList = JSON.parse(request.response);
        for (let i = 0; i < eventList.length; i++) {
            const a = document.createElement("a");
            const div = document.createElement("div");
            div.className = "row w-100 customHeight customCenter";
            a.innerText = eventList[i].name;
            a.className = "btn w-100";
            div.appendChild(a);
            col.appendChild(div);
        }
        htmlList.appendChild(col);
    }
}