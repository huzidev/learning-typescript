import Route from '@ioc:Adonis/Core/Route'
import AuthV1Controller from 'App/Controllers/AuthV1Controller'

export default function AuthV1Routes() {
  const path = AuthV1Controller

  Route.group(() => {
    Route.post('/sing_in', `${path}.signIn`)
    Route.post('/sign_up', `${path}.signUp`)
  })
}
