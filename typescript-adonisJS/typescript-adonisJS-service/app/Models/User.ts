import { DateTime } from 'luxon'
import pick from 'lodash/pick'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  afterSave,
  afterFetch,
  afterFind,
  scope,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

export type UserRole = typeof User.roles[number]

// BaseModel for interaction with Database
export default class User extends BaseModel {
  public static roles = ['buyer', 'realtor', 'admin', 'founder'] as const

  // getRoleIndex for loggedIn user's role
  public static getRoleIndex = (role: UserRole): any => User.roles.indexOf(role)

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: UserRole

  // boolean values
  @column({ consume: (value) => !!value })
  public isActive: boolean = true

  @column({ consume: (value) => !!value })
  public isBanned: boolean = false

  @column({ consume: (value) => !!value })
  public isVerified: boolean = false

  @column({ consume: (value) => !!value })
  public isTheme: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // beforeSave is called every time a new user is created or updated
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
