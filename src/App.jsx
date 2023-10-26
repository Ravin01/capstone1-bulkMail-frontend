import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "../Components/registration/Register";
import { Login } from "../Components/registration/Login";
import { Forgot } from "../Components/registration/Forgot";
import { Reset } from "../Components/registration/Reset";
import { Home } from "../Components/body/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
          <Route index path="/*" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
