# Server

## Prerequisites

- Node.js
- Node Package Manager(npm)

## How to setup the environment

1. Go to the frontend folder
2. Run `npm install` in the app directory
3. Run `npm start` to start dev server
4. Run `npm install bootstrap` if dependency is required
   ## Error example of dependency missing:
   Module not found: Can't resolve 'react-bootstrap' in '/mnt/c/Users/xyz/Documents/Giftzilla/frontend/src/'
5. Run `npm install react-bootstrap`
6. Note: run `npm install` after every git pull

## Pushing to heroku (need a heroku login)

1. sudo heroku login
2. heroku git:remote -a giftzilla15
3. git add -A
4. git commit -m "add comment"
   ## Error example:
   Please tell me who you are.
   Enter in command line:
   $git config --global user.email "your github email"
   $git config --global user.name "your github username"
   Commit again
5. git push heroku <BranchName>:main (example: GIF-63/heroku_setup:main)
6. go to: https://giftzilla15.herokuapp.com/

## TIP: if for some reason it is not working, try to reset all the project dependencies

1. Delete the package-lock.json file and node-modules folder;
2. then re-install node modules using `npm install`.
