import { Paper, Stack, Typography } from "@mui/material";

import { CodeBlock } from "../code_block";
import { SchemaDefinition } from "@/lib/system_design";
import { Section } from "../section";

interface DataModelsInterface {
  schema_definitions: SchemaDefinition[];
}

export const SchemaDesign = ({ schema_definitions }: DataModelsInterface) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack spacing={3}>
        {schema_definitions.map(({ title, color, schema }) => (
          <Section
            key={title}
            title={title}
            titleColor={color}
            sx={{
              borderLeft: 4,
              borderColor: color || "primary.main",
            }}
            titleVariant="subtitle1"
          >
            <CodeBlock>
              <Typography
                component="pre"
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
              >
                {schema}
              </Typography>
            </CodeBlock>
          </Section>
        ))}
      </Stack>
    </Paper>
  );
};
