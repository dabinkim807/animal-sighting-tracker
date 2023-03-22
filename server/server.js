const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hi! This is Dana's Express JS template");
});

app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await db.query(
      `
      SELECT 
        si.date_sighted, 
        si.location, 
        si.healthy, 
        si.email, 
        i.nickname, 
        s.common_name, 
        s.scientific_name, 
        s.wild_estimate, 
        s.conservation_status 
      FROM 
        sightings si 
        JOIN individuals i ON si.individual_id = i.individual_id 
        JOIN species s ON s.species_id = i.species_id;
      `
    );
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post('/api/sightings', cors(), async (req, res) => {
  // const newSighting = {
  //   sightingID: req.body.sightingID,
  //   date_sighted: req.body.date_sighted,
  //   location: req.body.location,
  //   healthy: req.body.healthy,
  //   sighter_email: req.body.email,
  //   record_created: req.body.record_created,
  //   individualID: req.body.individualID,
  // };
  const result = await db.query(
    'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
    [newUser.firstname, newUser.lastname],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
  return res.end();
});

// //A put request - Update a student 
// app.put('/api/students/:studentId', cors(), async (req, res) =>{
//   console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const studentId = req.params.studentId
//   const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
//   console.log("In the server from the url - the student id", studentId);
//   console.log("In the server, from the react - the student to be edited", updatedStudent);
//   // UPDATE students SET lastname = "something" WHERE id="16";
//   const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
//   const values = [updatedStudent.lastname, updatedStudent.firstname];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);

//   }catch(e){
//     console.log(e);
//     return res.status(400).json({e})
//   }
// })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
