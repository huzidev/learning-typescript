import Route from '@ioc:Adonis/Core/Route'

export default function AuthV1Routes() {
  Route.group(() => {
    Route.post('/signin')
  })
}
