import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

const Car = mongoose.model('Car', carSchema);
export default Car;
