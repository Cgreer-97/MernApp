import { useState, useEffect } from 'react';

export default function CarForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        make: initialData.make || '',
        model: initialData.model || '',
        year: initialData.year || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.year) return;
    onSubmit(formData);
    setFormData({ make: '', model: '', year: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
        style={{ marginRight: '10px', width: '80px' }}
      />
      <button type="submit">Save</button>
    </form>
  );
}
