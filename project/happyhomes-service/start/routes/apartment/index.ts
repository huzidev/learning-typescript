import Route from '@ioc:Adonis/Core/Route'

import ApartmentV1Routes from './v1'

export default function ApartmentRoutes() {
  Route.group(() => {
    ApartmentV1Routes()
  }).prefix('/apartment')
}
