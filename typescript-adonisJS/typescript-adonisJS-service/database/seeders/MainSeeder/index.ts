import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    // if (seeder.default.developmentOnly && !Application.inDev) {
    //   return
    // }

    await new seeder.default(this.client).run()
  }
  public async run() {
    await this.runSeeder(await import('../InitialUser'))
    await this.runSeeder(await import('../InitialApartment'))
  }
}
