// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Reemplaza 'your_database_name' con el nombre de tu base de datos
    // y 'mongodb://localhost:27017' con la URL de tu MongoDB
    const conn = await mongoose.connect('mongodb+srv://Nicoreda:lqNzeCqgPywLeffY@nicoreda.at2ym.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
