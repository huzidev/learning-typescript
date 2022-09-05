import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { AuthV1SignIn } from 'App/Validators/AuthV1Validator'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailVerificationCode from 'App/Models/EmailVerificationCode'
import { DateTime } from 'luxon'

export default class AuthV1Controller {
  public async signIn({ request, auth }: HttpContextContract) {
    // vlidate/Proof for valid user
    const body = await request.validate(AuthV1SignIn)
  }
}
