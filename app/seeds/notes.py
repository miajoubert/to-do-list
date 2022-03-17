from app.models import db, Note
from datetime import datetime


def seed_notes():
    n1 = Note(
        project_id=1,
        note='Note #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    n2 = Note(
        project_id=1,
        note='Note #2',
        created_at=datetime.now(),
        updated_at=datetime.now())
    n3 = Note(
        project_id=2,
        note='Note #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    n4 = Note(
        project_id=3,
        note='Note #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    n5 = Note(
        project_id=4,
        note='Note #1',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(n1)
    db.session.add(n2)
    db.session.add(n3)
    db.session.add(n4)
    db.session.add(n5)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
