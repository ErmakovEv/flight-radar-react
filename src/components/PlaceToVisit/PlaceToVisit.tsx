import { useState } from 'react';
import HomePageCard from '../HomePageCard/HomePageCard';
import HomeCarousel from '../HomeCarousel/HomeCarousel';

function PlaceToVisit({ animation }: { animation: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="place" id="place-to-visit">
      <HomeCarousel
        nextCB={() => setActiveStep(activeStep + 1)}
        prevCB={() => setActiveStep(activeStep - 1)}
        activeStep={activeStep}
      />
      <HomePageCard step={activeStep} checked={animation} />
    </div>
  );
}

export default PlaceToVisit;
