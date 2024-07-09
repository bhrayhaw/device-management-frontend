import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
} from "@mui/material";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDevices = async () => {
    try {
      const response = await API.get(`/devices`);
      // console.log(response.data)
      setDevices(response.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [page]);

  if (!Array.isArray(devices)) {
    return <div>No devices found</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Assigned User</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device._id}>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{device.serialNumber}</TableCell>
                <TableCell>{device.assignedUser}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{device.status}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16, marginRight: 8 }}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: 16 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};

export default DeviceList;
