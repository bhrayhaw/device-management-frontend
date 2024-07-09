import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import API from "../services/api";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await API.get("/tickets");
      setTickets(response.data);
    };
    fetchTickets();
  }, [tickets]);

  // const handleResolve = async (id) => {
  //   await API.put(`/tickets/${id}/logs`, {
  //     description: "Issue resolved",
  //   });
  //   const updatedTickets = tickets.map((ticket) =>
  //     ticket._id === id ? { ...ticket, status: "Completed" } : ticket
  //   );
  //   setTickets(updatedTickets);
  // };

  const handleComplete = async (id) => {
    await API.put(`/tickets/${id}/complete`);
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === id ? { ...ticket, status: "Completed" } : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell>Issue</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket.deviceId}</TableCell>
              <TableCell>{ticket.issue}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleComplete(ticket._id)}
                  disabled={ticket.status !== "Open"}
                >
                  Complete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketList;
