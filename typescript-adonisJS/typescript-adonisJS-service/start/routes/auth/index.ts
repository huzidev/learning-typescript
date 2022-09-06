import Route from '@ioc:Adonis/Core/Route'

import AuthV1Routes from './v1'

export default function AuthRoutes() {
  Route.group(() => {
    AuthV1Routes()
  }).prefix('/auth')
}
