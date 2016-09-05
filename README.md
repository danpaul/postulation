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

Frontend development:
```
NODE_ENV=development gulp
```

Backend development (if you have [nodemon](https://github.com/remy/nodemon) installed):
```
NODE_ENV=development nodemon index.js
```
Without Nodemon:
```
NODE_ENV=development node index.js
```

Production:
```
NODE_ENV=production node index.js
```

## To Test

`NODE_ENV=development nodemon ./backend_app/test.js`