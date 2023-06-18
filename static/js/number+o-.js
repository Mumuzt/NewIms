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

        function updateQuantity(itemId, inputElement) {
            var newValue = inputElement.value; // 获取新的数值
            $('.quantity-' + itemId).val(newValue);
            // 其他逻辑...
        }
        function updateQuantity_cancel(itemId, inputElement) {
            var newValue = inputElement.value; // 获取新的数值
            $('.quantity-' + itemId+'-cancel').val(newValue);
            // 其他逻辑...
        }
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
        function delete_Item(itemId,username,item) {
            $.ajax({
                url: '/delete_Item',
                type: 'POST',
                data: { id: itemId,user:username,item:item},
                success: function(response) {
                    // 保存成功的处理逻辑
                    alert("删除物品成功");
                    callLastRequest();
                },
                error: function(error) {
                    console.log('Ajax request error:', error);
                }
            });
        }
        function refreshPage() {
            setTimeout(function() {
                location.reload();
            }, 500); // 延迟500毫秒后刷新页面
        }
        function saveNumber(itemId, value, username,item) {
            $.ajax({
                url: '/save_number_and_log',
                type: 'POST',
                data: { id: itemId, value: value ,user:username,item:item,operation:"save_number"},
                success: function(response) {
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
        function saveInventoryNumber(itemId, value, username,item) {
            $.ajax({
                url: '/save_number_and_log',
                type: 'POST',
                data: { id: itemId, value: value ,user:username,item:item,operation:"save_Inventory_number"},
                success: function(response) {
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
        function saveDamageNumber(itemId, value, username,item) {
            $.ajax({
                url: '/save_number_and_log',
                type: 'POST',
                data: { id: itemId, value: value ,user:username,item:item,operation:"save_Damage_Number"},
                success: function(response) {
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
        function cancel_DamageNumber(itemId, value, username,item) {
            $.ajax({
                url: '/cancel_DamageNumber',
                type: 'POST',
                data: { id: itemId, value: value ,user:username,item:item},
                success: function(response) {
                    // 保存成功的处理逻辑
                    alert("修改成功");
                    callLastRequest();
                },
                error: function(error) {
                    console.log('Ajax request error:', error);
                }
            });
        }
