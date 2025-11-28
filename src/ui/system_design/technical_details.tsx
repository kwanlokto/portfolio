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
  <Paper
    sx={{
      p: 3,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <Stack spacing={3}>
      {/* Dynamic Technical Sections */}
      {technical_sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          titleColor={section.color}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
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
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          borderLeft: 4,
          borderColor: "error.main",
        }}
      >
        <Section
          title="Scalability Considerations"
          titleColor="error.main"
          titleVariant="subtitle1"
        >
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <List dense>
              {scalability_items.map((item, i) => (
                <ListItem key={i}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "body2" }}
                    primary={item.text}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Section>
      </Paper>
    </Stack>
  </Paper>
);
