//Add listener
var weather_api = "https://api.weather.gov";
var forecast_main = document.getElementById('forecast_main')

getWeather(39.9133, -77.9562)

function initMap() {
  //39.9133,-77.9562
  var myLatlng = {lat: 39.9133, lng: -77.9562};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatlng
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    visible: true,
  });

  map.addListener('dblclick', function(e) {
    marker.setPosition(e.latLng);
    marker.visible = true;
    getWeather(e.latLng.lat(), e.latLng.lng())
  });
}

function getWeather(lat, lng) {
  weather_points_promise = getWeatherPoints(lat, lng)
  weather_stations_promise = getStations(lat, lng)
  weather_points_promise.then(function (res) {
    console.log(res)
    //console.log(res.data.properties.cwa)
    //console.log(res.data.properties.forecast)
    forecast_main.innerHTML = res.data.properties.cwa + '<br>' + res.data.properties.relativeLocation.properties.city + ', ' + res.data.properties.relativeLocation.properties.state + '<br><br>'
  })
  weather_stations_promise.then(function (res){
    console.log(res)
  })
}

function getWeatherPoints(lat, lng){
  return axios.get(weather_api + '/points/' + lat + ',' + lng, "", "")
};

function getStations(lat, lng){
  return axios.get(weather_api + '/points/' + lat + ',' + lng + '/stations', "", "")
}
