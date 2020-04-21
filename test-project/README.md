prerequisites:
You must have git and node installed on your machine in order to build the executable and run the node server.

To create executable of project:
npm run electron-pack
electron-packager ../test-project DACPROJECT --icon=./public/logo.ico --overwrite

To start the server:
Move into the node directory and run
node index.js

To start development server:
npm start
Open another terminal
cd into the node directroy and run
node index.js
Open another terminal
npm run electron-pack
npm run electron-start
Source: https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f
