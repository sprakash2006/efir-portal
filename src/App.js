
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import ComplaintForm from './complaint-form/form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<ComplaintForm />} />
      </Routes>
    </Router>
  );
}

export default App;
