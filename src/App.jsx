import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// @Component
import Navbar from "./components/Navbar";

// @Pages
import Homepage from "./pages/HomePage";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </Router>
  )
}

export default App
