import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Apartment from 'App/Models/Apartment'
import User from 'App/Models/User'
import lodash from 'lodash'
import { faker } from '@faker-js/faker'

import { PRICE_RANGE, ROOM_RANGE, SIZE_RANGE } from 'App/Default/Filters'

export default class InitialApartmentSeeder extends BaseSeeder {
  public async run() {
    const realtors = await User.query().where('role', User.roles[1]) // since realtors are at index of 1

    const ids = realtors.map((v) => v.id)

    await Apartment.createMany(this.generateApartments(ids))
  }

  public generateApartments(ids: number[]) {
    const cities = {
      Karachi: {
        lat: [24.760534692086647, 25.050352364357103],
        lng: [66.92253626839566, 67.22011509712765],
      },
      Hyderabad: {
        lat: [25.431569, 25.351442],
        lng: [68.319912, 68.421486],
      },
      Lahore: {
        lat: [31.620183, 31.398636],
        lng: [74.241837, 74.471351],
      },
      Islamabad: {
        lat: [33.533605, 33.747261],
        lng: [72.980184, 73.129969],
      },
    }
    const keys = Object.keys(cities)
    const keySize = keys.length
    return [...Array(9000).keys()].map((_) => {
      const sbr = Math.floor(SIZE_RANGE[1] / ROOM_RANGE[1])
      const pbr = Math.floor(PRICE_RANGE[1] / ROOM_RANGE[1])
      const rooms = lodash.random(ROOM_RANGE[0], ROOM_RANGE[1])
      const cityKey = keys[lodash.random(0, keySize - 1)]
      const city = cities[cityKey]

      return {
        rooms,
        name: faker.address.streetAddress(),
        description: faker.address.secondaryAddress() + ', ' + cityKey,
        size: rooms * sbr - lodash.random(0, sbr),
        price: rooms * pbr - lodash.random(0, pbr),
        realtorId: ids[lodash.random(ids.length - 1)],
        status: lodash.random(5) === 1 ? Apartment.statuses[1] : Apartment.statuses[0],
        lat: lodash.random(city.lat[0], city.lat[1]),
        lng: lodash.random(city.lng[0], city.lng[1]),
        // lng: lodash.random(66.92253626839566, 67.22011509712765),
      }
    })
  }
}
