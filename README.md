# Welcome to Leaf Switch!


## Introduction
Welcome to the web-application of Leaf Switch, a platform for exchanging plants.
With this app, users can find a new home for plants that they don't longer want but still 
look perfectly fine. They can make their own profile and upload plants. On the search page
the user can look for plants by plant name or location. The plants that they're interested
can be saved to their account. When the user finds a plant they really like, the can send 
a message to the owner of the plant. By providing their email address, the owner can 
get in touch. 

![Screenshot Home](src/assets/Screenshot%20Home.png)

## Table of content

- Start applicationgit
  - API requests
  - Technologies and Frameworks
- Test the application


## Start application

You can clone this project to your locale machine.
1. Install `node-modules` by running `npm install` in the terminal.
2. Run the application by entering `npm run dev` in the terminal.
3. Open  [http://localhost:5173]( http://localhost:5173) to see the application in the browser.

### Api requests

The application uses the NOVI Dynamic API as a backend. For making requests, an API key 
is needed. 
1. In the root, make a `.env` file.
2. Copy the variables from the `.env.dist` file into the `.env` file you just created.
3. The key you can use for this project is: `2767c1c3-13ff-45b7-a2b7-6870077651b3`.
4. If you've already started runtime, stop the development server. (CTRL + C)
5. Now run `npm run build` in the terminal.
6. When this is finished you can start the application again. `npm run dev`


### Technologies and Frameworks

This project uses the following technologies and frameworks:

**Frontend Framework & Build Tools:**
- React 19.2.0 - JavaScript library for building the user interface
- Vite 7.2.4 - Build tool and development server
- React Router DOM 7.13.0 - Routing for single-page applications

**State Management & Form Handling:**
- React Hook Form 7.71.1 - Form handling
- JWT Decode 4.0.0 - JSON Web Token decoder for authentication

**HTTP Client:**
- Axios 1.13.6 - For API requests

**UI & Icons:**
- React Icons 5.6.0 - Icon library 

**Backend:**
- NOVI Dynamic API - RESTful API for data en authentication

**Development Tools:**
- ESLint 9.39.1 - Code quality and linting


## Test the application

In the API, test data has been added. However, I recommend making at least two test profiles
yourself to see how the application works. You can add, save and search plants and send messages
to the plant owner. To actually see these messages, you should log in as the plant owner.
You will be provided with a file with plant photo's you can use to add plants.

#### Log in

Existing test user:
email: gebruiker@voorbeeld.nl
password: gebruiker123








