const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../database/db-config');
const authRoutes = require('./routes/auth');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error al conetar a MongoDB:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en puerto ${PORT}'));


app.use('/api/auth', authRoutes);
