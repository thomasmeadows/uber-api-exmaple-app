require('bootstrap');
require('jquery-ui-bundle');

window.initMap = require('./history-map');

(() => {
  $('#dialog').dialog({
    autoOpen: false,
    modal: true,
    dialogClass: 'no-close',
    title: 'sync successful',
    buttons: [
      {
        text: 'Ok',
        class: 'btn btn-success pointer',
        click: function() {
          $(this).dialog('close');
        }
      }
    ]
  });
  $(document).ready(() => {
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
          $('#dialog').on('open', () => {
            $('#dialog.button').addClass('btn');
            location.reload();
          });
          $('#dialog').on('dialogclose', () => {
            location.reload();
          });
          return $('#dialog').dialog('open');
        });
      }

      return recursiveSyncHistory(0);
    });
  });
})();
