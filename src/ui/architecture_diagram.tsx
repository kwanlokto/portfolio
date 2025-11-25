import { Box, Stack, Typography } from "@mui/material";

import CardSection from "./card_section";

interface ArchitectureDiagramInterface {
  layers: {
    title: string;
    color: string;
    content: React.ReactNode;
  }[];
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

              {layer.content}
            </Box>
          ))}
        </Stack>
      </CardSection>
    </Stack>
  );
}
