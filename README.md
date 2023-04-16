# Quickstep - Backend Server

Real-time live location tracking app in Flutter - Backend server

## Features and functionalities

- Real-time live location changing server side functionalities:
- - User location's coordinates changing in real-time and emit to other users within the room
- - Join and leave movement room
- - Notify other users when user join or left movement room
- - Retrieve current users within movement room
- Chat messages (send or receive text message by your colleague in real-time)
- Register user
- Login user
- Verifying account by email
- Send or resend OTP by email
- Expiring tokens after two hours
- Creating profile
- Create, delete or leave movement
- Generating, clearing or receiving notifications
- Accept or decline joining movement request

## Api & Demo
- API url: [https://quickstep.up.railway.app/](https://quickstep.up.railway.app/)

- You can find full demo video of the client side on YouTube via: [https://www.youtube.com/watch?v=V_tnQ8OqVaw](https://www.youtube.com/watch?v=V_tnQ8OqVaw)

## Client

- Flutter mobile application is available via this repository: [https://github.com/aimelive/quickstep_app](https://github.com/aimelive/quickstep_app)

## API Documentation

You can find api documentation made with swagger here:

```bash
https://quickstep.up.railway.app/api/v1/docs/
```

## Run locally

- Clone this repository
```bash
git clone https://github.com/aimelive/quickstep-backend
```
- Run the following command in your terminal to go into project root folder
```bash
cd quickstep-backend
```
- Create `.env` file in the root folder and fill out all variables specified in `.env.example` file
- Run `npm install` to get all project dependencies
- Run the following command in your terminal to launch localhost server

```bash
npm start
```
- - Or 
```bash 
npm run dev
``` 
- - to launch localhost developement server on 3000 or the specified port
- There you go, now you should be able to test the app by typing `https://localhost:[YOUT_PORT]/api/v1/` in your browser or other apps that can help you to make restful api requests like Postman, Thunder client, SOAP or etc.
## Pre-requisites

- You should have the following to run this project locally:
- - Node JS
- - TypeScript
- - MongoDB
- - S3 Bucket
- - Email Service Provider (Ex: gmail, in order to be able to send emails using nodemailer).

### Technologies

- Socket.io
- TypeScript/Node JS/Express
- MongoDB
- Agenda
- AWS S3 Bucket
- Nodemailer
- Swagger

### Known issue

- Signed url of the profile picture expires after 1 week since we're using free version of S3 bucket to upload and store profile images.
  Message: `Signature version 4 presigned URLs must have an expiration date less than one week in the future`
### Author
- [Aime Ndayambaje](https://github.com/aimelive)
### Contact Me
- For any ideas, suggestions, improvements, guidance or questions regarding this project, please contact me via my email [aimendayambaje24@gmail.com](mailto:aimendayambaje24@gmail.com) or LinkedIn [Aime Ndayambaje](https://linkedin.com/in/aime-ndayambaje)
