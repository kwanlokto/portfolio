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
  <Stack spacing={3}>
    <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
      Technical Implementation
    </Typography>

    <Stack spacing={2}>
      {/* Render dynamic sections */}
      {technical_sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          titleColor={section.color}
          cardSx={{
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={1}>
            {section.items.map((item) => (
              <Section
                key={item.title}
                title={item.title}
                cardSx={{ variant: "outlined" }}
                titleVariant="subtitle2"
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
        cardSx={{ borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}
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
  </Stack>
);
