import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Apartment from 'App/Models/Apartment'
import Sort from 'App/Utils/Sort'

export class ApartmentV1ListFilters {
  // we've used optional every where in FILTER because it is optional for user to use any filter they want
  public static schema = schema.create({
    // static because ApartmentV1ListFilters is been used at multiple places therefore static helps it to be used at multiple places
    // we pass empty object {} is because when we uses schema.string or schema.string.optional of StringType therefore the fist parameter will takes a boolean
    // since we can't directly pass (ARRAY WITH RULES) while neglecting the first parameter format therefore it is ok to pass it as empty object
    // since we've used StringType over here and we've also used StringType in ApartmentV1Create but their we've passes { trim: true } then (ARRAY WITH RULES)
    minSize: schema.string.optional({}, [rules.apartmentSize(), rules.minMax()]),
    maxSize: schema.string.optional({}, [rules.apartmentSize(), rules.minMax()]),
    minPrice: schema.string.optional({}, [rules.apartmentPrice(), rules.minMax()]),
    maxPrice: schema.string.optional({}, [rules.apartmentPrice(), rules.minMax()]), // since maxPrice will be a numeric value but we've used string because it is going to be view as a string in query string
    minRooms: schema.string.optional({}, [rules.apartmentRooms(), rules.minMax()]),
    maxRooms: schema.string.optional({}, [rules.apartmentRooms(), rules.minMax()]),
    nw: schema.object.optional().members({
      lat: schema.number.optional([rules.lat()]),
      lng: schema.number.optional([rules.lng()]),
    }),
    se: schema.object.optional().members({
      lat: schema.number.optional([rules.lat()]),
      lng: schema.number.optional([rules.lng()]),
    }),
    isActive: schema.boolean.optional(),
    status: schema.enum.optional(Apartment.statuses),
    sort: schema.object.optional().members({
      id: schema.enum.optional(Sort.types),
      name: schema.enum.optional(Sort.types),
      description: schema.enum.optional(Sort.types),
      size: schema.enum.optional(Sort.types),
      price: schema.enum.optional(Sort.types),
      rooms: schema.enum.optional(Sort.types),
      realtorId: schema.enum.optional(Sort.types),
      lat: schema.enum.optional(Sort.types),
      lng: schema.enum.optional(Sort.types),
      isActive: schema.enum.optional(Sort.types),
      status: schema.enum.optional(Sort.types),
      createdAt: schema.enum.optional(Sort.types),
      updatedAt: schema.enum.optional(Sort.types),
    }),
  })
  public static messages = {}

  public schema = ApartmentV1ListFilters.schema
  public messages = ApartmentV1ListFilters.messages
}

export class ApartmentV1Create {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(5)]), // trim=true means no extra spaces at start or at end
    description: schema.string({ trim: true }, [rules.minLength(5)]), //[rules.minLength] is built in function of adonis
    size: schema.number([rules.apartmentSize()]), // [rules.apartmentSize()] is custom created by us
    price: schema.number([rules.apartmentPrice()]),
    rooms: schema.number([rules.apartmentRooms()]),
    lat: schema.number([rules.lat()]),
    lng: schema.number([rules.lng()]),
    status: schema.enum.optional(Apartment.statuses),
  })
  public messages = {
    required: '{{ field }} is required to create amenity', // like we did `${}` in js we do {{ field }} in adonis
  }
}

// optional will be added every where since it is optional for us to update whatever we want
export class ApartmentV1Update {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(5)]),
    description: schema.string.optional({ trim: true }, [rules.minLength(5)]),
    size: schema.number.optional([rules.apartmentSize()]),
    price: schema.number.optional([rules.apartmentPrice()]),
    rooms: schema.number.optional([rules.apartmentRooms()]),
    lat: schema.number.optional([rules.lat()]),
    lng: schema.number.optional([rules.lng()]),
    isActive: schema.boolean.optional(),
    status: schema.enum.optional(Apartment.statuses),
  })
}
