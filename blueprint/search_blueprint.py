from flask import Blueprint
from flask import Flask, render_template, request, jsonify
from collections import defaultdict
from datetime import datetime
from sqlPool import POOL
from flask_paginate import Pagination, get_page_args

search_bp = Blueprint('search', __name__)


# 为下拉栏添加筛选内容
@search_bp.route('/load_sreach_options', methods=['POST'])
def load_sreach_options():
    searchIndex = request.form.get('searchIndex')
    user = request.form.get('user')
    operation = request.form.get('operation')  # 新增一个名为operation的参数来区分不同的操作
    searchIndex = int(searchIndex)
    print(searchIndex, user, operation)

    conn = POOL.connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM inventory ")
    results = cur.fetchall()
    print(results)
    if operation=="load_sreach_options":
        print(0)
        if searchIndex == 0:
            # 执行查询
            product_names = [result[1] for result in results]
            product_names = list(set(product_names))
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/edit_Item.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]
            product_names = list(set(product_names))
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/edit_Item.html', options=product_names, search_index=searchIndex, username=user)

    if operation=="load_sreach_inventory_options":
        print(1)
        if searchIndex == 0:
            # 执行查询
            product_names = [result[1] for result in results]
            product_names = list(set(product_names))
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_Inventory.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]
            product_names = list(set(product_names))
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_Inventory.html', options=product_names, search_index=searchIndex, username=user)
    if operation=="load_sreach_damage_options":
        print(2)
        if searchIndex == 0:
            # 执行查询
            product_names = [result[1] for result in results]
            product_names = list(set(product_names))
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_damage.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]
            product_names = list(set(product_names))
            cur.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_damage.html', options=product_names, search_index=searchIndex, username=user)



@search_bp.route('/search_old_Item', methods=['GET'])
def search_old_Item():
    # 连接数据库
    conn = POOL.connection()
    cur = conn.cursor()
    # 查询数据库中inventory表的数据
    cur.execute("SELECT ProductName FROM inventory")
    ItemName = cur.fetchall()
    cur.execute("SELECT Location FROM inventory")
    Location = cur.fetchall()
    # 关闭数据库连接
    cur.close()
    conn.close()
    ItemName = list(set([x[0] for x in ItemName]))
    Location = list(set([x[0] for x in Location]))
    result = {
        "ItemName": ItemName,
        "Location": Location
    }
    return jsonify(result)
#普通查询
# 根据搜索限制（物品名/存储地）搜索相应的结果
@search_bp.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    print(data)
    # 接收产品和位置数据
    selected_products = data.get('data-product-name', [])
    selected_locations = data.get('data-location-name', [])
    # 处理选中的产品
    conn = POOL.connection()
    cur = conn.cursor()

    # 构建查询
    query = "SELECT * FROM inventory"

    # 查询条件列表
    conditions = []

    # 如果选中的产品不为"全部"，则添加产品条件
    if selected_products and selected_products[0] != "全部":
        conditions.append("ProductName IN ({})".format(', '.join(['%s'] * len(selected_products))))

    # 如果选中的位置不为"全部"，则添加位置条件
    if selected_locations and selected_locations[0] != "全部":
        conditions.append("Location IN ({})".format(', '.join(['%s'] * len(selected_locations))))

    # 如果有条件，将它们添加到查询中
    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY ProductName ASC"

    print(query)

    # 移除"全部"选项，避免传递给数据库查询
    selected_products = [product for product in selected_products if product != "全部"]
    selected_locations = [location for location in selected_locations if location != "全部"]

    # 执行查询
    cur.execute(query, selected_products + selected_locations)
    result = cur.fetchall()

    # 关闭数据库连接
    cur.close()
    conn.close()

    print("搜索结果：", result)
    finall = render_template('admin/edit_Item_Result.html', results=result)
    return jsonify(finall)

# 查询盘点
@search_bp.route('/search_Inventory', methods=['POST'])
def search_Inventory():
    data = request.get_json()
    print(data)
    # 接收产品和位置数据
    selected_products = data.get('data-product-name', [])
    selected_locations = data.get('data-location-name', [])
    # 处理选中的产品
    conn = POOL.connection()
    cur = conn.cursor()

    # 构建查询
    query = "SELECT * FROM inventory"

    # 查询条件列表
    conditions = []

    # 如果选中的产品不为"全部"，则添加产品条件
    if selected_products and selected_products[0] != "全部":
        conditions.append("ProductName IN ({})".format(', '.join(['%s'] * len(selected_products))))

    # 如果选中的位置不为"全部"，则添加位置条件
    if selected_locations and selected_locations[0] != "全部":
        conditions.append("Location IN ({})".format(', '.join(['%s'] * len(selected_locations))))

    # 如果有条件，将它们添加到查询中
    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY ProductName ASC"

    print(query)

    # 移除"全部"选项，避免传递给数据库查询
    selected_products = [product for product in selected_products if product != "全部"]
    selected_locations = [location for location in selected_locations if location != "全部"]

    # 执行查询
    cur.execute(query, selected_products + selected_locations)
    result = cur.fetchall()

    # 关闭数据库连接
    cur.close()
    conn.close()

    print("搜索结果：", result)
    finall = render_template('admin/search_Inventory_Result.html', results=result)
    return jsonify(finall)
#查询报废
@search_bp.route('/search_damage', methods=['POST'])
def search_damage():
    data = request.get_json()
    print(data)
    # 接收产品和位置数据
    selected_products = data.get('data-product-name', [])
    selected_locations = data.get('data-location-name', [])
    # 处理选中的产品
    conn = POOL.connection()
    cur = conn.cursor()

    # 构建查询
    query = "SELECT * FROM inventory"

    # 查询条件列表
    conditions = []

    # 如果选中的产品不为"全部"，则添加产品条件
    if selected_products and selected_products[0] != "全部":
        conditions.append("ProductName IN ({})".format(', '.join(['%s'] * len(selected_products))))

    # 如果选中的位置不为"全部"，则添加位置条件
    if selected_locations and selected_locations[0] != "全部":
        conditions.append("Location IN ({})".format(', '.join(['%s'] * len(selected_locations))))

    # 如果有条件，将它们添加到查询中
    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY ProductName ASC"

    print(query)

    # 移除"全部"选项，避免传递给数据库查询
    selected_products = [product for product in selected_products if product != "全部"]
    selected_locations = [location for location in selected_locations if location != "全部"]

    # 执行查询
    cur.execute(query, selected_products + selected_locations)
    result = cur.fetchall()

    # 关闭数据库连接
    cur.close()
    conn.close()

    print("搜索结果：", result)
    finall = render_template('admin/search_damage_Result.html', results=result)
    return jsonify(finall)
#查询盘点
@search_bp.route('/search_ioku', methods=['GET'])
def search_ioku():
    year = request.args.get('search_year')
    month = request.args.get('search_month')
    waction = request.args.get('search_waction')
    productName = request.args.get('search_Item')  # 更改变量名为 productName
    location = request.args.get('search_Location')
    print(year, month, waction, productName, location)

    conn = POOL.connection()
    cur = conn.cursor()

    # 动态构建 SQL 查询
    sql_base = "SELECT * FROM ioRecord WHERE "
    sql_conditions = []
    query_params = []
    if year != "全部":
        sql_conditions.append("YEAR(ioTime) = %s")
        query_params.append(year)
    if month != "全部":
        sql_conditions.append("MONTH(ioTime) = %s")
        query_params.append(month)
    if waction != "全部":
        sql_conditions.append("io = %s")
        query_params.append(waction)

    if productName!= "全部":
        sql_conditions.append("ioItem = %s")
        query_params.append(productName)
    if location!= "全部":
        sql_conditions.append("iolocation = %s")
        query_params.append(location)

    if sql_conditions:  # 如果有条件，则添加 WHERE 子句
        sql_query = sql_base + " AND ".join(sql_conditions)
    else:
        sql_query = "SELECT * FROM ioRecord"


    # 执行 SQL 查询
    cur.execute(sql_query, tuple(query_params))
    results = cur.fetchall()
    print(results)
    # 关闭数据库连接
    cur.close()
    conn.close()
    results = results[::-1]

    return render_template('admin/ioKusearchResult.html', results=results)

@search_bp.route('/search_Location', methods=['GET', 'POST'])
def search_Location():
    # 拿的data里的值
    search_options = request.args.get('options')
    conn = POOL.connection()
    cur = conn.cursor()
    # 根据search_options的值 查询数据库
    cur.execute("select * from inventory where Location = %s", search_options)
    results = cur.fetchall()
    return jsonify(results)
