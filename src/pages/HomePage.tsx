import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import HomePageHeader from '../components/HomePageHeader/HomePageHeader';
import PlaceToVisit from '../components/PlaceToVisit/PlaceToVisit';
import './HomePage.css';

function App() {
  const [animation, setAnimation] = useState(false);

  return (
    <div className="Home">
      <CssBaseline />
      <HomePageHeader onAnimationHandler={() => setAnimation(true)} />
      <PlaceToVisit animation={animation} />
    </div>
  );
}

export default App;
