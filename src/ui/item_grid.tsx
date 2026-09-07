"use client";

import { Grid, GridProps, useMediaQuery, useTheme } from "@mui/material";

import React from "react";

const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];

type ResponsiveCount = number | Partial<Record<Breakpoint, number>>;
type ResponsiveSize = Partial<Record<Breakpoint, number>>;

interface ItemGridProps extends Omit<GridProps, "container" | "children"> {
  children: React.ReactNode;
  /** Cap on how many children to render, per breakpoint. Unset renders all. */
  max_visible_items?: ResponsiveCount;
  /** Column span given to each child. */
  item_size?: ResponsiveSize;
}

export const ItemGrid = ({
  children,
  max_visible_items,
  item_size = { xs: 12, sm: 6, md: 4 },
  ...grid_props
}: ItemGridProps) => {
  const theme = useTheme();

  const is_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const is_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const is_md = useMediaQuery(theme.breakpoints.up("md"));
  const is_sm = useMediaQuery(theme.breakpoints.up("sm"));

  const items = React.Children.toArray(children);

  const get_visible_count = (): number => {
    if (max_visible_items === undefined) return items.length;
    if (typeof max_visible_items === "number") return max_visible_items;

    // A value set at a breakpoint applies from that breakpoint upward, so walk
    // DOWN from the active one and take the first value that is set.
    const active_idx = is_xl ? 4 : is_lg ? 3 : is_md ? 2 : is_sm ? 1 : 0;
    for (let i = active_idx; i >= 0; i--) {
      const count = max_visible_items[BREAKPOINTS[i]];
      if (count !== undefined) return count;
    }
    return items.length;
  };

  return (
    <Grid container spacing={3} {...grid_props}>
      {items.slice(0, get_visible_count()).map((item, index) => (
        // Carry the child's own key onto the layout wrapper so reordering
        // moves the cell instead of remounting its contents.
        <Grid
          key={
            React.isValidElement(item) && item.key !== null ? item.key : index
          }
          size={item_size}
        >
          {item}
        </Grid>
      ))}
    </Grid>
  );
};
