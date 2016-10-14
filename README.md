## About

Postultion is an application to structure, present and provide ranking for user generated arugments.

Postulation is in development.


## To Setup

* Download and unzip this repo in the project directory
* cd to project root
* `npm install`
* `gulp`


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

* Routes should handle all validation and sanitization that does not require a model/DB call
* Controllers should handle any validation that requires a call to a model/DB
* Controllers should return user friendly/safe response objects to the route and handle any errors internally
* Models should get clean and sanitized data
* Models should return raw errors to controllers

## UI/UX Todo

* X https://monosnap.com/file/QMTJ22uQBC818AzCOBv2xFBHkXFP8x
* X https://monosnap.com/file/VoyD7bx2jjOm5fHgknhtWCMeh8X7PS
* X Restyle path detail view
* Restyle create path
* Add pagination to recent paths
* Add header to auth pages
* Add error handling to UI
* Lockup non-logged in features
* Path Detail
  * Clear when path changes
  * Clear afer submit (above might resolve)
  * Maybe unmount and trigger cleanup on unmount
* Add user info to path title

## App Todo
* setup deployment
* add user info to path
* add history drawer on right side
* add pagination to new/trending paths
* Add dynamic config for API url to front end
* ensure knex is escaping character and raw queries are safe
* Validate that new paths have atleast two nodes
* Mobile styling
* Add create_at timestamp to node and links

## Features
* Add "Your Paths" section
* Add function to save paths
  * Add section for saved paths
* Add history of paths visited in panel on right side
* Show trending paths
* Add up arrow as you traverse down paths

## Bugs

* Vote history for non-logged in user: http://take.ms/Px7Kkc
* https://monosnap.com/file/yIjldZsvpP54fgLBCxxxuxGbLyrLV9