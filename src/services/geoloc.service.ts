import { createClient, GeocodingResult, GoogleMapsClient } from "@google/maps";
const GOOGLE_API_KEY = "AIzaSyDMGtTcgZUUSt4VKjC-oZZEAOTxBlrxlcU";
const googleMapsClient = createClient({
  key: "AIzaSyDMGtTcgZUUSt4VKjC-oZZEAOTxBlrxlcU",
});

export const geocode = async (
  callback: (e: { latitude: number; longitude: number }) => void,
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      callback({ latitude, longitude });
      //reverseGeocode({latitude, longitude});
    });
  }
};

export const reverseGeocode = async (
  {
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  },
  callback: any,
) => {
  try {
    const res = await (await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURI(
        latitude + "," + longitude,
      )}&key=${process.env.REACT_APP_GOOGLEAPIS_API_KEY || GOOGLE_API_KEY}`,
    )).json();
    if (res) {
      callback(res);
    } else {
    }
  } catch (e) {
    // TODO handle error
    console.log(e);
  }
};
