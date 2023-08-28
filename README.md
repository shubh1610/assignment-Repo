# Simple React JS Project

Blog Application

## What is the use of this Repo

This Project is a Simple ReactJS Project which demonstrates the following

1. Creating a Component in React
2. Making HTTP calls
3. Communicating between parent-child and sibling components.
4. Using Bootstrap along with React
5. Using Basic Routing in React

The project Template can be used to build bigger projects

## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

## Live Application URL

The Application is deployed in https://assignment-repo-ashen.vercel.app/

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

1. **Blogs** Component : This Component displays a list of blogs. This Component gets the data from api which is created by node js.

2. **Add Blog** Component : This Component has the functionality to create a new blog. This Component sends newly created blog data to backend in order to be stored in database.

3. **Show Blog** Component : This Component Displays the details of the selected blog. This Component gets its data with respect to its specific id by a get api call from backend.

4. **Profile** Component : This Component displays the user specific details. It has access to all the blogs created by user and also the logout feature.

#### HTTP client

**axios** library is used to make HTTP Calls

#### URL

The application has url / which renders the blogs component.
The application has url /addblog which renders the add blogs component.
The application has url /showblog which renders the show blogs component.

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**React Bootstrap** : Refer to https://react-bootstrap.github.io/getting-started/introduction/ to understand how to use React Bootstrap
