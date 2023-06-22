$(document).ready(function() {


    // 为添加物品表单的提交按钮绑定事件处理函数
  $('#search_old_Item').click(function() {
    $.ajax({
      url: '/search_old_Item', // 替换为实际的后台接口URL
      type: 'GET', // 请求类型，根据实际情况选择 GET 或 POST
      success: function(response) {
        // 请求成功时的处理代码
        var itemNames = response.ItemName;
        var locations = response.Location;
        var itemNameSelect = $('select[name="item-name"]');
        itemNameSelect.empty();
        $.each(itemNames, function(index, itemName) {
          itemNameSelect.append('<option value="' + itemName + '">' + itemName + '</option>');
        });
        // 将返回的Location添加到下拉菜单中
        var locationSelect = $('select[name="storage-location"]');
        locationSelect.empty();
        $.each(locations, function(index, location) {
          locationSelect.append('<option value="' + location + '">' + location + '</option>');
        });
        $(".item-form222").toggle();
      },
      error: function(error) {
        // 请求失败时的处理代码
        console.log(error);
      }
    });
  });

    // 为添加物品表单的提交按钮绑定事件处理函数
  $("#add_new_Item").submit(function (event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = {
      'item-name': $('input[name="item-name-add"]').val(),
      'storage-location': $('input[name="storage-location-add"]').val(),
      'quantity': $('input[name="quantity-add"]').val()
    };
    $.ajax({
      url: "/add_newItem", // 替换为实际的后台接口URL
      type: "POST", // 请求类型，根据实际情况选择 GET 或 POST
      data: formData, // 表单数据
      success: function (response) {
        // 请求成功时的处理代码
        console.log(response); // 在控制台打印服务器的响应
        alert("添加物品成功:", response)
        callLastRequest();
        // 可以根据需要进行其他操作
      },
      error: function (error) {
        // 请求失败时的处理代码
        console.log(error); // 在控制台打印错误信息
        alert("添加物品失败:", error)
        // 可以根据需要进行其他操作
      }
    });
  });

    // 为添加物品表单的提交按钮绑定事件处理函数
  $('#add_old_Item').submit(function(event) {
    // 阻止表单提交默认行为
    event.preventDefault();
    // 获取表单数据
    var formData = {
      'item-name': $('select[name="item-name"]').val(),
      'storage-location': $('select[name="storage-location"]').val(),
      'quantity': $('input[name="quantity"]').val()
    };
    // 发送异步POST请求
    $.ajax({
      url: '/add_newItem', // 替换为实际的后台接口URL
      type: 'POST', // 请求类型为POST
      data: formData, // 发送的表单数据
      success: function(response) {
        // 请求成功时的处理代码
        console.log(response); // 在控制台打印服务器的响应
        alert("添加物品成功:", response)
        callLastRequest();
      },
      error: function(error) {
        // 请求失败时的处理代码
        console.log(error);
      }
    });
  }

  );
});


  //保存+载入
  function saveLastRequest(url, method, params) {
    var request = {
    url: url,
    method: method,
    params: params
  };
    sessionStorage.setItem('lastRequest', JSON.stringify(request));
  }
  function callLastRequest() {
    var lastRequest = sessionStorage.getItem('lastRequest');
    if (lastRequest) {
      var request = JSON.parse(lastRequest);
      $.ajax({
        url: request.url,
        method: request.method,
        data: request.params,
        success: function (response) {
          // 在成功回调中处理响应结果
          $('.content_result').html(response);
        },
        error: function (error) {
          console.log('Ajax request error:', error);
        }
      });
    }
  }
  function toggleForm1() {
    $(".item-form111").toggle();
  }
