from flask import Blueprint
from flask import Flask, render_template, request, jsonify
from flask import redirect, url_for, session
from sqlPool import POOL

add_bp = Blueprint('add', __name__)

@add_bp.route('/add_newItem', methods=['GET', 'POST'])
def add_newItem():
    if request.method == 'POST':
        item_name = request.form['item-name']
        save_place = request.form['storage-location']
        number = request.form['quantity']

        if number=="":
            number=0
        print(item_name,save_place,number)
    try:
        conn = POOL.connection()
        cur = conn.cursor()
        insert_query = "INSERT INTO inventory (ProductName, Location, number) VALUES (%s, %s, %s)"
        insert_values = (item_name, save_place,number)
        cur.execute(insert_query, insert_values)
        conn.commit()
        cur.close()
        conn.close()
        response = "success"
    except Exception as e:
        print('Error:', e)
        response = str(e)

    return jsonify(response)