"use client";

import { Grid2 as Grid, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

type ResponsiveCount =
  | number
  | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

interface ItemGridProps<T> {
  items: T[];
  render_item: (item: T, index: number) => React.ReactNode;
  total_featured_items?: ResponsiveCount;
}

export const ItemGrid = <T,>({
  items,
  render_item,
  total_featured_items,
}: ItemGridProps<T>) => {
  const theme = useTheme();

  const is_xl = useMediaQuery(theme.breakpoints.up("xl"));
  const is_lg = useMediaQuery(theme.breakpoints.up("lg"));
  const is_md = useMediaQuery(theme.breakpoints.up("md"));
  const is_sm = useMediaQuery(theme.breakpoints.up("sm"));

  const get_visible_count = (): number => {
    if (total_featured_items === undefined) return items.length;
    if (typeof total_featured_items === "number") return total_featured_items;

    let count: number | undefined;
    if (is_xl) count = total_featured_items.xl;
    else if (is_lg) count = total_featured_items.lg;
    else if (is_md) count = total_featured_items.md;
    else if (is_sm) count = total_featured_items.sm;
    else count = total_featured_items.xs;

    return (
      count ??
      total_featured_items.md ??
      total_featured_items.sm ??
      total_featured_items.xs ??
      total_featured_items.lg ??
      total_featured_items.xl ??
      items.length
    );
  };

  const visible_count = get_visible_count();

  return (
    <Grid container spacing={3}>
      {items
        .slice(0, visible_count)
        .map((item, index) => render_item(item, index))}
    </Grid>
  );
};
