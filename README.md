## About
This repo provides a foundation to build single page apps with a Node/Express back end. Running in front end development mode will allow automatic watching of assets in the the `frontend_app/app` and `frontend_app/scss` directories. On change, the SCSS and JS get rebuilt and the browser refreshed.

The Stack:
* jQuery
* SASS
* [Foundation](http://foundation.zurb.com/)
* [Browserify](http://browserify.org/)
* [React](https://facebook.github.io/react/)

The back end uses Node/Express with basic session handling setup.

## To Setup

* Download and unzip this repo in the project directory
* cd to project root
* `npm install`
* `gulp`

## To Run

### Backend development (if you have [nodemon](https://github.com/remy/nodemon) installed):
```
NODE_ENV=development nodemon index.js
```

### Frontend development:
```
webpack --progress --colors --watch
```

### Production:
```
NODE_ENV=production node index.js
```

## To Test

`NODE_ENV=development nodemon ./backend_app/test.js`

## Notes

Controllers should return user friendly/safe response object and handle any errors that occur in the models or controllers. Controllers should handle all validation and sanitization.

Models should return raw errors to controllers.

## Todo

* X Ranking for paths, nodes
* X get user voting history
* X allow change vote
* Add user info to paths and nodes
* Add authorization to routes
* Add input sanitization and validation to back end
* Add error handling to routes
* Add error handling to UI
* Add dynamic config for API url to front end
* Add prod build for front end
* ensure knex is escaping character and raw queries are safe
* Validate that new paths have atleast two nodes
* add main view w/ new/trending paths