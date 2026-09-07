import { BoldText } from "@/ui/bold_text";
import React from "react";

/**
 * Renders the tiny markup used by the content in src/lib: `**...**` becomes bold.
 *
 * This exists so the data modules stay plain strings — serializable, greppable,
 * and free of any dependency on the UI layer.
 */
export const RichText = ({ text }: { text: string }) => {
  // Odd indices are the spans that sat between a pair of `**` delimiters.
  const segments = text.split("**");

  return (
    <>
      {segments.map((segment, index) =>
        index % 2 === 1 ? (
          <BoldText key={index}>{segment}</BoldText>
        ) : (
          <React.Fragment key={index}>{segment}</React.Fragment>
        ),
      )}
    </>
  );
};
