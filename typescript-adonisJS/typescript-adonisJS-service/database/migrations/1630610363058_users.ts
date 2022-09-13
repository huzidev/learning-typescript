import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable().index()
      table.string('email', 255).unique().notNullable().index()
      table.string('avatar', 255).nullable()
      table.enum('role', User.roles).defaultTo(User.roles[0]).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.string('google', 60).unique().nullable()
      table.string('facebook', 60).unique().nullable()

      table.boolean('is_active').defaultTo(true).notNullable()
      table.boolean('is_banned').defaultTo(false).notNullable()
      table.boolean('is_verified').defaultTo(false).notNullable()
      table.boolean('is_theme').defaultTo(false).notNullable()

      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
