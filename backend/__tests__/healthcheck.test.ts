import request from "supertest";
import app from "../src/app";

console.log("app:", app);

describe("Health Check Endpoint", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Tennis Club API is running 🚀");
  });
});
