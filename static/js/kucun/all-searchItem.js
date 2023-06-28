


$(document).ready(function () {
  // 当点击任何按钮时
  $('.btn-secondary').on('click', function () {
    // 如果点击的是“全部”按钮
    if ($(this).attr('data-product-name') === '全部' || $(this).attr('data-location-name') === '全部') {
      // 取消其他按钮的选中状态
      $(this).siblings().removeClass('btn-custom-selected');
      // 选中全部按钮
      $(this).addClass('btn-custom-selected');
    } else {
      // 如果当前按钮已经选中，那么取消选中，否则选中当前按钮
      $(this).toggleClass('btn-custom-selected');
      // 取消全部按钮的选中状态
      $(this).siblings('[data-product-name="全部"], [data-location-name="全部"]').removeClass('btn-custom-selected');
    }

    // 根据按钮的父容器调用相应的搜索函数
    if ($(this).parents('#productNamesContainer, #locationNamesContainer').length) {
      performSearch();
    } else if ($(this).parents('#productNamesContainer-Inventory, #locationNamesContainer-Inventory').length) {
      performSearch1();
    } else if ($(this).parents('#productNamesContainer-damage, #locationNamesContainer-damage').length) {
      performSearch2();
    }
  });
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


function updateUIWithResults(response) {
    $('.content_result').html(response);
}
function performSearch() {
    let selectedData = getSelectedData(['data-product-name', 'data-location-name']);
    $.ajax({
        url: '/search',
        method: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(selectedData),
        success: function (response) {
            saveLastRequest(this.url,this.method,this.data);
            updateUIWithResults(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function performSearch1() {
    let selectedData = getSelectedData(['data-product-name', 'data-location-name']);
    $.ajax({
        url: '/search_Inventory',
        method: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(selectedData),
        success: function (response) {
            saveLastRequest(this.url,this.method,this.data);
            updateUIWithResults(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function performSearch2() {
    let selectedData = getSelectedData(['data-product-name', 'data-location-name']);
    $.ajax({
        url: '/search_damage',
        method: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(selectedData),
        success: function (response) {
            saveLastRequest(this.url,this.method,this.data);
            updateUIWithResults(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getSelectedData(attributeNames) {
  let selectedData = {};
  attributeNames.forEach(attributeName => {
    selectedData[attributeName] = [];
  });

  let buttons = $('.btn-custom-selected');

  buttons.each(function() {
    attributeNames.forEach(attributeName => {
      if ($(this).attr(attributeName)) {
        selectedData[attributeName].push($(this).attr(attributeName));
      }
    });
  });

  return selectedData;
}




function saveLastRequest(url, method, params) {
  var request = {
    url: url,
    method: method,
    params: params
  };
  sessionStorage.setItem('lastRequest', JSON.stringify(request));
}