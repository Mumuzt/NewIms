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
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]

            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search.html', options=product_names, search_index=searchIndex, username=user)

    if operation=="load_sreach_inventory_options":
        print(1)
        if searchIndex == 0:
            # 执行查询
            product_names = [result[1] for result in results]
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_Inventory.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_Inventory.html', options=product_names, search_index=searchIndex, username=user)
    if operation=="load_sreach_damage_options":
        print(2)
        if searchIndex == 0:
            # 执行查询
            product_names = [result[1] for result in results]
            # 关闭数据库连接
            cur.close()
            conn.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_damage.html', options=product_names, search_index=searchIndex, username=user)
        elif searchIndex == 1:
            product_names = [result[2] for result in results]
            cur.close()
            product_names.insert(0, "全部")
            return render_template('admin/search_damage.html', options=product_names, search_index=searchIndex, username=user)

#普通查询
# 根据搜索限制（物品名/存储地）搜索相应的结果
@search_bp.route('/search', methods=['GET'])
def search():
    result_value = request.args.get('result')
    query = request.args.get('query')
    username = request.args.get('username')

    conn = POOL.connection()
    cur = conn.cursor()
    if query==None:
        cur.execute("SELECT * FROM inventory")

    # 执行查询
    if result_value == "0":
        if query=="全部":
            cur.execute("SELECT * FROM inventory")
        else:
            cur.execute("SELECT * FROM inventory WHERE ProductName LIKE '%{}%'".format(query))
    elif result_value == "1":
        if query=="全部":
            cur.execute("SELECT * FROM inventory")
        else:
            cur.execute("SELECT * FROM inventory WHERE Location LIKE '%{}%'".format(query))
    result = cur.fetchall()

    # 关闭数据库连接
    cur.close()
    conn.close()

    print(result)

    total = sum(result1[3] for result1 in result)
    print(total)
    data = result
    item_totals = defaultdict(int)
    for item in data:
        item_name, quantity = item[1], item[3]
        item_totals[item_name] += quantity
    # for item_name, total_quantity in item_totals.items():
    #     print(f"物品名: {item_name}, 数量总和: {total_quantity}")
    return render_template('admin/search_Result.html', username=username, results=result, total=total, statistics=tuple(item_totals.items()))

# 查询盘点
@search_bp.route('/search_Inventory', methods=['GET'])
def search_Inventory():
    result_value = request.args.get('result')
    query = request.args.get('query')
    username = request.args.get('username')

    conn = POOL.connection()
    cur = conn.cursor()


    if query==None:
        cur.execute("SELECT * FROM inventory")

    # 执行查询
    if result_value == "0":
        if query=="全部":
            cur.execute("SELECT * FROM inventory")
        else:
            cur.execute("SELECT * FROM inventory WHERE ProductName LIKE '%{}%'".format(query))
    elif result_value == "1":
        if query=="全部":
            cur.execute("SELECT * FROM inventory")
        else:
            cur.execute("SELECT * FROM inventory WHERE Location LIKE '%{}%'".format(query))


    result = cur.fetchall()

    # 关闭数据库连接
    cur.close()
    conn.close()
    print(result)

    total = sum(result1[3] for result1 in result)
    print(total)
    data = result
    item_totals = defaultdict(int)
    for item in data:
        item_name, quantity = item[1], item[3]
        item_totals[item_name] += quantity
    # for item_name, total_quantity in item_totals.items():
    #     print(f"物品名: {item_name}, 数量总和: {total_quantity}")

    return render_template('admin/search_Inventory_Result.html', username=username, results=result, total=total, statistics=tuple(item_totals.items()))

#查询报废
@search_bp.route('/search_damage', methods=['GET'])
def search_damage():
    result_value = request.args.get('result')
    query = request.args.get('query')
    username = request.args.get('username')
    print(result_value,query,username)
    try:
        conn = POOL.connection()
        cur = conn.cursor()
        if query == None:
            cur.execute("SELECT * FROM inventory")
        if result_value == "0":
            if query == "全部":
                cur.execute("SELECT * FROM inventory")
            else:
                cur.execute("SELECT * FROM inventory WHERE ProductName LIKE '%{}%'".format(query))
        elif result_value == "1":
            if query == "全部":
                cur.execute("SELECT * FROM inventory")
            else:
                cur.execute("SELECT * FROM inventory WHERE Location LIKE '%{}%'".format(query))
        result = cur.fetchall()
        cur.close()
        conn.close()
        response = "success"
    except Exception as e:
        print('Error:', e)
        response = str(e)
    print(result)

    total = sum(result1[3] for result1 in result)
    print(total)
    data = result
    item_totals = defaultdict(int)
    for item in data:
        item_name, quantity = item[1], item[3]
        item_totals[item_name] += quantity

    return render_template('admin/search_damage_Result.html', username=username, results=result, total=total, statistics=tuple(item_totals.items()))

#查询盘点
@search_bp.route('/search_ioku', methods=['GET'])
def search_ioku():
    year = request.args.get('search_year')
    month = request.args.get('search_month')
    waction = request.args.get('search_waction')
    print(year, month,waction)
    conn = POOL.connection()
    cur = conn.cursor()

    if year == "全部":
    #     搜索全部记录
        if waction=="全部":
            cur.execute("SELECT * FROM iolog")
            results = cur.fetchall()
        else:
            sql_query = "SELECT * FROM iolog WHERE io = %s"
            cur.execute(sql_query, (waction,))
            results = cur.fetchall()
    elif month=="全部":
    #     搜索这个年份全部记录
        if waction == "全部":
            sql_query = "SELECT * FROM iolog WHERE YEAR(ioTime) = %s"
            cur.execute(sql_query, (year,))
            results = cur.fetchall()
        else:
            sql_query = "SELECT * FROM iolog WHERE YEAR(ioTime) = %s AND io = %s"
            cur.execute(sql_query, (year, waction))
            results = cur.fetchall()
    else:
        # 搜索这年这月的记录
        if waction == "全部":
            sql_query = "SELECT * FROM iolog WHERE YEAR(ioTime) = %s AND MONTH(ioTime) = %s"
            cur.execute(sql_query, (year, month))
            results = cur.fetchall()
        else:
            sql_query = "SELECT * FROM iolog WHERE YEAR(ioTime) = %s AND MONTH(ioTime) = %s AND io = %s"
            cur.execute(sql_query, (year, month, waction))
            results = cur.fetchall()
    # 关闭数据库连接
    cur.close()
    conn.close()
    results = results[::-1]


    # # 分页
    # page, per_page, offset = get_page_args(page_parameter='page', per_page_parameter='per_page')
    # print(page,per_page,offset)
    # total = len(results)
    # pagination_results = results[offset: offset + per_page]
    # pagination = Pagination(page=page, per_page=per_page, total=total)

    return render_template('admin/ioKusearchResult.html', results=results)