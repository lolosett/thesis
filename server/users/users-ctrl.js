const Users = require('./users-model.js');
const utils = require('../config/utilities.js');

const users = {
  '/api/users/createUser': {
    'post': (req, res) => {
      console.log('Inside users-ctrl post');
      const newUser = Users.build({
        username: req.body.username,
        password: req.body.password,
        diary_id: req.body.diary_id
        // height: req.body.height,
        // age: req.body.age,
        // current_weight: req.body.current_weight,
        // gender: req.body.gender
      });
      newUser
        .save()
        .then((user) => {
          utils.hashPassword(req.body.password)
            .then((hash) => {
              newUser.update({ password: hash });
              res.status(201).send({user: user});
            })
            .catch((err) => console.log("Password hashing error: ", err) )
        })
        .catch((err) => {
          console.log('Error: ', err);
          res.status(400).send({
            msg: 'The username you have selected already exists.'
          });
        });
    },
    'get': (req, res) => {
			console.log('inside GET at /api/users/createUser');
			res.end('inside GET at /api/users/createUser');
		}
  },
  '/api/users/login': {
    'post': (req, res) => {
      console.log('Inside POST at /api/users/login');
      Users.findOne({
        where: {
          username: req.body.username
        },
        attributes: ['id', 'username', 'password']
      })
      .then((user) => {
        console.log(user);
        utils.comparePassword(req.body.password, user.password)
        .then((isMatch) => {
          res.status(201).send({user: user})
        })
        .catch((err) => {
          res.status(400).send({
            msg: 'Incorrect Password.'
          })
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          msg: 'The username you have selected does not exist.'
        });
      });
    },
    'get': (req, res) => {
      console.log('inside GET at /api/users/login');
      res.end('inside GET at /api/users/login');
    }
  },
  '/api/users/getUserData': {
    'get': (req, res) => {
      var userData = [];
      console.log('Inside users-ctrl get', req.query);
      const getUser = Users.findAll({
        attributes: [
          'username',
          'diary_id'
          // 'height',
          // 'age',
          // 'current_weight',
          // 'gender'
        ]
      })
      .then( (users) => {
        users.forEach( (user) => {
          console.log('user : ', user);
          userData.push(user);
        });
        console.log('sending data');
        console.log('userData: ', userData);
        res.json(userData);
      })
      .catch( (err) => {
        console.log('Error: ', err);
        res.send(err.message);
      });
    },
    'post': (req, res) => {
			console.log('inside GET at /api/users/getUserData');
			res.end('inside GET at /api/users/getUserData');
		}
  }
}

module.exports = users;
