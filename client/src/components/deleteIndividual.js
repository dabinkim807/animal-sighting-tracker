import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const DeleteIndividual = (props) => {
  // open={delOpen} onClose={handleDelClose} individuals={individuals} setIndividuals={setIndividuals} setDelOpen={setDelOpen} toDelete={toDelete}

  const deleteRequest = (id) => {
    fetch(`http://localhost:8080/api/individuals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/JSON"
      },
    })
      .then((response) => {
        if (response.status === 500) {
          alert("Failed to delete individual. Please check related species and try again.");
          return;
        }
        
        let newIndividuals = [...props.individuals];

        for (let i = 0; i < newIndividuals.length; i++) {
          if (newIndividuals[i].individual_id === id) {
            newIndividuals.splice(i, 1);
            break;
          }
        }
        props.setIndividuals(newIndividuals);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRequest(props.toDelete.individual_id);
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
          <h2>Delete Individual</h2> 
          Are you sure you want to delete individual with id: {props.toDelete.individual_id}?
          <button type="submit" onClick={props.onClose}>Cancel</button>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteIndividual;