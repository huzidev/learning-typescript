import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoriteApartments extends BaseSchema {
  protected tableName = 'favorite_apartments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('apartment_id').unsigned().references('apartments.id').notNullable()
      table.boolean('is_active').defaultTo(true).notNullable()
      table.unique(['user_id', 'apartment_id'])
      table.index(['user_id', 'apartment_id'])

      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
