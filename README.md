[![Build Status](https://travis-ci.org/IamTechknow/d2sbackend.svg?branch=master)](https://travis-ci.org/IamTechknow/d2sbackend)
# Diablo II Save File Generator

## Introduction
**d2sbackend** is a Single-page application powered by Spring Boot, React, and Bootstrap. As a project it demonstrates using Spring and React via Gradle.
As a web application, visitors may select from a variety of options to build a valid save file for Diablo II 1.13c single player mode that can be downloaded. This project will be made to be hosted on a cloud service and live production environment.

## Specification
User Stories:
* [ ] As a user, I should be able to choose the following options to customize the save file:
  * [X] Character Name
  * [X] Character Level
  * [X] Character Class
  * [X] Character Attributes
  * [X] Character Skills
  * [X] Game Difficulty
  * [X] Game Mode (Expansion / Hardcore)
  * [X] Current Act
  * [X] Gold
  * [X] Quests
  * [ ] Items
  * [ ] Mercenary
  * [ ] (Optional) Patch Version
* [X] As a user, I can start the process of creating the save file and either get a download link or an error message
* [ ] As a user, I should be able to view details about the save

Developer Stories:
* [X] As a developer, I should be able to receive the input data from the user
* [X] As a developer, I should be able to validate the input from the page and a given save
* [X] As a developer, I should be able to generate a save file and a link
* [ ] As a developer, I should be able to create integration tests that can automate the process of creating a save file and using the d2s go library to verify certain save properties
* [X] As a developer, I should be utilize CI to be able to push changes from Github into a staging or production cloud environment

## Instructions
To run this web application locally, clone this repo, open Intellij IDEA, and open the repository root directory.
Go to the Gradle section at the right, press the Gradle Icon, run the `bootRun` task. You may now load the web app at localhost:8080.

For continuous building, open a terminal and run gradlew with the `build --continuous` command (won't work inside IDEA), 
then run the `bootRun` task inside IDEA. Gradle will automatically rebuild the project upon changes, and Spring will automatically reload
the server.

## Implementation Details

### Gradle
The Gradle build system allows seamless build integration between the Spring backend and the React frontend. 
The build script utilizes Spring and Node plugins to setup both Spring and Webpack. A Webpack task is declared to run the NodeJS Webpack script to build the React application.
This task is executed when the gradle `bootRun` task is executed from the gradle wrapper or IDEA, which compiles the Java sources, creates the Webpack bundle, and executes the created JAR.

### Java
The Spring controller will serve the index HTML which references the bundle script and contains a div element for the React application.
When the form is submitted, data binding occurs in the Spring application to automatically parse the D2Save model object, 
and JSON is returned as the response to be processed in the Single-page application.

The data binding works as follows: Spring uses reflection to parse each form key-value pair in relation to the model attribute type, the `D2Save` class. 
The key needs to refer to a field name in the class. To refer to objects, a dot and then the name for a field in the object is added to the key, for example `rewards.den`.
To create an array, every value in the form that should be in the array needs to have a bracket with an index number in the key, for example `attr[0]`.

After the form data is successfully parsed, a JSON response is sent back with the download link for the save. The download link is routed to a binary file generated on the fly.

The `org.springframework.boot:spring-boot-starter-thymeleaf` Gradle dependency may seem extraneous but is necessary for Spring's templating (and perhaps other features) to work. 
Omitting it will cause a 404 error for the index page.

### JavaScript
During the `bootRun` task, the Webpack bundle gets generated based on the configurations in package.json and webpack.config.js. 

In `package.json`, `babel` and the `transform-class-properties` are declared to allow transcribing of ES6 JavaScript code as well as React JSX. 
In `webpack.config.js`, the app entry point, bundle output location, and module rule to use `babel-loader` are defined.
The development mode is defined in `webpack.config.js`, omitting it or using production mode will optimize bundle size and use production libraries for React.

In the entry point, the index page is routed to render the `Form` component which makes up all of the UI. The state kept in the `Form` class represents 
all of the data to be inserted into the form once the user clicks submit, as well as form validation.

In React, a change to the component state will cause the component to be re-rendered by calling the `render()` function. 
Therefore, all form elements are controlled, that is their value are based on the `Form` component by passing down the state as props to all sub-components, including the form handler which is used to call `this.setState()`.
The form handler relies on the name attributes of all input elements which may be used as keys to change the state of the `Form` component, therefore it is generic and can scale up to a large number of unique input elements.
More importantly, it allows changes to the state to flow back up to the `Form` component.

When the user clicks submit, another handler is invoked. The form data gets validated to determine if the save file to be made is indeed valid. 
When determined valid, the handler will add the quest and attribute data to the form which are represented by an object and array in Java. 
Then the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used to send a POST request to the index endpoint to interact with Spring.
Otherwise when invalid, Bootstrap styled alerts will be displayed indicating the form error(s).

Bootstrap and the [material-ui](https://material-ui.com/) React library are used to enhance the form's appearance, to organize input elements by grids, and to create tabs for navigation. 
The popover feature allows skill dependencies to be displayed when the mouse cursor is over a skill input. 

Information about the Diablo II binary save file format may be found [here.](https://github.com/nokka/d2s)
