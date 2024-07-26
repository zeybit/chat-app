This project is a chat application with event management features, allowing users to create, update, and delete events, as well as chat with other users. It includes user registration and login functionality and provides a calendar view for scheduling and managing events.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building APIs and handling routes.
- **MongoDB**: NoSQL database for storing user and event data.
- **Mongoose**: ODM library for modeling MongoDB data with schemas.

### Frontend
- **React**: JavaScript library for building user interfaces.

https://github.com/user-attachments/assets/ab71295a-ec44-40b4-9489-f191c9170254


- **Styled Components**: CSS-in-JS library for styling React components.
- **Axios**: Library for making HTTP requests to the backend.

## Features

- User registration and login.
- Create, update, and delete events.
- View events on a calendar.
- Chat functionality between users.
- Event management with participants.
- ### Prerequisites

- Node.js
- MongoDB

For Frontend.
```shell
cd public
yarn start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell

cd server
 yarn start
```
Done! Now open localhost:3000 in your browser.

#### Second Method
- This method requires docker and docker-compose to be installed in your system.
- Make sure you are in the root of your project and run the following command.

```shell
docker compose build --no-cache
```
after the build is complete run the containers using the following command
```shell
docker compose up
```
now open localhost:3000 in your browser.
