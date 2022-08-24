// import Route from '@ioc:Adonis/Core/Route'

// export default function AmenityV1Routes() {
//   const path = 'AmenityV1Controller'
//   Route.group(() => {
//     Route.get('/list', `${path}.list`).middleware('auth')
//     Route.post('/add', `${path}.create`).middleware('auth:admin')
//     Route.post('/add_many', `${path}.createMany`).middleware('auth:admin')
//     Route.put('/edit/:id', `${path}.update`)
//       .where('id', /^[0-9]+$/)
//       .middleware('auth:admin')
//     Route.delete('/remove/:id', `${path}.remove`).middleware('auth:admin')
//     Route.delete('/remove_many', `${path}.removeMany`).middleware('auth:admin')
//   }).prefix('/v1')
// }
