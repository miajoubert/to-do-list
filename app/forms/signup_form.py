from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Your email is already registered with us.')


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
