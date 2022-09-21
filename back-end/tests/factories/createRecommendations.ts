import { prisma } from "../../src/database";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export function one(recommendation: CreateRecommendationData) {
  return prisma.recommendation.create({
    data: recommendation,
  });
}