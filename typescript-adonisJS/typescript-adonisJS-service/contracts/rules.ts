declare module '@ioc:Adonis/Core/Validator' { // since Rule is top-level import it's good practice to do this
  import { Rule } from '@ioc:Adonis/Core/Validator'

  export interface Rules {
    fullName(): Rule
    verificationCode(): Rule
    lat(): Rule
    lng(): Rule
    apartmentSize(): Rule
    apartmentPrice(): Rule
    apartmentRooms(): Rule
    minMax(): Rule
    dateRange(): Rule
  }
}
