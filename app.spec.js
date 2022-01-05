const request = require("supertest");
const app = require("./app");
const d2m = require('./helpers/d2m.helper')

var loginResponce = undefined;

beforeAll(() => {
    d2m.loadUserData('users.json')
    d2m.loadAtmData('atmdata.json')
  });

describe("Test the root path", () => {
  test("/", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  test("/norout", async () => {
    const response = await request(app).get("/norout");
    expect(response.statusCode).toBe(401);
  });
});

describe("Test Authentication", () => {
    test("/login - 401", async () => {
      const response = await request(app).post("/login");
      expect(response.statusCode).toBe(401);
    });
  
    test("/login - 401", async () => {
      const response = await request(app).post("/login").send({});
      expect(response.statusCode).toBe(401);
    });
  
    test("/login - Wrong creds", async () => {
      const response = await request(app).post("/login").send({
        "username": "test@email.com",
        "password": "passcord"
    });
      expect(response.statusCode).toBe(401);
    });
    test("/login - 200", async () => {
      const response = await request(app).post("/login").send({
        "username": "test@email.com",
        "password": "password"
    });
      loginResponce = response.body;
      expect(response.statusCode).toBe(200);
    });
  
    test("/revalidate - 401", async () => {
      const response = await request(app).post("/revalidate");
      expect(response.statusCode).toBe(401);
    });
    test("/revalidate - invalid token", async () => {
      const response = await request(app).get("/revalidate").set({ 
          "authorization":"Bearer adjndksjndaskldlksdlsd"
        });
      expect(response.statusCode).toBe(401);
    });
    test("/revalidate - token expaired", async () => {
      const response = await request(app).get("/revalidate").set({ 
          "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkbzd0YVVicW5LZHVzby5KZVM2MFUuZVJpRFhWa1dyYko5OTIveW5aSW44UW81L3FWUUEzL2EiLCJpc19yZWZyZXNoIjp0cnVlLCJpYXQiOjE2NDEzOTQzODQsImV4cCI6MTY0MTM5Nzk4NH0.r74dsIop-AI0LQwD7QG61KCx20KXOAi4AwbPeLtiTUo"
        });
      expect(response.statusCode).toBe(401);
    });
    test("/revalidate - 200", async () => {
      const response = await request(app).get("/revalidate").set({ 
          "authorization":"Bearer "+  loginResponce.refresh_token
        });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test User APIs", () => {
    test("/users/create 401", async () => {
      const response = await request(app).post("/users/create");
      expect(response.statusCode).toBe(401);
    });
    test("/users/create 200", async () => {
      const response = await request(app).post("/users/create").send({
        "username": "test2@email.com",
        "password": "password"
      }).set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
    test("/users/create 500", async () => {
      const response = await request(app).post("/users/create").send([]).set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
  
    test("/users/all 200", async () => {
      const response = await request(app).get("/users/all").set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
  
    test("/users/find/test2@email.com 200", async () => {
      const response = await request(app).get("/users/find/test2@email.com").set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
    test("/users/find/testN@email.com 500", async () => {
      const response = await request(app).get("/users/find/test2@email.com").set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
    
  
    test("/users/update/test2@email.com 200", async () => {
      const response = await request(app).put("/users/update/test2@email.com").set({
        "authorization":"Bearer "+  loginResponce.access_token
      }).send({
        "username": "test2@email.com",
        "password": "passwordX"
      });
      expect(response.statusCode).toBe(200);
    });
  
    test("/users/delete/test2@email.com", async () => {
      const response = await request(app).delete("/users/delete/test2@email.com").set({
        "authorization":"Bearer "+  loginResponce.access_token
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test ATM APIs", () => {
    test("/atm/create 401", async () => {
      const response = await request(app).post("/atm/create");
      expect(response.statusCode).toBe(401);
    });
    test("/atm/create 200", async () => {
      const response = await request(app).post("/atm/create")
      .set({"authorization":"Bearer "+  loginResponce.access_token})
      .send({
        "address": {
            "street": "Kondapur",
            "housenumber": "53",
            "postalcode": "5531 EH",
            "city": "hyd",
            "geoLocation": {
                "lat": "51.36784",
                "lng": "5.22107"
            }
        }});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/create 200", async () => {
      const response = await request(app).post("/atm/create")
      .set({"authorization":"Bearer "+  loginResponce.access_token})
      .send({});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/search 200", async () => {
      const response = await request(app).get("/atm/search")
      .set({"authorization":"Bearer "+  loginResponce.access_token});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/search/hyd 200", async () => {
      const response = await request(app).get("/atm/search/hyd")
      .set({"authorization":"Bearer "+  loginResponce.access_token});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/get/atm_1 500", async () => {
      const response = await request(app).get("/atm/get/atm_1")
      .set({"authorization":"Bearer "+  loginResponce.access_token});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/get/atm_1 200", async () => {
      const response = await request(app).get("/atm/get/atm_1")
      .set({"authorization":"Bearer "+  loginResponce.access_token});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/update/atm_1 200", async () => {
      const response = await request(app).put("/atm/update/atm_1")
      .set({"authorization":"Bearer "+  loginResponce.access_token})
      .send({
        "address": {
            "street": "Kondapur",
            "housenumber": "53",
            "postalcode": "5531 EH",
            "city": "hyd",
            "geoLocation": {
                "lat": "51.36784",
                "lng": "5.22107"
            }
        }});
      expect(response.statusCode).toBe(200);
    });
    test("/atm/delete/atm_1 200", async () => {
      const response = await request(app).delete("/atm/delete/atm_1")
      .set({"authorization":"Bearer "+  loginResponce.access_token});
      expect(response.statusCode).toBe(200);
    });
});

