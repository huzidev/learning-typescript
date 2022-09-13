/* eslint-disable @typescript-eslint/no-explicit-any */

// so we can use the name of cities and images with (MAP) method in index.tsx file
export const cities = [
  {
    city: 'Karachi',
    image: 'khi',
  },
  {
    city: 'Hyderabad',
    image: 'hyd',
  },
  {
    city: 'Lahore',
    image: 'lhr',
  },
  {
    city: 'Islamabad',
    image: 'isl',
  },
];

export const rawMap: any = {
  Karachi: {
    // default coordinates for karachi when user select karachi it'll take user directly to this lat adn lng on the map
    lat: [24.760534, 25.050352],
    lng: [66.922536, 67.220115],
  },
  Hyderabad: {
    lat: [25.431569, 25.351442],
    lng: [68.319912, 68.421486],
  },
  Lahore: {
    lat: [31.620183, 31.398636],
    lng: [74.241837, 74.471351],
  },
  Islamabad: {
    lat: [33.533605, 33.747261],
    lng: [72.980184, 73.129969],
  },
};

function parseMap(): any {
  // since (rawMap) is in the form of OBJECT which have ARRAY inside of it and forEach loop is applicable on ARRAY therefore we've to use Object.keys changes the object form into ARRAY form
  const keys = Object.keys(rawMap);
  const newMap: any = {};

  // (keys) is the name of array having all the coordinates lat, lng
  keys.forEach((key) => {
    // rawMap will prints karachi, hyderabad, lahore, islamabad BUT the coordinates are in the form of array of therefore we've to use it as rawMap[key]
    const val = rawMap[key];
    newMap[key] = {
      nw: {
        lat: val.lat[0], // lat of index 0th means initial value
        lng: val.lng[0], // lng of index 0th means initial value
      },
      se: {
        lat: val.lat[1],
        lng: val.lng[1],
      },
    };
  });

  return newMap;
}

export const citiesMap = parseMap();
