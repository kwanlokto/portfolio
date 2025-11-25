import { Box, Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";

import { ArchitectureLayer } from "@/lib/system_design";
import CardSection from "./card_section";

interface ArchitectureDiagramInterface {
  layers: ArchitectureLayer[];
}

export default function ArchitectureDiagram({
  layers,
}: ArchitectureDiagramInterface) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        System Architecture
      </Typography>
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
                {layer.content.map(({ title, body, desc }, idx) => (
                  <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                    {body || desc ? (
                      <Paper sx={{ p: 1.5, borderRadius: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {title}
                        </Typography>

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
    </Stack>
  );
}
