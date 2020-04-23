# Prerequisites:

Node must be installed on your machine in order to install the necessary node modules.

# Installing node modules:

In the DACPROJECT folder run

```
- npm install
```

# Creating executable:

Make sure to open your terminal in administrator mode.
Run the following commands in the DACPROJECT folder

```
- npm install electron-packager -g
- npm run electron-pack
- electron-packager ../DACPROJECT DACPROJECT --icon=./public/logo.ico --overwrite
```

# Running Executable:

Start the local node server my moving into the node folder and running the command

```
- node index.js
```

Move into the DACPROJECT-linux-x64 folder and locte the .exe file.
Double click the .exe

# Running Development Environment:

Move into the node folder and run the following command to strt the node server

```
- node index.js
```

_Open another terminal_
In the DACPROJECT folder run

```
- npm start
```

# To run electron development environment:

In the node folder run

```
- node index.js
```

_In another terminal and in the DACPROJECT folder run_

```
- npm start
```

_In another terminal run_

```
- npm run electron-pack
- npm run electron-start
```

# Source:

https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f

# Possible Issues

A common issue on windows is a lack of terminal permissions.
If you get an error saying something like this

```
    + electron-packager ../DACPROJECT DACPROJECT --icon=./public/logo.ico - ...

CategoryInfo : SecurityError: (:) [], PSSecurityException
 FullyQualifiedErrorId : UnauthorizedAccess

```

Open your terminal in administrator mode and run the command
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
then restart the terminal again in administrator mode and try the electron-packager command again.
