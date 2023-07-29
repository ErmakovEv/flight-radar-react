import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { fetchAllUsers, deleteUsers } from '../../api/auth/requests';
import { IUserRes } from '../../api/auth/types';
import CustomSnuckbar from '../CustomSnackbar/CustomSnackbar';

interface IUserRow {
  id: number;
  email: string;
  role: string;
  mapType: number;
  geoPos: string;
  dateReg: string;
  dateUpd: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Login', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'mapType',
    headerName: 'Map type',
    type: 'number',
    width: 90,
  },
  {
    field: 'geoPos',
    headerName: 'Home a/p',
    width: 130,
  },
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

function UsersTable() {
  const [usersArr, setUsersArr] = useState<IUserRow[]>([]);
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

  const fetchAllProfilesHandler = async () => {
    const req = await fetchAllUsers();
    const newUserArr = req.data.map((item: IUserRes) => {
      const { id, email, role } = item;
      let mapType = 0;
      let geoPos = '';
      let dateReg = '';
      let dateUpd = '';
      if (item.profile) {
        mapType = item.profile.mapType;
        geoPos = item.profile.geoPos;
        dateReg = item.profile.createdAt;
        dateUpd = item.profile.updatedAt;
      }
      return { id, email, role, mapType, geoPos, dateReg, dateUpd };
    });
    setUsersArr(newUserArr);
  };

  useEffect(() => {
    fetchAllProfilesHandler();
  }, []);

  const deleteUsersHandler = async () => {
    try {
      await deleteUsers({
        usersID: rowSelectionModel as number[],
      });
      await fetchAllProfilesHandler();
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
        <div
          style={{
            height: 400,
            width: '100%',
          }}
        >
          {usersArr ? (
            <DataGrid
              rows={usersArr}
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
            onClick={deleteUsersHandler}
          >
            Delete users
          </Button>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
