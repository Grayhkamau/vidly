const express = require("express");
const genre_router = require('../routes/genre');
const movie_router = require('../routes/movies');
const customerRouter = require("../routes/customer");
const rentalRouter = require("../routes/rental");
const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");
const returnRouter = require("../routes/rentalReturns");
const error = require("../middleware/error");

module.exports = function(app){
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genre', genre_router);
app.use('/api/movie', movie_router);
app.use('/api/customer',customerRouter);
app.use('/api/rental',rentalRouter);
app.use('/api/user',userRouter);
app.use('/api/rentalReturns',returnRouter);
app.use('/api/auth',authRouter);
app.use(error);
}