from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    project_id = IntegerField('project_id', validators=[DataRequired()])
    comment = TextAreaField('comment', validators=[DataRequired()])
