const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const planets = require("./planets.mongo.js");
//const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

async function getAllPlanets() {
  return await planets.find({},{
    _id:0, __v:0
  });
  //return habitablePlanets;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitable(data)) {
          //habitablePlanets.push(data);
          savePlanet(data);
        }
      })
      .on("error", (e) => {
        console.log(e);
        reject(e);
      })
      .on("end", async () => {
        const countPlanetsCount = (await getAllPlanets()).length;

        //console.log(habitablePlanets.map((p) => p["kepler_name"]));
        console.log(`${countPlanetsCount} habitable planets founded`);

        resolve();
      });
  });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`could not save the planet ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
