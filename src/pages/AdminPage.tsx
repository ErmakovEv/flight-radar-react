import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridOnIcon from '@mui/icons-material/GridOn';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import MapLayerCreater from '../components/MapLayerCreater/MapLayerCreater';
import UserCreater from '../components/UserCreater/UserCreater';
import UsersTable from '../components/UsersTable/UsersTable';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import MapLayersTable from '../components/MapLayersTable/MapLayersTable';

const drawerWidth = 240;

const pageArray = [
  {
    id: '0',
    name: 'User editor',
    element: <UserCreater />,
    icon: <PersonAddIcon />,
    group: 0,
  },
  {
    id: '1',
    name: 'Users config',
    element: <UsersTable />,
    icon: <SwitchAccountIcon />,
    group: 0,
  },
  {
    id: '2',
    name: 'Layer editor',
    element: <MapLayerCreater />,
    icon: <MapIcon />,
    group: 1,
  },
  {
    id: '3',
    name: 'Layers config',
    element: <MapLayersTable />,
    icon: <GridOnIcon />,
    group: 1,
  },
];

export default function AdminPage() {
  const [activePage, setActivePage] = useState<string>('User editor');
  const ActiveElement = pageArray.find((item) => item.name === activePage);
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {pageArray.map((page) => {
              if (!page.group) {
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
          </List>
          <Divider />
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
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {activePage === 'Layer editor' ? null : <Toolbar />}
        {ActiveElement ? ActiveElement.element : null}
      </Box>
    </Box>
  );
}
