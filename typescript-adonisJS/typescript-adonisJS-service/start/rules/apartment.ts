import { validator } from '@ioc:Adonis/Core/Validator'
import { LAT_RANGE, LNG_RANGE, PRICE_RANGE, ROOM_RANGE, SIZE_RANGE } from 'App/Default/Filters'

// for LATITUDE
validator.rule(
  'lat',
  async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    // const value = parseFloat(raw)
    if (value < LAT_RANGE[0] || value > LAT_RANGE[1]) {
      // while creating apartments when user insert wrong latitude less than normal range or greater than normal range then notification with this message will pop-up
      errorReporter.report(
        pointer,
        'invalid',
        `${pointer} is not a valid latitude`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)

// FOR LONGITUDE
validator.rule(
  'lng',
  async (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    // const value = parseFloat(raw)
    if (value < LNG_RANGE[0] || value > LNG_RANGE[1]) {
      // if user input wrong range of longitude
      errorReporter.report(
        pointer,
        'invalid',
        `${pointer} is not a valid longitude`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)

// FOR APARTMENT SIZE
validator.rule(
  'apartmentSize',
  async (raw, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const value = parseInt(raw, 10)
    if (value < SIZE_RANGE[0] || value > SIZE_RANGE[1]) {
      errorReporter.report(
        pointer,
        'invalid',
        `${pointer} is not a valid apartment size`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)

// FOR APARTMENT PRICE
validator.rule(
  'apartmentPrice',
  async (raw, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const value = parseInt(raw, 10)
    if (value < PRICE_RANGE[0] || value > PRICE_RANGE[1]) {
      errorReporter.report(
        pointer,
        'invalid',
        `${pointer} is not a valid price unit`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)

// FOR ROOMS
validator.rule(
  'apartmentRooms',
  async (raw, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    const value = parseInt(raw, 10)

    if (value < ROOM_RANGE[0] || value > ROOM_RANGE[1]) {
      errorReporter.report(
        pointer,
        'invalid',
        `${pointer} is not a valid room unit`,
        arrayExpressionPointer
      )
    }
  },
  () => ({
    async: true,
  })
)
