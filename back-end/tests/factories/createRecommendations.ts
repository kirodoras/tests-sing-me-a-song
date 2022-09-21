import { prisma } from "../../src/database";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export function one(recommendation: CreateRecommendationData) {
  return prisma.recommendation.create({
    data: recommendation,
  });
}

export function many(amount: number) {
  const recommendations = [];
  for (let i = 0; i < amount; i++) {
    recommendations.push({
      name: `name${i}`,
      youtubeLink: `https://youtu.be/gSaIkQ3Z0jc`,
    });
  }
  return prisma.recommendation.createMany({
    data: recommendations,
    skipDuplicates: true,
  });
}
