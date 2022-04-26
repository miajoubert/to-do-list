from app.models import db, Comment
from datetime import datetime


def seed_comments():
    c1 = Comment(
        project_id=2,
        comment='Comment #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    c2 = Comment(
        project_id=2,
        comment='Comment #2',
        created_at=datetime.now(),
        updated_at=datetime.now())
    c3 = Comment(
        project_id=3,
        comment='Comment 1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    c4 = Comment(
        project_id=3,
        comment='Comment 2',
        created_at=datetime.now(),
        updated_at=datetime.now())
    c5 = Comment(
        project_id=3,
        comment='Comment Three',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
