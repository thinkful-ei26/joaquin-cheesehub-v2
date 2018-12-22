'use strict';
const store = require('../store');

function whoMovedMyCheese(checkMe) {
  return checkMe === undefined;
}
function isString(checkMe) {
  return typeof checkMe === 'string';
}

function howMuchCheese(checkMe) {
  if (checkMe.length < 3) {
    return "Where's the cheese?";
  } else if (checkMe.length > 50) {
    return "Whoa, that's too much cheese!";
  } else return undefined;
}

function oldCheese(checkMe) {
  return store.cheeseList
    .toString()
    .toLowerCase()
    .includes(checkMe.toLowerCase());
}

module.exports = { isString, howMuchCheese, oldCheese, whoMovedMyCheese };
