import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './pages/Protected';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </Router>
  );
}
