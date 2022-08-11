const mongoose = require('mongoose');

const MONGO_URL =
  "mongodb+srv://nasa:ydhGqo1ytb4ZqPu0@cluster0.v4cfb.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
    console.log("MongoDb connected!");
  });
  
mongoose.connection.on("error", (error) => {
    console.error(error);
  });

async function mongoConnect(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports= {mongoConnect,mongoDisconnect};