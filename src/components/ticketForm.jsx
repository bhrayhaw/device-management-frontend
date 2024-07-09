import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import API from "../services/api";

const TicketForm = () => {
  const [ticket, setTicket] = useState({
    deviceId: "",
    issue: "",
    priority: "",
  });
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await API.get("/devices");
        console.log("Devices fetched:", response.data); // Check devices fetched
        setDevices(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDevices();
  }, []);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tickets", ticket);
    setTicket({ deviceId: "", issue: "", priority: "" });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Create Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="device-label">Device</InputLabel>
          <Select
            labelId="device-label"
            id="device-select"
            name="deviceId"
            value={ticket.deviceId}
            onChange={handleChange}
          >
            {devices.map((device) => (
              <MenuItem key={device._id} value={device._id}>
                {device.type} {device.model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="issue"
          label="Issue"
          value={ticket.issue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="priority"
          label="Priority"
          value={ticket.priority}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default TicketForm;
