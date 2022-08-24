import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Amenities extends BaseSchema {
  protected tableName = 'amenities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 120).notNullable().unique().index()
      table.string('icon').nullable()
      table.boolean('is_active').defaultTo(true).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
