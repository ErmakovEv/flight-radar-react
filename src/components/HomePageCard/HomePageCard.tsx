/* eslint-disable react/jsx-props-no-spreading */
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse/Collapse';
import img1 from '../../img/card1.jpeg';
import img2 from '../../img/card2.jpeg';
import img3 from '../../img/card6.jpeg';

const images = [img1, img2, img3];

export default function HomePageCard({
  checked,
  step,
}: {
  checked: boolean;
  step: number;
}) {
  return (
    <div style={{ width: '50%' }}>
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Card
          sx={{
            background: 'rgba(0, 0, 0, 0.5)',
            m: 1,
          }}
        >
          <CardMedia component="img" alt="green iguana" image={images[step]} />
        </Card>
      </Collapse>
    </div>
  );
}
