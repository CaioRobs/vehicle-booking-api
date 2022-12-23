require('dotenv').config();
const mongoose = require('mongoose');

const seedDb = async () => {
  await Car.deleteMany({});
  await Car.insertMany(cars);
};

const connect = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log('connection to seed succeeded');
};
const closeConnection = () => {
  mongoose.connect.close();
  console.log('connection to seed closed');
};

try {
  connect();
  seedDb();
  closeConnection();
} catch (error) {
  console.error(error);
  closeConnection();
}
