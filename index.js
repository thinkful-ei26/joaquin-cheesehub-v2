'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();
const cheeseRouter = require('./routes/cheese')
app.use(express.json());
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use('/api/cheeses', cheeseRouter);

app.use('/', (req, res, next)=>{
  const err = new Error("Route not found");
    err.status = 404;
    err.reason = "Invalid path";
    return next(err);
});
app.use('*', (err, req, res, next)=>{
  err.message = err.message || "Unknown Error";
  err.status = err.status || 500;
  res.status(err.status).json({message : err.message});
});

// app.get('/api/cheeses', (req, res, next) => {
//   return res.json([
//     'Bath Blue',
//     'Barkham Blue',
//     'Buxton Blue',
//     'Cheshire Blue',
//     'Devon Blue',
//     'Dorset Blue Vinney',
//     'Dovedale',
//     'Exmoor Blue',
//     'Harbourne Blue',
//     'Lanark Blue',
//     'Lymeswold',
//     'Oxford Blue',
//     'Shropshire Blue',
//     'Stichelton',
//     'Stilton',
//     'Blue Wensleydale',
//     'Yorkshire Blue'
//   ]);
// });

// app.get('/api/cheeses', (req, res, next) => {
//   res.json({ msg: 'Hanga Banga' });
// });

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
