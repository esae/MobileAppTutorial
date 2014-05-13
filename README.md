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
3. _js/adapter/jsonp-adapter-fhnw.js_ is used to connect to the Java EE 7 & REST backend (JSONP communication)

### Step 1.1: Run the App
1. Run the application using the Embedded WebKit Browser of NetBebans or use Chrome.
2. Check if everything works properly.

## Step 2: Avoid the 300ms Click Delay
There is usually a strange behaviour when using the app on iOS devise - called click delay. "This delay occurs because the operating system is waiting roughly 300ms to see if the user is going to tap the target again (and therefore perform a double-tap)".

1. "In index.html, add the following script tag":
```html 
<script src="js/libs/fastclick/fastclick.js"></script>
```

"FastClick is an open source library built by the Financial Times. More information this [here](https://github.com/ftlabs/fastclick).."

2. In index.js, register FastClick inside the deviceready event handler, as follows:
```javascript 
FastClick.attach(document.body); 
```

## Step 3: Setting Up a Single-Page Application
"A “Single-Page Application” is a web application that lives within a single HTML page. The “views” of the application are injected into and removed from the DOM as needed as the user navigates through the app. A single-page application architecture is particularly well suited for mobile apps":
- "The absence of page refreshes provides a more fluid and closer to native experience".
- "The UI is entirely created at the client-side with no dependency on a server to create the UI, making it an ideal architecture for applications that work offline".

"In this section, we set up the basic infrastructure to turn Employee Directory into a single-page application":

1. "In index.html: remove the HTML markup inside the body tag (with the exception of the script tags)."
2. "Inside the immediate function in index.js, define a function named renderHomeView() (right after the findByName function). Implement the function to programmatically add the Home View markup to the body element."
```javascript
function renderHomeView() {
    var html =
        "<h1>Directory</h1>" +
        "<input class='search-key' type='search' placeholder='Enter name'/>" +
        "<ul class='employee-list'></ul>";
    $('body').html(html);
    $('.search-key').on('keyup', findByName);
}
```
3. "Modify the data adapter initialization logic: when the adapter has been successfully initialized, call the renderHomeView() function to programmatically display the Home View. "
```javascript
var adapter = new JSONPAdapterFHNW();
    adapter.initialize().done(function() {
        renderHomeView();
    });
```

4. "Since you moved the registration of the keyup event inside the renderHomeView() function, make sure you remove the original event registration in the Event Registration section."
5. Check if everything works properly.