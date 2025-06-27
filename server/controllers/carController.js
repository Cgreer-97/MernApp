import Car from '../models/Car.js';

// GET all cars
export const getCars = async (req, res) => {
  const cars = await Car.find().sort({ created_at: -1 });
  res.json(cars);
};

// POST new car
export const createCar = async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.status(201).json(newCar);
};

// PUT update car
export const updateCar = async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCar);
};

// DELETE a car
export const deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car deleted' });
};
