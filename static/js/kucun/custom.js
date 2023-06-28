// 监控导航栏按钮 首先阻止默认行为 然后获取导航栏 列数 然后清空内容区域 然后加载相应页面
$(document).ready(function () {
    $('.navbar a').click(function (event) {
        event.preventDefault(); // 阻止默认的链接行为
        var pageIndex = $(this).data('page-index');
        var user = $(this).data('user');
        clear_Content();
        loadContent(pageIndex, user);
    });

// 清除内容区域
    function clear_Content() {
        $('.content_result').empty();
    }

// 加载相应页面
    function loadContent(pageIndex, user) {
        $.ajax({
            url: '/load_page',
            method: 'POST',
            data: {page_index: pageIndex, user: user},
            success: function (response) {

                $('.content').html(response.html_content);
                $('.content_result').html(response.html_result);
                saveLastRequest(this.url,this.method,this.data)
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});

function saveLastRequest(url, method, params) {
    const request = {
        url,
        method,
        params
    };
    sessionStorage.setItem('lastRequest', JSON.stringify(request));
}

function callLastRequest() {
    const lastRequest = sessionStorage.getItem('lastRequest');
    console.log('lastRequest:', lastRequest); // 输出lastRequest的内容
    if (lastRequest) {
        const request = JSON.parse(lastRequest);
        console.log('request:', request); // 输出request的内容

        // 将params从字符串转换为对象
        const requestData = JSON.parse(request.params);

        $.ajax({
            url: request.url,
            type: request.method,
            data: JSON.stringify(requestData), // 将请求数据转换为JSON字符串
            contentType: 'application/json', // 设置内容类型为 application/json
            success: response => $('.content_result').html(response),
            error: error => console.log('Ajax request error:', error)
        });
    }
}