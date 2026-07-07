import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Passes from "./pages/Passes";
import Reports from "./pages/Reports";
import Staff from "./pages/Staff";
import PreRegister from "./pages/PreRegister";

import ProtectedRoute from "./components/ProtectedRoute";
import CheckLogs from "./pages/CheckLogs";
import QRScanner from "./pages/QRScanner";

const protectedPage = (page) => (
  <ProtectedRoute>
    {page}
  </ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
        <Route path="/visitors" element={protectedPage(<Visitors />)} />
        <Route path="/appointments" element={protectedPage(<Appointments />)} />
        <Route path="/passes" element={protectedPage(<Passes />)} />
        <Route path="/pre-register" element={protectedPage(<PreRegister />)} />
        <Route path="/reports" element={protectedPage(<Reports />)} />
        <Route path="/staff" element={protectedPage(<Staff />)} />
        <Route path="/scanner" element={protectedPage(<QRScanner />)} />
        <Route
          path="/checklogs"
          element={protectedPage(<CheckLogs />)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
