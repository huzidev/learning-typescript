// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Amenity from 'App/Models/Amenity'
// import {
//   AmenityV1Create,
//   AmenityV1CreateMany,
//   AmenityV1RemoveMany,
//   AmenityV1Update,
//   ApartmentV1ListFilters,
// } from 'App/Validators/AmenityV1Validator'
// import { validator } from '@ioc:Adonis/Core/Validator'

// export default class AmenitiesV1Controller {
//   public async list({ auth, request }: HttpContextContract) { // public means accessible if private then not accessible
//     const filters = await validator.validate({
//       schema: ApartmentV1ListFilters.schema,
//       messages: ApartmentV1ListFilters.messages,
//       data: request.qs(), // by default we don't have validator for query string therefore we've to import validator from adonis and then request.qs
//       // query string is the string written after ? in ours URL for ex ?name="test"%num="20"
//     })
//     const amenities = await Amenity.query().withScopes((scopes) =>
//       scopes.filters(auth.user!, filters)
//     )
//     return { count: amenities.length, data: amenities }
//   }

//   public async create({ request, auth }: HttpContextContract) {
//     const body = await request.validate(AmenityV1Create)
//     const amenity = await Amenity.updateOrCreate(
//       { name: body.name },
//       { ...body, userId: auth.user?.id, isActive: true }
//     )
//     return { message: 'Amenity created successfully', data: amenity }
//   }

//   public async createMany({ request, auth }: HttpContextContract) {
//     const body = await request.validate(AmenityV1CreateMany)
//     const payload = body.amenities.map((v) => ({
//       ...v,
//       userId: auth.user?.id,
//       isActive: true,
//     }))
//     const amenities = await Amenity.updateOrCreateMany('name', payload)
//     return { message: 'Amenity created successfully', data: amenities }
//   }

//   public async update({ request, params }: HttpContextContract, message?: string) {
//     const body = await request.validate(AmenityV1Update)
//     if (!body || !Object.keys(body).length) {
//       throw {
//         message: 'Bad request',
//         status: 400,
//       }
//     }
//     await Amenity.query().where('id', params.id).update(body)
//     return { message: message || 'Amenity updated successfully', success: true }
//   }

//   public async remove(context: HttpContextContract) {
//     context.request.updateBody({ isActive: false })
//     return this.update(context, `Amenity ${context.params.id} removed successfully`)
//   }

//   public async removeMany({ request }: HttpContextContract) {
//     const body = await request.validate(AmenityV1RemoveMany)
//     await Amenity.query().update({ isActive: false }).whereIn('id', body.ids)
//     return { success: true, message: 'Amenities removed successfully' }
//   }
// }
