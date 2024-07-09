import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DevicesPage from "./pages/devicesPage";
import TicketsPage from "./pages/ticketsPage";
import DashboardPage from "./pages/dashboardPage";
import PrivateRoute from "./components/privateRoute";
import UnauthorizedPage from "./components/UnauthorizePage";
import Navbar from "./components/navbar";
import { AuthProvider } from "./components/AuthProvider";
import HomePage from "./pages/homepage"; // Ensure you have a homepage

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/devices"
            element={
              <PrivateRoute allowedRoles={["IT Personnel"]}>
                <DevicesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <PrivateRoute allowedRoles={["Staff", "IT Personnel"]}>
                <TicketsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["IT Personnel"]}>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
