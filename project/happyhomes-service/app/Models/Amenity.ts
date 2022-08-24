// import { DateTime } from 'luxon'
// import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
// import User from './User'

// export default class Amenity extends BaseModel {
//   @column({ isPrimary: true })
//   public id: number

//   @column()
//   public name: string

//   @column()
//   public icon: string

//   @belongsTo(() => User)
//   public user: BelongsTo<typeof User>

//   @column()
//   public userId: number

//   @column({ consume: (v) => !!v })
//   public isActive: boolean

//   @column.dateTime({ autoCreate: true })
//   public createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   public updatedAt: DateTime

//   public static filters = scope((query, user: User, filters) => {
//     if (!user.isAdmin() || (user.isAdmin() && !filters.showRemoved)) {
//       query.where('isActive', true)
//     }

//     if (filters.query) {
//       query.where('name', 'LIKE', `%${filters.query}%`)
//     }
//   })
// }
