import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { TextField, Button, Paper, Typography } from "@mui/material";

const DeviceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState({
    type: "",
    model: "",
    serialNumber: "",
    assignedUser: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      const fetchDevice = async () => {
        try {
          const response = await API.get(`/devices/${id}`);
          setDevice(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDevice();
    }
  }, [id]);

  const handleChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/devices/${id}`, device);
      } else {
        await API.post("/devices", device);
      }
      navigate("/devices");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">
        {id ? "Update Device" : "Add Device"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="type"
          label="Type"
          value={device.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="model"
          label="Model"
          value={device.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="serialNumber"
          label="Serial Number"
          value={device.serialNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="assignedUser"
          label="Assigned User"
          value={device.assignedUser}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="location"
          label="Location"
          value={device.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="status"
          label="Status"
          value={device.status}
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
          {id ? "Update" : "Add"}
        </Button>
      </form>
    </Paper>
  );
};

export default DeviceForm;
