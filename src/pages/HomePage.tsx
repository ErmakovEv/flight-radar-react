import { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import HomePageHeader from '../components/HomePageHeader/HomePageHeader';
import PlaceToVisit from '../components/PlaceToVisit/PlaceToVisit';
import './HomePage.css';

function App() {
  const [animation, setAnimation] = useState(false);

  return (
    <Box className="Home" sx={{ backgroundColor: 'info.dark' }}>
      <CssBaseline />
      <HomePageHeader onAnimationHandler={() => setAnimation(true)} />
      <PlaceToVisit animation={animation} />
    </Box>
  );
}

export default App;
