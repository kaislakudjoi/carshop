import { useEffect, useState } from "react";
import { CarTable } from "./CarTable";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack } from '@mui/material';
import { getCars, deleteCar, updateCar, addCar } from "./carApi";
import DeleteDialog from "./DeleteDialog";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function App() {
  const [cars, setCars] = useState([]);

  const [rmCar, setRmCar] = useState(null);

  const [editCarData, setEditCarData] = useState(null);

  async function confirmDelete(car) {
    const success = await deleteCar(car);
    if (!success) {
      console.error("Removing failed");
    }
    setRmCar(null);
    setCars(await getCars());
  }

  async function saveCar(updatedCar) {
    try {
      await updateCar(updatedCar, updatedCar._links.car.href);
      setEditCarData(null);
      setCars(await getCars());
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  }

  async function addNewCar(newCar) {
    try {
      await addCar(newCar);
      setCars(await getCars());
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  }

  useEffect(() => {
    getCars().then(carArray => setCars(carArray));
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack flexDirection="column" minHeight="100vh">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" component="h1">
              Car shop 🛻
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          display="flex"
          justifyContent="center"
          mt={4}
        >
          <AddCar saveCar={addNewCar} />
        </Box>


        <CarTable
          cars={cars}
          removeCar={car => setRmCar(car)}
          setEditCar={setEditCarData}
        />


        {editCarData && (
          <EditCar
            car={editCarData}
            saveCar={saveCar}
            open={!!editCarData}
            onClose={() => setEditCarData(null)}
          />
        )}


        {rmCar && (
          <DeleteDialog
            car={rmCar}
            ok={confirmDelete}
            cancel={() => setRmCar(null)}
          />
        )}
      </Stack>
    </>
  );
}