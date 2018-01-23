# recipes application built in Angular

## Map of the application:
This application was build to give user access to recipes database, allow them to manage their favorites, and create and store their own ones.

Default functionality (for not logged in users) allows to view all recipes, display them by categories, and go to each recipe page to check the details. Without logging in there's no more that user can do.

After login, user receives more functionality. As a user you can now, add selected recipes to your favorites, and create or edit your own recipes. You can also directly access your favorites/personal recipes and display them all. To check the functionality just login with default credentials provided in 'login' section.

There is also possibility to create your own basic account, and manag recipes from there.

## Technologies and tools used in developement process:
Following technologies have been used for that project:

### Front-end:
* Angular (with CLI and TypeScript)
* SASS
* Angular Material Design + Angular Animations

### Back-end:
* ExpressJS as a web server
* MondoDB - database
### Dependencies

* JSON Web Token - stroing token for accessing API
* Bcrypt - for hashing passwords
* Nodemon - for running server in developement mode
* NPM scripts
* Dotenv for storing enviroment variables
