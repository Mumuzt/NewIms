$(document).ready(function() {
  $(document).on('click', '.del-btn', function() {
    var userId = $(this).data('id');
    if (confirm('确定要删除用户吗？')) {
          $.ajax({
      url: '/delete_user',
      method: 'POST',
      data: { 'userId': userId },
      success: function(response) {
        // 删除成功后，刷新页面
        alert("删除成功！");
        window.location.reload();
      },
      error: function(error) {
        console.log(error);
      }
    });
    }else {
      return false;
    }

    }
    );
  $(document).on('click', '.edit-btn', function() {
    var userId = $(this).data('id');
    $.ajax({
      url: '/get_user',
      method: 'POST',
      data: { 'userId': userId },
      success: function(response) {
        var editFormHtml = `
        <tr class="user-${userId}">
          <td>
            <form class="edit-user-form">
              <input type="hidden" name="id" id="user-id-${userId}" value="${response.userId}">
              <input type="text" name="username" id="username-field-${userId}" value="${response.username}">
              <input type="text" name="password" id="password-field-${userId}" value="${response.password}">
              <input type="text" name="permission" id="permission-field-${userId}" value="${response.permission}">
              <button type="submit">保存</button>
            </form>
          </td>
        </tr>
      `;

        // 将编辑表单替换掉原来的<tr>元素
        $('.user-' + userId).replaceWith(editFormHtml);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $(document).on("submit", ".edit-user-form", function(event) {
  event.preventDefault();  // 阻止表单的默认提交行为
  var currentUserId = $(this).find("input[name='id']").val();
  // 获取表单数据
  var formData = {
    id: currentUserId,
    username: $('#username-field-' + currentUserId).val(),
    password: $('#password-field-' + currentUserId).val(),
    permission: $('#permission-field-' + currentUserId).val()
  };
  // 发送AJAX请求到Flask后端
  $.ajax({
    type: "POST",
    url: "/edit_user",  // 替换为您的Flask路由
    data: {
      'id': formData.id,
      'username': formData.username,
      'password': formData.password,
      'permission': formData.permission
    },
    success: function (response) {
      // 处理服务器返回的响应
      console.log(response);
      alert("修改成功！");
      // 刷新当前页面
        window.location.reload();
    },
    error: function (err) {
      // 处理错误情况
      console.error("Error:", err);
    }
  });
});
});