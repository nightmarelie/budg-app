import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../user';

export default class CreateAuthSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create({
      uuid: '00000000-0000-0000-0000-000000000000',
      email: 'admin@test.com',
      username: 'admin',
      password: 'password',
      isActive: true,
    });
  }
}
