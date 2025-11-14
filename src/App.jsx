import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Games from "./components/Games/Games.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
