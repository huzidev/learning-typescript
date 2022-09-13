import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import Sort from 'App/Utils/Sort'

import User from './User'

export type ApartmentStatus = typeof Apartment.statuses[number]

const APARTMENT_AVAILABLE: ApartmentStatus = 'available'

export default class Apartment extends BaseModel {
  public static statuses = ['available', 'rented'] as const

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public size: number

  @column()
  public rooms: number

  @column()
  public price: number

  @column()
  public lat: number

  @column()
  public lng: number

  @column()
  public status: ApartmentStatus

  @column()
  public realtorId: number

  @belongsTo(() => User, {
    foreignKey: 'realtorId',
  })
  public realtor: BelongsTo<typeof User>

  @column({ consume: (v) => !!v })
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static filtersSort = scope((query, user: User, filters) => {
    if (!user.isAdmin()) {
      query.where('isActive', true)
    } else if (user.isAdmin() && filters.isActive!) {
      query.where('isActive', filters.isActive)
    }

    if (user.role === 'buyer') {
      query.where('status', APARTMENT_AVAILABLE)
    } else if (filters.status) {
      query.where('status', filters.status!)
    }

    if (filters.userId) {
      query.where('realtorId', filters.userId)
    }

    if (filters.nw && filters.se) {
      query.where('lat', '>=', filters.se.lat).where('lat', '<', filters.nw.lat)
      query.where('lng', '>=', filters.nw.lng).where('lng', '<', filters.se.lng)
    }

    // these are for custom slider filters
    query.where('price', '>=', filters.minPrice)
    query.where('price', '<=', filters.maxPrice)
    query.where('size', '>=', filters.minSize)
    query.where('size', '<=', filters.maxSize)
    query.where('rooms', '>=', filters.minRooms)
    query.where('rooms', '<=', filters.maxRooms)

    Sort.mapObjToQuery(filters.sort, query)
  })
}
