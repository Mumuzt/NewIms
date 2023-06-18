$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = $(this).serialize(); // 获取表单数据

    $.ajax({
      url: '/search_ioku',
      method: 'GET',
      data: formData,
      success: function(response) {
        $('.content_result').html(response); // 将搜索结果显示在页面上
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});