import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {useState} from "react";

function AddSpecies(props) {
  // open={addOpen} onClose={handleAddClose} species={species} setSpecies={setSpecies} setOpen={setAddOpen}
  
  const [newSpecies, setNewSpecies] = useState({
    common_name: "",
    scientific_name: "",
    wild_estimate: "",
    conservation_status: ""
  })

  const handleCommonNameChange = (e) => {
    e.preventDefault();
    setNewSpecies((newSpecies) => ({...newSpecies, common_name: e.target.value}));
  }
  const handleScientificNameChange = (e) => {
    e.preventDefault();
    setNewSpecies((newSpecies) => ({...newSpecies, scientific_name: e.target.value}));
  }
  const handleEstimateChange = (e) => {
    e.preventDefault();
    setNewSpecies((newSpecies) => ({...newSpecies, wild_estimate: e.target.value}));
  }
  const handleStatusChange = (e) => {
    e.preventDefault();
    setNewSpecies((newSpecies) => ({...newSpecies, conservation_status: e.target.value}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const postRequest = () => {
      fetch(`http://localhost:8080/api/species`, {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(newSpecies)
      })
      .then((response) => response.json())
      .then((response) => {
          let n = [...props.species, {...newSpecies, species_id: response.species_id}];
          props.setSpecies(n);
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
          <h2>Add Species</h2>     
          <form>
            <label>Common Name</label>
            <input
              type="text"
              id="common-name"
              placeholder="Add common name"
              required
              value={newSpecies.common_name}
              onChange={handleCommonNameChange}
            />
            <label>Scientific Name</label>
            <input 
              type="text"
              id="scientific-name"
              placeholder="Add scientific name"
              required
              value={newSpecies.scientific_name}
              onChange={handleScientificNameChange}
            />
            <label>Estimated Number in the Wild</label>
            <input 
              type="number"
              id="wild-estimate"
              value={newSpecies.wild_estimate}
              onChange={handleEstimateChange}
            />
            <label>Conservation Status</label>
            <select id="conservation-status" defaultValue={newSpecies.conservation_status} onChange={handleStatusChange}>
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

export default AddSpecies;
