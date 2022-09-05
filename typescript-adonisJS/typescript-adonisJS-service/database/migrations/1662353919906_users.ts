import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).unique().notNullable().index()
      table.string('email', 255).unique().notNullable().index()
      table.enum('role', User.roles).defaultTo([User.roles[0]]).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.boolean('is_active').defaultTo(true).notNullable()
      table.boolean('is_banned').defaultTo(false).notNullable()
      table.boolean('is_verified').defaultTo(false).notNullable()
      table.boolean('is_theme').defaultTo(false).notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}