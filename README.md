# Todolist

Inspired by Todoist, Todolist is a task-list platform on which users can create to-do lists (projects) with tasks to be completed.

# Index
- [Live Site](https://todolist-appclone.herokuapp.com/)
- [User Stories](https://github.com/miajoubert/to-do-list/wiki/User-Stories)
- [Feature List](https://github.com/miajoubert/to-do-list/wiki/Features)
- [Database Schema](https://github.com/miajoubert/to-do-list/wiki/Database-Schema)
- [Wireframes](https://github.com/miajoubert/to-do-list/wiki/Wireframes)

# Technologies Used

## Frontend
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/> React
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/> Redux
- <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/> Javascript
- <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/> HTML
- <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/> CSS

## Backend
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/> Flask
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/> Python
- <img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/postgresql/postgresql-original.svg" height=40/> PostgreSQL
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/> SQL Alchemy

- <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/> VS Code
- <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/> GitHub
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/> Docker

# Getting started

1. Clone this repository

   ```git@github.com/miajoubert/to-do-list.git```

2. CD into the /app directory and install dependencies

    ```pipenv install```

3. CD into the /react-app directory and install dependencies

    ```npm install```

4.  Create a .env file based on the .env.example given

5.  Create a user in psql based on your .env DATABASE_URL app_name

    ```psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"```

6.  Create a database in psql based on your.env DATABASE_URL app_db_name

7. Start your shell, migrate your database, seed your database, and run the flask app

   ```pipenv shell```

   ```flask db upgrade```

    ```flask seed all```

    ```flask run```

8. Open another terminal and change directory into /react-app and run the React app

	```npm start```


# Features

## Signup Page
Users will verify if their email address is valid before they continue with sign-up process.
![Login-Page]()



## Inbox 
Users can see all of their tasks in one place when logged in. They can mark them completed or uncheck if needed.
![Login-Page]()


## Project Page
Users can see all of their projects in one place when logged in, and all tasks assigned to a specific project (task list).
![Product-Detail]()


## Completed Tasks 
Users can see all of their completed tasks in one location when logged in.
![image]()


## Link to Wiki Docs:
https://github.com/miajoubert/to-do-list/wiki
