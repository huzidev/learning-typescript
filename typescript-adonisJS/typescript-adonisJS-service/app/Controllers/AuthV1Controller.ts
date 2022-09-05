import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { AuthV1SignIn } from 'App/Validators/AuthV1Validator'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailVerificationCode from 'App/Models/EmailVerificationCode'
import { DateTime } from 'luxon'

export default class AuthV1Controller {
  public async signIn({ request, auth }: HttpContextContract) {
    try {
      // vlidate()/Proof for valid user
      const body = await request.validate(AuthV1SignIn)

      // auth.attempt checks user from the database and verifies their password
      const { token } = await auth.attempt(body.email!, body.password!)
      let message = ''

      // if user is not active
      if (!auth.user?.isActive) {
        await auth.logout()
        throw { message: "User doesn't exists anymore", status: 404 }
      }

      // if user is not verified
      if (!auth.user?.isVerified) {
        const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
        code?.generateCode()
        await code?.save()
        console.log('VERIFICATION CODE IS', code!.code)
      }

      message = !auth.user.isVerified ? 'User is not verified' : 'User loggedIn successfully'

      return {
        token,
        message,
        data: auth.user.toJS(),
      }
    } catch (e) {
      throw e
    }
  }

  public async signUp({ request, auth }: HttpContextContract) {
    // use transaction() when updating or changing data in database
    const trx = await Database.transaction()
  }
}
