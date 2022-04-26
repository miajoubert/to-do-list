from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

def task_required(form, field):
    task = field.data
    if not task:
        raise ValidationError('Task required.')

class TaskForm(FlaskForm):
    task = StringField('title', validators=[task_required])
    description = TextAreaField('description')
    project_id = IntegerField('project_id', validators=[DataRequired()])
    section_id = IntegerField('section_id')
