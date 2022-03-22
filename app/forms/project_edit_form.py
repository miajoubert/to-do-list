from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ProjectEditForm(FlaskForm):
  new_title = StringField('title', validators=[DataRequired()])
