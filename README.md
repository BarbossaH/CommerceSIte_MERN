# CommerceSIte_MERN

## Overview:

This project is for a commerce website, which includes React, bootstrap, axios, restful api, expressjs, nodejs, and MongoDB technology stacks.

## Frontend

#### Overview

1. using vite to create the React project.
2. using npm run dev to start the front end in the store_site directory, and we also can use npm run dev to start the server and app simultaneously in the back_end directory.
3. using router 6 to create the router

##### The structure of the front end:

1. the entrance of the project: main.jsx
2. the routers: app.jsx
   1. User dashboard: including the profile, order and user dashboard page
   2. Admin dashboard: including all users, product dashboard and product category page
3. they layout of the project: layout.jsx, including the header, footer, and the main content.every page will be rendered in the main content.
4. the auth data is loaded in the context,and it's called int the main.jsx, which means it will load the auth data before the main content is rendered.
5. the pages directory is for the entrance of each page;
6. the components directory is for the components which will be used in the pages, such as layout, privateRoutes, utils, and so on.

##### The structure of the backend:

1. the server engine: expressjs and nodejs;
2. the database: MongoDB;
3. the entrance of the project: server.js;
4. the third party middleware: cors, dotenv, slugify,express-validator(parsing the incoming form and files), jsonwebtoken,and so on;
