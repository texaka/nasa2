const API_URL = `http://localhost:8000`;
// Load planets and return as JSON.

async function httpGetPlanets() {
  //console.log("making the call.... xxxxxxxxxxxx");
  const response = await fetch(`${API_URL}/planets`);
  //console.log("call made it.... xxxxxxxxxxxx", response);
  const result = await response.json();
  //console.log("making the call.... xxxxxxxxxxxx", result);
  //console.log("xxxx", result);
  return result;
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const result = await response.json();

  return result.sort((a, b) => {
    return a.fligthNumber - b.fligthNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (e) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (e) {
    console.log(e);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
