from flask import render_template, url_for
from app import app


@app.route('/')
@app.route('/index')
def home():
    user = {'username': 'Desmond'}
    return render_template('todo_layout.html', title='Home', user=user)
