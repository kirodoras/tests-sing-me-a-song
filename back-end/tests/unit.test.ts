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

describe("Unit tests [upvote] function in recommendationService", () => {
  it("should pass to upvote", async () => {
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return true;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return true;
      });
    await recommendationService.upvote(id);
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("should pass to fail upvote", async () => {
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return false;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return true;
      });
    try {
      await recommendationService.upvote(id);
    } catch (err) {
      expect(err.type).toBe("not_found");
    }
  });
});

describe("Unit tests [getById] function in recommendationService", () => {
  it("should pass to get recommendation by id", async () => {
    const recommendation = fakerRecommendations.correct;
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return recommendation;
      });
    const result = await recommendationService.getById(id);
    expect(result).toEqual(recommendation);
  });
  it("should pass to fail in get recommendation by id", async () => {
    const id = 999;
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return null;
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
    await recommendationService.get();
    expect(recommendationRepository.findAll).toBeCalled();
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
    await recommendationService.getTop(amount);
    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
});

describe("Unit tests [getRandom] function in recommendationService", () => {
  it("should pass to get a random recommendation", async () => {
    const recommendation = fakerRecommendations.correct;
    const arrayTest = [recommendation, recommendation, recommendation];
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return arrayTest;
      });
    const promise = await recommendationService.getRandom();
    expect(promise).toBe(recommendation);
  });
  it("should pass to error 404, not found", async () => {
    const arrayTest = [];
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return arrayTest;
      });
    try {
      await recommendationService.getRandom();
    } catch (err) {
      expect(err.type).toBe("not_found");
    }
  });
});
