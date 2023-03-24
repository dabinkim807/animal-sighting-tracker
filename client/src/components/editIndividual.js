import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


function EditIndividual(props) {
  // open={editOpen} onClose={handleEditClose} individuals={individuals} setIndividuals={setIndividuals} setEditOpen={setEditOpen} toEdit={toEdit} setToEdit={setToEdit}

  const handleNicknameChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, nickname: e.target.value}));
  }
  const handleSpeciesChange = (e) => {
    e.preventDefault();
    props.setToEdit((toEdit) => ({...toEdit, species_id: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const putRequest = () => {
      fetch(`http://localhost:8080/api/individuals/${props.toEdit.individual_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(props.toEdit)
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Failed to edit individual. Please pick another nickname, then try again.");
        } else {
          let n = [...props.individuals];
          for (let i = 0; i < n.length; i++) {
            if (n[i].individual_id === props.toEdit.individual_id) {
              n[i] = props.toEdit;
            }
          }
          props.setIndividuals(n);
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
          <h2>Edit Individual</h2>     
          <form>
            <label>Nickname</label>
            <input
              type="text"
              id="nickname"
              required
              value={props.toEdit.nickname}
              onChange={handleNicknameChange}
            />
            <label>Species</label>
            <input
              type="number"
              id="species-id"
              required
              value={props.toEdit.species_id}
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

export default EditIndividual;