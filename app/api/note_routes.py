from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Note, db
from app.forms import NoteForm
from datetime import datetime

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@note_routes.route('')
def get_note():
  notes = Note.query.all()
  return {"notes": [note.to_dict() for note in notes]}


@note_routes.route("/<int:id>")
def get_note_by_id(id):
  note = Note.query.get(id)
  return note.to_dict()


@note_routes.route('/add', methods=['POST'])
def add_note():
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    note = Note(
      project_id=form.data['project_id'],
      note=form.data['note'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(note)
    db.session.commit()
    return note.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/<int:id>/edit/', methods=['PATCH'])
def edit_note(id):
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Note.query.get(id)

    edit.project_id=form.data['project_id']
    edit.note=form.data['note'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_note(id):
  delete = Note.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}
