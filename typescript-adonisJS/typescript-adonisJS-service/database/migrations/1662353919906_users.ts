import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).unique().notNullable().index()
      table.string('email', 255).unique().notNullable().index()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.boolean('is_active').defaultTo(true).notNullable()
      table.boolean('is_banned').defaultTo(false).notNullable()
      table.boolean('is_verified').defaultTo(false).notNullable()
      table.boolean('is_theme').defaultTo(false).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
