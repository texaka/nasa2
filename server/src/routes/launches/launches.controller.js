const {
  getAllLaunches,
  //addNewLaunch,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLauchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Some of required fields are missing",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "The Launch date field is incorrect",
    });
  }
  //addNewLaunch(launch);
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);

  //httpGetAllLaunches
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(400).json({ error: "Id not found" });
  }
  const aborted = abortLauchById(launchId);

  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLunch, httpAbortLaunch };
