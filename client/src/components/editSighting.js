import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


function EditSighting(props) {
  // open={editOpen} onClose={handleEditClose} sightings={sightings} setSightings={setSightings} setEditOpen={setEditOpen} toEdit={toEdit} setToEdit={setToEdit}
  
  const handleDateChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, date_sighted: e.target.value}));
  }
  const handleLocationChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, location: e.target.value}));
  }
  const handleHealthChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, healthy: e.target.value}));    
  }
  const handleEmailChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, email: e.target.value}));
  }
  const handleIndividualChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, individual_id: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const putRequest = () => {
      fetch(`http://localhost:8080/api/sightings/${props.toEdit.sighting_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(props.toEdit)
      })
      .then((response) => {
        if (response.status === 500) {
          alert("There's already a sighting with the same date, location, email, and individual ID. Please pick another date/location/email, then try again.");
        } else {
          let n = [...props.sightings];
          for (let i = 0; i < n.length; i++) {
            if (n[i].sighting_id === props.toEdit.sighting_id) {
              n[i] = props.toEdit;
            }
          }
          props.setSightings(n);
        }  
        });
    }
    putRequest();
    props.setEditOpen(false);
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
          <h2>Edit Sighting</h2>     
          <form>
            <label>Date & Time Sighted</label>
            <input
              type="datetime-local"
              id="date-sighted"
              required
              value={props.toEdit.date_sighted}
              onChange={handleDateChange}
            />
            <label>Location</label>
            <input
              type="text"
              id="location"
              required
              value={props.toEdit.location}
              onChange={handleLocationChange}
            />
            <label>Healthy</label>
            <select id="healthy" defaultValue={props.toEdit.healthy} onChange={handleHealthChange}>
              <option value="" disabled>--Please choose an option--</option>
              <option value="true">Healthy</option>
              <option value="false">Not Healthy</option>
            </select> 
            {/* <input
              type="radio"
              id="true"
              name="healthy"
              value={props.toEdit.healthy}
              checked={props.toEdit.healthy}
              onChange={handleHealthChange}
            />
            <label htmlFor="true">Healthy</label>
            <input
              type="radio"
              id="false"
              name="healthy"
              value={props.toEdit.healthy}
              checked={props.toEdit.healthy}
              onChange={handleHealthChange}
            />
            <label htmlFor="false">Not Healthy</label> */}
            <label>Email</label>
            <input
              type="email"
              id="email"
              required
              value={props.toEdit.email}
              onChange={handleEmailChange}
            />
            <label>Individual</label>
            <input
              type="number"
              id="individual-id"
              required
              value={props.toEdit.individual_id}
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

export default EditSighting;
