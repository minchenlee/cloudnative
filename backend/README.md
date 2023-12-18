# Stadium Matching App Backend
## Description
Stadium Matching App Backend Server

## Environment requirements
Before you can use this application, make sure that you have the following requirements installed:
- Node.js (version 16 or higher)
- Express (version 4 or higher)

## How to use
After making sure that your development environment meets the requirements, follow these steps to start the application:

1. Clone this repository.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install all required dependencies:
```bash=
npm install
```
4. Configure the database by copying the `env_example` file to `.env` and updating the values to match your database configuration.
5. Run the following command to start the application:
```bash=
npm start `or` npm start:dev 
```
6. In your browser, enter the following URL to use the application:
```bash=
http://localhost:5000/api/v1
```

## how generate coverage/
```bash=
npx jest --coverage
```