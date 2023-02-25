import { Factory, Seeder } from 'typeorm-seeding';
import { User } from './user.entity';

export default class CreateUsersSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().createMany(10);

    await factory(User)().create({
      uuid: '00000000-0000-0000-0000-000000000001',
      email: 'night@test.com',
      username: 'night',
      password: 'password',
      isActive: true,
    });
  }
}
