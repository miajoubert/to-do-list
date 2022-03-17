from http.client import OK
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import SignUpFormTwo
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
            # errorMessages.append('THIS IS MY MESSAGE')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    print("current user ------", current_user.is_authenticated)
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        if current_user.is_authenticated:
            print("THIS ONE IS AUTHED!!!!!!!!!!!!!!!!!!!!!!!!")
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/register', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return form.data
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/register/step_two', methods=['POST'])
def sign_up_step_two():
    form = SignUpFormTwo()
    body = request.get_json()
    my_email = body['email']
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            email=my_email,
            username=form.data['username'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """Unauth JSON when flask-login auth fails"""
    return {'errors': ['Unauthorized']}, 401
