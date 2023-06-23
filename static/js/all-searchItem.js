$(document).ready(function() {
  attachSubmitHandler('#search_form', '/search');
  attachSubmitHandler('#search_Inventory_form', '/search_Inventory');
  attachSubmitHandler('#search_damage_form', '/search_damage');

  attachButtonClickHandler('.but_s_o1 button', 'load_sreach_options');
  attachButtonClickHandler('.but_s_o2 button', 'load_sreach_inventory_options');
  attachButtonClickHandler('.but_s_o3 button', 'load_sreach_damage_options');
});

function attachSubmitHandler(formSelector, url) {
  $(formSelector).submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();

    $.ajax({
      url: url,
      method: 'GET',
      data: formData,
      success: function(response) {
        $('.content_result').html(response);
        saveLastRequest(url, 'GET', formData);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
}

function attachButtonClickHandler(buttonSelector, operation) {
  $(buttonSelector).click(function(event) {
    event.preventDefault();
    var searchIndex = $(this).data('search-option');
    var user = $(this).data('user');
    load_search_options(searchIndex, user, operation);
  });
}

function load_search_options(searchIndex, user, operation) {
  $.ajax({
    url: '/load_sreach_options',
    type: 'POST',
    data: { searchIndex: searchIndex, user: user, operation: operation },
    success: function(response) {
      $('.content').html(response);
    },
    error: function(error) {
      console.log('Ajax request error:', error);
    }
  });
}

function saveLastRequest(url, method, params) {
  var request = {
    url: url,
    method: method,
    params: params
  };
  sessionStorage.setItem('lastRequest', JSON.stringify(request));
}