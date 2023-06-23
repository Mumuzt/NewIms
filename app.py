# from app import app

from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
from datetime import datetime
from sqlPool import POOL

from blueprint.search_blueprint import search_bp
from blueprint.update_blueprint import update_bp
from blueprint.user_blueprint import userUser_bp
from blueprint.delete_blueprint import delete_bp
from blueprint.add_blueprint import add_bp

app = Flask(__name__, static_folder='static', static_url_path='/static')

# 注册蓝图
app.register_blueprint(search_bp)
app.register_blueprint(update_bp)
app.register_blueprint(userUser_bp)
app.register_blueprint(delete_bp)
app.register_blueprint(add_bp)

app.secret_key = 'your_secret_key'


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')


# 这里是默认路径 跳转到login.html
@app.route('/')
def index():
    # return render_template('login.html')
    return render_template('AdministratorUI.html')


# 点击导航栏呈现出不同的结果
@app.route('/load_page', methods=['POST'])
def load_page():
    page_index = int(request.form['page_index'])
    user = request.form['user']
    print(page_index, user)
    # 主页
    if page_index == 0:
        html_content = render_template('admin/home.html')

    # 查询+出入库
    elif page_index == 1:
        html_content = render_template('admin/search.html', username=user)
    # 出入库记录
    elif page_index == 2:
        current_year = datetime.now().year
        product_year = [i for i in range(current_year - 5, current_year + 1)]
        product_year.insert(0, "全部")

        current_month = datetime.now().month
        product_month = [i for i in range(1, 12 + 1)]
        product_month.insert(0, "全部")
        conn = POOL.connection()
        cur = conn.cursor()
        cur.execute("SELECT io FROM iolog")
        results = cur.fetchall()
        unique_io = set(result[0] for result in results)
        unique_io = list(unique_io)
        unique_io.insert(0, "全部")
        cur.close()
        conn.close()

        html_content = render_template('admin/ioku.html', product_year=product_year, product_month=product_month,
                                       product_whitch=unique_io)
    # 盘点
    elif page_index == 3:
        html_content = render_template('admin/search_Inventory.html', username=user)
    elif page_index == 4:
        html_content = render_template('admin/search_damage.html', username=user)
    elif page_index == 5:

        conn = POOL.connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        results = cur.fetchall()
        cur.close()
        conn.close()
        html_content = render_template('admin/userOption.html', username=user,results = results)
    elif page_index == 6:
        pass


    return jsonify(html_content=html_content)


@app.route('/get_next_page', methods=['POST'])
def get_next_page():
    json_data = request.get_json()
    # 从JSON数据中获取results的值
    results = json_data.get('results')
    print(results)


if __name__ == '__main__':
    # app.secret_key = 'your_secret_key'
    app.run(debug=True, host='0.0.0.0', port=5000)
    # serve(app, host='0.0.0.0', port=5000)
