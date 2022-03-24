from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Task, Project, db
from app.forms import TaskForm
from datetime import datetime

task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@task_routes.route('')
def get_task():
  tasks = Task.query.join(Project).filter(Project.user_id == current_user.id).all()
  return {"tasks": [task.to_dict() for task in tasks]}


@task_routes.route("/<int:id>")
def get_task_by_project_id(id):
  tasks = Task.query.filter(Task.project_id == id)
  return {"tasks": [task.to_dict() for task in tasks]}


@task_routes.route('/add', methods=['POST'])
def add_task():
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    task = Task(
      project_id = form.data['project_id'],
      task = form.data['task'],
      description = form.data['description'],
      completed = False,
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:id>/edit', methods=['PATCH'])
def edit_task(id):
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Task.query.get(id)

    edit.project_id = form.data['project_id']
    edit.task = form.data['task'],
    edit.description = form.data['description'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_task(id):
  delete = Task.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}


@task_routes.route('/<int:id>/complete', methods=['PATCH'])
def complete_task(id):
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    complete = Task.query.get(id)

    complete.completed = form.data['project_id'],
    complete.updated_at = datetime.now()

    db.session.add(complete)
    db.session.commit()
    return complete.to_dict()
  return {'Response': 'Completed'}, 401


@task_routes.route('/completed')
def get_done_task():
  tasks = Task.query.join(Project).filter(Project.user_id == current_user.id).filter(Task.completed).all()
  return {"tasks": [task.to_dict() for task in tasks]}
