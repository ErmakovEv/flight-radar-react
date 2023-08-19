/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, Box, IconButton, Collapse, Stack } from '@mui/material';
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
        backgroundPosition: 'center',
        backgroundSize: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <Box sx={{ color: 'secondary.main' }}>Это учебное приложение</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Collapse in={check} {...(check ? { timeout: 1000 } : {})}>
          <h1
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '5vw',
              fontWeight: 200,
            }}
          >
            Wellcome to my App
          </h1>
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
