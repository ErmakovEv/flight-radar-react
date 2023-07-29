import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { fetchLayers, deleteLayers } from '../../api/mapLayer/requests';
import { ILayerReq } from '../../api/mapLayer/types';
import CustomSnuckbar from '../CustomSnackbar/CustomSnackbar';

interface ILayerRow {
  id: number;
  name: string;
  dateReg: string;
  dateUpd: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'dateReg',
    headerName: 'Reg Data',
    width: 130,
  },
  {
    field: 'dateUpd',
    headerName: 'Upd Data',
    width: 130,
  },
];

function MapLayersTable() {
  const [mapLayersArr, setMapLayersArr] = useState<ILayerRow[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const [responseMessage, setResponseMessage] = useState<{
    type: 'info' | 'success' | 'error';
    message: string;
  }>({
    type: 'success',
    message: '',
  });
  const [openSnuckbar, setOpenSnuckbar] = useState(false);

  const fetchAllLayersHandler = async () => {
    const req = await fetchLayers();
    const newLayersArr = req.data.map((item: ILayerReq) => {
      const { id, name, createdAt, updatedAt } = item;
      return { id, name, dateReg: createdAt, dateUpd: updatedAt };
    });
    setMapLayersArr(newLayersArr);
  };

  useEffect(() => {
    fetchAllLayersHandler();
  }, []);

  const deleteLayersHandler = async () => {
    try {
      await deleteLayers({
        layers: rowSelectionModel as number[],
      });
      await fetchAllLayersHandler();
      setResponseMessage({
        type: 'success',
        message: `Все удалено!`,
      });
      setOpenSnuckbar(true);
    } catch (error) {
      setResponseMessage({ type: 'error', message: 'Все плохо' });
      setOpenSnuckbar(true);
    }
  };

  return (
    <>
      {openSnuckbar ? (
        <CustomSnuckbar
          type={responseMessage.type}
          message={responseMessage.message}
          handleClose={() => setOpenSnuckbar(false)}
          isOpen={openSnuckbar}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ height: 400, width: '100%' }}>
          {mapLayersArr ? (
            <DataGrid
              rows={mapLayersArr}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
            />
          ) : null}
        </div>
        <div>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: 'black',
              backgroundColor: 'secondary.main',
            }}
            onClick={deleteLayersHandler}
          >
            Delete layers
          </Button>
        </div>
      </div>
    </>
  );
}

export default MapLayersTable;
