'use strict';
const express = require('express');
const Router = express.Router();
const store = require('../store');
const {
  isString: validateString,
  howMuchCheese,
  oldCheese,
  whoMovedMyCheese
} = require('../validation');
const { Cheese } = require('../models/cheese');

//get a list of all cheeses, no tokens needed
Router.get('/', (req, res, next) => {
  Cheese.find().then(data => res.json(data));
});

//add a new cheese to the server list, also no token for now
Router.post('/', (req, res, next) => {
  const { name } = req.body;
  //validate valididitty
  if (whoMovedMyCheese(name)) {
    //cheese not found :(
    const err = new Error('Bad Request');
    err.message = 'You forgot the cheese!';
    err.status = 400;
    return next(err);
  }
  if (!validateString(name)) {
    //here is bad cheese
    const err = new Error('Bad Request');
    err.message = 'All New Cheese MUST be stringy..';
    err.status = 400;
    return next(err);
  }
  const lotsOfCheese = howMuchCheese(name);
  if (lotsOfCheese) {
    //here is wrong amount of cheese
    const err = new Error('Bad Request');
    err.message = lotsOfCheese;
    err.status = 400;
    return next(err);
  }
  const usedCheese = oldCheese(name);
  if (usedCheese) {
    //we dont want this cheese, thanks
    const err = new Error('Bad Request');
    err.message = 'We dont want this cheese again, thanks';
    err.status = 400;
    return next(err);
  }
  //passed cheese-checks, here is good cheese
  // store.addCheese(newCheese);
  Cheese.create({ name: name })
    .then(data => {
      res.json(data);
    })
    .catch(() => {});
});

module.exports = Router;
