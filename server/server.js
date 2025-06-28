import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'; 
import User from './models/User.js';       

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// Temporary in-memory array to hold cars
let cars = [
  { _id: '1', make: 'Toyota', model: 'Corolla', year: 2020 },
  { _id: '2', make: 'Honda', model: 'Civic', year: 2019 }
];

// Car Routes

// GET all cars
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// POST new car
app.post('/api/cars', (req, res) => {
  const newCar = { ...req.body, _id: String(Date.now()) };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// PUT update car by id
app.put('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex(car => car._id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...req.body };
    return res.json(cars[index]);
  }
  res.status(404).json({ message: 'Car not found' });
});

// DELETE car by id
app.delete('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  cars = cars.filter(car => car._id !== id);
  res.json({ message: 'Car deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
