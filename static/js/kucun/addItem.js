

$(document).ready(function() {
// 当点击添加现有物品时，显示隐藏的表单并加载物品名称和存放位置下拉栏
  $('#search_old_Item').click(function() {
    Load_item_name();
  });


  // 获取添加新物品内表单内容 然后将其发送进物品 数据库
  $("#add_new_Item").submit(function (event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = {
      'item-name': $('input[name="item-name-add"]').val(),
      'storage-location': $('input[name="storage-location-add"]').val(),
      'quantity': $('input[name="quantity-add"]').val()
    };
    // 将表单数据发送到后台
    add_new_Item(formData);
  });

    // 和上面的代码类似，物品名和存放位置下拉菜单的内容是从数据库中获取的，只写数量，然后将其发送进物品数据库
  $('#add_old_Item').submit(function(event) {
    // 阻止表单提交默认行为
    event.preventDefault();
    // 获取表单数据
    var formData = {
      'item-name': $('select[name="item-name"]').val(),
      'storage-location': $('select[name="storage-location"]').val(),
      'quantity': $('input[name="quantity"]').val()
    };
    // 将表单数据发送到后台
    add_old_Item(formData);
  }
  );
}
);


//保存
function saveLastRequest(url, method, params) {
  var request = {
  url: url,
  method: method,
  params: params
};
  sessionStorage.setItem('lastRequest', JSON.stringify(request));
}
// 载入
function callLastRequest() {
    const lastRequest = sessionStorage.getItem('lastRequest');
    console.log('lastRequest:', lastRequest); // 输出lastRequest的内容
    if (lastRequest) {
        const request = JSON.parse(lastRequest);
        console.log('request:', request); // 输出request的内容

        $.ajax({
            url: request.url,
            type: request.method,
            data: request.params, // 直接使用request.params作为请求数据
            success: response => {
                $('.content').html(response.html_content);
                $('.content_result').html(response.html_result);
            },
            error: error => console.log('Ajax request error:', error)
        });
    }
}
// 显示隐藏的表单
function Load_item_name() {
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
}
function add_new_Item(formData){
      $.ajax({
      url: "/add_newItem", // 替换为实际的后台接口URL
      type: "POST", // 请求类型，根据实际情况选择 GET 或 POST
      data: formData, // 表单数据
      success: function (response) {
        // 请求成功时的处理代码
        console.log(response); // 在控制台打印服务器的响应
        callLastRequest();
        // 可以根据需要进行其他操作
      },
      error: function (error) {
        // 请求失败时的处理代码
        console.log(error); // 在控制台打印错误信息
        // 可以根据需要进行其他操作
        callLastRequest();
      }
    });

}
function add_old_Item(formData){
        $.ajax({
      url: '/add_newItem', // 替换为实际的后台接口URL
      type: 'POST', // 请求类型为POST
      data: formData, // 发送的表单数据
      success: function(response) {
        // 请求成功时的处理代码
        console.log(response); // 在控制台打印服务器的响应
        callLastRequest();
      },
      error: function(error) {
        // 请求失败时的处理代码
        console.log(error);
        callLastRequest();
      }
    });
}