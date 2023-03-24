import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Moment from "react-moment";
import "moment-timezone";

import { useState, useEffect } from "react";

import AddSighting from './addSighting';
import EditSighting from './editSighting';
import DeleteSighting from "./deleteSighting";


function Sightings() {
  
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
        console.log(sightings);
      });
  }, []);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(true);
  }
  const handleAddClose = () => setAddOpen(false);

  const [editOpen, setEditOpen] = useState(false);
  const [toEdit, setToEdit] = useState({
    sighting_id: 0
  });
  const handleEditOpen = (sighting) => {
    setToEdit(sighting);
    setEditOpen(true);
  }
  const handleEditClose = () => setEditOpen(false);

  const [toDelete, setToDelete] = useState({
    sighting_id: 0
  });
  const [delOpen, setDelOpen] = useState(false);
  const handleDelOpen = (data) => {
    setToDelete(data);
    setDelOpen(true);
  }
  const handleDelClose = () => setDelOpen(false);
  

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Common Name</TableCell>
              <TableCell>Scientific Name</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Date Sighted</TableCell>
              <TableCell>Conservation Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Healthy</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Wild Estimate</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sightings.map((sighting, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{sighting.sighting_id}</TableCell>
                <TableCell>{sighting.common_name}</TableCell>
                <TableCell>{sighting.scientific_name}</TableCell>
                <TableCell>{sighting.nickname}</TableCell>
                <TableCell><Moment format={"llll"}>{sighting.date_sighted}</Moment></TableCell>
                <TableCell>{sighting.conservation_status}</TableCell>
                <TableCell>{sighting.email}</TableCell>
                <TableCell>{String(sighting.healthy)}</TableCell>
                <TableCell>{sighting.location}</TableCell>
                <TableCell>{sighting.wild_estimate}</TableCell>
                <TableCell><button onClick={() => handleEditOpen(sighting)}>Edit</button></TableCell>
                <TableCell><button onClick={() => handleDelOpen(sighting)}>Delete</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleAddOpen}>Add Sighting</button>

      <AddSighting open={addOpen} onClose={handleAddClose} sightings={sightings} setSightings={setSightings} setOpen={setAddOpen} />
      <EditSighting open={editOpen} onClose={handleEditClose} sightings={sightings} setSightings={setSightings} setEditOpen={setEditOpen} toEdit={toEdit} setToEdit={setToEdit} />
      <DeleteSighting open={delOpen} onClose={handleDelClose} sightings={sightings} setSightings={setSightings} setDelOpen={setDelOpen} toDelete={toDelete} />
    </div>
  );
}

export default Sightings;