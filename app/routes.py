from app import app
from app.forms import LoginForm
from app.models import User
from flask import render_template, url_for, redirect, flash
from flask_login import current_user, login_user


@app.route('/')
@app.route('/index')
def home():
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash("invalid username or password")
            return redirect(url_for('login'))
        login_user(user, remember=form.remember.data)
        return redirect(url_for('home'))
    return render_template("login.html", form=form)
