require('bootstrap');

(($) => {
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

    function recursiveGetHistory(offset) {
      return $.ajax({
        url: `/history-sync?limit=50&offset=${offset}`
      })
      .then(results => {
        if(results.history && results.history.length === 50) {
          return recursiveGetHistory(offset + 50);
        }
        alert('Finished syncing data, press ok to reload the page.');
        return location.reload();
      });
    }

    return recursiveGetHistory(0);
  });
})(jQuery);
