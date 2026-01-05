import './App.css'
import './css/hero.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ScrollTopo from "./components/ScrollTopo";
import Dog from "./pages/Dog"
import DogDetail from "./pages/DogDetails";
import FunFacts from "./pages/FunFacts";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <ScrollTopo />
      <div className="d-flex flex-column min-vh-100">
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dogs" element={<Dog />} />
            <Route path="/dogs/:id" element={<DogDetail />} />
            <Route path="/fun-facts" element={<FunFacts />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App
