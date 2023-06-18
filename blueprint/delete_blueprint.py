from flask import Blueprint
from flask import Flask, render_template, request, jsonify
from flask import redirect, url_for, session
from collections import defaultdict
from datetime import datetime
from sqlPool import POOL

delete_bp = Blueprint('delete', __name__)


@delete_bp.route('/delete_Item', methods=['GET', 'POST'])
def delete_Item():

    item_id = request.form.get('id')
    user = request.form.get('user')
    item = request.form.get('item')
    print(item_id,user,item)
    try:
        conn = POOL.connection()
        cur = conn.cursor()

        delete_query = "DELETE FROM inventory WHERE id = %s AND ProductName = %s"
        values = (item_id, item)
        cur.execute(delete_query, values)
        conn.commit()
        cur.close()
        conn.close()
        response = '删除物品成功'
    except Exception as e:
        print('Error:', e)
        response = str(e)
    return jsonify(response)
@delete_bp.route('/cancel_DamageNumber', methods=['GET', 'POST'])
def cancel_DamageNumber():
    item_id = request.form.get('id')
    value = request.form.get('value')
    user = request.form.get('user')
    item = request.form.get('item')
    print("id:%s  报废数量:%s   用户名:%s  物品:%s" %(item_id, value, user, item))

#     先更改DamageQuantity数值
#     连接数据库
#     根据id 查询数据库中DamageQuantity 数值保存起来
    try:
        conn = POOL.connection()
        cur = conn.cursor()
        damage_value= "SELECT DamageQuantity FROM inventory WHERE id = %s"
        values = (item_id)
        cur.execute(damage_value, values)
        results = cur.fetchone()[0]
        print(int(results))
    #       根据id 更新DamageQuantity的数值
        update_DamageQuantity_query = "UPDATE inventory SET DamageQuantity = %s WHERE ID = %s"
        results = results-int(value)
        values = (results,item_id)
        cur.execute(update_DamageQuantity_query, values)
        conn.commit()
        cur.close()
        conn.close()
        response = "succ"
    except Exception as e:
        print('Error:', e)
        response = str(e)
#     添加日志
    io = "注销"
    if io is not None:  # 只有在io被赋值时才执行日志插入操作
        try:
            conn = POOL.connection()
            cur = conn.cursor()
            insert_query = "INSERT INTO ioLog (io, ioTime, ioUser, ioItem, ioNumber) VALUES (%s, %s, %s, %s, %s)"
            ioTime = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
            insert_values = (io, ioTime, user, item, value)
            cur.execute(insert_query, insert_values)
            conn.commit()
            cur.close()
            conn.close()
            print("success")
            response = "success"
        except Exception as e:
            print('Error:', e)
            response = str(e)
    return jsonify(response)