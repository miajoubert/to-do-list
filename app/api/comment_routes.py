from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.models import Comment, db
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f'{error}')
  return errorMessages


@comment_routes.route('')
def get_comment():
  comments = Comment.query.all()
  return {"comments": [comment.to_dict() for comment in comments]}


@comment_routes.route("/<int:id>")
def get_comment_by_id(id):
  comment = Comment.query.get(id)
  return comment.to_dict()


@comment_routes.route('/add', methods=['POST'])
def add_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment(
      project_id=form.data['project_id'],
      comment=form.data['comment'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>/edit', methods=['PATCH'])
def edit_comment(id):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    edit = Comment.query.get(id)

    edit.comment=form.data['comment'],
    edit.updated_at = datetime.now()

    db.session.add(edit)
    db.session.commit()
    return edit.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_comment(id):
  delete = Comment.query.get(id)
  db.session.delete(delete)
  db.session.commit()
  return {'Response': 'Deleted'}
