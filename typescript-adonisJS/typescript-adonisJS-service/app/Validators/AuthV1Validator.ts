import { schema, rules } from '@ioc:Adonis/Core/Validator'

// SCHEMA for SignIn, SignUp, ResetPass etc

export const authValidationMessages = {
  'required': '{{ field }} is required to sign up',
  'name.alpha': 'Invalid name',
  'email.email': 'Invalid email address',
  'password.minLength': 'Password should be at least 6 characters long',
}

export class AuthV1SignIn {
  public schema = schema.create({
    username: schema.string(),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to sign in',
  }
}
