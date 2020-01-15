const DevSchema = require('../schemas/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await DevSchema.find({
      techs: { $in: techsArray },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json(devs);
  }
}

module.exports = new SearchController();
