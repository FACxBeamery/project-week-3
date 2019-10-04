# Project Week 3: Node.JS server 
## by João, Lyndsey and Martha

[![Build Status](https://travis-ci.org/FACxBeamery/project-week-3.svg?branch=master)](https://travis-ci.org/FACxBeamery/project-week-3)

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
RESPONSE: JSON file todos.json

`/addtodo`
METHOD: POST
HEADERS: `title` 
RESPONSE: `<custom message>`

`/removetodo`
METHOD: DELETE
HEADERS: `id`
RESPONSE: `<custom message>`

`/completetodo`
METHOD: PATCH
HEADERS: `id`
RESPONSE: `<custom message>`

`/undocompletetodo`
METHOD: PATCH
HEADERS: `id`
RESPONSE: `<custom message>`

`/sorttodos` 
METHOD: PATCH
HEADERS: `sortby` (can be 'date', 'latest', or 'status')
RESPONSE: `<custom message>` 

`/edittodo`
METHOD: PATCH
HEADERS: `id` and `title`
RESPONSE: `<custom message>`

# How to run it locally

- clone the repo
- run the following: 
  `npm install `
  `npm run start`
  
- for testing:
    `npm run test`
![](https://i.imgur.com/tBWExSW.png)

