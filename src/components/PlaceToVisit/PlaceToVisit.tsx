import HomePageCard from '../HomePageCard/HomePageCard';

function PlaceToVisit({ animation }: { animation: boolean }) {
  return (
    <div className="place" id="place-to-visit">
      <HomePageCard checked={animation} />
      <HomePageCard checked={animation} />
    </div>
  );
}

export default PlaceToVisit;
