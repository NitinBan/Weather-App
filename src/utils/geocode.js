const request = require("request");

//this function has an asynchrounus code(http request) in body which has to return 'latitude' & 'longitude'
//so to get these values we use callback function.
const geocode = (address, callback) => {
  //encodeURIComponent() method is used to make address encode in case the address contain any
  //special character that has its own meaning in an URL.
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibml0aW5rYjA5IiwiYSI6ImNrOXppbWN2YzA4MzIzZ3Blemw3cmZkNHkifQ.I0SQ5SKUGvsSivvIa3W9rw&limit=1";

  //destructuring is used here - {body} is property of 'response' object
  //that comes from the hhtp request
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
