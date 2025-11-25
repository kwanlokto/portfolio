import {
  Avatar,
  Box,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ArchitectureLayer } from "@/lib/system_design";
import CardSection from "../card_section";

interface ArchitectureDiagramInterface {
  layers: ArchitectureLayer[];
}

export default function ArchitectureDiagram({
  layers,
}: ArchitectureDiagramInterface) {
  return (
    <CardSection>
      <Stack spacing={3}>
        {layers.map((layer, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              borderRadius: 2,
              border: 2,
              borderColor: layer.color || "primary.main",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1 }}
              color={layer.color}
            >
              {layer.title}
            </Typography>

            <Grid container spacing={2}>
              {layer.content.map(({ title, body, desc, icon }, idx) => (
                <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                  {body || desc ? (
                    <Paper sx={{ p: 1.5, borderRadius: 1 }}>
                      <Stack direction="column" spacing={1} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          {icon && (
                            <Avatar
                              sx={{
                                bgcolor: "transparent",
                                color: "text.primary",
                              }}
                            >
                              {icon}
                            </Avatar>
                          )}

                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {title}
                          </Typography>
                        </Stack>

                        {body && (
                          <Typography variant="body2" color="text.secondary">
                            {body}
                          </Typography>
                        )}
                        {desc && (
                          <Typography variant="caption" color="text.secondary">
                            {desc}
                          </Typography>
                        )}
                      </Stack>
                    </Paper>
                  ) : (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {title}
                    </Typography>
                  )}
                </Grid>
              ))}
            </Grid>
            {}
          </Box>
        ))}
      </Stack>
    </CardSection>
  );
}
