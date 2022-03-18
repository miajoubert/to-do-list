from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Task, db
from app.forms import TaskForm
from datetime import datetime

task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@task_routes.route('/')
def get_task():
  tasks = Task.query.all()
  return {"tasks": [task.to_dict() for task in tasks]}


@task_routes.route("/<int:id>")
def get_task_by_id(id):
  task = Task.query.get(id)
  return task.to_dict()


@task_routes.route('/add', methods=['POST'])
def add_task():
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task = Task(
      project_id=form.data['project_id'],
      task=form.data['task'],
      description = form.data['description'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:id>/edit/', methods=['PATCH'])
def edit_task():
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Task.query.get(id)

    edit.project_id=form.data['project_id']
    edit.task=form.data['task'],
    edit.description = form.data['description'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_task():
  delete = Task.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}
