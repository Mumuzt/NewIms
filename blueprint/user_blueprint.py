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
                return render_template('AdministratorUI.html', username=username)
            else:
                return render_template('NormalUI.html', username=username)
        else:
            # 登录失败，显示错误信息
            error = '无效的用户名或密码'
            return render_template('login.html', error=error)
    else:
        return render_template('login.html')