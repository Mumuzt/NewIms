$(document).ready(function () {
    var resultsJson = window.results;
    var results = JSON.parse(resultsJson);
    var currentPage = 1;
    var itemsPerPage = 10;

    function renderTable(data) {
        var tbody = $("#data-table-body");
        tbody.empty();
        data.forEach(function (result) {
            var row = `<tr>
                            <td>${result[1]}</td>
                            <td>${result[2]}</td>
                            <td>${result[3]}</td>
                            <td>${result[4]}</td>
                            <td>${result[5]}</td>
                       </tr>`;

            tbody.append(row);
        });
    }

    function renderPagination(totalItems, currentPage, itemsPerPage) {
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var pagination = $(".pagination");
        pagination.empty();

        for (var i = 1; i <= totalPages; i++) {
            var li = `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
            pagination.append(li);
        }
    }

    function render() {
        var start = (currentPage - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        var pageData = results.slice(start, end);
        renderTable(pageData);
        renderPagination(results.length, currentPage, itemsPerPage);
    }

    $(document).on("click", ".page-item", function (event) {
        event.preventDefault();
        currentPage = parseInt($(this).text());
        render();
    });

    render();
});