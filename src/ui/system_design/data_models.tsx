import { Paper, Stack, Typography } from "@mui/material";

import { CodeBlock } from "../code_block";
import { SchemaDefinition } from "@/lib/system_design";

interface DataModelsInterface {
  schema_definitions: SchemaDefinition[];
}

export const DataModels = ({ schema_definitions }: DataModelsInterface) => {
  return (
    <Stack spacing={2}>
      {schema_definitions.map(({ title, color, schema }, i) => (
        <Paper
          key={i}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            color={color}
            sx={{ fontWeight: 700, mb: 1 }}
          >
            {title}
          </Typography>

          <CodeBlock>
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {schema}
            </Typography>
          </CodeBlock>
        </Paper>
      ))}
    </Stack>
  );
};
