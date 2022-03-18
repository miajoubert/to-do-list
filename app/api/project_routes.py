from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Project, db
from app.forms import ProjectForm
from datetime import datetime

project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@project_routes.route('/')
def get_project():
  projects = Project.query.all()
  return {"projects": [project.to_dict() for project in projects]}


@project_routes.route("/<int:id>")
def get_project_by_id(id):
  project = Project.query.get(id)
  return project.to_dict()


@project_routes.route('/add', methods=['POST'])
def add_project():
  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    project = Project(
      user_id=current_user.id,
      title=form.data['title'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(project)
    db.session.commit()
    return project.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@project_routes.route('/<int:id>/edit/', methods=['PATCH'])
def edit_project():
  form = ProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Project.query.get(id)

    edit.title=form.data['title'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@project_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_project():
  delete = Project.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}
