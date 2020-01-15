const { Router } = require('express');

const routes = Router();

const DevController = require('./controllers/DevController');

routes.post('/devs', DevController.create);

module.exports = routes;
