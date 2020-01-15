const DevSchema = require('../schemas/Dev');
const axios = require('axios');

class DevController {
  async create(req, res) {
    const { github_username, techs } = req.body;

    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, bio, avatar_url } = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await DevSchema.create({
      name,
      bio,
      avatar_url,
      github_username,
      techs: techsArray,
    });

    return res.json(dev);
  }
}

module.exports = new DevController();
