const launchesDb = require("./launches.mongo");
//const launches = new Map();
const planets = require("./planets.mongo");
let latestFlightNumber = 100;
const DEFAULT_LAUNCH_NUMBER = 100;

const launch = {
  flightNumber: latestFlightNumber,
  mission: "Mission One",
  rocket: "Rocekt One",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["Customer One", "Customer Two"],
  upcoming: true,
  success: true,
};

//saveLunch(launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDb.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_LAUNCH_NUMBER;
  }

  return latestLaunch.flightNumber;
}

//launches.set(launch.flightNumber, launch);
async function saveLunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet");
  }
  await launchesDb.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

function existsLaunchWithId(id) {
  return launches.has(id);
}

async function getAllLaunches() {
  //return Array.from(launches.values());
  return await launchesDb.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["clara", "sarah"],
    flightNumber: newFlightNumber,
  });

  await saveLunch(newLaunch);
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   //launch.flightNumber = latestFlightNumber;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customer: ["Cust 1", "Cust 2"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

function abortLauchById(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  launch,
  //addNewLaunch,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLauchById,
};
