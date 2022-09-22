/* eslint-disable @typescript-eslint/no-explicit-any */
import { recommendationRepository } from "../src/repositories/recommendationRepository";
import { recommendationService } from "../src/services/recommendationsService";
import * as fakerRecommendations from "./factories/fakerRecommendations";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Unit tests INSERT function in recommendationService", () => {
  it("should pass to create", async () => {
    const recommendation = fakerRecommendations.correct;
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return false;
      });
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce(async () => {
        recommendation;
      });
    const result = await recommendationService.insert(recommendation);
    expect(result).toBe(undefined);
  });
  it("should pass to error 409, conflict", async () => {
    const recommendation = fakerRecommendations.correct;
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return true;
      });
    try {
      await recommendationService.insert(recommendation);
    } catch (err) {
      expect(err.type).toBe("conflict");
    }
  });
});
