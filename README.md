# Job Board

# Specs
- Node (runtime)
- Typescript (JS typing)
- Express (web server)
- EJS (templating engine)

# Project Structure
job-board
- View
  - The EJS views to render to the requestor
- Controllers
  - Functions running on the server that return data to populate the views with
- appsettings.json
  - configuration for the server and view engine

# Run
Steps to run:
- clone the repository:
  ```
  git clone https://github.com/radmantvk/job-board.git
  ```
- Navigate to the root of the project in your terminal
- Install dependencies:
  ```
  npm i
  ```

- Run
  - Development:
    ```
    npm run dev
    ```

  - Production:
    ```
    npm run start
    ```

# Testing
Testing is done with [Jest](https://jestjs.io/).

Running tests:
```
npm run test
```