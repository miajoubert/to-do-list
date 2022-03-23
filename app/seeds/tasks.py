from app.models import db, Task
from datetime import datetime


def seed_tasks():
    t1 = Task(
        project_id=1,
        task='Task #1......',
        description='description for task one',
        created_at=datetime.now(),
        updated_at=datetime.now())
    t2 = Task(
        project_id=2,
        task='Task #2......',
        description='description for task two',
        created_at=datetime.now(),
        updated_at=datetime.now())
    t3 = Task(
        project_id=2,
        task='Task #3......',
        description='description for task three',
        created_at=datetime.now(),
        updated_at=datetime.now())
    t4 = Task(
        project_id=3,
        task='Task #4......',
        description='description for task four',
        created_at=datetime.now(),
        updated_at=datetime.now())
    t5 = Task(
        project_id=4,
        task='Task #5......',
        description='description for task five---',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)

    db.session.commit()


def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
