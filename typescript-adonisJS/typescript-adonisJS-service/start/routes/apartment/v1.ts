import Route from '@ioc:Adonis/Core/Route'

export default function ApartmentV1Routes() {
  const path = 'ApartmentV1Controller' // reference from controllers created at app/controllers where getAll ref is defined
  // no need for importing it adonis will import it by its own
  Route.group(() => {
    Route.get('/default_filters', `${path}.defaultFilters`).middleware('auth')

    Route.get('/list/:page', `${path}.getAll`) // since it is :page therefore we've to write page in where() like .where('page', /^[0-9]+$/)
      .where('page', /^[0-9/]+$/) // /^[0-9]+$/ called regex is of adonis so user can't put abc or anything except numeric value suppose user enters 11 hence 1 adn 1 are two diff characters and each char are in the range of 0-9 in brief 0-9 means any numeric value
      .middleware('auth') // middleware 'auth' is defined in kernel.ts
    Route.get('/list/:userId/:page', `${path}.getAll`)
      .where('userId', /^[0-9]+$/)
      .where('page', /^[0-9]+$/)
      .middleware('auth')
    Route.get('/list/me/:page', `${path}.getAll`) // when realtor clicked on manage apartments :page first page will shows 25 apartments 2nd page shows further more 25 apartments
      .where('page', /^[0-9]+$/)
      .middleware('auth:realtor')
    Route.get('/get/:id', `${path}.getById`)
      .where('id', /^[0-9]+$/)
      .middleware('auth')

    Route.post('/add', `${path}.create`).middleware('auth:realtor')

    Route.put('/edit/:id', `${path}.update`)
      .where('id', /^[0-9]+$/)
      .middleware('auth:realtor')

    Route.delete('/remove/:id', `${path}.remove`)
      .where('id', /^[0-9]+$/)
      .middleware('auth:realtor')
  }).prefix('/v1')
}
