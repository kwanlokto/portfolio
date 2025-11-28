import { Paper, Stack, Typography } from "@mui/material";

import { CodeBlock } from "../code_block";
import { SchemaDefinition } from "@/lib/system_design";

interface DataModelsInterface {
  schema_definitions: SchemaDefinition[];
}

export const DataModels = ({ schema_definitions }: DataModelsInterface) => {
  return (
    <Stack spacing={3}>
      {schema_definitions.map(({ title, color, schema }, i) => (
        <Paper
          key={i}
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            color={color}
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {title}
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
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
        </Paper>
      ))}
    </Stack>
  );
};
