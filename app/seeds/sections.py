from app.models import db, Section
from datetime import datetime


def seed_sections():
    s1 = Section(
        project_id=1,
        section='Section #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    s2 = Section(
        project_id=1,
        section='Section #2',
        created_at=datetime.now(),
        updated_at=datetime.now())
    s3 = Section(
        project_id=2,
        section='Section #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    s4 = Section(
        project_id=3,
        section='Section #1',
        created_at=datetime.now(),
        updated_at=datetime.now())
    s5 = Section(
        project_id=4,
        section='Section #1',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)

    db.session.commit()


def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()
