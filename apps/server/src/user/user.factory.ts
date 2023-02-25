import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from './user.entity';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User({
    uuid: faker.random.uuid(),
    email: faker.internet.email(firstName, lastName),
    firstName,
    lastName,
    username: faker.internet.userName(firstName, lastName),
    password: faker.random.word(),
    isActive: faker.random.boolean(),
  });

  return user;
});
