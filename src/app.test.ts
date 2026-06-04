import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-resolution-confidence-scorecard app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Resolution Confidence Scorecard");
  });

  it("serves the confidence register route", async () => {
    const response = await request(app).get("/confidence-register");
    expect(response.status).toBe(200);
  });

  it("serves the resolution tiers route", async () => {
    const response = await request(app).get("/resolution-tiers");
    expect(response.status).toBe(200);
  });

  it("serves the confidence posture route", async () => {
    const response = await request(app).get("/confidence-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.decisionsTracked).toBeGreaterThan(0);
  });
});
