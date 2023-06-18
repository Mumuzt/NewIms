window.onload = function() {
  var currentPageElement = document.getElementById('current-page-element');
  currentPageElement.innerText = '1'; // 设置初始值为1
};

function getNextPage() {
    // 获取当前页码
    var currentPage = parseInt(document.querySelector('.current-page').innerText);
    console.log(currentPage);
    // 发送AJAX请求到后端
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_next_page?current_page=' + currentPage, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 解析响应的JSON数据
        var response = JSON.parse(xhr.responseText);

        // 更新当前页码
        document.querySelector('.current-page').innerText = response.current_page;

        // 更新表格的新数据
        var tableBody = document.getElementById('data-table-body');
        tableBody.innerHTML = ''; // 清除现有的表格数据
        response.results.forEach(function (result) {
          var row = document.createElement('tr');
          row.innerHTML = `
            <td>${result[0]}</td>
            <td>${result[1]}</td>
            <td>${result[2]}</td>
            <td>${result[3]}</td>
            <td>${result[4]}</td>
            <td>${result[5]}</td>
          `;
          tableBody.appendChild(row);
        });
      }
    };
    xhr.send();
  }