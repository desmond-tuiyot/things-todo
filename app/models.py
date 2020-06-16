from app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)  # index maximizes database search
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    todo_task = db.relationship('Task', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User: {}> \n<Email: {}>'.format(self.username, self.email)


class Task(db.Model):
    __tablename__ = 'task'

    id = db.Column(db.Integer, primary_key=True)
    task_details = db.Column(db.String(500))
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<User: {}>\n<Task: {}>\n<Date Created: {}>'.format(self.author, self.task_details, self.date_created)

