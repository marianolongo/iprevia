
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
            document.getElementById("user_elem username").innerText = aux.name;
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
        };
    }else{
        location.replace("login.html")
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