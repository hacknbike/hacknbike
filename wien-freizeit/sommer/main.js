/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
   // "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    //"Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    //"Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    //"Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.geolandbasemap.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 11);

// die Implementierung der Karte startet hier



//Maßstab einfügen
const scale = L.control.scale({
    imperial: false,
    metric: true

});
karte.addControl(scale);




// Burgen und Schlösser
const url = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BURGSCHLOSSOGD&srsName=EPSG:4326&outputFormat=json';

function makeMarker(feature, latlng) {
    const fotoIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/burgschlossogdsichtbar.svg', //anderer Marker
        iconSize: [16, 16]
    });
    const sightMarker = L.marker(latlng, {
        icon: fotoIcon
    });
    sightMarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.BESCHREIBUNG}</p>
        `); //Name, Beschreibung, Weblink (neuer Tab)
    return sightMarker;
}

async function loadSights(url) {
    const clusterGruppe = L.markerClusterGroup();
    const response = await fetch(url);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        pointToLayer: makeMarker
    });

    //Clustergruppe
    clusterGruppe.addLayer(geoJson);
    karte.addLayer(clusterGruppe);
    layerControl.addOverlay(clusterGruppe, "Burgen und Schlösser");

    //Suchfeld einfügen
    const suchFeld = new L.Control.Search({
        layer: clusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false,
    });
    karte.addControl(suchFeld);
}

loadSights(url);

// Badestellen
const baden = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BADESTELLENOGD&srsName=EPSG:4326&outputFormat=json';

function makeBadenMarker(feature, latlng) {
    const fotoBadenIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/badestelle.svg', //anderer Marker
        iconSize: [16, 16]
    });
    const badenMarker = L.marker(latlng, {
        icon: fotoBadenIcon
    });
    badenMarker.bindPopup(`
        <h3>${feature.properties.BEZEICHNUNG}</h3>
        <hr>
        <footer><a target="blank" href="${feature.properties.WEITERE_INFO}">Weblink Wasserqualität</a></footer>
        `); //Name, Beschreibung, Weblink (neuer Tab)
    return badenMarker;
}


async function loadBaden(baden) {
    const clusterBadenGruppe = L.markerClusterGroup();
    const badenresponse = await fetch(baden);
    const badenData = await badenresponse.json();
    const geoJson = L.geoJson(badenData, {
        pointToLayer: makeBadenMarker
    });

    //Clustergruppe
    clusterBadenGruppe.addLayer(geoJson);
    karte.addLayer(clusterBadenGruppe);
    layerControl.addOverlay(clusterBadenGruppe, "Badestellen");
}

loadBaden(baden);


// Schwimmbäder
const schwimmen = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SCHWIMMBADOGD&srsName=EPSG:4326&outputFormat=json';

function makeSchwimmen(feature, latlng) {
    const schwimmenIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/schwimmbad.svg', //anderer Marker
        iconSize: [16, 16]
    });
    const schwimmenMarker = L.marker(latlng, {
        icon: schwimmenIcon
    });
    schwimmenMarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.ADRESSE}</p>
        <hr>
        <footer><a target="blank" href="${feature.properties.WEBLINK1}">Weblink</a></footer> 
        `); //Name, Beschreibung, Weblink (neuer Tab)
    return schwimmenMarker;
}

async function loadSchwimmen(schwimmen) {
    const clusterGruppeSchwimmen = L.markerClusterGroup();
    const responseSchwimmen = await fetch(schwimmen);
    const schwimmenData = await responseSchwimmen.json();
    const geoJson = L.geoJson(schwimmenData, {
        pointToLayer: makeSchwimmen
    });

    //Clustergruppe
    clusterGruppeSchwimmen.addLayer(geoJson);
    karte.addLayer(clusterGruppeSchwimmen);
    layerControl.addOverlay(clusterGruppeSchwimmen, "Schwimmbäder");
}

loadSchwimmen(schwimmen);


//Wanderwege hinzufügen
const wege = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WANDERWEGEOGD&srsName=EPSG:4326&outputFormat=json';

function wandernPopup(feature, layer) { 
    const popup = `
        <a target="blank" href="${feature.properties.URL_INFO}">Weblink</a>
        `;
    layer.bindPopup(popup);
    console.log("test");
}

async function loadWege(wegeURL) {
    const antwort = await fetch(wegeURL);
    const wegeData = await antwort.json();
    const wegeJson = L.geoJson(wegeData, {
        style: function () { //Farbe der Wege
            return {
                color: "yellow"
            };
        },
        onEachFeature: wandernPopup
    });

    karte.addLayer(wegeJson);
    layerControl.addOverlay(wegeJson, "Stadtwanderwege");
}
loadWege(wege);



//Themenradwege hinzufügen
const routen = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:THEMENRADWEGOGD&srsName=EPSG:4326&outputFormat=json';

function linienPopup(feature, layer) { 
    const popup = `
        <h3>${feature.properties.BEZEICHNUNG}</h3>
        `;
    layer.bindPopup(popup);
}

async function loadRouten(routenURL) {
    const antwort = await fetch(routenURL);
    const routenData = await antwort.json();
    const routenJson = L.geoJson(routenData, {
        style: function () { //Farbe der Fahrradrouten
            return {
                color: "blue"
            };
        },
        onEachFeature: linienPopup
    });

    karte.addLayer(routenJson);
    layerControl.addOverlay(routenJson, "Themenradwege");
}
loadRouten(routen);


//WLAN Standorte einfügen

// const wifi = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json';

// function makeWifi(feature, latlng) {
//     const wifiIcon = L.icon({
//         iconUrl: 'http://www.data.wien.gv.at/icons/wlanwienatogd.svg', //anderer Marker
//         iconSize: [16, 16]
//     });
//     const wifiMarker = L.marker(latlng, {
//         icon: wifiIcon
//     });
//     wifiMarker.bindPopup(`
//         <h3>${feature.properties.NAME}</h3>
//         <p>${feature.properties.ADRESSE}</p>        
//         `); //Name, Beschreibung, ohne Weblink (neuer Tab)
//     return wifiMarker;
// }

// async function loadWifi(wifi) {
//     const clusterGruppewifi = L.markerClusterGroup();
//     const responsewifi = await fetch(wifi);
//     const wifiData = await responsewifi.json();
//     const geoJson = L.geoJson(wifiData, {
//         pointToLayer: makeWifi
//     });

//     //Clustergruppe
//     clusterGruppewifi.addLayer(geoJson);
//     karte.addLayer(clusterGruppewifi);
//     layerControl.addOverlay(clusterGruppewifi, "WLAN-Standorte");
// }


// loadWifi(wifi);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        //.setContent("You clicked the map at " + e.latlng.toString())  //this.getLatLng() don't work
        .setContent("Sonnenuntergang um " + L.sun.sunset(e.latlng)) //this.getLatLng() don't work
        .openOn(karte);
}
karte.on('click', onMapClick);

function Tipp() {
    alert("Bei einem Klick in die Karte wird Ihnen die Uhrzeit des heutigen Sonnenuntergangs am jeweiligen Ort angezeitg.");
  }
