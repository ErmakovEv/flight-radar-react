/* eslint-disable react/jsx-props-no-spreading */
import { Box, IconButton, Collapse, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';
import { useAppSelector } from '../../hooks/redux';
import bg from '../../img/bg.png';
import bg1 from '../../img/bg1.png';

function HomePageHeader({
  onAnimationHandler,
}: {
  onAnimationHandler: () => void;
}) {
  const [check, setCheck] = useState<boolean>(false);
  const thema = useAppSelector((state) => state.theme.darkTheme);
  useEffect(() => setCheck(true), []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      const offetSetHeight = ref?.current?.offsetHeight;
      if (offetSetHeight && window.scrollY > offetSetHeight * 0.8) {
        onAnimationHandler();
      }
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
  }, [onAnimationHandler, ref]);

  return (
    <div
      className="Header"
      ref={ref}
      id="Header"
      style={{
        backgroundImage: `url(${thema ? bg : bg1})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <Box sx={{ color: 'secondary.main', width: '70%' }}>
        <Typography
          variant="body2"
          sx={{ color: 'secondary.main', textAlign: 'center' }}
        >
          Это страница учебного приложения FlyScanner, в котором вы можете
          наблюдать за полетом воздушных судов, а также управлять учетными
          записями и дополнительными слоями на карте. Приложение разработано с
          использованием Vite, TypeScript, React, Redux, MUI, Leaflet, Node,
          Express.js, PostgreSql, JWT, API FlyRadar и др.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Collapse in={check} {...(check ? { timeout: 1000 } : {})}>
          {/* <h1
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '5vw',
              fontWeight: 200,
            }}
          > */}
          <Typography
            variant="h3"
            sx={{ fontFamily: 'Bebas Neue', textAlign: 'center' }}
          >
            Wellcome to
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Bebas Neue',
              textAlign: 'center',
              color: 'primary.main',
            }}
          >
            FlyScanner
          </Typography>
          {/* </h1> */}
        </Collapse>
      </Box>
      <Box>
        <div style={{ textAlign: 'center' }}>
          <Scroll to="place-to-visit" smooth>
            <IconButton>
              <KeyboardArrowDownIcon
                sx={{
                  scale: '1.5',
                  color: 'primary.main',
                }}
              />
            </IconButton>
          </Scroll>
        </div>
      </Box>
    </div>
  );
}
export default HomePageHeader;
