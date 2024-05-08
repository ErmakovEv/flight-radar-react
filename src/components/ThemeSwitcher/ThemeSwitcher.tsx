import { alpha, styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleTheme } from '../../store/reducers/themeSlice';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#7d7f87',
    '&:hover': {
      backgroundColor: alpha('#00000', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#239fd8',
    '&:hover': {
      backgroundColor: alpha('#00000', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#e0e0e0',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#239fd8',
  },
}));

function ThemeSwitcher() {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <div style={{ marginRight: 2 }}>
      <ThemeSwitch
        checked={theme.darkTheme}
        onChange={() => dispatch(toggleTheme())}
      />
      {theme.darkTheme ? (
        <DarkModeIcon sx={{ color: 'primary.main' }} />
      ) : (
        <LightModeIcon sx={{ color: 'info.main' }} />
      )}
    </div>
  );
}

export default ThemeSwitcher;
