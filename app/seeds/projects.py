from app.models import db, Project
from datetime import datetime


def seed_projects():
    p1 = Project(
        user_id=1,
        title='Inbox',
        created_at=datetime.now(),
        updated_at=datetime.now())
    p2 = Project(
        user_id=1,
        title='Project #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    p3 = Project(
        user_id=1,
        title='Project #2',
        created_at=datetime.now(),
        updated_at=datetime.now())
    p4 = Project(
        user_id=1,
        title='Project #3',
        created_at=datetime.now(),
        updated_at=datetime.now())
    p5 = Project(
        user_id=2,
        title='Project #5',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)

    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
