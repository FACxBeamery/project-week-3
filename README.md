# Project Week 3: Node.JS server 
## by João, Lyndsey and Martha
[![Build Status](https://travis-ci.org/FACxBeamery/project-week-3.svg?branch=master)](https://travis-ci.org/FACxBeamery/project-week-3)

Deployed on Heroku here: https://todolist-ls-ml-jv.herokuapp.com/


## Motivation
The purpose of this project was to create our own Node.JS http server with the npm core modules: `http`, `path`, and `fs`. The server provides a RESTful API for a To Do List app. 

## POSTMAN collection

https://www.getpostman.com/collections/eec2558a9e8109216d8e

## Endpoints/Routes

`/`
METHOD: GET
RESPONSE: index.html

`/todos`
METHOD: GET
BODY: `sortby: status/date/recentedited`
RESPONSE: JSON file todos.json

`/todos`
METHOD: POST
BODY: `title`
RESPONSE: 200

`/todos/todo/:id`
METHOD: DELETE
PARAMS: `id`
RESPONSE: 204

`/todos/todo/:id`
METHOD: PATCH
PARAMS: `id`
BODY: `edit-method: completeTodo/undoCompleteTodo/editTitle`
RESPONSE: 200

# How to run it locally

- clone the repo
- run the following: 
  `npm install `
  `npm run start`
  
- for testing:
    `npm run test`
![](https://i.imgur.com/tBWExSW.png)

