

$(document).ready(function() {
    // 保存上一次请求信息到sessionStorage
    function saveLastRequest(url, method, params) {
      var request = {
        url: url,
        method: method,
        params: params
      };
      sessionStorage.setItem('lastRequest', JSON.stringify(request));
    }
});


  $('#search_form').submit(function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = $(this).serialize(); // 获取表单数据

    $.ajax({
      url: '/search',
      method: 'GET',
      data: formData,

      success: function(response) {
        $('.content_result').html(response); // 将搜索结果显示在页面上
        saveLastRequest('/search', 'GET', formData);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });


  $('#search_Inventory_form').submit(function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = $(this).serialize(); // 获取表单数据

    $.ajax({
      url: '/search_Inventory',
      method: 'GET',
      data: formData,

      success: function(response) {
        $('.content_result').html(response); // 将搜索结果显示在页面上
        saveLastRequest('/search_Inventory', 'GET', formData);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
  $('#search_damage_form').submit(function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var formData = $(this).serialize(); // 获取表单数据

    $.ajax({
      url: '/search_damage',
      method: 'GET',
      data: formData,

      success: function(response) {
        $('.content_result').html(response); // 将搜索结果显示在页面上
        saveLastRequest('/search_damage', 'GET', formData);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });


  $('.but_s_o1 button').click(function(event) {
    event.preventDefault(); // 阻止默认的链接行为

    var searchIndex = $(this).data('search-option');
    var user = $(this).data('user');
    load_sreach_options(searchIndex,user);
  });


  $('.but_s_o2 button').click(function(event) {
    event.preventDefault(); // 阻止默认的链接行为

    var searchIndex = $(this).data('search-option');
    var user = $(this).data('user');
    load_sreach_inventory_options(searchIndex,user);
  });
function load_sreach_options(searchIndex,user) {
  $.ajax({
      url: '/load_sreach_options',
      type: 'POST',
      data: { searchIndex: searchIndex, user: user ,operation:"load_sreach_options"},
      success: function(response) {
          // 保存成功的处理逻辑
          $('.content').html(response);
      },
      error: function(error) {
          console.log('Ajax request error:', error);
      }
  });
  }
  function load_sreach_inventory_options(searchIndex,user) {
  $.ajax({
      url: '/load_sreach_options',
      type: 'POST',
      data: { searchIndex: searchIndex, user: user ,operation:"load_sreach_inventory_options"},
      success: function(response) {
          // 保存成功的处理逻辑
          $('.content').html(response);
      },
      error: function(error) {
          console.log('Ajax request error:', error);
      }
  });
  }
  $('.but_s_o3 button').click(function(event) {
    event.preventDefault(); // 阻止默认的链接行为

    var searchIndex = $(this).data('search-option');
    var user = $(this).data('user');
    load_sreach_damage_options(searchIndex,user);
  });

  function load_sreach_damage_options(searchIndex,user) {
  $.ajax({
      url: '/load_sreach_options',
      type: 'POST',
      data: { searchIndex: searchIndex, user: user ,operation:"load_sreach_damage_options"},
      success: function(response) {
          // 保存成功的处理逻辑
          $('.content').html(response);
      },
      error: function(error) {
          console.log('Ajax request error:', error);
      }
  });
  }

