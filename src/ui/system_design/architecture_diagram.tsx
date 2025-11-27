import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";

import { ArchitectureLayer } from "@/lib/system_design";
import CardSection from "../card_section";
import { Section } from "../section";

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
              {layer.content.map(({ title, body, desc, icon }, idx) =>
                body || desc ? (
                  <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Section
                      icon={icon}
                      title={title}
                      titleVariant="subtitle2"
                      sx={{ p: 1.5, borderRadius: 1 }}
                    >
                      <>
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
                      </>
                    </Section>
                  </Grid>
                ) : (
                  <Typography
                    key={idx}
                    variant="subtitle2"
                    sx={{ fontWeight: 600 }}
                  >
                    {title}
                  </Typography>
                )
              )}
            </Grid>
          </Box>
        ))}
      </Stack>
    </CardSection>
  );
}
