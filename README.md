# Diablo II Save File Generator

## Introduction
**d2sbackend** is planned to be a single page application powered by Spring Boot and React. As a web application, visitors may select from a variety of options to build a valid save file for Diablo II 1.13c single player mode that can be downloaded. This project will be made to be hosted on a cloud service and live production environment.

## Specification

User Stories:

* [] As a user, I should be able to choose the following options to customize the save file:
  * [] Character Name
  * [] Character Level
  * [] Character Class
  * [] Character Attributes
  * [] Character Skills
  * [] Game Difficulty
  * [] Game Mode (Expansion / Hardcore)
  * [] Current Act
  * [] Gold
  * [] (Optional) Patch Version
* [] As a user, I can start the process of creating the save file and either get a download link or an error message
* [] As a user, I should be able to view details about the save

Developer Stories:

* [] As a developer, I should be able to receive the input data from the user
* [] As a developer, I should be able to validate the input from the page and a given save
* [] As a developer, I should be able to generate a save file to the local file system and generate a link
* [] As a developer, I should be able to unit test the save generation
* [] As a developer, I should be utilize CI to be able to push changes from Github into a staging or production cloud environment

## Notes

Information about the Diablo II binary save file format may be found [here.](https://github.com/nokka/d2s)
