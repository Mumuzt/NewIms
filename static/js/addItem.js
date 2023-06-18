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
        success: function(response) {
          // 在成功回调中处理响应结果
          $('.content_result').html(response);
        },
        error: function(error) {
          console.log('Ajax request error:', error);
        }
      });
    }
  }


function toggleForm() {
  $(".item-form111").toggle();
}

$(".add_new_Item").submit(function(event) {
  event.preventDefault(); // 阻止表单的默认提交行为

  var formData = $(this).serialize(); // 将表单数据序列化为字符串

  $.ajax({
    url: "/add_newItem", // 替换为实际的后台接口URL
    type: "POST", // 请求类型，根据实际情况选择 GET 或 POST
    data: formData, // 表单数据
    success: function(response) {
      // 请求成功时的处理代码
      console.log(response); // 在控制台打印服务器的响应
      alert("添加物品成功:", response)
      callLastRequest();
      // 可以根据需要进行其他操作
    },
    error: function(error) {
      // 请求失败时的处理代码
      console.log(error); // 在控制台打印错误信息
      alert("添加物品失败:", error)
      // 可以根据需要进行其他操作
    }
  });
});