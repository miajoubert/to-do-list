from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    completed = BooleanField('completed', validators=[DataRequired()])
