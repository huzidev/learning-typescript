import { validator } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

const BEFORE = 'Before'
const AFTER = 'After'

validator.rule(
  'dateRange',
  async (raw, _, { pointer, arrayExpressionPointer, errorReporter, root, tip }) => {
    const isBefore = pointer.endsWith(BEFORE)
    let mirror = pointer
    if (isBefore) {
      mirror = pointer.replace(BEFORE, AFTER)
    } else {
      mirror = pointer.replace(AFTER, BEFORE)
    }

    const rawMirror = validator.helpers.getFieldValue(mirror, root, tip)
    const value = raw as DateTime
    const mirrorValue = rawMirror as DateTime

    if (isBefore && value > mirrorValue) {
      return errorReporter.report(
        pointer,
        'max',
        `${pointer} should not be greater than ${mirror} value`,
        arrayExpressionPointer
      )
    }
    if (!isBefore && value < mirrorValue) {
      errorReporter.report(
        pointer,
        'min',
        `${pointer} should not be greater than ${mirror} value`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)
