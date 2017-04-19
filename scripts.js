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

  map.addListener('mouseup', function(e) {
    marker.setPosition(e.latLng);
    marker.visible = true;
    getWeather(e.latLng.lat(), e.latLng.lng())
  });
}

function getWeather(lat, lng) {
  weather_points_promise = getWeatherPoints(lat, lng)
  weather_points_promise.then(function (res) {
    console.log(res)
    forecast_main.innerHTML = res.data.properties.cwa
  })
}

function getWeatherPoints(lat, lng){
  return axios.get(weather_api + '/points/' + lat + ',' + lng, "", "")
};
