import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Sort {
  public static types = ['asc', 'desc'] as const // sort with ascending order or descending order

  public static mapObjToQuery = (
    obj: any, // means object can be array, string, number etc and we specify any because if we sort price which is number if we sort name which is string therefore obj type can be any
    query: ModelQueryBuilderContract<LucidModel, LucidRow>
  ): void => {
    console.log('object Type', obj)

    if (!obj) {
      return
    }
    Object.keys(obj).forEach((sortKey) => { // obj is parameter of .keys() and it must have to be Object.keys() and forEach can take number, string, array, array of strings any type
      const sort = obj[sortKey] // since forEach works for array only
      query.orderBy(sortKey, sort) // sequence order first sortKey which can be price, name, rooms, status then sort which is of type rather ascending or descending
      console.log('object')
      console.log('object')
      console.log('object')
      console.log('object')
      console.log('object type', obj)
      console.log('object sortKey', sortKey) // sortKey can be price, name, rooms, status(status can be available and rented) etc since all these are of diff types
      console.log('sort', sort)
      console.log('orderBy', sortKey + sort)
    })
  }
}
