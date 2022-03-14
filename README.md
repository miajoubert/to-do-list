# Petsy

Inspired by Etsy, Petsy is an e-commerce platform for pet enthusiasts where users can buy and sell pet products as well as leave ratings/reviews of their items.

# Index

- [Live Site](https://petsy-store.herokuapp.com/)
- [Feature List](https://github.com/miajoubert/petsy/wiki/Feature-List)
- [Database Schema](https://github.com/miajoubert/petsy/wiki/Database-Schema)
- [Frontend Routes](https://github.com/miajoubert/petsy/wiki/Frontend-Routes)
- [API Documentation](https://github.com/miajoubert/petsy/wiki/API-Routes)
- [User Stories](https://github.com/miajoubert/petsy/wiki/User-Stories)
- [Redux State](https://github.com/miajoubert/petsy/wiki/Redux-State)

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

# Getting started

1. Clone this repository

   ```git@github.com/miajoubert/petsy.git```

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

## Splash Page 
![Splash-Page](https://user-images.githubusercontent.com/87781597/158024746-4325799d-e31a-4530-934e-f42154416e54.png)



## Login Page
![Login-Page](https://user-images.githubusercontent.com/87781597/158024845-76569883-5566-4e39-bd5f-c2a08af283b7.png)



## Shopping Cart 

```Shopping Cart Image To Be Updated```

## Product Detail Page 
![Product-Detail](https://user-images.githubusercontent.com/87781597/158024972-b931a0ca-da1c-467d-b656-6a47cb82e585.png)


## 404 Page Not Found 
![image](https://user-images.githubusercontent.com/87781597/158023261-a9b58781-45b6-47eb-a058-73bd005135f7.png)
