from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    task = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    project_id = IntegerField('project_id', validators=[DataRequired()])
