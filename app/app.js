require('bootstrap');

(($) => {
  $( document ).ready(function() {
    function disableButtonAndShowLoader(buttonId, loaderId) {
      $(buttonId).addClass('disabled');
      $(buttonId).attr('disabled', 'disabled');
      $(loaderId).show();
    };

    $('#login-button').click(() => {
      disableButtonAndShowLoader('#login-button', '#login-button-loader');
    });

    $('#sync-history-button').click(() => {
      disableButtonAndShowLoader('#sync-history-button', '#sync-history-loader');

      function recursiveSyncHistory(offset) {
        return $.ajax({
          url: `/api/history-sync?limit=50&offset=${offset}`
        })
        .then(results => {
          if(results.history && results.history.length === 50) {
            return recursiveSyncHistory(offset + 50);
          }
          alert('Finished syncing data, press ok to reload the page.');
          return location.reload();
        });
      }

      return recursiveSyncHistory(0);
    });

    window.initMap = function() {
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
          return;
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
  });
})(jQuery);
