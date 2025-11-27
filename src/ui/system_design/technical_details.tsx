import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  <Stack spacing={2}>
    {/* Render dynamic sections */}
    {technical_sections.map((section) => (
      <Section
        key={section.title}
        title={section.title}
        titleColor={section.color}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={1}>
          {section.items.map((item) => (
            <Section
              key={item.title}
              title={item.title}
              titleVariant="subtitle2"
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
      sx={{ borderRadius: 2, boxShadow: 3 }}
    >
      <List dense>
        {scalability_items.map((item, i) => (
          <ListItem key={i}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Section>
  </Stack>
);
