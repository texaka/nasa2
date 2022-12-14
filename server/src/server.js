const http = require("http");
const app = require("./app.js");

//const mongoose = require("mongoose");
const {mongoConnect} = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`server listening.. at ${PORT}`);
  });
}

startServer();
