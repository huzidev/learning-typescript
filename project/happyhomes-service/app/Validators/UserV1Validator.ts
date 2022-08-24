import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Sort from 'App/Utils/Sort'
import pick from 'lodash/pick'

import { authValidationMessages } from './AuthV1Validator'

export class UserV1ListFilters {
  public static schema = schema.create({
    id: schema.number.optional(),
    name: schema.string.optional({ escape: true }),
    email: schema.string.optional({ escape: true }),
    google: schema.string.optional({ escape: true }),
    facebook: schema.string.optional({ escape: true }),
    role: schema.enum.optional(User.roles),
    isActive: schema.boolean.optional(),
    isBanned: schema.boolean.optional(),
    createdAtBefore: schema.date.optional({ format: 'yyyy-MM-dd' }),
    createdAtAfter: schema.date.optional({ format: 'yyyy-MM-dd' }),
    updatedAtBefore: schema.date.optional({ format: 'yyyy-MM-dd' }),
    updatedAtAfter: schema.date.optional({ format: 'yyyy-MM-dd' }),
    sort: schema.object.optional().members({
      id: schema.enum.optional(Sort.types),
      name: schema.enum.optional(Sort.types),
      email: schema.enum.optional(Sort.types),
      google: schema.enum.optional(Sort.types),
      facebook: schema.enum.optional(Sort.types),
      role: schema.enum.optional(Sort.types),
      isActive: schema.enum.optional(Sort.types),
      isBanned: schema.enum.optional(Sort.types),
      createdAt: schema.enum.optional(Sort.types),
      updatedAt: schema.enum.optional(Sort.types),
    }),
  })
  public static messages = {}

  public schema = UserV1ListFilters.schema
  public messages = UserV1ListFilters.messages
}

// this one is for createUser through admin
export class UserV1Create {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.fullName()]),
    email: schema.string({}, [rules.email()]),
    google: schema.string.optional({ trim: true }),
    facebook: schema.string.optional({ trim: true }),
    role: schema.enum.optional(User.roles),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')]),
    isVerified: schema.boolean.optional(),
  })

  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to create user',
  }
}

export class UserV1Update {
  public static schemaMap = {
    name: schema.string.optional({ trim: true }, [rules.fullName()]),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    google: schema.string.optional({ trim: true }),
    facebook: schema.string.optional({ trim: true }),
    role: schema.enum.optional(User.roles),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.confirmed('passwordConfirmation'),
    ]),
    isVerified: schema.boolean.optional(),
    isActive: schema.boolean.optional(),
    isBanned: schema.boolean.optional(),
  }

  public static messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to update user',
  }

  public schema = schema.create(UserV1Update.schemaMap)
  public messages = UserV1Update.messages
}

export class UserV1UpdateMe {
  // By default it only selects 1 row. therefore we uses return (pick) to pick or get access of all data
  public schema = schema.create(pick(UserV1Update.schemaMap, ['name', 'email', 'password']))
  public messages = UserV1Update.messages
}

export class UserV1Settings {
  public static schemaMap = {
    isTheme: schema.boolean.optional(),
  }

  public static messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to update user',
  }

  public schema = schema.create(UserV1Settings.schemaMap)
  public messages = UserV1Settings.messages
}
