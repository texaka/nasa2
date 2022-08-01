const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function getAllPlanets() {
  return habitablePlanets;
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
      .on("data", (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (e) => {
        console.log(e);
        reject(e);
      })
      .on("end", () => {
        //console.log(habitablePlanets.map((p) => p["kepler_name"]));
        //console.log(`${habitablePlanets.length} habitable planets founded`);
        
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
