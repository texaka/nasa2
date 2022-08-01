const express = require("express");
//const { httpAbortLaunch } = require("../../../../client/src/hooks/requests");
const {
  httpGetAllLaunches,
  httpAddNewLunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
