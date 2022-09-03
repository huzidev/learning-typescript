// for default createdAt and updateAt
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

// import Filter from 'App/Utils/Filter'
import Sort from 'App/Utils/Sort'

import Apartment from './Apartment'

export type UserRole = typeof User.roles[number]

// const FILTER_LIKE_KEYS = ['name', 'email', 'facebook', 'google']
// const FILTER_DATE_KEYS = ['createdAtBefore', 'createdAtAfter', 'updatedAtBefore', 'updatedAtAfter']

export default class User extends BaseModel {
  public static roles = ['client', 'realtor', 'admin', 'super-admin'] as const
  public static getRoleIndex = (role: UserRole): any => User.roles.indexOf(role)

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public avatar?: string

  public avatarUrl?: string

  @column({ serializeAs: null }) // serializeAs: null for Hiding properties specially used for passwords so when we see the output we can't see the password serializeAs is also used to rename the properties like {serializeAs : test} it's actual name will be whatever is defined as public BUT the output model will have serialize name
  public password: string // if we checks in networks in console of browser in preview we can check that password wasn't showing because of Hiding properties { serializeAs: null }

  @column()
  public rememberMeToken?: string

  @column()
  public google?: string

  @column()
  public facebook?: string

  @column()
  public role: UserRole

  @hasMany(() => Apartment) // means User can have many apartment
  public apartments: HasMany<typeof Apartment>

  // by default values for users and function in this page will only works if we go to Users page as a admin
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

  // Hooks can be async. So you can use the await keyword inside them.
  @beforeSave() // The beforeSave hook is called every time a new user is created or updated
  public static async preSave(user: User) {
    // will only runs if user update the password so we can hash the new password
    if (user.$dirty.password) {
      //The $dirty object only contains the changed values. So, you can check if the password was changed and then hash the new value.
      user.password = await Hash.make(user.password!)
    }
  }

  @afterFetch()
  @afterSave()
  @afterFind() // The afterFind receives the model instance since (User extends BaseModel) hence (User) is model instance
  public static loadAvatar(user: User) {
    if (user && user.loadAvatar) {
      user.loadAvatar()
    }
  }

  public loadAvatar() {}

  public toJS() {
    // By default it only selects 1 row. therefore we uses return (pick) to pick or get access of all data
    return pick(this.toJSON(), [
      // pick will take object and propertyNames[array] to converts data into JSON format
      'id',
      'name',
      'email',
      'avatar_url',
      'is_banned',
      'is_verified',
      'is_theme',
      'role',
      'facebook',
      'google',
    ])
  }

  public isAdmin() {
    return User.roles.indexOf(this.role) >= 2 // >= 2 because admin and super-admin are at INDEX of 2 and 3
  }

  public isRealtor() {
    return User.roles.indexOf(this.role) === 1
  }

  public isClient() {
    return User.roles.indexOf(this.role) === 0
  }

  public hasAccess(role: UserRole): boolean {
    // hasAccess either true or false therefore boolean and it'll be true when loggedIn as admin
    const access = User.getRoleIndex(role)
    const myRole = User.getRoleIndex(this.role) // will gets the index of that role from whom we loggedIn if we loggedIn as admin the role index will be at greater than 2
    const check = myRole >= access // if myRole is of client which is at of index 0 and only role with index of 2 and greater than 2 have access like admin and super-admin therefore we check here myRole >= access
    return check
  }

  public static filtersSort = scope((query, filters) => {
    // query.orderBy('createdAt', 'desc')
    // we've to use Filter and Sort both because we can Sort Users in Ascending or Descending order according to their name but we didn't used Filter.mapObjToQuery in apartments because of no need at their
    // Filter.mapObjToQuery(filters, FILTER_LIKE_KEYS, FILTER_DATE_KEYS, query)

    Sort.mapObjToQuery(filters.sort, query)
    console.log('users')
    console.log('users')
    console.log('users')
    console.log('super admin role', User.roles[3]) // super admin is at index of 3
  })
}
