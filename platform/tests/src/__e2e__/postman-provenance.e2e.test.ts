/**
 * Postman-collection 1:1 Vitest tests for provenance (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  jobId: "",
  limit: "",
  provenanceId: "",
  tierId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / provenance (1:1 generated)", () => {

  it("listArtefactProvenance", async () => {
    const url = sub("{{baseUrl}}/v1/provenance?cursor={{cursor}}&limit={{limit}}&tierId={{tierId}}&jobId={{jobId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("sealArtefactProvenance", async () => {
    const url = sub("{{baseUrl}}/v1/provenance");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"artefactHash\": \"\",\n  \"tierId\": \"newman_tierId\",\n  \"jobId\": \"newman_jobId\",\n  \"tierPath\": null\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getArtefactProvenance", async () => {
    const url = sub("{{baseUrl}}/v1/provenance/{{provenanceId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
