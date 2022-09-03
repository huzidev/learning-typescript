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
}

