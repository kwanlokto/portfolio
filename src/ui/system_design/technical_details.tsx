import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ScalabilityItem, TechnicalSection } from "@/lib/system_design";

import { CodeBlock } from "../code_block";
import { Section } from "../section";

interface TechnicalDetailsInterface {
  scalability_items: ScalabilityItem[];
  technical_sections: TechnicalSection[];
}

export const TechnicalDetails = ({
  technical_sections,
  scalability_items,
}: TechnicalDetailsInterface) => (
  <Stack spacing={3}>
    {/* Dynamic Technical Sections */}
    {technical_sections.map((section) => (
      <Section
        key={section.title}
        title={section.title}
        titleColor={section.color}
        sx={{
          borderLeft: 4,
          borderColor: section.color || "primary.main",
        }}
        titleVariant="subtitle1"
      >
        <Stack spacing={2}>
          {section.items.map((item) => (
            <Section
              key={item.title}
              title={item.title}
              titleVariant="subtitle2"
              sx={{ bgcolor: "paper.background", borderRadius: 2 }}
              variant="outlined"
            >
              <Typography variant="body2" color="text.secondary">
                {item.text}
              </Typography>

              {item.code && <CodeBlock>{item.code}</CodeBlock>}
            </Section>
          ))}
        </Stack>
      </Section>
    ))}

    {/* Scalability Section */}

    <Section
      title="Scalability Considerations"
      titleColor="error.main"
      titleVariant="subtitle1"
      sx={{ borderLeft: 4, borderColor: "error.main" }}
    >
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <List dense>
          {scalability_items.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Section>
  </Stack>
);
