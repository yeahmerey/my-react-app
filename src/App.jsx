import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Games from "./components/Games/Games.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import User from "./components/User.jsx";
import Login from "./components/Login/Login.jsx";
import Stats from "./components/Stats.jsx";
import Settings from "./components/Settings.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
