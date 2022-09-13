import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm' // Lucid data models extends the Base Model to inherit the properties and methods for interacting with a database table and it's necessary to import belongsTo and BelongsTo
import Sort from 'App/Utils/Sort'

import User from './User'

export type ApartmentStatus = typeof Apartment.statuses[number] // since at index 0th the key is available and at index of 1 the type is rented

const APARTMENT_AVAILABLE: ApartmentStatus = 'available'
// const APARTMENT_RENTED: ApartmentStatus = 'rented'

export default class Apartment extends BaseModel {
  // BaseModel for interacting with database
  public static statuses = ['available', 'rented'] as const
  // as const means these are constant value

  // function in this page will only works if we are at home page watching all apartments
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

  @belongsTo(() => User, { // means apartment belongs to user and user can be either admin or realtor and belongsTo create relationship bw two models here User is another Model
    foreignKey: 'realtorId', // foreignKey is defined in schema of apartments
  })
  public realtor: BelongsTo<typeof User> // realtor is just a name of relationship

  @column({ consume: (value) => !!value }) // !! called double bang make a value a boolean
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static filtersSort = scope((query, user: User, filters) => { // scope MUST have to be a static property because Query scopes are the REUSABLE function (filters) are the filters which use can change according to own choice like minSize 33 maxSize 1000
    if (!user.isAdmin()) { // isAdmin is function created in User.ts model since user : User therefore we can say user.isAdmin since scope make REUSABLE function therefore we can REUSE isAdmin() function
      query.where('isActive', true) // where() will takes 2 parameters first is string and second is value
    } else if (user.isAdmin() && filters.isActive !== undefined) {
      query.where('isActive', filters.isActive)
    }

    if (user.role === 'client') { // so client can only see available apartments NOT any Rented apartment
      query.where('status', APARTMENT_AVAILABLE)
    } else if (filters.status) { // we've checked the condition filter.status therefore inside we can say filter.status! means can't be null since we've checked the condition and condition will be checked only if its true therefore it can't be undefined or null
      query.where('status', filters.status!) // ! at end called non-null assertion means it is never going to be a undefined or null it will have some value but never null
    }

    if (filters.userId) {
      query.where('realtorId', filters.userId)
    }

    if (filters.nw && filters.se) { // we've not create nw and se in default filters but we can send therefore filters.nw and filters.se
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

    console.log('filter')
    console.log('filter')
    console.log('filter')
    console.log('filter', filters)
    console.log('filter isActive', filters.isActive)
    console.log('filter status', filters.status)
    console.log('filter status not null', filters.status!)
    console.log('useID', filters.userId)
    console.log('filterNW', filters.nw)
    console.log('filterSE', filters.se)
    console.log('user Role', user.role)
    console.log('user Role', user.isClient())
    console.log('filters Sort', filters.sort) // if we sort price then it'll be of type { price } and if we sort rooms then { rooms }
    Sort.mapObjToQuery(filters.sort, query) // mapObjToQuery a custom function created by Us in sort.ts it'll take 2 parameters first object and
    // filters.sort is object and other is query
  })
}
