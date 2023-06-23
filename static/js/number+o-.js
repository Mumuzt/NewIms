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

// 加减数量
function increaseQuantity(itemId,nowNumber) {
    $.ajax({
        url: '/update_quantity',
        type: 'POST',
        data: { id: itemId, action: 'increase' ,item_number: nowNumber},
        success: function(response) {
            // 更新数量字段的显示值
            $('.quantity-' + itemId).val(response.quantity);
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 加减数量
function decreaseQuantity(itemId,nowNumber) {
    $.ajax({
        url: '/update_quantity',
        type: 'POST',
        data: { id: itemId, action: 'decrease' ,item_number: nowNumber},
        success: function(response) {
            // 更新数量字段的显示值
            $('.quantity-' + itemId).val(response.quantity);
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 保存数量
function updateQuantity(itemId, inputElement) {
    var newValue = inputElement.value; // 获取新的数值
    $('.quantity-' + itemId).val(newValue);
}
// 更新数量
function updateQuantity_cancel(itemId, inputElement) {
    var newValue = inputElement.value; // 获取新的数值
    $('.quantity-' + itemId+'-cancel').val(newValue);
    // 其他逻辑...
}

// 删除物品
function delete_Item(itemId,username,item) {
    $.ajax({
        url: '/delete_Item',
        type: 'POST',
        data: { id: itemId,user:username,item:item},
        success: function() {
            // 保存成功的处理逻辑
            alert("删除物品成功");
            callLastRequest();
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 保存出入库数量
function saveNumber(itemId, value, username,item) {
    $.ajax({
        url: '/save_number_and_log',
        type: 'POST',
        data: { id: itemId, value: value ,user:username,item:item,operation:"save_number"},
        success: function() {
            // 保存成功的处理逻辑
            console.log('Number saved successfully.');
            alert("修改成功");
            callLastRequest();
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 保存盘点数量
function saveInventoryNumber(itemId, value, username,item) {
    $.ajax({
        url: '/save_number_and_log',
        type: 'POST',
        data: { id: itemId, value: value ,user:username,item:item,operation:"save_Inventory_number"},
        success: function() {
            // 保存成功的处理逻辑
            console.log('Number saved successfully.');
            alert("修改成功");
            callLastRequest();
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 保存报废数量
function saveDamageNumber(itemId, value, username,item) {
    $.ajax({
        url: '/save_number_and_log',
        type: 'POST',
        data: { id: itemId, value: value ,user:username,item:item,operation:"save_Damage_Number"},
        success: function() {
            // 保存成功的处理逻辑
            console.log('Number saved successfully.');
            alert("修改成功");
            callLastRequest();
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
// 保存注销数量
function cancel_DamageNumber(itemId, value, username,item) {
    $.ajax({
        url: '/cancel_DamageNumber',
        type: 'POST',
        data: { id: itemId, value: value ,user:username,item:item},
        success: function() {
            // 保存成功的处理逻辑
            alert("修改成功");
            callLastRequest();
        },
        error: function(error) {
            console.log('Ajax request error:', error);
        }
    });
}
