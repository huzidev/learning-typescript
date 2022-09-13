import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Apartment from 'App/Models/Apartment'

export default class Apartments extends BaseSchema {
  protected tableName = 'apartments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 120).notNullable()
      table.string('description').notNullable()
      table.integer('size', 10).notNullable()
      table.integer('price', 20).notNullable()
      table.integer('rooms', 5).notNullable()
      table.double('lat')
      table.double('lng')
      table.boolean('is_active').defaultTo(true).notNullable()
      table.enum('status', Apartment.statuses).defaultTo(Apartment.statuses[0]).notNullable()
      table
        .integer('realtor_id')
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
