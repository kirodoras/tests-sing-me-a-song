import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database";
import * as fakerRecommendations from "./factories/fakerRecommendations";
import * as createRecommendations from "./factories/createRecommendations";

console.log(process.env.DATABASE_URL);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});
afterAll(async () => {
  await prisma.$disconnect();
});

const request = supertest(app);
const PATH = "/recommendations";

describe(`POST ${PATH}`, () => {
  it("should return 201", async () => {
    const body = fakerRecommendations.correct;
    const result = await request.post(`${PATH}`).send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });
  it("should return 422, wrong link", async () => {
    const body = fakerRecommendations.wrongLink;
    const result = await request.post(`${PATH}`).send(body);
    const status = result.status;
    expect(status).toEqual(422);
  });
  it("should return 409, recommendation already exists", async () => {
    const body = fakerRecommendations.correct;
    await createRecommendations.one(body);
    const result = await request.post(`${PATH}`).send(body);
    const status = result.status;
    expect(status).toEqual(409);
  });
});

describe(`GET ${PATH}`, () => {
  it("should return 200", async () => {
    const result = await request.get(`${PATH}`);
    const status = result.status;
    expect(status).toEqual(200);
  });
});

describe(`GET ${PATH}/random`, () => {
  it("should return 200", async () => {
    await createRecommendations.many(5);
    const result = await request.get(`${PATH}/random`);
    const status = result.status;
    expect(status).toEqual(200);
  });
  it("should return 404, there are no recommendations", async () => {
    const result = await request.get(`${PATH}/random`);
    const status = result.status;
    expect(status).toEqual(404);
  });
});

describe(`GET ${PATH}/top/:amount`, () => {
  it("should return 200", async () => {
    const amount = 3;
    await createRecommendations.many(5);
    const result = await request.get(`${PATH}/top/${amount}`);
    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.length).toEqual(amount);
  });
  it("should return 200, there are no recommendations", async () => {
    const amount = 3;
    const result = await request.get(`${PATH}/top/${amount}`);
    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.length).not.toEqual(amount);
  });
});

describe(`GET ${PATH}/:id`, () => {
  it("should return 200", async () => {
    const recommendation = fakerRecommendations.correct;
    const { id } = await createRecommendations.one(recommendation);
    const result = await request.get(`${PATH}/${id}`);
    const status = result.status;
    expect(status).toEqual(200);
  });
});
