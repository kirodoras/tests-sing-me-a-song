import app from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database";
import { fakerRecommendation } from "./factories/fakerRecommendations";

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
    const body = fakerRecommendation;
    const result = await request.post(`${PATH}`).send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });
});

describe(`GET ${PATH}`, () => {
  it("should return 200", async () => {
    const result = await request.get(`${PATH}`);
    const status = result.status;
    expect(status).toEqual(200);
  });
});
