# Cloud Native Application Devleopment Final Project: Stadium Matching App

This is a project for the course Cloud Native Application Development in National Taiwan University. The project is a web application that aims to help users find the most suitable stadium for their needs and find other players to play with. The app also provides a platform for stadium owners to manage their stadiums and for players to manage their reservations.

## Description

This app is a stadium matching application that aims to help users find the most suitable stadium for their needs and find other players to play with. The app also provides a platform for stadium owners to manage their stadiums and for players to manage their reservations. The app is built with React and Express.js and uses PostgreSQL as the database. The app is deployed on AWS.

## Getting Started

### Dependencies

#### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://material-ui.com/)
- [Axios](https://axios-http.com/)
- [React-hook-form](https://react-hook-form.com/)
- [Leaftlet](https://leafletjs.com/)
- [React-leaflet](https://react-leaflet.js.org/)

#### Backend
Express.js, PostgreSQL, Prisma, AWS

### Installing

#### Frontend
See the Executing program section for instructions on how to install the dependencies.

#### Backend

Before starting the server, you need to create a .env file in the backend directory and add the following environment variables:
```
DATABASE_URL="[database endpoint]"
PORT="[port number]" 
```
After that, you need to install the dependencies by running the following command in the backend directory:
```
npm install
```

### Executing program

#### Frontend
Start the frontend by running the following commands in the frontend directory:
```
yarn install
yarn run dev
```

#### Backend

To start the server under developmment, run the following command in the backend directory:
```
npm run dev
```
To start the server under production, run the following command in the backend directory:
```
npm run start
```
To generate the swagger documentation, run the following command in the backend directory:
```
npm run swagger-autogen
```
## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Frontend: [@minchenlee](https://github.com/minchenlee)、灝融、宥圻
Backend: 立曄、[@brandon9912](https://github.com/brandon9912)、啟湘
