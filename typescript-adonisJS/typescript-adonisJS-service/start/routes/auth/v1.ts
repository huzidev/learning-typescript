import Route from '@ioc:Adonis/Core/Route'
import AuthV1Controller from 'App/Controllers/AuthV1Controller'

export default function AuthV1Routes() {
  const path = AuthV1Controller

  Route.group(() => {
    Route.post('/sing_in', `${path}.signIn`)
    Route.post('/sign_up', `${path}.signUp`)
    Route.post('/sign_out', `${path}.signOut`)

    // Verification Email
    Route.post('verify_email/send_code', `${path}.sendCodeForVerifyEmail`).middleware(
      'auth:no_verify'
    )
    Route.post('verify_email/verify_code', `${path}.verifyCodeForEmail`).middleware(
      'auth:no_verify'
    )

    // Reset Password
    Route.post('reset_password/send_code', `${path}.sendCodeForResetPassword`)
    Route.post('reset_password', `${path}.resetPassword`)
  }).prefix('v1')
}
