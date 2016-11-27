## About

Postultion is an application to structure, present and provide ranking for user generated arugments.

Postulation is in development.

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

## Todo

* General app
  * Add user notification handling
  * Notify user if they are not logged in
    * X Disable vote button if user is not logged in
    * X Disable node vote button if user is not logged in
    * X Do not display path reply tab if user is not logged in
  * X Add error handling
    * X Add notification method
  * Clean path/form data on unmount
    * Clear when path changes
    * Clear afer submit (above might resolve)
    * Maybe unmount and trigger cleanup on unmount
  * Add user info to path title
* Path create
  * Add ability to delete nodes
  * Add ability to move node up/down
  * Validate that new paths have atleast two nodes
* User management
  * Inject header into user management pages
  * Add site-specific styles
  * Add profile view for user management
  * Add menu item for profile
  * Profile page
    * Display paginated recent posts
    * Display profile info (email/username) with link to update page
* Styling
  * Make app responsive
  * Improve button/toggle styling: https://monosnap.com/file/vX5RGsAI8Y0VJHJnAcydfYt2PunyYR
* Landing page
  * Add trending posts
  * Add pagination
* Back end
  * Add create_at timestamp to node and links
* Release related
  * Create about on landing page for first time visitors
  * Create basic instructions/documentation page
  * Record screencast/demo/marketing video
    * http://blog.hubspot.com/marketing/make-a-marketing-video#sm.000tbi5o21198f4wxho1f91lob01l
    * https://www.americanexpress.com/us/small-business/openforum/articles/10-tools-to-make-your-marketing-videos-wow/
  * Pick domain
  * Add analytics
  * Add monitoring
  * Setup https, cloudflare?
* Security
  * ensure knex is escaping character and raw queries are safe
* Bugs
  * X Babel compilation not working
  * X If user has not yet voted for a node, downvote as the first vote does not work
  * downvote inactive on newly created path: https://monosnap.com/file/gnHxtmuQ5hgHU0OYJOqz40tTPZUlDy
  * Vote history for non-logged in user: http://take.ms/Px7Kkc
  * https://monosnap.com/file/yIjldZsvpP54fgLBCxxxuxGbLyrLV9
  * undefined resave option; provide resave option node_modules/sql_user_manager/index.js:129:23

## Future features
* Add optional notifications for user when they
  * Receive new responses
* Add path caching
* Add history drawer on right side
* Add ability to navigate "up"
* Add dynamic config for API url to front end
* Add function to save paths
  * Add section for saved paths