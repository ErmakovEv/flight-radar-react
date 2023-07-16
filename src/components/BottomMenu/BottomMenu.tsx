import { Paper, MenuList, MenuItem, ListItemIcon } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './BottomMenu.css';

type BottomMenuProps = {
  openerDarwer: (isOpen: boolean) => void;
  openerModal: () => void;
};

function BottomMenu({ openerDarwer, openerModal }: BottomMenuProps) {
  return (
    <Paper
      sx={{
        width: 150,
        maxWidth: '100%',
        display: 'flex',
        backgroundColor: 'var(--main-bg-color)',
      }}
      className="menu"
    >
      <MenuList
        sx={{
          display: 'flex',
        }}
      >
        <MenuItem onClick={() => openerDarwer(true)}>
          <ListItemIcon>
            <ManageSearchIcon
              fontSize="small"
              sx={{
                color: 'var(--icao-bg-color)',
                margin: '0 auto',
                padding: 0,
              }}
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => openerModal()}>
          <ListItemIcon>
            <ViewListIcon
              fontSize="small"
              sx={{
                color: 'var(--icao-bg-color)',
                margin: '0 auto',
                padding: 0,
              }}
            />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default BottomMenu;
