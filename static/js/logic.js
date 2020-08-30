
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'
  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson

  var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 3,
    
  }); 

var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken:  "pk.eyJ1IjoiZHVyYW5nb2pha2UiLCJhIjoiY2tjaHViaHpxMTNjYjJ5bWt2ZDdyYW1mcCJ9.jrXwho9OElBmiiSlGL5C0w"
}).addTo(myMap)



/*
var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken:  "pk.eyJ1IjoiZHVyYW5nb2pha2UiLCJhIjoiY2tjaHViaHpxMTNjYjJ5bWt2ZDdyYW1mcCJ9.jrXwho9OElBmiiSlGL5C0w"
});



var baseMaps = {
    "Dark": dark,
    "Streets": street
};
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 3,
    layers: [street, dark]
  });


L.control.layers(baseMaps).addTo(myMap);
*/



d3.json(url, function(response) {
    var markers = L.markerClusterGroup();
    var quakes = response.features
    console.log(quakes)
    
    var location = quakes.map(x => x.geometry.coordinates)
    var descriptor = quakes.map(x=> x.properties)
    
    
    
    var color = "";
    var sizer=""
    for (var i = 0; i < location.length; i++) {
        console.log(descriptor[i].mag)
        
        if (descriptor[i].mag > 6) {
            color = "#723122";
            sizer = descriptor[i].mag * 110
        }
        else if (descriptor[i].mag > 5.8) {
            color = "#8B4225";
            sizer = descriptor[i].mag * 80
        }
        else if (descriptor[i].mag > 5.4) {
            color = "#B86B25";
            sizer = descriptor[i].mag * 60
        }
        else if (descriptor[i].mag > 5.0) {
            color = "#A25626";
            sizer = descriptor[i].mag * 40
        }
        else {
            color = "#CA8323";
            sizer = descriptor[i].mag * 35
        }
        

        //markers.addLayer(L.marker([location[i][1], location[i][0]])
        L.circle ([location[i][1], location[i][0]],{
        fillOpacity: .65 ,
        color: color,
        fillColor: color,
        
        radius: sizer * 175
        }).bindPopup(`<h2> Place: ${descriptor[i].place} <br> Mag: ${descriptor[i].mag} <h2>`).addTo(myMap);

    }
    //myMap.addLayer(markers);
    
    
    var heatArray = [];
    
    for (var i = 0; i < location.length; i++) {
    
    
    if (location) {
        heatArray.push([location[i][1], location[i][0]]);
    }
    }
    
    
    
    
      var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
      }).addTo(myMap);
    
    })

    
