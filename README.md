# Welcome to the Mobile App Tutorial
_This is modified version of the Cordova / PhoneGap Tutorial by Christophe Coenraets (http://coenraets.org/blog/cordova-phonegap-3-tutorial/) as step by step showcase for our students @ FHNW. Original text is marked using direct quotation ""_

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

## Step 4: Using Handlebars Templates
"Writing HTML fragments in JavaScript and programmatically inserting them into the DOM is tedious. It makes your application harder to write and harder to maintain. HTML templates address this issue by decoupling the UI definition (HTML markup) from your code. There are a number of great HTML template solutions, including Mustache.js, Handlebars.js, and Underscore.js to name a few."

"In this section, we create two templates to streamline the code of the Employee Directory application. We use Handlebars.js but the same result can be achieved using the other HTML template solutions."

### Step 4.1
"Modify index.html as follows:"

1. "Add a script tag to include the handlebars.js library: "
```javascript
<script src="js/libs/handlebars.js/handlebars.min.js"></script>
```
2. "Create an HTML template to render the Home View. Add this script tag as the first child of the body tag:"
```javascript
        <script id="home-tpl" type="text/x-handlebars-template">
            <div class="topcoat-navigation-bar">
                <div class="topcoat-navigation-bar__item center full">
                    <h1 class="topcoat-navigation-bar__title">Employee Directory</h1>
                </div>
            </div>
            <div class="search-bar">
                <input type="search" placeholder="search" class="topcoat-search-input search-key">
            </div>
            <div class="topcoat-list__container">
                <ul class="topcoat-list list employee-list" style="overflow: visible"></ul>
            </div>
        </script>
```
3. "Create an HTML template to render the employee list items. Add this script tag immediately after the previous one:"
```javascript
        <script id="employee-li-tpl" type="text/x-handlebars-template">
            {{#.}}
            <li class="topcoat-list__item">
                <a href="#employees/{{id}}">
                    <img src="assets/pics/{{pic}}">
                    <p>{{firstName}} {{lastName}}</p>
                    <p>{{title}}</p>
                    <span class="chevron"></span><span class="count">{{reports}}</span>
                </a>
            </li>
            {{/.}}
        </script>
```
4. Add topcoat-mobile-light.css to the head of index.html
```html
<link href="js/libs/topcoat/css/topcoat-mobile-light.css" rel="stylesheet">
```
### Step 4.2
Modify the immediate function in index.js as follows:

1. "Immediately before the adapter variable declaration, declare two variables that hold the compiled version of the templates defined above: "
```javascript
	var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
```
2. "Modify renderHomeView() to use the homeTpl template instead of the inline HTML: "
```javascript
function renderHomeView() {
    $('body').html(homeTpl());
    $('.search-key').on('keyup', findByName);
}
```
3. "Modify findByName() to use the employeeLiTpl template instead of the inline HTML:"
```javascript
function findByName() {
    adapter.findByName($('.search-key').val()).done(function (employees) {
        $('.employee-list').html(employeeLiTpl(employees));
    });
}
```
4. Check if everything works properly.

## Step 5: Creating a View Class
To provide the app some structure we are going to create a HomeView object that encapsulates the logic to create and render the Home view.

### Step 5.1: Create the HomeView Class
1. "Create a file named HomeView.js in the js directory, and define a HomeView constructor implemented as follows:"
```javascript
var HomeView = function (adapter, template, listItemTemplate) {
 
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };
 
    this.initialize();
 
};
```
2. Remove the renderHomeView() function from index.js
3. Add the renderHomeView() to HomeView.js and rename it as follows:
```javascript
    this.render = function() {
        this.el.html(template());
        return this;
    };
```
4. Move the findByName() function from index.js to HomeView.js:
```javascript
    this.findByName = function() {
        adapter.findByName($('.search-key').val()).done(function(employees) {
            $('.employee-list').html(listItemTemplate(employees));
        });
    };
```

### Step 5.2: Using the Home View
1. "In index.html, add a script tag to include HomeView.js (just before the script tag for index.js)":
2. "Pass the adapter, the Home View template, and the employee list item template as arguments to the Home View constructor:"
```javascript
    adapter.initialize().done(function() {
        $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
    });
```
3. Check if everything works properly.

## Step 6: Implementing Native Scrolling
If you shrink your browser, you will notice that the entire view (including the header) is scrolling. Now we are going to anchor the header.
1. In the index.html (home-tpl), add a css class named scroller to the div surrounding the employee list ul. 
```html
            <div class="topcoat-list__container scroller">
                <ul class="topcoat-list list employee-list" style="overflow: visible"></ul>
            </div>
```
2. Check if everything works properly.

## Step 7: View Routing
Now we are going to add an employee details view.

### Step 7.1: Create the employee template
"Open index.html and add a template to render a detailed employee view:"
```html
        <script id="employee-tpl" type="text/x-handlebars-template">
            <div class="topcoat-navigation-bar">
                <div class="topcoat-navigation-bar__item left quarter">
                    <a class="topcoat-icon-button--quiet back-button" href="#">
                        <span class="topcoat-icon topcoat-icon--back"></span>
                    </a>
                </div>
                <div class="topcoat-navigation-bar__item center half">
                    <h1 class="topcoat-navigation-bar__title">Employee</h1>
                </div>
            </div>
            <div class='details'>
                <img src="assets/pics/{{pic}}" class="employee-image">
                <h1>{{firstName}} {{lastName}}</h1>
                <h2>{{title}}</h2>
                <h2>{{city}}</h2>
                <div class="topcoat-list__container scroller">
                    <ul class="topcoat-list list actions">
                        {{#if managerId}}
                        <li class="topcoat-list__item"><a href="#employees/{{managerId}}"><p>View Manager</p><p>{{managerName}}</p><div class="action-icon icon-manager"/></a></li>
                        {{/if}}
                        <li class="topcoat-list__item"><a href="tel:{{officePhone}}"><p>Call Office</p><p>{{officePhone}}</p><div class="action-icon icon-call"/></a></li>
                        <li class="topcoat-list__item"><a href="tel:{{cellPhone}}"><p>Call Cell</p><p>{{cellPhone}}</p><div class="action-icon icon-call"/></a></li>
                        <li class="topcoat-list__item"><a href="sms:{{cellPhone}}"><p>SMS</p><p>{{cellPhone}}</p><div class="action-icon icon-sms"/></a></li>
                        <li class="topcoat-list__item"><a href="mailto:{{email}}"><p>Email</p><p>{{email}}</p><div class="action-icon icon-mail"/></a></li>
                    </ul>
                </div>
            </div>
        </script>
```

### Step 7.2: Create an EmployeeView class
1. "Create a file named EmployeeView.js in the js directory, and define an EmployeeView constructor implemented as follows: "
```javascript
var EmployeeView = function(adapter, template, employee) {
 
    this.initialize = function() {
        this.el = $('<div/>');
    };
    
    this.initialize();
 
};
```
2. "Define a render() function implemented as follows: "
```javascript
    this.render = function() {
        this.el.html(template(employee));
        return this;
    };
```
3. "In index.html, add a script tag to include EmployeeView.js (just before the script tag for index.js): "
```html
<script src="js/EmployeeView.js"></script>
```

### Step 7.3: Implement View Routing
1. "Open index.js. In the Local Variables section, declare a variable named employeeTpl that holds the compiled template for the employee details view: "
```javascript
var employeeTpl = Handlebars.compile($("#employee-tpl").html());
```
2. "In the Local Variables section, declare a variable named detailsURL that holds a regular expression to match employee details URLs. "
3. "In the Event Registration section, add an event listener to listen to URL hash tag changes: "
```javascript
var employeeTpl = Handlebars.compile($("#employee-tpl").html());
```
4. "In the Local Functions section, define a route() function to route requests to the appropriate view:"
	1. "If there is no hash tag in the URL, display the HomeView"
	2. "If there is a hash tag matching the pattern for an employee details URL, display an EmployeeView for the specified employee."
```javascript
function route() {
    var hash = window.location.hash;
    if (!hash) {
        $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
        return;
    }
    var match = hash.match(detailsURL);
    if (match) {
        adapter.findById(Number(match[1])).done(function(employee) {
            $('body').html(new EmployeeView(adapter, employeeTpl, employee).render().el);
        });
    }
}
```
5. "Modify the adapter initialization logic to call the route() function when the adapter has been successfully initialized: "
```javascript
adapter.initialize().done(function () {
    route();
});
```
6. Check if everything works properly.