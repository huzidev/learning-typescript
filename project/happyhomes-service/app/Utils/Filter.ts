// import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

// export default class Filter {
//   public static mapObjToQuery = (
//     filters: any,
//     like_keys: string[], //['name', 'email', 'facebook', 'google'] array of string
//     date_range_keys: string[],
//     query: ModelQueryBuilderContract<LucidModel, LucidRow>
//   ): void => {
//     Object.keys(filters).forEach((key) => {
//       if (key === 'sort') {
//         return
//       }
//       const filter = filters[key]
//       if (like_keys.includes(key)) {
//         query.where(key, 'LIKE', `%${filter}%`)
//       } else if (date_range_keys.includes(key)) {
//         const newKey = key.replace(/Before|After/gi, '')
//         const newValue = filter.toLocal().toSQLDate()
//         if (key.endsWith('Before')) {
//           query.where(newKey, '<', newValue)
//         } else {
//           query.where(newKey, '>', newValue)
//         }
//       } else {
//         query.where(key, filter)
//       }
//       console.log('Filters Users')
//       console.log('Filters Users')
//       console.log('Filters Users')
//       console.log('Filters Users')
//       console.log('Filters Type', filters)
//       console.log('Filters Key', key)
//       console.log('Filters filter', filter)
//     })
//   }
// }
