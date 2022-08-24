export default class Utils {
  public static parseQS = (query: any, parseKeys: string[]) => {
    const obj: any = {}
    try {
      const keys = Object.keys(query)
      keys.forEach((key) => {
        const value = query[key]
        if (parseKeys.includes(key) && value) {
          obj[key] = JSON.parse(value)
        } else {
          obj[key] = value
        }
      })
    } catch (error) {
      console.error(error)

      return query
    }
    return obj
  }
}
