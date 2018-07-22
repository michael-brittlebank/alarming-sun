# Alarming Sun #


## Description ##


* Sunrise simulation and gradual music alarm clock


## Software Architecture (High Level) ##


* This dual iOS and Android stack is built on [React Native](https://facebook.github.io/react-native/) with [Redux](https://github.com/reactjs/redux) for managing view states and [React Navigation](https://reactnavigation.org/) for routing.


## Technical Requirements ##


* Node.js 6.3.1
* JavaScript ES6
* NPM ~3.10.3 


## How to set up a local environment ##

NPM installs project dependencies (only needed once).  

After cloning the repo:
```
yarn install
```


## How to run the project for development after setup - iOS ##
Set up the environment according to the [documentation](https://facebook.github.io/react-native/docs/getting-started.html).

This compiles the files and starts up the emulator for development
```
react-native run-ios
```


## How to run the project for development after setup - Android ##
Set up the environment according to the [documentation](https://facebook.github.io/react-native/docs/getting-started.html).

This compiles the files and starts up the emulator for development
```
react-native run-android
```


## How to run the project for production - iOS ##
The [standard steps](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) need to be followed to publish an app.

This compiles the minified files for production
```
react-native run-ios --configuration Release
```


## How to run the project for production - Android ##
The [standard steps](https://developer.android.com/studio/publish/index.html) need to be followed to publish an app.

This compiles the minified files for production
```
react-native run-android --variant=release
```