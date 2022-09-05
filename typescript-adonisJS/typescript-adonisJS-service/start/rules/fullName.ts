import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'fullName',
  // pointer, arrayExpressionPointer, errorReporter are options, necessary to use
  async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const regex = /^[a-zA-Z ]*$/

    if (!regex.test(value)) {
      // .report() receives 4 parameters
      errorReporter.report(pointer, 'match', 'only alphabets are allowed', arrayExpressionPointer)
      return
    }

    const trimmed = value.trim()
    if (trimmed.length < 2) {
      errorReporter.report(
        pointer,
        'minLength',
        `${pointer} must be 2 char long`,
        arrayExpressionPointer
      )
    }
  },
  // async: true necessary written in adonis doc
  () => ({
    async: true,
  })
)
