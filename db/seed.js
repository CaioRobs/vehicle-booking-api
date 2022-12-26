require('dotenv').config();
const mongoose = require('mongoose');

const { UserSchema } = require('../dist/users/schemas/user.schema.js');
const userModel = mongoose.model('User', UserSchema);

const { VehicleSchema } = require('../dist/vehicles/schemas/vehicle.schema.js');
const vehicleModel = mongoose.model('Vehicle', VehicleSchema);

const vehicles = require('./vehicles.json');
const users = require('./users.json');

const connect = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log('connection to seed succeeded');
};
const closeConnection = () => {
  mongoose.connection.close();
  console.log('connection to seed closed');
};

const insertVehicles = async () => {
  await vehicleModel.deleteMany({});
  await vehicleModel.insertMany(vehicles);
  return;
};
const insertUsers = async () => {
  await userModel.deleteMany({});
  await userModel.insertMany(users);
  return;
};

const seedDb = async () => {
  return Promise.all([insertVehicles(), insertUsers()]);
};

const main = async () => {
  try {
    connect();
    await seedDb();
    console.log('seeding succesfull');
    closeConnection();
  } catch (error) {
    console.error(error);
    closeConnection();
  }
};

main();
