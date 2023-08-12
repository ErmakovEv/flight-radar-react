/* eslint-disable react/jsx-props-no-spreading */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse/Collapse';

import Typography from '@mui/material/Typography';

export default function HomePageCard({ checked }: { checked: boolean }) {
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card
        sx={{
          maxWidth: 650,
          background: 'rgba(0, 0, 0, 0.5)',
          m: 1,
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image="../assets/card1.jpeg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}
