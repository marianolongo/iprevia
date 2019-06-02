function loginForInscription() {
    let url = "http://localhost:8081/oauth/token";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = 'grant_type=password&username='+username+'&password='+password;
    const clientId = "clientId";
    const clientSecret = "clientSecret";
    const authorizationBasic = window.btoa(clientId + ':' + clientSecret);
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send(data);
    request.onload = () => {
        let aux = JSON.parse(request.response).access_token;
        if(aux !== undefined){
            window.sessionStorage.token = aux;
        }
        else{
            document.getElementById("message").innerText = "Nombre usuario o contraseña incorrecta";
            return 0;
        }
        const id = getQueryVariable("id");
        url = "http://localhost:8080/events/" + id + "/getHost";
        request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
        request.setRequestHeader('Accept', 'application/json');
        request.send();
        request.onload = () => {
            if(request.status === 200){
                if(JSON.parse(request.response).name === document.getElementById("username").value){
                    location.replace("http://localhost:63342/iprevia/webApp/inscription.html?" +
                        "username=" + getQueryVariable("username")
                        + "&id=" + id);
                }else {
                    document.getElementById("message").innerText = "Este usuario no es el creador del evento";
                }
            }
        };
    };

}
function login() {
    if(getQueryVariable("username") && getQueryVariable("id")){
        return loginForInscription();
    }
    const url = "http://localhost:8081/oauth/token";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = 'grant_type=password&username='+username+'&password='+password;
    const clientId = "clientId";
    const clientSecret = "clientSecret";
    const authorizationBasic = window.btoa(clientId + ':' + clientSecret);
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send(data);
    request.onload = () => {
        let aux = JSON.parse(request.response).access_token;
        if(aux !== undefined){
            window.sessionStorage.token = aux;
            location.replace("home.html");
            }
        else{
            document.getElementById("message").innerText = "Nombre usuario o contraseña incorrecta";
        }
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



function checkHost(id){
    const url = "http://localhost:8080/events/" + id + "/getHost";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onload = () => {

    };
}