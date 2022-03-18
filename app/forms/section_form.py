from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class SectionForm(FlaskForm):
    project_id = IntegerField('project_id', validators=[DataRequired()])
    section = StringField('section', validators=[DataRequired()])
