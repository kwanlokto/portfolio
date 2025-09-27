"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { EmailData, send_email } from "@/lib/email";
import { FormEvent, useState } from "react";

import Link from "next/link";
import { Modal } from "./modal";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/project" },
  { label: "About Me", href: "/about-me" },
];

interface NavButtonProps {
  label: string;
  onClick?: () => void;
}

const NavButton = ({ label, onClick }: NavButtonProps) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
      sx={{
        bgcolor: "transparent",
        textTransform: "none",
        "&:hover": { bgcolor: "transparent" },
      }}
    >
      <Typography
        fontSize={14}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[400]
              : theme.palette.grey[500],
          transition: "color 0.2s",
          "&:hover": {
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
          },
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export const Navbar = () => {
  const [show_contact_form, set_show_contact_form] = useState(false);
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, set_errors] = useState<EmailData>({});

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors: EmailData = {};
    if (!form_data.name) errors.name = "Name is required";
    if (!form_data.email) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form_data.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!form_data.message) errors.message = "Message is required";
    set_errors(errors);

    return Object.keys(errors).length === 0;
  };

  const handle_submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      send_email(form_data);
      set_form_data({ name: "", email: "", message: "" });
    }
  };

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
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Contact Me
        </Typography>

        <Box component="form" onSubmit={handle_submit} noValidate>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={form_data.name}
            onChange={handle_change}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={form_data.email}
            onChange={handle_change}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="message"
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={form_data.message}
            onChange={handle_change}
            error={!!errors.message}
            helperText={errors.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
