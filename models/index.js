'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/config');
const db = {};

console.log(config);

//connecting to db

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect : 'mysql',
  host : config.db.host,
  port : 3307
});


//reads all files in dirname and for each files read, returns only those files
//that do not have . at the beginning of their name / have filename as index 
//but have a .js extension
//and then for each of those returned files, create a model and add them to our db object
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
