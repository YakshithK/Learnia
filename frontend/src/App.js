import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home.js'
import { Learn } from './pages/learn.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/learn" element={<Learn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
