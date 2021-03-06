from .db import db
from flask_login import login_user


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    task = db.Column(db.String(255), nullable=False)
    task_order = db.Column(db.Integer)
    description = db.Column(db.String)
    completed = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship('Project', back_populates='task')
    section = db.relationship('Section', back_populates='task')

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'section_id': self.section_id,
            'task_order': self.task_order,
            'task': self.task,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
