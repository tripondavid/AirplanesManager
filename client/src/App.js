import "./App.css";
import MainWindow from "./components/MainWindow";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginWindow from "./components/LoginWindow";
import RegisterWindow from "./components/RegisterWindow";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginWindow />} />
          <Route path="/airplanes" element={<MainWindow />} />
          <Route path="/register" element={<RegisterWindow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
