import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Dispatchers from "./pages/Dispatchers";
import Drivers from "./pages/Drivers";
import Loads from "./pages/Loads";
import Expenses from "./pages/Expenses";
import Payroll from "./pages/Payroll";
import Balances from "./pages/Balances";
import Tracking from "./pages/Tracking";
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from "./pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/dispatchers" element={<ProtectedRoute element={Dispatchers} />} />
        <Route path="/drivers" element={<ProtectedRoute element={Drivers} />} />
        <Route path="/loads" element={<ProtectedRoute element={Loads} />} />
        <Route path="/expenses" element={<ProtectedRoute element={Expenses} />} />
        <Route path="/payroll" element={<ProtectedRoute element={Payroll} /> } />
        <Route path="/balances" element={<ProtectedRoute element={Balances} /> } />
        <Route path="/tracking" element={<ProtectedRoute element={Tracking} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
