/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, Box, IconButton, Collapse } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';

function HomePageHeader({
  onAnimationHandler,
}: {
  onAnimationHandler: () => void;
}) {
  const [check, setCheck] = useState<boolean>(false);

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
    <div className="Header" ref={ref} id="Header">
      <AppBar sx={{ background: 'none' }}>MyApp</AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Collapse in={check} {...(check ? { timeout: 1000 } : {})}>
          <h1>Welcome to my App</h1>
          <div style={{ textAlign: 'center' }}>
            <Scroll to="place-to-visit" smooth>
              <IconButton>
                <KeyboardArrowDownIcon
                  sx={{
                    scale: '1.5',
                    backgroundColor: 'secondary.light',
                  }}
                />
              </IconButton>
            </Scroll>
          </div>
        </Collapse>
      </Box>
    </div>
  );
}
export default HomePageHeader;
