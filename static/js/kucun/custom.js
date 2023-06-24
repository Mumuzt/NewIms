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
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});