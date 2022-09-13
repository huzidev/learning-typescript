import GoogleMapReact from 'google-map-react';

// when user enter google map link with the apartment address in the URL then this function will change google link into COORDINATES (lat, lng)
export const latLngFromLink = (link: string): GoogleMapReact.Coords | null | undefined => {
  const url = new URL(link);
  const paths = url.pathname.split('/');
  const cordsPath = paths.find((p) => p.includes('@') && p.includes('z'));
  if (cordsPath) {
    const splitUrl = link.split('!3d');
    const latLong = splitUrl[splitUrl.length - 1].split('!4d');
    let lng;

    if (latLong.indexOf('?') !== -1) {
      [lng] = latLong[1].split('\\?');
    } else {
      [, lng] = latLong;
    }
    const lat = latLong[0];

    // const [lat, lng] = cordsPath.replace('@', '').split(',').map(parseFloat);
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }
  return null;
};
