import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Level from "./pages/Level";
import Describe from "./components/Describe";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/level" element={<Level />} />
          <Route path="/describe" element={<Describe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
