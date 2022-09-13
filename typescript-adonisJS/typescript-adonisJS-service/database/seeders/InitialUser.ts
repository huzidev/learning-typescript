import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { UserRole } from 'App/Models/User'
import { faker } from '@faker-js/faker'

import lodash from 'lodash'

export default class InitialUserSeeder extends BaseSeeder {
  public static admins = 3 // means total admins will be 3 when running faker
  public static realtors = 10 // means total realtors are 10
  public async run() {
    await User.createMany([
      ...this.createUsers(1, 'super-admin'),
      ...this.createUsers(InitialUserSeeder.admins, 'admin'),
      ...this.createUsers(InitialUserSeeder.realtors, 'realtor'),
      ...this.createUsers(500, 'client'),
    ])
  }

  public createUsers(range = 1, role: UserRole = User.roles[0]) {
    return [...Array(range).keys()].map((index) => {
      const username = lodash.camelCase(role).toLowerCase() + (index + 1)

      let name = faker.name.firstName() + ' ' + lodash.startCase(role) + ' ' + index
      let isBanned = false
      let isActive = true
      let isVerified = true
      let isTheme = false

      if (role === 'client') {
        name = faker.name.findName()
        isVerified = lodash.random(1, 25) !== 10
        isBanned = lodash.random(1, 25) === 10
        isActive = lodash.random(1, 25) !== 10
      }
      return {
        name,
        role,
        isBanned,
        isActive,
        isVerified,
        isTheme,
        password: username,
        email: username + '@happyhomes.com',
      }
    })
  }
}
