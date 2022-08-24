import Route from '@ioc:Adonis/Core/Route'

export default function UserV1Routes() {
  const path = 'UserV1Controller'
  Route.group(() => {
    Route.get('/get/me', `${path}.getMe`).middleware('auth:any')
    Route.get('/get/:id', `${path}.get`)
      .middleware('auth')
      .where('id', /^[0-9]+$/)
    Route.get('/settings/me', `${path}.settings`).middleware('auth:any')

    Route.get('/list/:page', `${path}.getAll`)
      .middleware('auth:admin')
      .where('id', /^[0-9]+$/)

    Route.post('/add', `${path}.create`).middleware('auth:admin')

    // edit/me for updating own self like edit profile
    Route.put('/edit/me', `${path}.update`)
      .middleware('auth')
      .where('id', /^[0-9]+$/)
    // edit/:id is for updating other user like admin updating other users therefore id of that specific user
    Route.put('/edit/:id', `${path}.update`)
      .middleware('auth:admin')
      .where('id', /^[0-9]+$/)

    Route.delete('/remove/:id', `${path}.remove`)
      .middleware('auth:admin')
      .where('id', /^[0-9]+$/)
  }).prefix('/v1')
}
