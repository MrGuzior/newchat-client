# New Chat (SaltChat)

[Live version](https://wizardly-mccarthy-d0859c.netlify.app/) _Might take a minute for the server to wake up_

[Server github repository](https://github.com/MrGuzior/newchat-server)

A chat app for browser desktop use (Not optimized for mobile screens). Client is written in TypeScript Node enviroment using React and Socket.IO.

## Install and Run

Clone and install its dependencies:

```bash
git@github.com:MrGuzior/newchat-client.git
cd newchat-client
npm i
```

To run the server in development mode, use:

```bash
npm start
```

To run the server in production mode, use:

```bash
npm run build
```

## Test

One e2e test is provided that tests the entire application. Make sure no user is logged in to the app if you run the test on the same PORT as your development server.

```bash
npm run test
```

## Project Structure

All the code is located in the src directory. The folder structure inside src directory is as followes:

- Components: Contains all react components
- context: Contains the chat context use in components
- service: Contains the file SocketService.ts where all socket actions are defined
- store: Contains one store that combines all the redux reducers
- tests: Contains e2e and unit tests
- types: contains type interfaces

