let marker = {};
function crearEvento(){
    const url = "http://localhost:8080/events";
    const name = document.getElementById("nombre-evento").value;
    const description = document.getElementById("descripcion-evento").value;
    const isPrivate = document.getElementById("privateEvent").checked;
    const date = document.getElementById("date").value;
    const time =  document.getElementById("timeInput").value;
    const dateAndTime = date + "T" + time + ":00.000Z";
    const latitude = document.getElementById("lat").innerText;
    const longitude = document.getElementById("lng").innerText;
    console.log(latitude);
    console.log(longitude);
    const event = JSON.stringify({"name": name, "description": description, "date": dateAndTime, "isPrivate": isPrivate === true, latitude, longitude});
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
    request.setRequestHeader('Accept', 'application/json');
    request.send(event);
    request.onload = () => {
        let aux = JSON.parse(request.response);
        location.replace("my_event.html?id=" + aux.id);
    }
}

function loadDataAndMap() {
    if(window.sessionStorage.token !== undefined){
        let clicks = 0;
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

        const map = document.getElementById("create-event-map");
        map.style.height = "100%";
        map.style.width = "100%";

        let latitude = -34.45692217151444;
        let longitude = -58.85916642844677;

        const mymap = L.map('create-event-map').setView([latitude, longitude], 11);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaXByZXZpYSIsImEiOiJjanh3Yjc2YzUwN29lM2xuejNkNDF5dGY2In0.a8Vz_n910YlMtq7xx7G3nA'
        }).addTo(mymap);

        let searchControl = L.esri.Geocoding.geosearch().addTo(mymap);

        let results = L.layerGroup().addTo(mymap);

        searchControl.on('results', function(data){
            results.clearLayers();
            for (let i = data.results.length - 1; i >= 0; i--) {}
        });

        mymap.on("click", (e) => {
            if(clicks === 0) {
                marker = L.marker(e.latlng, {draggable: true}).addTo(mymap)
                    .on("dragend", (e) => {
                        const aux = Object.values(e.target._latlng);
                        const lat = document.getElementById("lat");
                        lat.innerText = aux[0];
                        const lng = document.getElementById("lng");
                        lng.innerText = aux[1];
                    });
                const aux = Object.values(e.latlng);
                const lat = document.getElementById("lat");
                lat.innerText = aux[0];
                const lng = document.getElementById("lng");
                lng.innerText = aux[1];
                clicks++;
            }
        })
    }else{
        location.replace("index.html");
        document.getElementById("message").innerText = "Se necesita hacer login para ver esa pagina";
    }
}