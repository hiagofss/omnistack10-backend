const { Router } = require('express');

const routes = Router();

const DevController = require('./controllers/DevController');

routes.post('/devs', DevController.create);
routes.get('/devs', DevController.index);

module.exports = routes;
