/* eslint-disable react/jsx-props-no-spreading */
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse/Collapse';
import { useAppSelector } from '../../hooks/redux';
import vid1 from '../../img/1.webm';
import vid2 from '../../img/2.webm';
import vid3 from '../../img/3.webm';
import vid4 from '../../img/4.webm';

const darkVids = [vid1, vid3];
const lightVids = [vid2, vid4];

export default function HomePageCard({
  checked,
  step,
}: {
  checked: boolean;
  step: number;
}) {
  const theme = useAppSelector((state) => state.theme);

  let videos;
  if (theme.darkTheme) {
    videos = darkVids;
  } else {
    videos = lightVids;
  }

  return (
    <div style={{ width: '40%' }}>
      <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Card
          sx={{
            background: 'rgba(0, 0, 0, 0.5)',
            m: 1,
            border: `5px solid #239fd8`,
          }}
        >
          <CardMedia component="video" image={videos[step]} autoPlay />
        </Card>
      </Collapse>
    </div>
  );
}
