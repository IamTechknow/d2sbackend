[![Build Status](https://travis-ci.org/IamTechknow/d2sbackend.svg?branch=master)](https://travis-ci.org/IamTechknow/d2sbackend)
# Diablo II Save File Generator

## Introduction
**d2sbackend** is planned to be a single page application powered by Spring Boot and React. As a web application, visitors may select from a variety of options to build a valid save file for Diablo II 1.13c single player mode that can be downloaded. This project will be made to be hosted on a cloud service and live production environment.

## Specification
User Stories:
* [ ] As a user, I should be able to choose the following options to customize the save file:
  * [X] Character Name
  * [X] Character Level
  * [X] Character Class
  * [ ] Character Attributes
  * [ ] Character Skills
  * [X] Game Difficulty
  * [X] Game Mode (Expansion / Hardcore)
  * [ ] Current Act
  * [X] Gold
  * [ ] (Optional) Patch Version
* [X] As a user, I can start the process of creating the save file and either get a download link or an error message
* [ ] As a user, I should be able to view details about the save

Developer Stories:
* [X] As a developer, I should be able to receive the input data from the user
* [ ] As a developer, I should be able to validate the input from the page and a given save
* [X] As a developer, I should be able to generate a save file and a link
* [ ] As a developer, I should be able to unit test the save generation
* [X] As a developer, I should be utilize CI to be able to push changes from Github into a staging or production cloud environment

## Instructions
To run this web application locally, clone this repo, open Intellij IDEA, and open the repository root directory.
Go to the Application class and run the main method, now you may load the web app at localhost:8080.

## Notes
Information about the Diablo II binary save file format may be found [here.](https://github.com/nokka/d2s)
