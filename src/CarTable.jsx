import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
 
ModuleRegistry.registerModules([AllCommunityModule]);
 
 
export function CarTable({ cars, removeCar, setEditCar }) {
  const colDefs = useMemo(() => [
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const car = params.data;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setEditCar(car)}
            >
              Edit
            </Button>
 
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => removeCar(car)}
            >
              Delete
            </Button>
          </Stack>
        );
      },
      width: 200,
      floatingFilter: false,
    },
  ], [removeCar, setEditCar]);
 
  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Cars ({cars.length})</Typography>
 
        <Box sx={{ flexGrow: 1, width: "100%", height: 600 }}>
          <AgGridReact 
          rowData={cars} 
          columnDefs={colDefs} 
          defaultColDef={{
            filter: true,
            floatingFilter: true,
          }} />
        </Box>
      </Stack>
  );
}