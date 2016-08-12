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

/*
## Peform the search
*/

if (searchTerm) {
  document.getElementById('search-box').setAttribute("value", searchTerm);

  // Initalize lunr with the fields it will be searching on. I've given title
  // a bost of 10 to indeicate matches on this field are more important.

  var idex_item = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('author');
    this.field('category');
    this.field('content');
  });

  for (var key in window.store) {
    idex_item.add({
      'id': key,
      'title': window.store[key].title,
      'author': window.store[key].author,
      'category': window.store[key].category,
      'content': window.store[key].content
    });

  var results = idex_item.search (searchTerm);
  displaySearchResults (results, window.store);
  }
}

