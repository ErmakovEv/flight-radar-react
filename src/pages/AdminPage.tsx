import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridOnIcon from '@mui/icons-material/GridOn';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { motion } from 'framer-motion';
import MapLayerCreater from '../components/MapLayerCreater/MapLayerCreater';
import UserCreater from '../components/UserCreater/UserCreater';
import UsersTable from '../components/UsersTable/UsersTable';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import MapLayersTable from '../components/MapLayersTable/MapLayersTable';
import { useAppSelector } from '../hooks/redux';

const drawerWidth = 240;

const pageArray = [
  {
    id: 0,
    name: 'User editor',
    element: <UserCreater />,
    icon: <PersonAddIcon />,
    group: 0,
  },
  {
    id: 1,
    name: 'Users config',
    element: <UsersTable />,
    icon: <SwitchAccountIcon />,
    group: 0,
  },
  {
    id: 2,
    name: 'Layer editor',
    element: <MapLayerCreater />,
    icon: <MapIcon />,
    group: 1,
  },
  {
    id: 3,
    name: 'Layers config',
    element: <MapLayersTable />,
    icon: <GridOnIcon />,
    group: 1,
  },
];

type MenuItemProps = {
  id: number;
  isSelected: boolean;
  handleSelected: (id: number) => void;
  icon: JSX.Element;
  name: string;
};

function ActiveLine() {
  return (
    <motion.div
      layoutId="activeLine"
      style={{
        width: '45%',
        height: '3px',
        position: 'absolute',
        bottom: '-0.1rem',
        left: '5rem',
        backgroundColor: '#2e7c67',
      }}
    />
  );
}

function MenuItem({
  id,
  isSelected,
  handleSelected,
  icon,
  name,
}: MenuItemProps) {
  const theme = useAppSelector((state) => state.theme);

  return (
    <motion.div
      animate={{
        // eslint-disable-next-line no-nested-ternary
        color: isSelected ? '#2e7c67' : theme.darkTheme ? '#e0e0e0' : '#141414',
      }}
      style={{ position: 'relative', padding: '0 1rem' }}
    >
      <ListItem disablePadding onClick={() => handleSelected(id)}>
        <ListItemButton>
          <ListItemIcon sx={{ color: isSelected ? '#2e7c67' : '' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      {isSelected && <ActiveLine />}
    </motion.div>
  );
}

export default function AdminPage() {
  const [activePage, setActivePage] = useState<number>(0);
  const ActiveElement = pageArray.find((_, index) => index === activePage);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainNavigation />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {pageArray.map((page) => {
              return (
                <MenuItem
                  isSelected={page.id === activePage}
                  icon={page.icon}
                  key={page.id}
                  id={page.id}
                  handleSelected={() => setActivePage(page.id)}
                  name={page.name}
                />
              );
            })}
          </List>
          {/* <Divider />
          <List>
            {pageArray.map((page) => {
              if (page.group) {
                return (
                  <ListItem
                    key={page.id}
                    disablePadding
                    onClick={() => setActivePage(page.name)}
                  >
                    <ListItemButton>
                      <ListItemIcon>{page.icon}</ListItemIcon>
                      <ListItemText primary={page.name} />
                    </ListItemButton>
                  </ListItem>
                );
              }
              return null;
            })}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {activePage === 2 ? null : <Toolbar />}
        {ActiveElement ? ActiveElement.element : null}
      </Box>
    </Box>
  );
}
