from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError

def project_required(form, field):
    project = field.data
    if not project:
        raise ValidationError('Project title required.')

class ProjectForm(FlaskForm):
    title = StringField('title', validators=[project_required])
