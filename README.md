# Welcome to the Mobile App Tutorial
_This is modified version of the Cordova / PhoneGap Tutorial by Christophe Coenraets (http://coenraets.org/blog/cordova-phonegap-3-tutorial/) as step by step showcase for our students @ FHNW._

## Requirements
* NetBeans IDE, Java - 8.0
* Java Development Kit (JDK) - version 7
* Apache Cordova
* NodeJS
* Git

## Installing Cordova
_This following section is a modified version of: https://netbeans.org/kb/docs/webclient/cordova-gettingstarted.html_

You need to install Cordova on your local system to package an HTML5 application as a native mobile application with NetBeans IDE. You will use npm, the NodeJS package manager, to install and to update Cordova. 

You will perform most of the following steps in this exercise in your terminal window.

1. Download and install Node.js, if not already installed. You can download the installer from the [Node.js site](http://nodejs.org/).
2. Open a terminal window.
3. Run the following command to confirm that Node.js is installed.
`node -v` _If node.js is installed you will see a version printed in the terminal window._
4. Run the following command to install Cordova.
`npm install -g cordova`
5. Run the following command to confirm that Cordova is installed and to view the version.
_If Cordova is installed you will see a version printed in the terminal window._

You now have all the tools that you need to develop and package a native mobile application in the IDE. 

## Step 0: Import Projects Files to NetBeans
1. Download the master files from this GitHub Project [this GitHub Project](https://github.com/esae/MobileAppTutorial). _There exists for every step a folder._
2. Unzip the ZIP file.
3. Import the Project of 'Step 1' to NetBeans

## Step 1: Inspect Project
1. _index.html_ is the main view of this cordova app.
2. _js/index.js_ contains the application logic of the app.
3. _js/adapter/jsonp-adapter-fhnw.js is used to connect to the Java EE 7 & REST backend (JSONP communication)

### Step 1.1: Run the App
1. Run the application using the Embedded WebKit Browser of NetBebans or use Chrome.
2. Check if everything works properly.

## Step 2: 