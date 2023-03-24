import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const DeleteSighting = (props) => {
  // open={delOpen} onClose={handleDelClose} sightings={sightings} setSightings={setSightings} setDelOpen={setDelOpen} toDelete={toDelete}

  const deleteRequest = (id) => {
    fetch(`http://localhost:8080/api/sightings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/JSON"
      },
    })
      .then(() => {
        let newSightings = [...props.sightings];

        for (let i = 0; i < newSightings.length; i++) {
          if (newSightings[i].sighting_id === id) {
            newSightings.splice(i, 1);
            break;
          }
        }
        props.setSightings(newSightings);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRequest(props.toDelete.sighting_id);
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
          <h2>Delete Event</h2> 
          Are you sure you want to delete?
          <button type="submit" onClick={props.onClose}>Cancel</button>
          <button type="submit" onClick={handleDelete}>Delete</button>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteSighting;