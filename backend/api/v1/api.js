const express = require("express");
const routes = require("./routes.js");

function prepareApi() {
  const router = express.Router();
  Object.keys(routes).forEach(endpoint => {
    Object.keys(routes[endpoint]).forEach(method => {
      global.console.log(`  * ${method.toUpperCase()} ${endpoint}`);
      router[method.toLowerCase()](endpoint, routes[endpoint][method]);
    });
  });
  console.log("");
  return router;
}

module.exports = {
  prepareApi: prepareApi
};
