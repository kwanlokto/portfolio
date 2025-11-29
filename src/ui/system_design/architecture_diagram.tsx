import { Grid2 as Grid, Stack, Typography } from "@mui/material";

import { ArchitectureLayer } from "@/lib/system_design";
import { Section } from "../section";

interface ArchitectureDiagramInterface {
  layers: ArchitectureLayer[];
}

export default function ArchitectureDiagram({
  layers,
}: ArchitectureDiagramInterface) {
  return (

      <Stack spacing={3}>
        {layers.map((layer, i) => (
          <Section
            title={layer.title}
            key={i}
            titleColor={layer.color}
            sx={{ borderLeft: 4, borderColor: layer.color || "primary.main" }}
          >
            <Grid container spacing={2}>
              {layer.content.map(({ title, body, icon }, idx) =>
                body ? (
                  <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Section
                      icon={icon}
                      title={title}
                      titleVariant="subtitle2"
                      sx={{ bgcolor: "paper.background", borderRadius: 2 }}
                      variant="outlined"
                    >
                      <Typography variant="body2" color="text.secondary">
                        {body}
                      </Typography>
                    </Section>
                  </Grid>
                ) : (
                  <Typography
                    key={idx}
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    {title}
                  </Typography>
                )
              )}
            </Grid>
          </Section>
        ))}
      </Stack>
  );
}
