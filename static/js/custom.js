$(document).ready(function() {
$('.navbar a').click(function(event) {
    event.preventDefault(); // 阻止默认的链接行为
    var pageIndex = $(this).data('page-index');
    var user = $(this).data('user');
    clear_Content();
    loadContent(pageIndex,user);
});
function clear_Content(){
    $('.content_result').empty();
}
function loadContent(pageIndex,user) {
    $.ajax({
        url: '/load_page',
        method: 'POST',
        data: { page_index: pageIndex,user:user},
        success: function(response) {
            $('.content').html(response.html_content);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
});