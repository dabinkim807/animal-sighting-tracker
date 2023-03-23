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
        JOIN species s ON s.species_id = i.species_id
      `
    );
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post('/api/species', cors(), async (req, res) => {
  try {
    const insertSpecies = `
      INSERT INTO species(common_name, scientific_name, wild_estimate, conservation_status, created)
      VALUES($1, $2, $3, $4, NOW())
      ON CONFLICT (scientific_name) DO UPDATE SET common_name = Excluded.common_name
      RETURNING species_id
    `;
    const newSpecies = await db.query(insertSpecies, 
      [req.body.common_name, req.body.scientific_name, req.body.wild_estimate, req.body.conservation_status]
    );
    res.json(newSpecies.rows[0]);
  } catch (e) {
    throw e;
  } 
});

app.post('/api/individuals', cors(), async (req, res) => {
  try {
    const insertIndividuals = `
      INSERT INTO individuals(nickname, species_id, created) 
      VALUES($1, $2, NOW()) 
      ON CONFLICT (nickname, species_id) DO UPDATE SET nickname = Excluded.nickname
      RETURNING individual_id
    `;
    const newIndividual = await db.query(insertIndividuals, [req.body.nickname, req.body.species_id]);
    res.json(newIndividual.rows[0]);
  } catch (e) {
    throw e;
  } 
});

app.post('/api/sightings', cors(), async (req, res) => {
  try {
    const insertSightings = `
      INSERT INTO sightings(date_sighted, location, healthy, email, individual_id, created)
      VALUES($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (date_sighted, location, email, individual_id) DO UPDATE SET date_sighted = Excluded.date_sighted
      RETURNING sightings_id
    `;
    const newSighting = await db.query(insertSightings, 
      [req.body.date_sighted, req.body.location, req.body.healthy, req.body.email, req.body.individual_id]
    );
    res.json(newSighting.rows[0]);
  } catch (e) {
    throw e;
  } 
});


// app.put('/api/sightings/:sightingID', cors(), async (req, res) =>{
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
