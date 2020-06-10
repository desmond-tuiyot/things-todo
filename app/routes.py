from flask import Flask
from app import app

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/<name>')
def hello_name(name):
    return 'Hello {}'.format(name)