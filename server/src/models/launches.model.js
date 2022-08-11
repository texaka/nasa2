const launchesDb = require("./launches.mongo");
//const launches = new Map();
const planets = require("./planets.mongo");
let latestFlightNumber = 100;
const DEFAULT_LAUNCH_NUMBER = 100;
/*
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
*/
//saveLunch(launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDb.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_LAUNCH_NUMBER;
  }

  return latestLaunch.flightNumber;
}

//launches.set(launch.flightNumber, launch);
async function saveLunch(nlaunch) {
  
  const planet = await planets.findOne({
    keplerName: nlaunch.target,
  });
  if (!planet) {
    throw new Error("No matching planet");
  }
  await launchesDb.findOneAndUpdate({ flightNumber: nlaunch.flightNumber }, nlaunch, {
    upsert: true,
  });
}

async function existsLaunchWithId(id) {
  return launchesDb.findOne({flightNumber:id});
  //return (res)
}

async function getLaunchById(id){
  return launchesDb.findOne({flightNumber:id})
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
    customers: ["clara", "sarah"],
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
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

async function abortLauchById(id) {
  const aborted = await getLaunchById(id);
  aborted.upcoming = false;
  aborted.success = false;
  
  await saveLunch(aborted);
  return aborted;
}

module.exports = {
  getAllLaunches,
  //launch,
  //addNewLaunch,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLauchById,
};
