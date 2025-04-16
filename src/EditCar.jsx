import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
 
export default function EditCar({ car, saveCar, open, onClose }) {
    const [carState, setCarState] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });
 
    React.useEffect(() => {
        if (car) {
            setCarState({
                brand: car.brand || '',
                model: car.model || '',
                color: car.color || '',
                fuel: car.fuel || '',
                modelYear: car.modelYear || '',
                price: car.price || ''
            });
        }
    }, [car]);
 
    const handleChange = (event) => {
        setCarState({ ...carState, [event.target.name]: event.target.value });
    };
 
    const handleSave = () => {
        const updatedCar = { ...car, ...carState };
        saveCar(updatedCar);
        onClose();
    };
 
    return (
        <Dialog
            open={open} 
            onClose={onClose} 
        >
            <DialogTitle>Edit car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={carState.brand}
                    onChange={handleChange}
                    label="Brand"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="model"
                    value={carState.model}
                    onChange={handleChange}
                    label="Model"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="color"
                    value={carState.color}
                    onChange={handleChange}
                    label="Color"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="modelYear"
                    value={carState.modelYear}
                    onChange={handleChange}
                    label="Year"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="fuel"
                    value={carState.fuel}
                    onChange={handleChange}
                    label="Fuel"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={carState.price}
                    onChange={handleChange}
                    label="Price"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}