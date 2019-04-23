
const validateSession = () => {
    const url = "http://localhost:8080/users/validate";
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
    request.onerror = () => {
        location.replace("login.html")
    }
};