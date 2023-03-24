import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {useState} from "react";

function AddIndividual(props) {
  // open={addOpen} onClose={handleAddClose} individuals={individuals} setIndividuals={setIndividuals} setOpen={setAddOpen}
  
  const defaultIndividual = {
    nickname: "",
    species_id: ""
  }

  const [newIndividual, setNewIndividual] = useState(defaultIndividual);

  const handleNicknameChange = (e) => {
    e.preventDefault();
    setNewIndividual((newIndividual) => ({...newIndividual, nickname: e.target.value}));
  }
  const handleSpeciesChange = (e) => {
    e.preventDefault();
    setNewIndividual((newIndividual) => ({...newIndividual, species_id: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postRequest = () => {
      fetch(`http://localhost:8080/api/individuals`, {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(newIndividual)
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Failed to add individual. Please check species and try again.");
          return null;
        } else {
          return response.json();
        }
      })
      .then((response) => {
          if (response !== null) {
            let n = [...props.individuals, response];
            props.setIndividuals(n);
            setNewIndividual(defaultIndividual);
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
          <h2>Add Individual</h2>     
          <form>
            <label>Nickname</label>
            <input
              type="text"
              id="nickname"
              placeholder="Add nickname"
              required
              value={newIndividual.nickname}
              onChange={handleNicknameChange}
            />
            <label>Species</label>
            <input
              type="number"
              id="species-id"
              required
              value={newIndividual.species_id}
              onChange={handleSpeciesChange}
            />
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddIndividual;
