import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Protected() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios.get('/api/protected', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(() => navigate('/login'));
  }, [navigate]);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/login');
      }}>
        Logout
      </button>
    </div>
  );
}
