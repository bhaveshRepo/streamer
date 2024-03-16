const { play } = require('../controller/video');

const route = require('express').Router();

route.get("/play", play);


module.exports = route;