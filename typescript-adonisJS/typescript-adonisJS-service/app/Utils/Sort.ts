import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default class Sort {
  public static types = ['asc', 'desc'] as const

  public static mapObjToQuery = (
    obj: any,
    query: ModelQueryBuilderContract<LucidModel, LucidRow>
  ): void => {
    if (!obj) {
      return
    }
    Object.keys(obj).forEach((sortKey) => {
      const sort = obj[sortKey]
      query.orderBy(sortKey, sort)
    })
  }
}
