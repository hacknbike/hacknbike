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
    //"Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    //"Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    //"Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    //"Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 12);

// die Implementierung der Karte startet hier
//Adventmaerkte hinzugefügt
const adv = ' https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:ADVENTMARKTOGD&srsName=EPSG:4326&outputFormat=json';

function makeMarker(feature, latlng) {
    const advIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/adventmarktogd.png', //anderer Marker
        iconSize: [16, 16]
    });
    const advMarker = L.marker(latlng, {
        icon: advIcon
    });
    advMarker.bindPopup(`
        <h3>${feature.properties.BEZEICHNUNG}</h3>
        <p>Adresse: ${feature.properties.ADRESSE}</p>
        <p>Geöffnet von-bis: ${feature.properties.DATUM}</p>
        <p>Öffnungszeiten: ${feature.properties.OEFFNUNGSZEIT}</p>
        <hr>
        <footer><a target="blank" href="${feature.properties.WEBLINK1}">Weblink</a></footer>
        `); //Name, Beschreibung, Weblink (neuer Tab)
    return advMarker;
}

async function loadSights(adv) {
    const clusterGruppe = L.markerClusterGroup();
    const response = await fetch(adv);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        pointToLayer: makeMarker
    });

    //Clustergruppe
    clusterGruppe.addLayer(geoJson);
    karte.addLayer(clusterGruppe);
    layerControl.addOverlay(clusterGruppe, "Weihnachtsmärkte und Silvesterstände");

    //Suchfeld einfügen
    const suchFeld = new L.Control.Search({
        layer: clusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false,
    });
    karte.addControl(suchFeld);
}

loadSights(adv);

//Maßstab einfügen
const scale = L.control.scale({
    imperial: false,
    metric: true

});
karte.addControl(scale);


//Silvesterpfad hinzufügen
const wege = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SILVESPFADLINOGD&srsName=EPSG:4326&outputFormat=json';

function linienPopup(feature, layer) { //Wege Popup (nur Name möglich)
    const popup = `
        <h3>Silvesterpfad</h3>
        <hr>
        <footer><a target="blank" href="${feature.properties.WEBLINK1}">Weblink</a></footer>
        `;
    layer.bindPopup(popup);
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
        onEachFeature: linienPopup
    });

    karte.addLayer(wegeJson);
    layerControl.addOverlay(wegeJson, "Silvesterpfad");
}
loadWege(wege);


//Museen und Sammlungen Standorte einfügen

const museen = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:MUSEUMOGD&srsName=EPSG:4326&outputFormat=json';
function makemuseen(feature, latlng) {
    const museenIcon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/museum.png', //anderer Marker
        iconSize: [16, 16]
    });
    const museenMarker = L.marker(latlng, {
        icon: museenIcon
    });
    museenMarker.bindPopup(`
    <h3>${feature.properties.NAME}</h3>
    <p>Bezirk: ${feature.properties.BEZIRK}</p>
    <p>Adresse: ${feature.properties.ADRESSE}</p>
    
    <hr>
    <footer><a target="blank" href="${feature.properties.WEITERE_INF}">Weblink</a></footer>
    `);
    return museenMarker;
}

async function loadmuseen(museen) {
    const clusterGruppemuseen = L.markerClusterGroup();
    const responsemuseen = await fetch(museen);
    const museenData = await responsemuseen.json();
    const geoJson = L.geoJson(museenData, {
        pointToLayer: makemuseen
    });

    //Clustergruppe
    clusterGruppemuseen.addLayer(geoJson);
    karte.addLayer(clusterGruppemuseen);
    layerControl.addOverlay(clusterGruppemuseen, "Museen und Sammlungen");
}

//Suchfeld Wifi
    // const suchFeldwifi = new L.Control.Search({
    //     layer: clusterGruppewifi,
    //     propertyName: "NAME",
    //     zoom: 17,
    //     initial: false,
    // });
    // karte.addControl(suchFeldwifi);


loadmuseen(museen);


