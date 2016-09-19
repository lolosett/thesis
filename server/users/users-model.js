const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('users', {
  diary_id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  height: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  current_weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(function(err) {
    console.log('Users model synced successfully.');
}, function(err) {
    console.log('An error has occurred:', err);
  });

module.exports = Users;
