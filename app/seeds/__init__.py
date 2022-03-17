from flask.cli import AppGroup

from app.seeds.projects import seed_projects, undo_projects
from app.seeds.sections import seed_sections, undo_sections
from app.seeds.tasks import seed_tasks, undo_tasks
from app.seeds.notes import seed_notes, undo_notes
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_tasks()
    seed_sections()
    seed_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_tasks()
    undo_sections()
    undo_notes()
    # Add other undo functions here
