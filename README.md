Telford Leisure Services (Frontend)
============

This is the front end for my redesign project of the Telford Leisure Services sign up process. This front end was built with Angular (v13) and designed using the Gov Design Systems styles, components and patterns to make it more consistent with GOV.UK.

---
## Design

Figma design file: https://www.figma.com/file/XnDJNj77ZnkZUftF5giXqe/telford-leisure-services 

^ The top row consists of screenshots of the current sign up process, and the bottom row my redesigns which I have implemented in this angular front end.

### Original Design

![](telford-leisure-services-original-signup.gif)

### GDS Redesign

![](telford-leisure-services-signup.gif)

---

## Key Features

* Ability for members to create new accounts using the 'Question Pages' GDS pattern
* Ability for members to change their answer to any question before account creation using the 'Check Answers' pattern
* Ability to login to the service
* Ability to give feedback on the service
* Forgotten member number retrieval via email
* Password reset functionality

---

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/chris-ian-jones/telford-leisure-services-front

# Go into the repository
$ cd telford-leisure-services-front

# Go into the Angular project folder
$ cd ng-telford-leisure-services

# Install dependencies
$ npm install

# Run the app
$ ng serve -o
```

> **Note**
> Here is a link to the backend project which you will also need running locally on your computer: https://github.com/chris-ian-jones/telford-leisure-services-back
