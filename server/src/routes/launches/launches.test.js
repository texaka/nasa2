const request = require("supertest");
const app = require("../../app");
const {mongoConnect,mongoDisconnect} = require('../../services/mongo');

describe("Launches api", ()=>{
  beforeAll(async()=>{
    await mongoConnect();
  });
  afterAll(async()=>{
    await mongoDisconnect();
    setTimeout(() => { }, 1000);
  })
  describe("Test GET/Launches", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      //expect(response.statusCode).toBe(200);
    });
  });
  
  describe("Test POST/Launch", () => {
    const oneLaunch = {
      mission: "mission test",
      rocket: "rocket test",
      target: "Kepler-1652 b",
      launchDate: "January 4, 2030",
    };
    const oneLaunchNoDate = {
      mission: "mission test",
      rocket: "rocket test",
      target: "test planet",
      //launchDate: 'January 4, 2030',
    };
  
    const launchDateWithInvalidDate = {
      mission: "mission test",
      rocket: "rocket test",
      target: "test planet",
      launchDate: "hello",
    };
  
    test("It should response with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(oneLaunch)
        .expect("Content-Type", /json/)
        .expect(201);
  
      const requestDate = new Date(oneLaunch.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(requestDate).toBe(responseDate);
  
      //expect(response.body).toMatchObject(oneLaunchNoDate);
  
      expect(100).toBe(100);
    });
  
    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(oneLaunchNoDate)
        .expect("Content-Type", /json/)
        .expect(400);
  
      //console.log(response.body);
      expect(response.body).toStrictEqual({
        error: "Some of required fields are missing",
      });
      //expect(response).toBe(200);
    });
  
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDateWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: "The Launch date field is incorrect",
      });
    });
  });
  
});

 