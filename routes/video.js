const { play, video_list } = require('../controller/video');
const { authenticate } = require('../middleware/authenticate');

const route = require('express').Router();

route.get('/play/:id', authenticate,play);
route.get('/list', authenticate, video_list);

module.exports = route;