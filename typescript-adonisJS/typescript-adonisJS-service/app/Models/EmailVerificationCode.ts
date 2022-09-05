import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import random from 'lodash/random'

import User from './User'

export default class EmailVerificationCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ consume: (v) => !!v })
  public isActive: boolean

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generateCode(model: EmailVerificationCode) {
    model.generateCode(model)
  }

  public generateCode(model: EmailVerificationCode) {
    model.code = random(101909, 929689)
    model.isActive = true
    model.expiresAt = DateTime.local().plus({ hours: 3 })
  }
}
