from flask import render_template, url_for, redirect, flash
from app import app
from app.forms import LoginForm


@app.route('/')
@app.route('/index')
def home():
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.email.data, form.remember.data))
        return redirect(url_for('home'))
    return render_template("login.html", form=form)
