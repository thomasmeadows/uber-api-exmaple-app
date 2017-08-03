module.exports = function() {
  let history = [];

  function recursiveGetHistory(skip) {
    return $.ajax({
      url: `/api/history?skip=${skip}`
    })
    .then(results => {
      history = history.concat(results);
      if(results.length === 50) {
        return recursiveGetHistory(skip + 50);
      }
      return history;
    });
  }

  $('#user-history-loader').show();

  return recursiveGetHistory(0)
  .then(() => {
    if(!history.length) {
      return $('#map').html('<h3><strong>No uber user history found</strong></h3>');
    }

    const mapStartLocation = {
      lat: history[0].start_city.latitude,
      lng: history[0].start_city.longitude
    };
    const markers = [];
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: mapStartLocation
    });
    for (let i = 0; i < history.length; i++) {
      markers.push(new google.maps.Marker({
        position: {
          lat: history[i].start_city.latitude,
          lng: history[i].start_city.longitude
        },
        map: map
      }));
    }
  });
};
