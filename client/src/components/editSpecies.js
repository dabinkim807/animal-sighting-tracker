import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {useState} from "react";

function EditSpecies(props) {
  // open={editOpen} onClose={handleEditClose} species={species} setSpecies={setSpecies} setEditOpen={setEditOpen} toEdit={toEdit} setToEdit={setToEdit}

  const handleCommonNameChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, common_name: e.target.value}));
  }
  const handleScientificNameChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, scientific_name: e.target.value}));
  }
  const handleEstimateChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, wild_estimate: e.target.value}));
  }
  const handleStatusChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, conservation_status: e.target.value}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const putRequest = () => {
      fetch(`http://localhost:8080/api/species/${props.toEdit.species_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(props.toEdit)
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Failed to edit species. Please pick another scientific name, then try again.");
        } else {
          let n = [...props.species];
          for (let i = 0; i < n.length; i++) {
            if (n[i].species_id === props.toEdit.species_id) {
              n[i] = props.toEdit;
            }
          }
          props.setSpecies(n);
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
          <h2>Edit Species</h2>     
          <form>
            <label>Common Name</label>
            <input
              type="text"
              id="common-name"
              placeholder="Add common name"
              required
              value={props.toEdit.common_name}
              onChange={handleCommonNameChange}
            />
            <label>Scientific Name</label>
            <input 
              type="text"
              id="scientific-name"
              placeholder="Add scientific name"
              required
              value={props.toEdit.scientific_name}
              onChange={handleScientificNameChange}
            />
            <label>Estimated Number in the Wild</label>
            <input 
              type="number"
              id="wild-estimate"
              value={props.toEdit.wild_estimate}
              onChange={handleEstimateChange}
            />
            <label>Conservation Status</label>
            <select id="conservation-status" defaultValue={props.toEdit.conservation_status} onChange={handleStatusChange}>
              <option value="" disabled>--Please choose an option--</option>
              <option value="Not Evaluated">Not Evaluated</option>
              <option value="Data Deficient">Data Deficient</option>
              <option value="Least Concern">Least Concern</option>
              <option value="Near Threatened">Near Threatened</option>
              <option value="Vulnerable">Vulnerable</option>
              <option value="Endangered">Endangered</option>
              <option value="Critically Endangered">Critically Endangered</option>
              <option value="Extinct in the Wild">Extinct in the Wild</option>
              <option value="Extinct">Extinct</option>
            </select> 
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default EditSpecies;
