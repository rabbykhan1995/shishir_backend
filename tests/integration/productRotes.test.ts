// @ts-ignore
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.ts"; // Express app
import { connectDB } from "../../utils/db.config";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product Routes Integration Test", () => {
  it("POST /api/product/create should create a product", async () => {
    const res = await request(app).post("/api/product/create").send({
      title: "Integration Product",
      slug: "integration-product",
      rating: 4,
      images: [],
      price: 50,
      stock: 5,
      reviewers: 0,
      averageReview: 0,
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Integration Product");
  });

  it("GET /api/product/list should return list", async () => {
    const res = await request(app).get("/api/product/list");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.items)).toBe(true);
  });
});
