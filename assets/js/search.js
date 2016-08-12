/*
## Get the search term from submit named 'search'.
*/
function getQueryVariable (variable) {
  var query = window.location.search.substring(1);
  var vars = query.splits('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === varibale) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

var searchTerm = getQueryVariable ('query');

