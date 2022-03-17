from .db import db
from flask_login import login_user


class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    section = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship('Project', back_populates='section')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'section': self.section,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
