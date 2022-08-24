import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Apartment from 'App/Models/Apartment'
import {
  ApartmentV1Create,
  ApartmentV1ListFilters,
  ApartmentV1Update,
} from 'App/Validators/ApartmentValidator'
import { validator } from '@ioc:Adonis/Core/Validator' // for query string
import { DEFAULT_FILTERS } from 'App/Default/Filters'
import Utils from 'App/Utils/index'

export default class ApartmentV1Controller { // HttpContextContract holds the information like the request body

  // for default filters
  public async defaultFilters() {
    // we didn't used HttpContextContract here because we don't want request and other parameters here
    return {
      data: DEFAULT_FILTERS,
    }
  }

  // for getting all apartments
  public async getAll({ request, auth, params }: HttpContextContract) { // HttpContextContract because using request
    const data = Utils.parseQS(request.qs(), ['sort', 'nw', 'se']) // parseQS() will takes 2 params first is query of any type and second is array of string and these three are .members() from ApartmentV1ListFilters
    const filters = await validator.validate({ // it check if user is valid therefore it return promise that after checking it'll tell either to fulfil or reject
      schema: ApartmentV1ListFilters.schema, // by default we don't have validator for query string therefore we've to import validator from adonis and then request.qs
      // query string is the string written after ? in ours URL for ex ?name="test"%num="20"
      messages: ApartmentV1ListFilters.messages,
      data: data,
    })
    let userId // and userId is also defined in ours v1.ts as path /list/:userId/:page

    const byMe = request.url().includes('/me') // /me is the url path when realtor check those apartment which REALTOR have uploaded by that realtor therefore we've used variable const byMe

    let profileId = params.userId
    let userID = auth.user?.id

    console.log('get all aparment id')
    console.log('id')
    console.log('id')
    console.log('id id id', profileId)
    console.log('userID', userID)

    if (params.userId) { // when user go for view profile then according to ID the data will show like name etc
      userId = params.userId
    } else if (byMe) { // respective id for user and admin
      userId = auth.user?.id
    }

    console.log('users Role', auth.user?.role)

    const resp = await Apartment.query()
      .withScopes((scopes) => {
        return scopes.filtersSort(auth.user!, { ...DEFAULT_FILTERS, ...filters, userId })
      })
      .preload('realtor')
      .paginate(params.page || 1, filters.nw && filters.se ? 50000 : 25) // this 25 means only 25 apartments will be loaded when user is at homepage or if user is at realtor data which shows all the apartments uploaded by realtor 25 apartments will also be shown in realtor info
    return resp
  }

  // get apartment info with id
  public async getById({ params }: HttpContextContract) {
    const apartment = await Apartment.findBy('id', params.id)
    console.log('apartment Id', params.id)
    if (!apartment) {
      throw {
        message: 'No apartment found by id ' + apartment, // apartment will be null since no apartment found with that id
        status: 404,
      }
    }
    await apartment.load('realtor')
    return { data: apartment }
  }

  // for creating apartments
  public async create({ request, auth }: HttpContextContract) {
    const body = await request.validate(ApartmentV1Create)
    const obj = await Apartment.create({
      ...body,
      isActive: true,
      realtorId: auth.user?.id,
    })

    return {
      data: obj,
      message: 'Apartment created successfully',
    }
  }

  // for updating apartment info
  public async update({ request, params, auth }: HttpContextContract, message?: string) {
    const body = await request.validate(ApartmentV1Update)
    const apartmentId: number = params.id
    const apartment = await Apartment.findBy('id', apartmentId)

    if (!apartment) {
      throw {
        message: 'No apartment found by id ' + apartment,
        status: 404,
      }
    }

    // if apartment owner id doesn't match with the id of current loggedIn id or IF admin is not loggedIn
    if (apartment.realtorId !== auth.user?.id && !auth.user?.isAdmin()) {
      throw {
        message: "You don't have permissions to edit this apartment",
        status: 401,
      }
    }

    console.log(apartment)

    apartment.merge(body)
    await apartment.save()
    await apartment.load('realtor')
    return {
      data: apartment,
      message: message || `Apartment ${apartmentId} updated successfully`,
    }
  }

  // for deleting apartments
  public async remove(context: HttpContextContract) {
    context.request.updateBody({ isActive: false })
    return this.update(context, `Apartment ${context.params.id} removed successfully`)
  }
}
