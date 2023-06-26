$(document).ready(function() {
  $('#productNamesContainer button').on('click', function() {
        const productName = $(this).data('product-name');
        $(this).toggleClass('btn-custom-selected');
        // Perform an action with the product name, e.g., make an AJAX request or update the UI
    });

  // Handle location name button click
    $('#locationNamesContainer button').on('click', function() {
        const locationName = $(this).data('location-name');
        $(this).toggleClass('btn-custom-selected');
        // Perform an action with the location name, e.g., make an AJAX request or update the UI
    });

  attachSubmitHandler('#productNamesContainer', '/search', 'data-product-name');





  attachSubmitHandler('#search_Inventory_form', '/search_Inventory');
  attachSubmitHandler('#search_damage_form', '/search_damage');

  attachButtonClickHandler('.but_s_o1 button', 'load_sreach_options');
  attachButtonClickHandler('.but_s_o2 button', 'load_sreach_inventory_options');
  attachButtonClickHandler('.but_s_o3 button', 'load_sreach_damage_options');
});
function show1() {
  $.ajax({
    url: '/search_Location',
    type: 'GET',
    // 将"B1"传递到后台
    data: { options:"B1"},
    success: function (response) {
      console.log("AJAX success");
      console.log("Response:", response);

      var tableHtml =
        "<table><thead><tr><th>物品名</th><th>存放位置</th><th>数量</th></tr></thead><tbody>";
      for (var i = 0; i < response.length; i++) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + response[i][1] + "</td>"; // 物品名
        tableHtml += "<td>" + response[i][2] + "</td>"; // 存放位置
        tableHtml += "<td>" + response[i][3] + "</td>"; // 数量
        tableHtml += "</tr>";
      }
      tableHtml += "</tbody></table>";

      console.log("Generated table HTML:");
      console.log(tableHtml);

      $(".bottom_result_show").html(tableHtml);
      console.log("Table HTML added to .bottom_result_show");
    }
  })
}
function show2(){
  $.ajax({
    url: '/search_Location',
    type: 'GET',
    // 将"B1"传递到后台
    data: { options:"6A"},
    success: function (response) {
      console.log("AJAX success");
      console.log("Response:", response);

      var tableHtml =
        "<table><thead><tr><th>物品名</th><th>存放位置</th><th>数量</th></tr></thead><tbody>";
      for (var i = 0; i < response.length; i++) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + response[i][1] + "</td>"; // 物品名
        tableHtml += "<td>" + response[i][2] + "</td>"; // 存放位置
        tableHtml += "<td>" + response[i][3] + "</td>"; // 数量
        tableHtml += "</tr>";
      }
      tableHtml += "</tbody></table>";

      console.log("Generated table HTML:");
      console.log(tableHtml);

      $(".bottom_result_show").html(tableHtml);
      console.log("Table HTML added to .bottom_result_show");
    }
  })

}
function show3(){
  $.ajax({
    url: '/search_Location',
    type: 'GET',
    // 将"B1"传递到后台
    data: { options:"2A"},
    success: function (response) {
      console.log("AJAX success");
      console.log("Response:", response);

      var tableHtml =
        "<table><thead><tr><th>物品名</th><th>存放位置</th><th>数量</th></tr></thead><tbody>";
      for (var i = 0; i < response.length; i++) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + response[i][1] + "</td>"; // 物品名
        tableHtml += "<td>" + response[i][2] + "</td>"; // 存放位置
        tableHtml += "<td>" + response[i][3] + "</td>"; // 数量
        tableHtml += "</tr>";
      }
      tableHtml += "</tbody></table>";

      console.log("Generated table HTML:");
      console.log(tableHtml);

      $(".bottom_result_show").html(tableHtml);
      console.log("Table HTML added to .bottom_result_show");
    }
  })

}


function attachSubmitHandler(containerSelector, url, word) {
  $(containerSelector).on('click', '.btn-custom-selected', function () {
    let selectedProducts = getSelectedProducts(word);
    $.ajax({
      url: url,
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify({ selected_products: selectedProducts }),
      success: function (response) {
        // 清理上一次的搜索结果
        $('.content_result').html(response);
        saveLastRequest(url, 'GET', searchTerm);
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
}
function getSelectedProducts(attributeName) {
  let selectedProducts = [];
  let buttons = $('.btn-custom-selected');

  buttons.each(function() {
    selectedProducts.push($(this).attr(attributeName));
  });

  return selectedProducts;
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