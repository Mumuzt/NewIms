

// Load the initial content
$(document).ready(function () {
});
function loadContent(pageName,username) {
    $.ajax({
        url: `/inedx_page/${pageName}`,
        method: 'GET',
        data: {username:username},
        success: function (data) {
            $('#Index_content').html(data);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}