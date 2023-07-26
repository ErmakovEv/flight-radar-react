import {
  AccordionSummary,
  Accordion,
  Typography,
  Box,
  AccordionDetails,
  Divider,
  Paper,
  Skeleton,
} from '@mui/material';

function CustomSceleton() {
  return (
    <Box
      className="panel"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Accordion>
        <AccordionSummary
          className="accordion-summary"
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: 'primary.light',
            color: 'info.dark',
            width: 300,
            height: 64,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Skeleton animation="pulse" width={100} sx={{ pr: 5 }} />
              <Skeleton animation="pulse" width={50} />
            </div>
          </div>
        </AccordionSummary>
        {/* <AccordionDetails></AccordionDetails> */}
      </Accordion>
    </Box>
  );
}

export default CustomSceleton;
