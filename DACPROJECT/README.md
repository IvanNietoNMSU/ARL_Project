# Prerequisites:

Node must be installed on your machine in order to install the necessary node modules.

# Installing node modules:

In the DACPROJECT folder run
npm install

# Creating executable:

Run the following commands in the DACPROJECT folder
npm run electron-pack
electron-packager ../DACPROJECT DACPROJECT --icon=./public/logo.ico --overwrite

# Running Executable:

Start the local node server my moving into the node folder and running the command
node index.js
Move into the DACPROJECT-linux-x64 folder and locte the .exe file.
Double click the .exe

# Running Development Environment:

Move into the node folder and run the following command to strt the node server
node index.js
_Open another terminal_
In the DACPROJECT folder run
npm start

# To run electron development environment:

In the node folder run
node index.js
_In another terminal and in the DACPROJECT folder run_
npm start
_In another terminal run_
npm run electron-pack
npm run electron-start

# Source:

https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f
