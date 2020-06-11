from flask import render_template
from app import app


@app.route('/')
@app.route('/index')
def home():
    user = {'username': 'Desmond'}
    return render_template('todo_layout.html', title='Home', user=user)
