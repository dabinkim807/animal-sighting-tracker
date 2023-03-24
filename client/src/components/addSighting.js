import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {useState} from "react";

function AddSighting(props) {
  // open={addOpen} onClose={handleAddClose} sightings={sightings} setSightings={setSightings} setOpen={setAddOpen}
  
  const [newSighting, setNewSighting] = useState({
    date_sighted: "",
    location: "",
    healthy: true,
    email: "",
    individual_id: "",
    species_id: ""
  })

  const handleDateChange = (e) => {
    e.preventDefault();
    setNewSighting((newSighting) => ({...newSighting, date_sighted: e.target.value}));
  }
  const handleLocationChange = (e) => {
    e.preventDefault();
    setNewSighting((newSighting) => ({...newSighting, location: e.target.value}));
  }
  const handleHealthChange = (e) => {
    e.preventDefault();
    setNewSighting((newSighting) => ({...newSighting, healthy: e.target.value}));
  }
  const handleEmailChange = (e) => {
    e.preventDefault();
    setNewSighting((newSighting) => ({...newSighting, email: e.target.value}));
  }
  const handleIndividualChange = (e) => {
    e.preventDefault();
    setNewSighting((newSighting) => ({...newSighting, individual_id: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postRequest = () => {
      fetch(`http://localhost:8080/api/sightings`, {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(newSighting)
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Failed to add sighting. Please check individuals and species, then try again.");
          return null;
        } else {
          return response.json();
        }
      })
      .then((response) => {
          if (response !== null) {
            let n = [...props.sightings, response];
            props.setSightings(n);
          }
        });
    }
    postRequest();
    props.setOpen(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div className="main-modal">
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>     
          <h2>Add Sighting</h2>     
          <form>
            <label>Date & Time Sighted</label>
            <input
              type="datetime-local"
              id="date-sighted"
              required
              value={newSighting.date_sighted}
              onChange={handleDateChange}
            />
            <label>Location</label>
            <input
              type="text"
              id="location"
              required
              value={newSighting.location}
              onChange={handleLocationChange}
            />
            <input
              type="radio"
              id="true"
              name="healthy"
              value={newSighting.healthy}
              checked={newSighting.healthy === true}
              onChange={handleHealthChange}
            />
            <label>Healthy</label>
            <input
              type="radio"
              id="false"
              name="healthy"
              value={newSighting.healthy}
              checked={newSighting.healthy === false}
              onChange={handleHealthChange}
            />
            <label>Not Healthy</label>
            <label>Email</label>
            <input
              type="email"
              id="email"
              required
              value={newSighting.email}
              onChange={handleEmailChange}
            />
            <label>Individual</label>
            <input
              type="number"
              id="individual-id"
              required
              value={newSighting.individual_id}
              onChange={handleIndividualChange}
            />
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddSighting;
