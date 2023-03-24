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


function Species() {
  
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/individuals")
      .then((response) => response.json())
      .then((species) => {
        setSpecies(species);
        console.log(species);
      });
  }, []);
  
  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Common Name</TableCell>
              <TableCell>Scientific Name</TableCell>
              <TableCell>Conservation Status</TableCell>
              <TableCell>Wild Estimate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {species.map((specie, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{specie.common_name}</TableCell>
                <TableCell>{specie.scientific_name}</TableCell>
                <TableCell>{specie.conservation_status}</TableCell>
                <TableCell>{specie.wild_estimate}</TableCell>
                {/* <TableCell><button onClick={() => handleOpen(event)}>edit</button></TableCell>
                <TableCell><button onClick={() => handleDelOpen(event)}>delete</button></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <AddOrEdit open={open} onClose={handleClose} event={data} setEvent={setData} setOpen={setOpen} getRequest={props.getRequest} />
      <Delete open={delOpen} onClose={handleDelClose} event={data} setEvent={setData} setDelOpen={setDelOpen} getRequest={props.getRequest} /> */}
    </div>
  );
}

export default Species;
