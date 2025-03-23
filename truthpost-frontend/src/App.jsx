import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/news" element={<News />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;