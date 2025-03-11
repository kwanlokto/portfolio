import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" fontWeight="bold">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" mt={2}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" href="/" sx={{ mt: 4 }}>
        Go Back Home
      </Button>
    </Box>
  );
}
