"use client";

import { Box, Button, Typography } from "@mui/material";

import Link from "next/link";
import { Modal } from "./modal";
import { useState } from "react";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/project" },
];

interface NavButtonProps {
  label: string;
  onClick?: () => void;
}

const NavButton = ({ label, onClick }: NavButtonProps) => {
  return (
    <Button disableRipple onClick={onClick} sx={{ bgcolor: "transparent" }}>
      <Typography fontSize={14} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
        {label}
      </Typography>
    </Button>
  );
};

export const Navbar = () => {
  const [show_contact_form, set_show_contact_form] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <NavButton label={tab.label} />
        </Link>
      ))}
      <NavButton
        label="contact me"
        onClick={() => set_show_contact_form(true)}
      />

      <Modal
        open={show_contact_form}
        onClose={() => set_show_contact_form(false)}
      >
        <Typography>Contact</Typography>
      </Modal>
    </Box>
  );
};
