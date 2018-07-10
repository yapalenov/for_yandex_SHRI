const { models } = require('../../models');

module.exports = {
event (root, { id }) {
    return models.Event.findById(id);
  },
  events (root, {dateDay}) {
    return models.Event.findAll({where: {dateDay: dateDay}});
  },
user (root, { id }) {
    return models.User.findById(id);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
room (root, { id }) {
    return models.Room.findById(id);
  },
  rooms (root, args, context) {
    return models.Room.findAll({}, context);
    models.Room.find
  }
};
