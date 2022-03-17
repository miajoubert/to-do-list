from app.models import db, User


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    fran = User(
        username='fran', email='fran@nanny.com', password='password')
    doubtfire = User(
        username='doubtfire', email='doubtfire@nanny.com', password='password')

    db.session.add(demo)
    db.session.add(fran)
    db.session.add(doubtfire)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
