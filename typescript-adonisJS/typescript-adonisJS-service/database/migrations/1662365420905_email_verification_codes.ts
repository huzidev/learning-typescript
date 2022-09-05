import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'email_verification_codes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 6).notNullable()
      table
        .integer('user_id')
        // use unsigned() when using references()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table.boolean('is_active').defaultTo(true).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('expires_at', { useTz: true })

      table.unique(['code', 'user_id'])
      table.index(['code', 'user_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}