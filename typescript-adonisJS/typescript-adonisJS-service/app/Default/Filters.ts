export const LAT_RANGE = [-85.015, 85.015]
export const LNG_RANGE = [-180, 180]
export const SIZE_RANGE = [33, 1000]
export const PRICE_RANGE = [50, 3000]
export const ROOM_RANGE = [1, 10]

export const DEFAULT_FILTERS = {
  minSize: SIZE_RANGE[0],
  maxSize: SIZE_RANGE[1],
  minPrice: PRICE_RANGE[0],
  maxPrice: PRICE_RANGE[1],
  minRooms: ROOM_RANGE[0],
  maxRooms: ROOM_RANGE[1],
  status: null,
}
