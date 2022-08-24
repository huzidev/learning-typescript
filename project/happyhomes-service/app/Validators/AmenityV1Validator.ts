// import { rules, schema } from '@ioc:Adonis/Core/Validator'

// export class ApartmentV1ListFilters {
//   public static schema = schema.create({
//     query: schema.string.optional({ trim: true }, []), // StringType therefore first parameter will be a boolean condition then array with rules since we don't wanna use any rule hence left it empty just lik we left empty object in ApartmentValidators
//     showRemoved: schema.boolean.optional(),
//   })
//   public static messages = {}

//   public schema = ApartmentV1ListFilters.schema
//   public messages = ApartmentV1ListFilters.messages
// }

// export class AmenityV1Create {
//   public schema = schema.create({
//     icon: schema.string.optional({ trim: true }),
//     name: schema.string({ trim: true }),
//   })

//   public messages = {
//     required: '{{ field }} is required to create amenity',
//   }
// }

// export class AmenityV1CreateMany {
//   public schema = schema.create({
//     amenities: schema
//       .array([rules.minLength(1), rules.maxLength(25), rules.distinct('name')]) // distinct means UNIQUE
//       .members(
//         schema.object().members({
//           icon: schema.string.optional({ trim: true }),
//           name: schema.string({ trim: true }),
//         })
//       ),
//   })

//   public messages = {
//     required: '{{ field }} is required to create amenities',
//   }
// }
// export class AmenityV1Update {
//   public schema = schema.create({
//     icon: schema.string.optional({ trim: true }),
//     name: schema.string.optional({ trim: true }),
//     isActive: schema.boolean.optional(),
//   })

//   public messages = {
//     required: '{{ field }} is required to update amenity',
//   }
// }

// export class AmenityV1RemoveMany {
//   public schema = schema.create({
//     ids: schema.array([rules.minLength(1), rules.maxLength(25)]).members(schema.number()),
//   })

//   public messages = {
//     required: '{{ field }} is required to remove amenities',
//   }
// }
