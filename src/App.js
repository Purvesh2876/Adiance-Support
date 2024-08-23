import logo from "./logo.svg";
import "./App.css";
import WarrantyPage from "./Components/WarrantyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TechnicalSupport from "./Components/TechnicalSupport";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WarrantyPage />} />
          <Route path="/technicalsupport" element={<TechnicalSupport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
