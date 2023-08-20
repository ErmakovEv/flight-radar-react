import { Paper, MenuList, MenuItem, ListItemIcon } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import './BottomMenu.css';

type BottomMenuProps = {
  openerDarwer: (isOpen: boolean) => void;
  openerSheduleModal: () => void;
  openerSettingsModal: () => void;
};

function BottomMenu({
  openerDarwer,
  openerSheduleModal,
  openerSettingsModal,
}: BottomMenuProps) {
  return (
    <Paper
      sx={{
        maxWidth: '100%',
        display: 'flex',
        backgroundColor: 'background.default',
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
                color: 'primary.main',
                margin: '0 auto',
                padding: 0,
              }}
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => openerSheduleModal()}>
          <ListItemIcon>
            <ViewListIcon
              fontSize="small"
              sx={{
                color: 'primary.main',
                margin: '0 auto',
                padding: 0,
              }}
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => openerSettingsModal()}>
          <ListItemIcon>
            <SettingsIcon
              fontSize="small"
              sx={{
                color: 'primary.main',
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
