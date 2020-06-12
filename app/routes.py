from flask import render_template, url_for
from app import app


@app.route('/')
@app.route('/index')
def home():
    return render_template('todo_layout.html')
