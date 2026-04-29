const request = require('request');
require('dotenv').config();

// new weatherstack api key from Edona's email
// 74264d396b39dee4305c72e7c1e2f9cc

// old api key,
// 97bca0c00de242d317575a33b23568dd
// const apiKey = process.env.WEATHER_API_KEY;
const forecast = (lat, long, callback) => {
  const url =
    `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=` +
    lat +
    ',' +
    long +
    '&units=f';
  request({ url, json: true }, (error, { body }) => {
    // console.log('body: ', body);
    if (error) {
      callback('Unable to connect to weatherstack API!', undefined);
    } else if (body.error) {
      callback(
        'Cant find the temperature for the given location. Try another search!',
        undefined,
      );
    } else {
      callback(
        undefined,
        'Overcast: ' +
          body.current.weather_descriptions[0] +
          '. Todays temp in ' +
          body.location.name +
          ' is ' +
          body.current.temperature +
          ' and it feels like ' +
          body.current.feelslike +
          ',' +
          ' Humidity is at ' +
          body.current.humidity +
          '.' +
          ' Sunrise time: ' +
          body.current.astro.sunrise +
          ',' +
          ' Sunset time: ' +
          body.current.astro.sunset,
      );
    }
  });
};

module.exports = forecast;

// request({ url, json: true }, (error, { body }) => {
//   if (error) {
//     callback('Unable to connect to weatherstack API!', undefined);
//   } else if (body.error) {
//     callback('Cant find the temperature for the given location.', undefined);
//   } else {
//     // Destructure everything we need from body
//     const { current, location } = body;
//     const { temperature, feelslike, weather_descriptions } = current;

//     callback(
//       undefined,
//       `${weather_descriptions[0]}. Todays temp in ${location.name} is ${temperature} and it feels like ${feelslike}`
//     );
//   }
// });
