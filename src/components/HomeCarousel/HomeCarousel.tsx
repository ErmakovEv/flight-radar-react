import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
  {
    label: 'Пользователь',
    label2: 'login:user, password:123',
    description: `В режиме пользователя можно наблюдать воздушные суда в заданной области. Выводить на экран подробную информацию и характеристики полета. Имеется возможность индивидуальной настройки пользовательского интерфейса, а также вывод расписания по домашнему аэропорту`,
  },
  {
    label: 'Администратор',
    label2: 'login:admin, password:123',
    description:
      'В режиме администратора Вы можете создавать и удалять новых пользователей, а также управлять отображением дополнительных слоев на карте',
  },
];

type HomeCarouselProps = {
  activeStep: number;
  nextCB: () => void;
  prevCB: () => void;
};

export default function HomeCarousel({
  activeStep,
  nextCB,
  prevCB,
}: HomeCarouselProps) {
  const theme = useTheme();
  const maxSteps = steps.length;

  const handleNext = () => nextCB();

  const handleBack = () => prevCB();

  return (
    <div style={{ maxWidth: 350 }}>
      <Box>
        <Paper
          square
          elevation={0}
          sx={{
            height: 50,
            pl: 2,
            mt: 10,
            bgcolor: 'info.dark',
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            {steps[activeStep].label}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'secondary.main' }}>
            {steps[activeStep].label2}
          </Typography>
        </Paper>
        <Box
          sx={{
            minHeight: 250,
            width: '100%',
            p: 2,
            color: 'info.main',
            textAlign: 'justify',
          }}
        >
          {steps[activeStep].description}
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </div>
  );
}
