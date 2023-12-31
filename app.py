# from app import app

from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
from datetime import datetime
from sqlPool import POOL
from collections import defaultdict

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
    # return render_template('leftNavigation.html')


# 点击导航栏呈现出不同的结果
@app.route('/load_page', methods=['POST'])
def load_page():
    page_index = int(request.form['page_index'])
    user = request.form['user']
    print(page_index, user)
    # 主页 显示库存总量 不能改变
    if page_index == 0:
        # 连接数据库
        conn = POOL.connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT ProductName, GROUP_CONCAT(Location) as locations, SUM(number) as total_quantity
            FROM inventory
            GROUP BY ProductName;
        """)
        results = cur.fetchall()
        print(results)
        cur.close()

        html_content = ""
        html_result = render_template('admin/home.html', results=results)

    # 物品出入库 可以 增删改查
    elif page_index == 1:
        conn = POOL.connection()
        cur = conn.cursor()

        # 搜索全部的物品 展示到content_result 中
        cur.execute("SELECT * FROM inventory")
        results = cur.fetchall()

        # 搜索全部的物品
        cur.execute("SELECT * FROM inventory ")
        results_Item_Name = cur.fetchall()
        product_names = [result[1] for result in results_Item_Name]
        product_names = list(set(product_names))
        product_names.insert(0, "全部")
        # product_names就是物品名 列表
        # 搜索全部的Location
        location_names = [result[2] for result in results_Item_Name]
        location_names = list(set(location_names))
        location_names.insert(0, "全部")
        print("搜索结果：",results)
        print("搜索物品名：", product_names)
        print("搜索存储地：", location_names)
        cur.close()
        conn.close()
        html_content = render_template('admin/edit_Item.html', username=user,product_names=product_names,location_names=location_names)
        html_result = render_template('admin/edit_Item_Result.html', username=user,results=results)

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


        cur.execute("SELECT io FROM ioRecord")
        results = cur.fetchall()
        unique_io = set(result[0] for result in results)
        unique_io = list(unique_io)
        unique_io.insert(0, "全部")


        cur.execute("SELECT * FROM ioRecord")
        results_all = cur.fetchall()

        cur.execute("SELECT ProductName FROM inventory")
        results = cur.fetchall()
        unique_productName = set(result[0] for result in results)
        unique_productName = list(unique_productName)
        unique_productName.insert(0, "全部")

        cur.execute("SELECT Location FROM inventory")
        results = cur.fetchall()
        unique_location = set(result[0] for result in results)
        unique_location = list(unique_location)
        unique_location.insert(0, "全部")


        cur.close()
        conn.close()

        html_content = render_template('admin/ioku.html', product_year=product_year, product_month=product_month,product_whitch=unique_io,product_Item=unique_productName,product_Location=unique_location)
        html_result = render_template('admin/ioKusearchResult.html', product_year=product_year, product_month=product_month,product_whitch=unique_io, results=results_all)
    # 盘点
    elif page_index == 3:
        conn = POOL.connection()
        cur = conn.cursor()

        # 搜索全部的物品 展示到content_result 中
        cur.execute("SELECT * FROM inventory")
        results = cur.fetchall()

        # 搜索全部的物品
        cur.execute("SELECT * FROM inventory ")
        results_Item_Name = cur.fetchall()
        product_names = [result[1] for result in results_Item_Name]
        product_names = list(set(product_names))
        product_names.insert(0, "全部")
        # product_names就是物品名 列表
        # 搜索全部的Location
        location_names = [result[2] for result in results_Item_Name]
        location_names = list(set(location_names))
        location_names.insert(0, "全部")
        print("搜索结果：", results)
        print("搜索物品名：", product_names)
        print("搜索存储地：", location_names)
        cur.close()
        conn.close()
        html_content = render_template('admin/search_Inventory.html', username=user, product_names=product_names,location_names=location_names)
        html_result = render_template('admin/search_Inventory_Result.html', username=user, results=results)
    elif page_index == 4:
        # 报废
        conn = POOL.connection()
        cur = conn.cursor()

        # 搜索全部的物品 展示到content_result 中
        cur.execute("SELECT * FROM inventory")
        results = cur.fetchall()

        # 搜索全部的物品
        cur.execute("SELECT * FROM inventory ")
        results_Item_Name = cur.fetchall()
        product_names = [result[1] for result in results_Item_Name]
        product_names = list(set(product_names))
        product_names.insert(0, "全部")
        # product_names就是物品名 列表
        # 搜索全部的Location
        location_names = [result[2] for result in results_Item_Name]
        location_names = list(set(location_names))
        location_names.insert(0, "全部")
        print("搜索结果：",results)
        print("搜索物品名：", product_names)
        print("搜索存储地：", location_names)
        cur.close()
        conn.close()
        html_content = render_template('admin/search_damage.html',username=user,product_names=product_names,location_names=location_names)
        html_result = render_template('admin/search_damage_Result.html',username=user,results=results)
    elif page_index == 5:

        conn = POOL.connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        results = cur.fetchall()
        cur.close()
        conn.close()
        html_content = ""
        html_result = render_template('admin/userOption.html',username=user,results=results)
    elif page_index == 6:
        pass
    return jsonify(html_content=html_content,html_result = html_result)


@app.route('/get_next_page', methods=['POST'])
def get_next_page():
    json_data = request.get_json()
    # 从JSON数据中获取results的值
    results = json_data.get('results')
    print(results)
@app.route('/inedx_page/<string:page_name>')
def inedx_page(page_name):
    username = request.args.get('username')
    print(username)
    return render_template(f'{page_name}.html',username = username )

if __name__ == '__main__':
    # app.secret_key = 'your_secret_key'
    app.run(debug=True, host='0.0.0.0', port=5000)
    # serve(app, host='0.0.0.0', port=5000)
