


function login() {
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
    console.log("Data " + data);
    request.onload = () => {
        console.log("Response " + request.response);
        window.sessionStorage.token = JSON.parse(request.response).access_token;
        location.replace("home.html");
    }
}
