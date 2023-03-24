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
import AddSighting from "./addSighting";


function Sightings() {
  
  const [sightings, setSightings] = useState([]);

  // New State to control the existing student Id that the user wants to edit
  // const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/sightings")
      .then((response) => response.json())
      .then((sightings) => {
        setSightings(sightings);
        console.log(sightings);
      });
  }, []);

  
  // const addStudent = (newStudent) => {
  //   //console.log(newStudent);
  //   //postStudent(newStudent);
  //   setStudents((students) => [...students, newStudent]);
  // };

  //A function to control the update in the parent (student component)

  // const updateStudent = (savedStudent) =>{
  //   console.log("Line 29 savedStudent", savedStudent);
  //   // This function should update the whole list of students - 
  //   setStudents((students) => {
  //     const newArrayStudents = [];
  //     for(let student of students){
  //       if(student.id === savedStudent.id){
  //         newArrayStudents.push(savedStudent);
  //       } else {
  //         newArrayStudents.push(student);
  //       }
  //     }
  //     return newArrayStudents;
  //   })
  //   // This line is only to close the form;
  //   setEditStudentId(null);
  // }
  
  // const onEdit = (student) =>{
  //   console.log("This is line 26 on student component", student);
  //   const editingID = student.id;
  //   console.log("Just the student id", student.id)
  //   setEditStudentId(editingID);

  // }

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Common Name</TableCell>
              <TableCell>Scientific Name</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Date Sighted</TableCell>
              <TableCell>Conservation Status</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Healthy</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Wild Estimate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sightings.map((sighting, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{sighting.common_name}</TableCell>
                <TableCell>{sighting.scientific_name}</TableCell>
                <TableCell>{sighting.nickname}</TableCell>
                <TableCell><Moment format={"llll"}>{sighting.date_sighted}</Moment></TableCell>
                <TableCell>{sighting.conservation_status}</TableCell>
                <TableCell>{sighting.email}</TableCell>
                <TableCell>{String(sighting.healthy)}</TableCell>
                <TableCell>{sighting.location}</TableCell>
                <TableCell>{sighting.wild_estimate}</TableCell>
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

export default Sightings;