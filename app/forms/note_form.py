from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
    project_id = IntegerField('project_id', validators=[DataRequired()])
    note = TextAreaField('note', validators=[DataRequired()])
