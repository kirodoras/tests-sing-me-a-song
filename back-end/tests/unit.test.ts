/* eslint-disable @typescript-eslint/no-explicit-any */
import { recommendationRepository } from "../src/repositories/recommendationRepository";
import { recommendationService } from "../src/services/recommendationsService";
import * as fakerRecommendations from "./factories/fakerRecommendations";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("Unit tests [insert] function in recommendationService", () => {
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
    await recommendationService.insert(recommendation);
    expect(recommendationRepository.create).toBeCalled();
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

describe("Unit tests [getById] function in recommendationService", () => {
  it("should pass to get recommendation by id", async () => {
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return true;
      });
    const result = await recommendationService.getById(id);
    expect(result).toBe(true);
  });
  it("should pass to fail in get recommendation by id", async () => {
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return false;
      });
    try {
      await recommendationService.getById(id);
    } catch (err) {
      expect(err.type).toBe("not_found");
    }
  });
});

describe("Unit tests [get] function in recommendationService", () => {
  it("should pass to get all recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return true;
      });
    const result = await recommendationService.get();
    expect(result).toBe(true);
  });
});

describe("Unit tests [getTop] function in recommendationService", () => {
  it("should pass to get recommendations by amount", async () => {
    const amount = 10;
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return true;
      });
    const result = await recommendationService.getTop(amount);
    expect(result).toBe(true);
  });
});
