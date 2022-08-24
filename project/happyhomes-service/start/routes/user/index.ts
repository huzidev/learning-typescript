import Route from '@ioc:Adonis/Core/Route'

import UserV1Routes from './v1'

export default function UserRoutes() {
  Route.group(() => {
    UserV1Routes()
  }).prefix('/user')
}
