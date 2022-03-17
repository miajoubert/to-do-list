from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(64), nullable=False)
    project = db.relationship('Project', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def is_authenticated(self):
        return super().is_authenticated

    def is_active(self):
        return super().is_active

    def is_anonymous(self):
        return False

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username
        }
