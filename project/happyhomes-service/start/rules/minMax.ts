import { validator } from '@ioc:Adonis/Core/Validator'

const MIN = 'min'
const MAX = 'max'

validator.rule(
  'minMax',
  async (raw, _, { pointer, arrayExpressionPointer, errorReporter, root, tip }) => {
    const isMin = pointer.startsWith(MIN)
    let mirror = pointer
    if (isMin) {
      mirror = pointer.replace(MIN, MAX)
    } else {
      mirror = pointer.replace(MAX, MIN)
    }

    const rawMirror = validator.helpers.getFieldValue(mirror, root, tip)
    const value = parseInt(raw, 10)
    const mirrorValue = parseInt(rawMirror, 10)

    if (isMin && value > mirrorValue) {
      return errorReporter.report(
        pointer,
        'max',
        `${pointer} should not be greater than max value`,
        arrayExpressionPointer
      )
    }
    if (!isMin && value < mirrorValue) {
      errorReporter.report(
        pointer,
        'min',
        `${pointer} should not be greater than min value`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)
