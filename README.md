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
3. they layout of the project: layout.jsx, including the header, footer, and the main content.every page will be rendered in the main content.
4. the auth data is loaded in the context,and it's called int the main.jsx, which means it will load the auth data before the main content is rendered.
5. the pages directory is for the entrance of each page;
6. the components directory is for the components which will be used in the pages, such as layout, privateRoutes, utils, and so on.
