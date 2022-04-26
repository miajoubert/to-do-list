from .db import db
from flask_login import login_user


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship('Project', back_populates='comment')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
