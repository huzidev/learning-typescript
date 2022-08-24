import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'
import {
  UserV1Create,
  UserV1ListFilters,
  UserV1Update,
  UserV1UpdateMe,
  UserV1Settings,
} from 'App/Validators/UserV1Validator'
import User from 'App/Models/User'
import Utils from 'App/Utils'
export default class UserV1sController {
  public async getMe({ auth }: HttpContextContract) {
    return { data: auth.user?.toJS() }
  }

  public async get({ params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if (!user) {
      throw { message: 'User not found', status: 404 }
    }
    return { data: user }
  }

  public async getAll({ request, params }: HttpContextContract) {
    const filters = await validator.validate({
      schema: UserV1ListFilters.schema,
      messages: UserV1ListFilters.messages,
      data: Utils.parseQS(request.qs(), ['sort']), // sort is .member() in ApartmentV1ListFilters
    })

    let data = await User.query()
      .withScopes((scopes) => scopes.filtersSort(filters))
      .paginate(params.page || 1, 25) // this will also show just 25 users when admin go to manage user page

    // const user = await User.query().withScopes((scopes) => scopes.filters(filters))
    return data
  }

  public async create({ request }: HttpContextContract) {
    try {
      const body = await request.validate(UserV1Create)
      const user = await User.create(body)
      // .refresh() will only be USED when new user DATA is inserting into DATABASE like when new USER WANTED TO SIGNUP new data will be stored into DATABASE then we'll use .refresh() or while creating new USER through admin we'll use .refresh()
      // .refresh() just run new migrations, then seed the database fresh.
      await user.refresh()
      return { message: 'User created successfully', data: user }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw {
          message: 'Email already in use',
          status: 409,
        }
      }
      throw error
    }
  }

  public async settings({ request }: HttpContextContract) {
    try {
      let body;
      body = await request.validate(UserV1Settings)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async update({ request, params, auth }: HttpContextContract) {
    try {
      // userId will be either id of specific user on which admin clicked therefore params.id or if admin or user wanted to update own self then that id therefore auth.user.id
      const userId = params.id || auth.user?.id
      let body
      // if admin wanted to update user therefore condition says (params.id)
      if (params.id) {
        body = await request.validate(UserV1Update)
      } // else auth.user.id therefore validate(UserV1UpdateMe)
      else if (auth.user?.id) {
        body = await request.validate(UserV1UpdateMe)
      }
      // if some error occurs while updating then this message will be shown
      if (!body || !Object.keys(body).length) {
        throw {
          message: 'Bad request',
          status: 400,
        }
      }
      const user = await User.findBy('id', userId)
      if (!user) {
        throw {
          message: 'User not found',
          status: 404,
        }
      }
      // so if someone tries to change the URL to update someone else even if they don't have access then it'll show an error insufficient access for instance if client wanted to UPDATE info of super-admin then an error will be shown
      if (!auth.user!.hasAccess(user.role)) {
        throw {
          message: 'In sufficient access',
          status: 401,
        }
      }
      console.log('user.role current is', user.role)
      user.merge(body)
      // .save() will update the user info and save it into DATABASE
      await user.save()
      return { message: 'User updated successfully', data: user }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw {
          message: 'Email already in use',
          status: 409,
        }
      }
      throw error
    }
  }

  public async remove({ auth, params }: HttpContextContract) {
    // params.id will be the id of user which we wanted to remove by clicking on it
    const user = await User.findBy('id', params.id)
    // if user not found
    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      }
    }
    if (!auth.user!.hasAccess(user.role)) {
      throw {
        message: 'In sufficient access',
        status: 401,
      }
    }
    // for removing user we just have to change the state of user from active to false
    user.isActive = false
    // .save() will save the updated data in DATABASE
    await user.save()
    return { message: 'User removed successfully', data: user }
  }
}
