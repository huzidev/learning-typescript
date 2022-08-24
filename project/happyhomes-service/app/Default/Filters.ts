export const LAT_RANGE = [-85.015, 85.015]
export const LNG_RANGE = [-180, 180]
export const SIZE_RANGE = [33, 1000] // 33 at 0th index and 1000 is at 1st index
export const PRICE_RANGE = [50, 3000]
export const ROOM_RANGE = [1, 10]

export const DEFAULT_FILTERS = {
  minSize: SIZE_RANGE[0], // 0 means minimum 33 since 33 is at 0th index
  maxSize: SIZE_RANGE[1], // 1 means 1000 since 1000 is at 1st index
  minPrice: PRICE_RANGE[0],
  maxPrice: PRICE_RANGE[1],
  minRooms: ROOM_RANGE[0],
  maxRooms: ROOM_RANGE[1],
  status: null,
}
