'use strict';
module.exports = {
  cheeseList: [
    'Bath Blue',
    'Barkham Blue',
    'Buxton Blue',
    'Cheshire Blue',
    'Devon Blue',
    'Dorset Blue Vinney',
    'Dovedale',
    'Exmoor Blue',
    'Harbourne Blue',
    'Lanark Blue',
    'Lymeswold',
    'Oxford Blue',
    'Shropshire Blue',
    'Stichelton',
    'Stilton',
    'Blue Wensleydale',
    'Yorkshire Blue',
    'De Bree',
    'Sackray Blue'
  ],
  testString:
    'if you can read me, you have reached the store. and it is working.',
  addCheese: function(newCheese) {
    this.cheeseList.push(newCheese);
    return true;
  }
};
