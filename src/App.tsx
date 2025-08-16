import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Events from './Events';
import Gallery from './Gallery';
import Programs from './Programs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to STEM</h1>
                <p className="text-xl text-gray-600">Start exploring our programs and events!</p>
              </div>
            </div>
          } />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
