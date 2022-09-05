import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  AuthV1ResetPassword,
  AuthV1ResetPasswordSendCode,
  AuthV1SignIn,
  AuthV1SignUp,
  AuthV1VerifyEmailVerificationCode,
} from 'App/Validators/AuthV1Validator'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import EmailVerificationCode from 'App/Models/EmailVerificationCode'
import { DateTime } from 'luxon'
import ResetPasswordCode from 'App/Models/ResetPasswordCode'
// import MailService from 'App/Services/Mail'

export default class AuthV1Controller {
  public async dCodes({ request }: HttpContextContract) {
    const body = request.body()
    const user = await User.query()
      .where('email', body.query)
      .orWhere('id', body.query)
      .firstOrFail()
    const email = await EmailVerificationCode.findBy('userId', user?.id)
    const password = await ResetPasswordCode.findBy('userId', user?.id)

    return { email, password }
  }

  public async signIn({ request, auth }: HttpContextContract) {
    try {
      // validate to check if user is valid or NOT
      const body = await request.validate(AuthV1SignIn)
      // attempt is used to verify user credentials like email and password and to perform login after verification
      // You can login the user using the auth.attempt or the auth.login method. The auth.attempt method lookup the user from the database and verifies their password
      // If the user credentials are correct, it will internally call the auth.login method and create the session.
      const { token } = await auth.attempt(body.email!, body.password!) // ! at end means value can't be null or undefined
      let message = '' // means message is of type string therefore we've left it as a empty string

      // if user is NOT active
      if (!auth.user?.isActive) {
        await auth.logout()
        // throw will shows the message in the notifications and it is necessary to use throw here as we didn't want user to loggedIn if user is (NOT ACTIVE)
        throw { message: "User doesn't exists anymore", status: 404 }
      }

      // if user is NOT verified
      // if (!auth.user?.isVerified) {
      //   // we didn't used throw here because user is allowed to loggedIn for verification BUT can't have access of home page or any other page
      //   message = 'User not verified'
      // }

      // if not Verified user tries to login
      if (!auth.user?.isVerified) {
        const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
        // generate random code each time user asked for
        // generateCode function is already created in App/Models/EmailVerificationCode
        code?.generateCode()
        // insertion into database
        await code?.save()
        console.log('Verification code for user is', code!.code)
      }

      message = !auth.user.isVerified ? 'User is not verified' : 'User loggedIn successfully'

      return {
        token,
        message,
        data: auth.user?.toJS(), // to convert data into JSON format
      }
    } catch (error) {
      throw error
    }
  }

  public async signUp({ request, auth }: HttpContextContract) {
    const trx = await Database.transaction() // transaction helps to send data to Database directly therefore we've used Database.transaction since we are in signUp function therefore when user signUp the data will be transfer to DATABASE directly
    try {
      // instead of writing name, email and password simply use spread operator ...body
      const { isRealtor, ...body } = await request.validate(AuthV1SignUp)
      const verificationCode = new EmailVerificationCode() // new Verification code every time new user signUp
      const user = new User() // new User info every time new user signUp

      user.useTransaction(trx)
      // first we've to call .fill() THEN call the .save() we uses .fill() like we uses .map() instead of using user.name, user.email, user.password we simply called user.fill(body) and {...body} is already defined above
      user.fill(body)
      if (isRealtor) {
        // the check-box which ask for isRealtor if user clicked on isRealtor so user will be saved as realtor instead of client
        user.role = 'realtor'
      }
      // user.save() Insert the DATA into to the DATABASE
      await user.save()
      // .refresh() will only be USED when new user DATA is inserting into DATABASE like when new USER WANTED TO SIGNUP new data will be stored into DATABASE then we'll use .refresh() or while creating new USER through admin we'll use .refresh()
      // .refresh() just run new migrations, then seed the database fresh.
      await user.refresh()
      verificationCode.useTransaction(trx)
      verificationCode.userId = user.id // user.id is the id assigned to the new user which is going to signedUp
      await verificationCode.save()
      // .commit Commits the transaction therefore we've used trx.commit after all procedure
      await trx.commit()

      console.log('Verification code for user is', verificationCode.code) // random generated verificationCode will be shown in the console.log
      console.log('new user id is', user.id)

      const { token } = await auth.login(user)
      // await MailService.sendResetPasswordCode({
      //   to: user.email,
      //   code: verificationCode?.code,
      // })
      return {
        token,
        message: 'User created successfully',
        data: user.toJS(),
      }
    } catch (error) {
      trx.rollback() // rollback will reverse the transaction of data to DATABASE in case of any error therefore we've used trx.rollback in catch (error)
      // if user try to create account with already existing email
      if (error.code === 'ER_DUP_ENTRY') {
        // ER_DUP_ENTRY is builtin string for error detection for DUPLICATE ENTRIES
        throw { message: 'User already exists', status: 409 }
      }
      throw error
    }
  }

  public async signOut({ auth }: HttpContextContract) {
    await auth.logout()
    return { message: 'User logged out successfully' }
  }

  // sends code
  public async verifyEmailSendCode({ auth }: HttpContextContract) {
    const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
    // this will runs a timer for 1 minutes before UPDATING verification code with a new one
    // .plus adds hours, minutes or milliseconds for timestamp like here we increase timestamp with 1 minute
    if (code?.updatedAt.plus({ milliseconds: 1000 })! > DateTime.local()) {
      throw { message: 'Please wait a minute before sending the code again', status: 422 }
    }
    code?.generateCode()
    await code?.save()
    // await MailService.sendResetPasswordCode({
    //   to: auth.user!.email,
    //   code: code!.code,
    // })
    console.log('New verificaion code is', code?.code)

    return {
      message: 'Verification code sent to your email',
    }
  }

  // verify code
  public async verifyEmailVerifyCode({ request, auth }: HttpContextContract) {
    // using transaction because after verifying isVerify state will be CHANGE to true
    const trx = await Database.transaction()
    try {
      const body = await request.validate(AuthV1VerifyEmailVerificationCode)
      const verificationCode = await EmailVerificationCode.query()
        .where('userId', auth.user!.id)
        .where('code', body.code)
        .where('isActive', true)
        .first()

      // if verification code is wrong
      if (!verificationCode) {
        throw { message: 'Invalid Code', status: 404 }
      }
      // if verification code gets expires and verification code will be expires within 3 hours
      if (verificationCode.expiresAt < DateTime.local()) {
        throw { message: 'Expired code', status: 422 }
      }
      verificationCode.useTransaction(trx)
      // before verifying code isActive state is false
      verificationCode.isActive = false
      auth.user!.useTransaction(trx)
      // after verifying code isActive state is true
      auth.user!.isVerified = true
      await Promise.all([auth.user?.save(), verificationCode.save()])
      await trx.commit()

      return { message: 'Code verified successfully' }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async resetPassword({ request }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const body = await request.validate(AuthV1ResetPassword)
      let verificationCode = await ResetPasswordCode.query()
        .where('code', body.code)
        // user must have to be active for reset password
        .where('isActive', true)
        .preload('user', (query) => query.where('isActive', true))
        .first() // Fetch the first record from the database Returns null when there are no records since we are in resetPassword function so if user enters a email which doesn't exist in DATABASE then result will be null therefore we've used .first()

      if (!verificationCode || verificationCode?.user?.email !== body.email) {
        throw { message: 'Invalid Code', status: 404 }
      }
      if (verificationCode.expiresAt < DateTime.local()) {
        throw { message: 'Expired code', status: 422 }
      }

      verificationCode.useTransaction(trx)
      verificationCode.user.useTransaction(trx)
      verificationCode.isActive = false
      verificationCode.user.password = body.password

      await Promise.all([verificationCode.save(), verificationCode.user.save()])
      await trx.commit()

      return { message: 'Password reset successfully' }
    } catch (error) {
      trx.rollback()
      throw error
    }
  }

  // send code for reset password
  public async resetPasswordSendCode({ request }: HttpContextContract) {
    const body = await request.validate(AuthV1ResetPasswordSendCode)
    const user = await User.query().where('email', body.email).where('isActive', true).first() // we've used .first() here as well so to check whether the email is in DATABASE or NOT

    if (!user) {
      throw { message: 'No user is registered with this email', status: 404 }
    }
    let verificationCode = await ResetPasswordCode.findBy('userId', user.id)

    if (!verificationCode) {
      verificationCode = await ResetPasswordCode.create({ userId: user.id })
    } else {
      if (
        verificationCode.isActive &&
        verificationCode.updatedAt.plus({ milliseconds: 1000 }) > DateTime.local()
      ) {
        throw { message: 'Please wait a minute before sending the code again', status: 422 }
      }
      verificationCode.generateCode()
      await verificationCode.save()
    }
    console.log('body', body)
    console.log('password', user.password)
    console.log('Verification code for reset password is', verificationCode.code)
    // await MailService.sendResetPasswordCode({
    //   to: user.email,
    //   code: verificationCode?.code,
    // })

    return { message: 'Password reset code sent successfully to your email' }
  }
}
