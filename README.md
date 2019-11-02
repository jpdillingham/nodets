# nodets

A quick implementation of an Express RESTful API in Node.js using TypeScript

## Scripts

* `yarn build` transpiles to js and drops the result in `/dist`
* `yarn lint` runs tslint
* `yarn test` runs tests with mocha
* `yarn start` builds and starts node with `/dist/index.js`
* `yarn watch` watches for changes and restarts

## Notes

* Scripts assume `yarn` is installed
* Events are only persisted in memory
* Users aren't persisted anywhere (even in memory)
* There's no authentication
  * If it were to be added, users would be persisted, a `/login` route would be added to authenticate and return a token, and that token would need to be provided in the `Authorization` header of the remaining routes
* API calls with malformed POST bodies return very unfriendly raw validation errors plus a generic message
* Tests are plumbed, but there aren't any other than the santity check