import { faker } from "@faker-js/faker";

export const correct = {
  name: faker.lorem.word(2),
  youtubeLink: "https://youtu.be/gSaIkQ3Z0jc",
};

export const wrongLink = {
  name: faker.lorem.word(2),
  youtubeLink: "https://XXXXXXXXXX/XXXXXXXXX",
};