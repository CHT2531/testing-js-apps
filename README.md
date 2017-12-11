# Testing JavaScript Applications

There are two parts to this 

1. Unit testing using the jasmine framework
2. End-to-end testing using Nightwatch

First open *app/index.html* in a browser and *app/js/app.js* in a text editor. Familiarise yourself with this simple application. We are going to run tests on this app.

## Unit testing using Jasmine
Jasmine can be run as a Node.js package or in *standalone* mode where we don't need to use Node.js. We will use standalone mode as it keeps things a bit simpler. 
* From https://github.com/jasmine/jasmine/releases download *jasmine-standalone-2.8.0.zip*.
* Unzip the folder.
* Move the contents of this folder into the *unit-tests* folder.   
* From the *unit-tests* folder, open *SpecRunner.html* in a browser. This is a web page that shows the results of the Jasmine tests. At the moment it just has some example tests. 
* Look in the folder structure:
    * The *src* folder is where the src files are. The actual JavaScript code that we want to test
    * The *spec* folder is where the tests are stored. 
    * Open *SpecRunner.html* in a text editor, see how it links to the *src* files first and then the *spec* files. 

### Creating your own test spec
Create a new JavaScript file. Add the following code
```
describe("hasPassed", function() {
  it("should return true if passed a mark of 50", function() {
    var result = hasPassed(50);
    expect(result).toEqual(true);
  });
});
```
* Save this file as *PassAppSpec.js* in the *spec* folder. 
* In *SpecRunner.html* we now need to say that we want to test *app.js* from our application, and use *PassAppSpec.js* to test it. Your *SpecRunner.html* needs to look like the following (the link to the *app.js* might be different depending on your directory structure)

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Jasmine Spec Runner v2.8.0</title>
  <link rel="shortcut icon" type="image/png" href="lib/jasmine-2.8.0/jasmine_favicon.png">
  <link rel="stylesheet" href="lib/jasmine-2.8.0/jasmine.css">
  <script src="lib/jasmine-2.8.0/jasmine.js"></script>
  <script src="lib/jasmine-2.8.0/jasmine-html.js"></script>
  <script src="lib/jasmine-2.8.0/boot.js"></script>
  
  <!-- include source files here... -->
  <script src="../app/js/app.js"></script>

  <!-- include spec files here... -->
  <script src="spec/PassAppSpec.js"></script>

</head>

<body>
</body>
</html>
```
* Open *SpecRunner.html* in a browser you should see that you have passed the single test. 

### On your own:
Add some additional tests for the *hasPassed()* function e.g. passing a value of 30. You can find info on the Jasmine commmands here https://jasmine.github.io/2.8/introduction .

## End-to-end testing with Nightwatch.js

There is quite a lot of setting up to do here, so follow these steps carefully. 

* *Nightwatch.js* is a Node.js application. First, in the root of the project folder, declare this is a Node.js project

```
npm init -y
```

* Next install Nightwatch.js:
```
npm install -g nightwatch
```

* Next we need to install a node package *chromedriver*. This will handle the automatic running of chrome.

```
npm install chromedriver
```

* Next we have to set up some configuration. In the root of your project add the following *nightwatch.json* configuration file.
```
{
  "src_folders" : ["tests"],
  "output_folder" : "reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "./globals.js",

  "selenium" : {
    "start_process" : false
  },

  "test_settings" : {
    "default" : {
      "selenium_port"  : 9515,
      "selenium_host"  : "localhost",
      "default_path_prefix" : "",

      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions" : {
          "args" : ["--no-sandbox"]
        },
        "acceptSslCerts": true
      }
    },
    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    },
  }
}
```
* We also need another file that will start and stop chrome when we run our tests:
```
var chromedriver = require('chromedriver');
module.exports = {
  before : function(done) {
    chromedriver.start();

    done();
  },

  after : function(done) {
    chromedriver.stop();

    done();
  }
}; 
```
* Save this file as *globals.js* also in the root of your project. 

You can read about these settings at http://nightwatchjs.org/gettingstarted#chromedriver. However, both of the these files will be the same every time we do this. 

* Finally we can actually write the tests. 
* Create a new javaScript file, *tests.js*. 
* Add the following code
* Change the URL so that it points at your *index.html* page. 
* Save it in the *tests* folder

```
module.exports = {
  'Demo' : function (browser) {
    browser
    .url('path/to/your/index.html')
    .waitForElementVisible('body', 1000)
    .pause(2000)
    .setValue('#mark', '70')
    .pause(2000)
    .click('#btn')
    .pause(2000)
    .assert.containsText('#feedback', "Well done you've passed")
    .end();
  }
};
```
To run the tests:
```
nightwatch tests/test1.js
```
* The browser should open and a value of 70 get entered into the text box
* In the Command Prompt you should get feedback that you have passed the tests. 

### On Your Own
Try to add another test e.g. for the user entering a value of 30 into the textbox. Use http://nightwatchjs.org/api for a guide on the different commands you can use. 
