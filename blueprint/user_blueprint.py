from flask import Blueprint
from flask import Flask, render_template, request, jsonify
from flask import redirect, url_for, session
from sqlPool import POOL

userUser_bp = Blueprint('user', __name__)


@userUser_bp.route('/login', methods=['GET', 'POST'])
def login():
    print("users")
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = POOL.connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = cur.fetchone()
        cur.close()
        conn.close()
        print(user)
        if user:
            # 登录成功，将用户信息存储到会话中
            username = session['username'] = user[1]  # 假设用户名在第二个位置
            print(username)
            if user[4] == '1':
                return render_template('leftNavigation.html', username=username)
            else:
                return render_template('NormalUI.html', username=username)
        else:
            # 登录失败，显示错误信息
            error = '无效的用户名或密码'
            return render_template('login.html', error=error)
    else:
        return render_template('login.html')
@userUser_bp.route('/get_user', methods=['GET', 'POST'])
def get_user():
    userId = request.form['userId']
    print(userId)
    conn = POOL.connection()
    cur = conn.cursor()
    # 根据userId查询用户信息
    cur.execute("SELECT * FROM users WHERE Id = %s", (userId))
    user = cur.fetchone()
    userInfo = {
        'userId': user[0],
        'username': user[1],
        'password': user[2],
        'permission': user[4]
    }
    cur.close()
    conn.close()
    return jsonify(userInfo)
@userUser_bp.route('/add_user', methods=['GET', 'POST'])
def add_user():
    userName = request.form['username']
    password = request.form['password']
    permission = request.form['permission']
    print(userName, password, permission)
    conn = POOL.connection()
    cur = conn.cursor()
    # 连接users表，将用户信息插入
    cur.execute("INSERT INTO users(username, password, permissions) VALUES(%s, %s, %s)",
                (userName, password, permission))
    conn.commit()
    cur.close()
    conn.close()
    response = "success"
    return jsonify(response)
@userUser_bp.route('/delete_user', methods=['GET', 'POST'])
def delete_user():
    # 获取用户信息
    userId = request.form['userId']
    conn = POOL.connection()
    cur = conn.cursor()
    # 根据userId删除用户
    cur.execute("DELETE FROM users WHERE Id = %s", (userId))
    conn.commit()
    cur.close()
    conn.close()
    response = "success"
    return jsonify(response)
@userUser_bp.route('/edit_user', methods=['GET', 'POST'])
def edit_user():
    # 获取用户信息
    userId = request.form['id']
    username = request.form['username']
    password = request.form['password']
    permission = request.form['permission']
    print(userId, username, password, permission)
    conn = POOL.connection()
    cur = conn.cursor()
    # 根据userId修改用户信息
    cur.execute("UPDATE users SET username = %s, password = %s, permissions = %s WHERE Id = %s",
                (username, password, permission, userId))
    conn.commit()
    cur.close()
    conn.close()
    response = "success"
    return jsonify(response)