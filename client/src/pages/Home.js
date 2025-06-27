import { useEffect, useState } from 'react';
import axios from 'axios';
import CarForm from '../components/CarForm';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch cars from API
  const fetchCars = async () => {
    try {
      const res = await axios.get('/api/cars');
      console.log('Fetched cars response:', res.data); // 🔍 Debug log
      setCars(res.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // fallback to avoid null/undefined
    }
  };

  // Add or update a car
  const handleAddOrUpdate = async (carData) => {
    try {
      if (editing) {
        await axios.put(`/api/cars/${editing._id}`, carData);
        setEditing(null);
      } else {
        await axios.post('/api/cars', carData);
      }
      fetchCars();
    } catch (error) {
      console.error('Error adding/updating car:', error);
    }
  };

  // Delete a car
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  // Start editing a car
  const startEditing = (car) => {
    setEditing(car);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <h1>Car List</h1>
      <CarForm onSubmit={handleAddOrUpdate} initialData={editing} />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map((car) => (
            <li key={car._id} style={{ marginBottom: '10px' }}>
              {car.make} {car.model} ({car.year}){' '}
              <button onClick={() => startEditing(car)}>Edit</button>{' '}
              <button onClick={() => handleDelete(car._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No cars found.</li>
        )}
      </ul>
    </div>
  );
}
