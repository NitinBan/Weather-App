const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0e3f805159b9d0aa8b2ac8a6f76a3885&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  //destructuring is used here - {body} is property of 'response' object
  //that comes from the hhtp request
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("no access to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find location. Try another location", undefined);
    } else {
      callback(
        undefined,
        "current temparature is " +
          body.current.temperature +
          ", which feel likes " +
          body.current.feelslike +
          " weather is : " +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
