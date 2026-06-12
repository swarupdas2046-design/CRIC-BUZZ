# Cricbuzz Project

This project is a work-in-progress cricket application inspired by Cricbuzz.
The backend setup currently includes Express, environment configuration, logging, and MongoDB connection structure.

## Backend Status

Current backend work includes the basic auth registration flow with user model, auth route, controller, password hashing, and JWT token generation.

## Pending Work

The following backend parts are not implemented yet:

- Google authentication
- Global error handler middleware
- Services folder / service layer structure

Team members should avoid assuming these parts are available until they are added in future commits.

## Folder Structure

```txt
Cricbuzz-Project/
|-- README.md
|-- Client/
|   |-- README.md
|   |-- eslint.config.js
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- vite.config.js
|   |-- public/
|   |   `-- vite.svg
|   `-- src/
|       |-- App.css
|       |-- App.jsx
|       |-- index.css
|       |-- main.jsx
|       `-- assets/
|           `-- react.svg
`-- Server/
    |-- package-lock.json
    |-- package.json
    `-- src/
        |-- app.js
        |-- server.js
        |-- config/
        |   |-- env.js
        |   `-- logger.js
        |-- constant/
        |   `-- app.constant.js
        |-- controllers/
        |   `-- auth.controller.js
        |-- database/
        |   `-- mongodb.js
        |-- models/
        |   `-- auth.models.js
        |-- routes/
        |   `-- auth.route.js
        `-- utils/
            `-- token.js
```
