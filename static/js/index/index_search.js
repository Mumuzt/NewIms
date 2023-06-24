

// Load the initial content
$(document).ready(function () {
    loadContent('AdministratorUI');
});
function loadContent(pageName) {
    $.ajax({
        url: `/inedx_page/${pageName}`,
        method: 'GET',
        success: function (data) {
            $('#Index_content').html(data);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}