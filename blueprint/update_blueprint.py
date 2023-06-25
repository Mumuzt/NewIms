from flask import Blueprint
from flask import Flask, render_template, request, jsonify
from collections import defaultdict
from datetime import datetime
from sqlPool import POOL

update_bp = Blueprint('update', __name__)

# 通过id 进行物品的增减
# 路由用于接收Ajax请求并更新数量
@update_bp.route('/update_quantity', methods=['POST'])
def update_quantity():
    item_id = request.form.get('id')
    action = request.form.get('action')
    number = request.form.get('item_number')
    number = int(number)
    print(item_id,action,number)
    if action == 'increase':
        number = number+1
    elif action == 'decrease':
        number = number - 1
    # 在此处编写更新数量的逻辑
    # 根据 item_id 和 action 进行相应的更新操作
    # 假设更新后的数量为 new_quantity
    new_quantity = number

    # 返回更新后的数量给前端
    response = {'quantity': new_quantity}
    print(response)
    return jsonify(response)

# 将改查询、盘点、报废   改变的物品的数值保存起来
@update_bp.route('/save_number_and_log', methods=['POST'])
def save_number_and_log():
    print("更新库存/盘点/报废")
    item_id = request.form.get('id')
    value = request.form.get('value')
    user = request.form.get('user')
    item = request.form.get('item')
    location = request.form.get('location')
    operation = request.form.get('operation')  # 新增一个名为operation的参数来区分不同的操作

    print(item_id, value, user, item,operation,location)

    try:
        conn = POOL.connection()
        cur = conn.cursor()

        if operation == 'save_number':
            update_number = "UPDATE inventory SET number = %s WHERE ID = %s"
            sel_before_value = "SELECT number FROM inventory WHERE id = %s"
        elif operation == 'save_Inventory_number':
            update_inventory_query = "UPDATE inventory SET number = %s WHERE ID = %s"
            sel_before_inventory_value = "SELECT number FROM inventory WHERE id = %s"
        elif operation == 'save_Damage_Number':
            update_Damage = "UPDATE inventory SET DamageQuantity = %s WHERE ID = %s"
            update_number = "UPDATE inventory SET number = %s WHERE ID = %s"
            sel_before_number_value = "SELECT number FROM inventory WHERE id = %s"
            sel_before_damage_value = "SELECT DamageQuantity FROM inventory WHERE id = %s"


        io = None  # 初始化io变量
        if operation == 'save_number':

            cur.execute(sel_before_value, (item_id,))
            before_value = cur.fetchone()[0]  # Fetch a single row and extract the first column value
            before_value = int(before_value)

            io = "入库" if int(value) > before_value else "出库"
            if int(value) > before_value:
                ioNumber = int(value) - before_value
            elif int(value) < before_value:
                ioNumber = before_value - int(value)
            cur.execute(update_number, (value, item_id))

            conn.commit()
            cur.close()
        elif operation == 'save_Inventory_number':
            ioNumber = int(value)
            io = "盘点"
            cur.execute(update_inventory_query, (value, item_id))
            conn.commit()
            cur.close()
        elif operation == 'save_Damage_Number':
            ioNumber = int(value)
            io = "报废"
            cur.execute(sel_before_damage_value, (item_id,))
            before_damage_value = cur.fetchone()[0]  # Fetch a single row and extract the first column value
            before_damage_value = int(before_damage_value)
            # 更新了报废数量
            before_damage_value = before_damage_value + int(value)
            # 报废数量
            cur.execute(update_Damage, (before_damage_value, item_id))
            conn.commit()

            # 查询库存数量
            cur.execute(sel_before_number_value, (item_id,))
            before_number_value = cur.fetchone()[0]  # Fetch a single row and extract the first column value
            before_number_value = int(before_number_value)
            before_number_value = before_number_value - int(value)
            cur.execute(update_number, (before_number_value, item_id))
            conn.commit()
        conn.close()
        print("success")
        response = "success"
    except Exception as e:
        print('Error:', e)
        response = str(e)

    if io is not None:  # 只有在io被赋值时才执行日志插入操作
        try:
            conn = POOL.connection()
            cur = conn.cursor()
            insert_query = "INSERT INTO ioRecord (io, ioTime, ioUser, ioItem, ioNumber,ioLocation) VALUES (%s, %s, %s, %s, %s,%s)"
            ioTime = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
            print(io, ioTime, user, item, ioNumber,location)
            insert_values = (io, ioTime, user, item, ioNumber,location)
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