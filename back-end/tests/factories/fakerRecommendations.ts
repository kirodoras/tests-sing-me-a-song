import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export const correct: CreateRecommendationData = {
  name: faker.lorem.word(2),
  youtubeLink: "https://youtu.be/gSaIkQ3Z0jc",
};

export const wrongLink: CreateRecommendationData = {
  name: faker.lorem.word(2),
  youtubeLink: "https://XXXXXXXXXX/XXXXXXXXX",
};

export const correctMany: CreateRecommendationData[] = [
  correct,
  correct,
  correct,
  correct,
  correct,
];
