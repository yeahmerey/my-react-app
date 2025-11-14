import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./components/Layout/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Items from "./pages/Items/Items.jsx";
import ItemDetails from "./pages/ItemDetails/ItemDetails.jsx";
import Login from "./pages/Login/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<Items />} />
          <Route path="items/:id" element={<ItemDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
