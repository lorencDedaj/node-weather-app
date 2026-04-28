const path = require('path');
const express = require('express');
const hbs = require('hbs');

const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const port = process.env.PORT || 3000;
const app = express();

// Define paths for Express config
const staticDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// app.set('views', viewsPath);
// app.set('views', path.join(__dirname, '../views'));

// Setup static directory to server
app.use(express.static(staticDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Lorenc',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page!',
    name: 'Lorenc',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text!',
    title: 'Help page!',
    name: 'Lorenc',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'ERROR: please provide and address!',
    });
  }
  console.log(req.query.address);
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    },
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'ERROR: missing a search keyword!',
    });
  }

  console.log(req.query.search);
  res.send({
    products: ['God of War', 'Crimson Desert'],
  });
});

app.get('/help/*wildcard', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Article not found!',
    name: 'Lorenc',
  });
});

app.get('/*wildcard', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found!',
    name: 'Lorenc',
  });
});

// app.get('/*wildcard', (req, res) => {
//   res.render('404', {
//     title: '404',
//     errorMessage: 'Page not found!',
//     name: 'Lorenc',
//   });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
