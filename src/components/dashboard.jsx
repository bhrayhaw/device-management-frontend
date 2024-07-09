import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import API from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    devicesCount: 0,
    openTicketsCount: 0,
    completedTicketsCount: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await API.get("/summary");
      setSummary(response.data);
    };
    fetchSummary();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Total Devices</Typography>
          <Typography variant="h4">{summary.devicesCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Open Tickets</Typography>
          <Typography variant="h4">{summary.openTicketsCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Completed Tickets</Typography>
          <Typography variant="h4">{summary.completedTicketsCount}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
