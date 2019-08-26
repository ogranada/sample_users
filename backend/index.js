const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiv1 = require("./api/v1/api");

// Run the server!
const start = async () => {
  const server = express({
    logger: true
  });
  server.use(cors());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.get("/", (request, response) => {
    response.status(200).json({ hello: "world" });
  });
  server.use("/api/v1", apiv1.prepareApi());
  try {
    server.listen(3000, () => {
      console.log(`Server listening at 0.0.0.0:3000`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
