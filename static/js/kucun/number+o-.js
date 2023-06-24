// 添加别名以保持向后兼容性
const increaseQuantity = (itemId, nowNumber) => updateQuantity(itemId, 'increase', nowNumber);
const decreaseQuantity = (itemId, nowNumber) => updateQuantity(itemId, 'decrease', nowNumber);
const updateQuantity_cancel = (itemId, inputElement) => updateQuantityValue(itemId, inputElement, '-cancel');
const delete_Item = deleteItem;
const cancel_DamageNumber = cancelDamageNumber;



// 保存
function saveLastRequest(url, method, params) {
    const request = {
        url,
        method,
        params
    };
    sessionStorage.setItem('lastRequest', JSON.stringify(request));
}

// 载入
function callLastRequest() {
    const lastRequest = sessionStorage.getItem('lastRequest');
    if (lastRequest) {
        const request = JSON.parse(lastRequest);
        $.ajax({
            ...request,
            success: response => $('.content_result').html(response),
            error: error => console.log('Ajax request error:', error)
        });
    }
}

// 加减数量
function updateQuantity(itemId, action, nowNumber) {
    $.ajax({
        url: '/update_quantity',
        type: 'POST',
        data: { id: itemId, action, item_number: nowNumber },
        success: response => $(`.quantity-${itemId}`).val(response.quantity),
        error: error => console.log('Ajax request error:', error)
    });
}
function updateQuantityValue(itemId, inputElement, suffix = '') {
    const newValue = inputElement.value;
    $(`.quantity-${itemId}${suffix}`).val(newValue);
}

// 删除物品
function deleteItem(itemId, username, item) {
    $.ajax({
        url: '/delete_Item',
        type: 'POST',
        data: { id: itemId, user: username, item },
        success: () => {
            alert("删除物品成功");
            callLastRequest();
        },
        error: error => console.log('Ajax request error:', error)
    });
}

// 保存数量通用函数
function saveNumber(itemId, value, username, item, operation) {
    $.ajax({
        url: '/save_number_and_log',
        type: 'POST',
        data: { id: itemId, value, user: username, item, operation },
        success: () => {
            console.log('Number saved successfully.');
            alert("修改成功");
            callLastRequest();
        },
        error: error => console.log('Ajax request error:', error)
    });
}

// 保存出入库数量
function saveInOutNumber(itemId, value, username, item) {
    saveNumber(itemId, value, username, item, "save_number");
}

// 保存盘点数量
function saveInventoryNumber(itemId, value, username, item) {
    saveNumber(itemId, value, username, item, "save_Inventory_number");
}

// 保存报废数量
function saveDamageNumber(itemId, value, username, item) {
    saveNumber(itemId, value, username, item, "save_Damage_Number");
}

// 保存注销数量
function cancelDamageNumber(itemId, value, username, item) {
    $.ajax({
        url: '/cancel_DamageNumber',
        type: 'POST',
        data: { id: itemId, value, user: username, item },
        success: () => {
            alert("修改成功");
            callLastRequest();
        },
        error: error => console.log('Ajax request error:', error)
    });
}