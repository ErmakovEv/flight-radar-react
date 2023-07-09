import { Paper, MenuList, MenuItem, ListItemIcon } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import './BottomMenu.css';

type BottomMenuProps = {
  callback: (isOpen: boolean) => void;
};

function BottomMenu({ callback }: BottomMenuProps) {
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
      <MenuList>
        <MenuItem onClick={() => callback(true)}>
          <ListItemIcon>
            <ViewListIcon
              fontSize="small"
              sx={{ color: 'var(--icao-bg-color)' }}
            />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default BottomMenu;
