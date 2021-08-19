
# Gifzilla
To do react native we will be using Expo CLI

1. For Windows enviroments we should be running on WSL:Ubuntu on VSCode
2. Ubuntu or Mac command line can be used.
  - On command line $: sudo npm i -g expo-cli

3. Once that is install, go to VScode and install the following extensions:
  - React Native Tools
  - React-Native/React/Redux for exe6/es7
  - Prettier - Code formatter
  - Material Icon Theme.
4. On your phone download Expo Go from the apple store or Google Play, you can use your phone as emulator in case it gets stuck on the computer.
## ONLY FOR CREATION OF THE REACT-NATIVE NO NEED IF REPO IS CLONE
5.  Make a folder, where you want the app to be stored. 
  - $cd GA_dev/Giftzilla
  - $expo init giftzilla-app
6. Every time repo is clone or pulled do: npm install.
7. To run the basic react-native app
  - $expo start
  This will open Metro Bundler on the web brownser, this one let us use emulators and see javascript code.
  Scan QR code with Expo Go to view app.
8. On Adroid Studios, got to Tools >> SDK Manager
  - On SDK Platforms make sure you have Andriod 10.0 (Q)
  - On SDK tools make sure  you have: Android SDK Builder-Tools 31-rc4, Androind Emulator, Androind SDK Platform-Tools, Intel x86 Emulator Accelerator (HAXM installer).
11.  For Macs and Linux env ONLY.
  - Go to docs.expo.io/versions/latest/
  - Go to Managed Workflow, See Android Emulator and follow steps to set up the envorinment from there.
10. Everyone can do this step: Go to Tools >> AVD Manager
11.  That should provide you with a emulator. If not go to Create Virtual Devices and click Phone >> Pixel 3 and then click NEXT.
12.  Then click on the Q Recomendaed images and click NEXT it will start installing. Click on Q and then FINISH.
13.  Once the emulator is running in this case just Android. You can do changes to the App.js Under test. Try to change ir to "Hello World!!"
14.  Since the expo is already running it should show in the emulator if not on commant line. Do $npm start and it should redirect to the http://localhost:19002/ that will give you a QR code that can be scan form the expo App or youphone or use the command line and press a.
15. Allow on emulator the computer setttings abd press -a- again.

How to push to git, from now on.

1. Make a folder, where it can be asey to access and call it GA_dev. 
2. On the command line cd GA_dev
3. For Mac
  - git clone git@github.com:Giftzilla-app/Giftzilla.git.
  - cd Giftzilla
  For Windows
  - Go to git bash and cd  GA_dev
  - git clone git@github.com:Giftzilla-app/Giftzilla.git.
  - cd Giftzilla
5. Before starting your jira issue. You need to create a new branch with the jira number and title:
  - git checkout develop
  - git pull (It will give you everything that is on develop)
  - Command line: git checkout -b jira#/title (makes a copy of develop, while making a new branch)
  - Example: gif-74/homepage
 6. Once you complete the deliverables from your jira issues. Do
  - git status
    - check that the files that you mofied are there.
  - git add . (Use the dot only if the files that you modified are the only ones in the git status, if not use git add <name>)
  - git commit -m "Description of what has been done"
  - git push
 7. Then you can go to the repo page https://github.com/Giftzilla-app/Giftzilla go to your branch and create a pull request.
  - On title if is not already filled in use the same branch name.
  - Leave a description of what has been done on that branch.
  - Click create pull request.
 8. Once that is done check that there is no conflicts into the code and also wait for the review to give you comments.
 9. Once there is no conflict into the branch then and the review comments has been verified, then your code will be merge into the branch develop.

# Giftzilla

How to push to git, from now on.

1. Make a folder, where it can be asey to access and call it GA_dev. 
2. On the command line cd GA_dev
3. For Mac
  - git clone git@github.com:Giftzilla-app/Giftzilla.git.
  - cd Giftzilla
  For Windows
  - Go to git bash and cd  GA_dev
  - git clone git@github.com:Giftzilla-app/Giftzilla.git.
  - cd Giftzilla
5. Before starting your jira issue. You need to create a new branch with the jira number and title:
  - git checkout test
  - git pull (It will give you everything that is on test)
  - Command line: git checkout -b jira#/title (makes a copy of develop, while making a new branch)
  - Example: gif-74/homepage
 6. Once you complete the deliverables from your jira issues. Do
  - git status
    - check that the files that you mofied are there.
  - git add . (Use the dot only if the files that you modified are the only ones in the git status, if not use git add <name>)
  - git commit -m "Description of what has been done"
  - git push
 7. Then you can go to the repo page https://github.com/Giftzilla-app/Giftzilla go to your branch and create a pull request.
  - On title if is not already filled in use the same branch name.
  - Leave a description of what has been done on that branch.
  - Click create pull request.
 8. Once that is done check that there is no conflicts into the code and also wait for the review to give you comments.
 9. Once there is no conflict into the branch then and the review comments has been verified, then your code will be merge into the branch develop.

