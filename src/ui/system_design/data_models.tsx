import { Paper, Stack, Typography } from "@mui/material";

export const DataModels = () => {
  const models = [
    {
      title: "Ride",
      color: "secondary.main",
      schema: `{
  ride_id: UUID,
  customer_id: UUID,
  driver_id: UUID (nullable),
  status: ENUM [
    'REQUESTED',
    'DRIVER_ASSIGNED',
    'DRIVER_EN_ROUTE',
    'DRIVER_ARRIVED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
  ],
  pickup_location: { latitude, longitude, address },
  dropoff_location: { latitude, longitude, address },
  estimated_arrival_time: TIMESTAMP,
  actual_arrival_time: TIMESTAMP,
  estimated_fare: DECIMAL,
  actual_fare: DECIMAL,
  requested_at: TIMESTAMP,
  completed_at: TIMESTAMP,
  cancelled_at: TIMESTAMP,
  cancellation_reason: STRING
}`,
    },
    {
      title: "User (Customer / Driver)",
      color: "primary.main",
      schema: `{
  user_id: UUID,
  email: STRING,
  phone: STRING,
  name: STRING,
  user_type: ENUM ['CUSTOMER', 'DRIVER'],
  rating: DECIMAL,
  notification_preferences: { push_enabled, sms_enabled, email_enabled },
  created_at: TIMESTAMP,
  last_active: TIMESTAMP
}`,
    },
    {
      title: "Location Update",
      color: "success.main",
      schema: `{
  location_id: UUID,
  user_id: UUID,
  ride_id: UUID,
  latitude: DECIMAL,
  longitude: DECIMAL,
  heading: INTEGER (0-359),
  speed: DECIMAL,
  accuracy: DECIMAL,
  timestamp: TIMESTAMP
}`,
    },
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Core Data Models
      </Typography>

      <Stack spacing={2}>
        {models.map(({ title, color, schema }, i) => (
          <Paper
            key={i}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "background.paper",
              p: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              color={color}
              sx={{ fontWeight: 700, mb: 1 }}
            >
              {title}
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 1, bgcolor: "grey.50" }}
            >
              <Typography
                component="pre"
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
              >
                {schema}
              </Typography>
            </Paper>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};
