import assert from "node:assert/strict";
import { AddressInfo } from "node:net";
import { createApp } from "../src/app.js";

const app = createApp();
const server = app.listen(0);

const address = server.address() as AddressInfo;
const base = `http://127.0.0.1:${address.port}`;

async function fetchText(route: string) {
  const response = await fetch(`${base}${route}`);
  const body = await response.text();
  return { status: response.status, body };
}

async function main() {
  const htmlRoutes = ["/", "/confidence-register", "/resolution-tiers", "/confidence-posture", "/verification", "/docs"];
  const apiRoutes = [
    "/api/dashboard/summary",
    "/api/confidence-register",
    "/api/resolution-tiers",
    "/api/confidence-posture",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const { status, body } = await fetchText(route);
    assert.equal(status, 200, `${route} should return 200`);
    assert.match(body, /Board Decision Resolution Confidence Scorecard|Confidence register|Resolution tiers|Confidence posture/);
  }

  for (const route of apiRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `${route} should return 200`);
    const json = await response.json();
    assert.ok(json, `${route} should return JSON`);
  }
}

main()
  .then(() => {
    server.close();
  })
  .catch((error) => {
    server.close();
    console.error(error);
    process.exitCode = 1;
  });
