import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import React from "react";

export default function AddCar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: ""
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value
        });
    };

    const addCar = () => {
        if (!car.brand || !car.model) {
            alert("Please fill in brand model");
            return;
        }
        props.saveCar(car);
        setSnackbarOpen(true);
        handleClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label="Brand"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label="Model"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label="Color"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="modelYear"
                        type="number"
                        value={car.modelYear}
                        onChange={e => handleInputChange(e)}
                        label="Model year"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label="Fuel"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        type="number"
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label="Price"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Car added successfully!
                </Alert>
            </Snackbar>
        </div>
    );
}
