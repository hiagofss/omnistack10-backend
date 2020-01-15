const DevSchema = require('../schemas/Dev');
const axios = require('axios');

class DevController {
  async create(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await DevSchema.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, bio, avatar_url } = apiResponse.data;

      const techsArray = techs.split(',').map(tech => tech.trim());
      dev = await DevSchema.create({
        name,
        bio,
        avatar_url,
        github_username,
        techs: techsArray,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
    }

    return res.json(dev);
  }
}

module.exports = new DevController();
