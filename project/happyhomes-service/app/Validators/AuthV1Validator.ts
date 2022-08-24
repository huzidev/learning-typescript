import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const authValidationMessages = {
  'required': '{{ field }} is required to sign up',
  'name.alpha': 'Invalid name',
  'email.email': 'Invalid email address',
  'password.minLength': 'Password should be at least 6 characters long',
}

export class AuthV1SignIn {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
  })

  // if any error then the respective message will be shown
  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to sign in',
  }
}

export class AuthV1SignUp {
  public schema = schema.create({
    isRealtor: schema.boolean.optional(), // the checkbox which asks for isRealtor and it is optional
    name: schema.string({ trim: true }, [rules.fullName()]), // rules.fullName is already created in app/contracts/rules.ts
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')]),
  })

  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to sign up',
  }
}

export class AuthV1VerifyEmailVerificationCode {
  public schema = schema.create({
    code: schema.string({ trim: true }, [rules.verificationCode()]),
  })

  public messages = {
    'required': '{{ field }} is required for email verification',
    'code.*': 'Invalid code',
  }
}

export class AuthV1ResetPassword {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    code: schema.string({}, [rules.verificationCode()]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('passwordConfirmation')]),
  })

  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to reset password',
  }
}

// for Reset Password code to be send to email
export class AuthV1ResetPasswordSendCode {
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
  })

  public messages = {
    ...authValidationMessages,
    required: '{{ field }} is required to reset password',
  }
}
