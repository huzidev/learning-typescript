import Route from '@ioc:Adonis/Core/Route'

export default function AuthV1Routes() {
  const path = 'AuthV1Controller'
  Route.group(() => {
    Route.post('/sign_in', `${path}.signIn`)
    Route.post('/d_codes', `${path}.dCodes`)
    Route.post('/sign_up', `${path}.signUp`)
    Route.post('/social/facebook', `${path}.signUp`)
    Route.post('/social/google', `${path}.signUp`)
    Route.post('/sign_out', `${path}.signOut`).middleware('auth:any')

    Route.post('/verify_email/send_code', `${path}.verifyEmailSendCode`).middleware(
      'auth:no_verify'
    )
    Route.post('/verify_email/verify_code', `${path}.verifyEmailVerifyCode`).middleware(
      'auth:no_verify'
    )

    // Reset password
    Route.post('/reset_password', `${path}.resetPassword`)
    Route.post('/reset_password/send_code', `${path}.resetPasswordSendCode`)
  }).prefix('/v1')
}
