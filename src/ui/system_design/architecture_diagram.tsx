import { Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";

import { ArchitectureLayer } from "@/lib/system_design";
import { Section } from "../section";

interface ArchitectureDiagramInterface {
  layers: ArchitectureLayer[];
}

export default function ArchitectureDiagram({
  layers,
}: ArchitectureDiagramInterface) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={3}>
        {layers.map((layer, i) => (
          <Section
            title={layer.title}
            key={i}
            titleColor={layer.color}
            sx={{ borderLeft: 4, borderColor: layer.color || "primary.main" }}
          >
            <Grid container spacing={2}>
              {layer.content.map(({ title, body, desc, icon }, idx) =>
                body || desc ? (
                  <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Section
                      icon={icon}
                      title={title}
                      titleVariant="subtitle2"
                      sx={{ p: 1.5, borderRadius: 1 }}
                      variant="outlined"
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
          </Section>
        ))}
      </Stack>
    </Paper>
  );
}
