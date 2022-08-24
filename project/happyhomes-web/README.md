# HappyHomes web client

Happy homes is a service that show you apartments listing based your price, size & rooms reference. Apartments can be explored on map view

## Requirements

- `node v14+`

## Setup the project

- `npm i`
- `npm run setup`

## Run with in debug mode
> Server runs on http://localhost:3000
- `npm start`
    - Runs the code in debugging environment
    - Opens the server in your default browser

## Production
- `npm run build`
    - Compiles all the code in production mode

- `npm run prod`
    - Runs compiled code in production environment
    - Code is hosted via `serve` package

## Testing
> Cypress is used for e2e testing
- `npm run e2e`
    - Open cypress in GUI mode
- `npm run e2e:headless`
    - Runs cypress in headless mode

## Libraries
 - [React JS](https://reactjs.org/) SPA library for creating UI
 - [React Router Dom](https://www.npmjs.com/package/react-router-dom) A robust route management for react
 - [Zustand](https://github.com/pmndrs/zustand) A simple, yet robust state management solution with zero boilerplate
 - [Ant Design](https://ant.design/) For composing UI/UX design
 - [Axios](https://github.com/axios/axios) For network calls
 - [Cypress](https://www.cypress.io/) For e2e testing
 - [React Google Map](https://github.com/google-map-react/google-map-react) For google maps