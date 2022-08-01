const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: latestFlightNumber,
  mission: "Mission One",
  rocket: "Rocekt One",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["Customer One", "Customer Two"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(id){
  return launches.has(id);
}


function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  //launch.flightNumber = latestFlightNumber;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Cust 1", "Cust 2"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLauchById(id){
  const aborted= launches.get(id);
  aborted.upcoming=false;
  aborted.success=false;
  return aborted;
}

module.exports = { getAllLaunches, launch, addNewLaunch ,existsLaunchWithId, abortLauchById};
