import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Alert } from "@mui/material";
import API from "../services/api";
import { useAuth } from "../components/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await API.post("/users/login", credentials);
      const token = response.data.token;
      handleLogin(token); // Pass the token to handleLogin
      navigate("/"); // Navigate to home or appropriate route
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6">Login</Typography>
      {errorMessage && (
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          value={credentials.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginPage;
