import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import User, { UserRole } from 'App/Models/User'

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = '/login'

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    /**
     * Hold reference to the guard last attempted within the for loop. We pass
     * the reference of the guard to the "AuthenticationException", so that
     * it can decide the correct response behavior based upon the guard
     * driver
     */
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        /**
         * Instruct auth to use the given guard as the default guard for
         * the rest of the request, since the user authenticated
         * succeeded here
         */
        auth.defaultGuard = guard
        return true
      }
    }

    /**
     * Unable to authenticate using any guard
     */
    throw new AuthenticationException( // this error will be shown in notification if user's token get expired and user try to access something then this error will be shown
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo
    )
  }

  /**
   * Handle request
   */
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    [role]: string[] | UserRole[]
  ) {
    await this.authenticate(auth, [auth.name])

    // if user is not active
    if (!auth.user?.isActive) {
      await auth.logout()
      throw { message: "User doesn't exists anymore", status: 404 }
    }

    // if user is banned
    if (auth.user?.isBanned) {
      await auth.logout()
      throw { message: 'User is banned', status: 403 }
    }

    if (role === 'no_verify' && auth.user?.isVerified) {
      throw { message: 'User already verified', status: 403 }
    } else if (!auth.user?.isVerified && role !== 'any' && role !== 'no_verify') {
      throw { message: 'Please verify your account', status: 403 }
    } else if (role && role !== 'no_verify') {
      const parsedRole = role as UserRole // UserRole includes roles like client, realtor, admin

      // available role
      const guardRole = User.roles.indexOf(parsedRole)
      // loggedIn user's role
      const userRole = User.roles.indexOf(auth.user!.role)

      if (userRole < guardRole) {
        // because role is diff for superadmin, admin and realtor
        throw { message: 'Action not allowed', status: 401 }
      }
    }

    await next()
  }
}
