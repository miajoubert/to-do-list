from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Section, db
from app.forms import SectionForm
from datetime import datetime

section_routes = Blueprint('sections', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@section_routes.route('/')
def get_section():
  sections = Section.query.all()
  return {"sections": [section.to_dict() for section in sections]}


@section_routes.route("/<int:id>")
def get_section_by_id(id):
  section = Section.query.get(id)
  return section.to_dict()


@section_routes.route('/add', methods=['POST'])
def add_section():
  form = SectionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    project = Section(
      project_id=form.data['project_id'],
      section=form.data['section'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(project)
    db.session.commit()
    return project.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@section_routes.route('/<int:id>/edit/', methods=['PATCH'])
def edit_section():
  form = SectionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Section.query.get(id)

    edit.project_id=form.data['project_id']
    edit.section=form.data['section'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@section_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_section():
  delete = Section.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}
