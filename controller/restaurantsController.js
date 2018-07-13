const express = require('express');
const restaurantsController = express.Router();
const mongoose = require('mongoose');

const Restaurant = require('../models/restaurant');

restaurantsController.get('/', (req, res, next) => {
  Restaurant.find({}, (err, docs)=>{
    res.status(200).json({docs});
  });
});

restaurantsController.post('/new', (req, res, next) => {
  const {name, description, longitude, latitude} = req.body;

  let location = {
    type: 'Point',
    coordinates: [longitude, latitude] //Mongo esta jodido como  mi  lap y no jala shidorris
  };

  // Create a new Restaurant with location
    const newRestaurant = new Restaurant({
      name,
      description,
      location
    });

    newRestaurant.save()
      .then( () => res.status(200).json({ status: 'restaurante añadido' }))
      .catch( e => res.status(500).json({ status: e }));

    
});

module.exports = restaurantsController;