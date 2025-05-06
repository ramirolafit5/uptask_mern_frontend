import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center',     // Centra verticalmente
        flexDirection: 'column', // Para apilar el spinner y el texto
      }}
    >
      <CircularProgress />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Cargando...
      </Typography>
    </Box>
  );
}