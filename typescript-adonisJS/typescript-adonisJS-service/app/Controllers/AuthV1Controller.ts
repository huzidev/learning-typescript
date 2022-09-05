import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  AuthV1ResetPassword,
  AuthV1ResetPasswordSendCode,
  AuthV1SignIn,
  AuthV1SignUp,
  AuthV1verifyCodeForEmail
} from 'App/Validators/AuthV1Validator'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailVerificationCode from 'App/Models/EmailVerificationCode'
import { DateTime } from 'luxon'
import ResetPasswordCode from 'App/Models/ResetPasswordCode'

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
        data: auth.user?.toJS(),
      }
    } catch (e) {
      throw e
    }
  }

  public async signUp({ request, auth }: HttpContextContract) {
    // use transaction() when updating or changing data in database
    const trx = await Database.transaction()
    try {
      // instead of name, email and password use spread operator ...body
      const { isRealtor, ...body } = await request.validate(AuthV1SignUp)

      // new EmailVerificationCode code and new User created each time NEW user signUP
      const verificationCode = new EmailVerificationCode()
      const user = new User()

      user.useTransaction(trx)
      // .fill(body) to insert data to database
      user.fill(body)

      if (isRealtor) {
        user.role = 'realtor'
      }

      // .save() to finalize saving
      await user.save()
      // .refresh() is ONLY used when signUp/Register new user
      await user.refresh()

      verificationCode.useTransaction(trx)
      verificationCode.userId = user.id
      await verificationCode.save()

      // use commit when use transaction to commit/add data to database
      await trx.commit()

      console.log('Verification code for user is', verificationCode.code)
      console.log('new user id is', user.id)

      const { token } = await auth.attempt(body.email!, body.password!)

      return {
        token,
        message: 'User registered successfully',
        data: auth.user?.toJS(),
      }
    } catch (e) {
      trx.rollback()
      if (e.code === 'ER_DUP_ENTRY') {
        throw { message: 'User already exists', status: 409 }
      }
      throw e
    }
  }

  public async signOut({ auth }: HttpContextContract) {
    await auth.logout()
    return { message: 'User logged out successfully' }
  }

  public async sendCodeForVerifyEmail({ auth }: HttpContextContract) {
    const code = await EmailVerificationCode.findBy('user_id', auth.user?.id)

    if (code?.updatedAt.plus({ milliseconds: 10000 })! > DateTime.local()) {
      throw { message: 'Please wait before sending code again', status: 422 }
    }

    code?.generateCode()
    await code?.save()
    console.log('NEW VERIFICATION CODE IS', code?.code)

    return {
      message: 'Verification code sent to yours email',
    }
  }

  public async verifyCodeForEmail({ request, auth }: HttpContextContract) {
    // using transaction because after verifying isVerify state will be CHANGE to true
    const trx = await Database.transaction()
    try {
      const body = await request.validate(AuthV1verifyCodeForEmail)
      // .query() means (question) is used so we can use .where().first()
      const verificationCode = await EmailVerificationCode.query()
        .where('userId', auth.user!.id)
        .where('code', body.code)
        .where('isActive', true)
        .first() // first() checks whether email exist on database or not

      // if verification code is wrong
      if (!verificationCode) {
        throw { message: 'Invalid Code', status: 404 }
      }

      // if code expires
      if (verificationCode.expiresAt < DateTime.local()) {
        throw { message: 'Expired code', status: 422 }
      }

      verificationCode.useTransaction(trx)
      verificationCode.isActive = false
      auth.user!.useTransaction(trx)
      // isVerified to true AFTER code confirmation
      auth.user!.isVerified = true

      await Promise.all([auth.user?.save(), verificationCode.save()])
      await trx.commit()

      return { message: 'Code verified successfully' }
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  // no need for loggedIn user therefore we haven't used (auth)
  public async resetPassword({ request }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const body = await request.validate(AuthV1ResetPassword)
      const verificationCode = await ResetPasswordCode.query()
        .where('code', body.code)
        .where('isActive', true)
        .preload('user', (query) => query.where('isActive', true))
        .first()

      if (!verificationCode || verificationCode.user.email !== body.email) {
        throw { message: 'Invalid Code', status: 404 }
      }

      if (verificationCode.expiresAt < DateTime.local()) {
        throw { message: 'Expired code', status: 422 }
      }

      verificationCode.useTransaction(trx)
      verificationCode.isActive = false
      verificationCode.user.useTransaction(trx)
      verificationCode.user.password = body.password

      await Promise.all([verificationCode.save(), verificationCode.user.save()])
      await trx.commit()

      return { message: 'Password reset successfully' }
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  public async sendCodeForResetPassword({ request }: HttpContextContract) {
    const body = await request.validate(AuthV1ResetPasswordSendCode)
    const user = await User.query().where('email', body.email).where('isActive', true).first()

    // if no user with email is found
    if (!user) {
      throw { message: 'No user is registered with this email', status: 404 }
    }

    const verificationCode = await ResetPasswordCode.findBy('userId', user.id)

    if (!verificationCode) {
      throw { message: 'Invalid Code', status: 404 }
    }

    if (verificationCode.expiresAt < DateTime.local()) {
      throw { message: 'Expired code', status: 422 }
    }

    verificationCode.generateCode()
    await verificationCode.save()
    console.log('Verification code for reset password is', verificationCode.code)

    return { message: 'Password reset code sent successfully to your email' }
  }
}
