'use client'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';

const PopupModel = (show, onClose, handleSubmit, closeModal) => {
    // const [show, setShow] = useState(false)
    // const closeModal = () => {
    //     setShow()
    // }

    return (
        <Dialog open={show} onClose={onClose} aria-labelledby="create-page-dialog" fullWidth maxWidth="sm">
            <form id="create-page" onSubmit={handleSubmit}>
                <DialogTitle id="create-page-dialog">Create Page</DialogTitle>
                <DialogContent>
                    <div className="col-auto">
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size="small"
                            id="name"
                            name="name"
                            placeholder="Name of Page"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default PopupModel
