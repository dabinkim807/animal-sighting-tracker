import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const DeleteSpecies = (props) => {
  // open={delOpen} onClose={handleDelClose} species={species} setSpecies={setSpecies} setDelOpen={setDelOpen} toDelete={toDelete}

  const deleteRequest = (id) => {
    fetch(`http://localhost:8080/api/species/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/JSON"
      },
    })
      .then((response) => {
        if (response.status === 500) {
          alert("Delete failed");
          return;
        }
        
        let newSpecies = [...props.species];

        for (let i = 0; i < newSpecies.length; i++) {
          if (newSpecies[i].species_id === id) {
            newSpecies.splice(i, 1);
            break;
          }
        }
        props.setSpecies(newSpecies);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRequest(props.toDelete.species_id);
    props.setDelOpen(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div className="delete-modal">
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>          
          <h2>Delete Species</h2> 
          Are you sure you want to delete species with id: {props.toDelete.species_id}?
          <button type="submit" onClick={props.onClose}>Cancel</button>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteSpecies;