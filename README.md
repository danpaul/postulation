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

## Contributing

* Routes should handle all validation and sanitization that does not require a model/DB call
* Controllers should handle any validation that requires a call to a model/DB
* Controllers should return user friendly/safe response objects to the route and handle any errors internally
* Models should get clean and sanitized data
* Models should return raw errors to controllers

## Todo

* General app
  * X Add user notification handling
  * X Notify user if they are not logged in
    * X Disable vote button if user is not logged in
    * X Disable node vote button if user is not logged in
    * X Do not display path reply tab if user is not logged in
  * X Add error handling
    * X Add notification method
  * X Clean path/form data on unmount
    * X Clear when path changes
    * X Clear afer submit (above might resolve)
    * X Maybe unmount and trigger cleanup on unmount
  * X Add user info to path title
* X Path create
  * X Add ability to delete nodes
  * X Add ability to move node up/down
  * X Validate that new paths have atleast two nodes
* Styling
  * Make app responsive
  * Improve button/toggle styling: https://monosnap.com/file/vX5RGsAI8Y0VJHJnAcydfYt2PunyYR
  * Improve node position change sytling: https://monosnap.com/file/gc40hP9yMmoWrIT6gqhHHvQX3hiUoo
  * Make a revision to customize styling
* Landing page
  * X Add trending posts
    * X Add trending field to post
    * X Set cron, calculate trend by strength (or wilson score) * linearly decreasing amount to limit (week)
    * X On vote, update score
  * X Add strength
  * Add pagination/infinite scroll
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
  * create legal/agreement page
* Security
  * ensure knex is escaping character and raw queries are safe
* Bugs
  * Clear path data on create
  * On clicking path from path preview, should clear previous path's data
  * X Babel compilation not working
  * X If user has not yet voted for a node, downvote as the first vote does not work
  * Node ranking showing undefined: https://monosnap.com/file/aK8D6d4c5sURDLn3WrOQNAppB6s0Wj
    * /frontend_app/app/lib/helpers/ranking.js
    * /frontend_app/app/components/pathNode.jsx
  * User showing undefined: https://monosnap.com/file/fRZ0ZrVIDeOqf3f9incNerXC9et3Eh
  * Should be reporting an error: https://monosnap.com/file/JlcgxOW8U2pfSN6WMD1oAtHRgmZevY
  * Newly created reply: https://monosnap.com/file/o7K0D5gw0FVSPjo08RHbNj65gPdLR4
  * Error when creating new path with only one node: https://monosnap.com/file/7CtESRuBtnhRIIOwxTRGLIh54BA4tz
  * downvote inactive on newly created path: https://monosnap.com/file/gnHxtmuQ5hgHU0OYJOqz40tTPZUlDy
  * Vote history for non-logged in user: http://take.ms/Px7Kkc
  * https://monosnap.com/file/yIjldZsvpP54fgLBCxxxuxGbLyrLV9
  * undefined resave option; provide resave option node_modules/sql_user_manager/index.js:129:23
  * 
* User management
  * Inject header into user management pages
  * Add site-specific styles
  * Add profile view for user management
  * Add menu item for profile
  * Profile page
    * Display paginated recent posts
    * Display profile info (email/username) with link to update page

## Future features
* Add optional notifications for user when they
  * Receive new responses
* Add path caching
* Add history drawer on right side
* Add ability to navigate "up"
* Add dynamic config for API url to front end
* Add function to save paths
  * Add section for saved paths