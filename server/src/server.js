const http = require("http");
const app = require("./app.js");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa:ydhGqo1ytb4ZqPu0@cluster0.v4cfb.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDb connected!");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //serverApi: ServerApiVersion.v1,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`server listening.. at ${PORT}`);
  });
}

startServer();
