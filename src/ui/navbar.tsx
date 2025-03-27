"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FormEvent, FormEventHandler, useState } from "react";

import Link from "next/link";
import { Modal } from "./modal";

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
      <Typography
        fontSize={14}
        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
      >
        {label}
      </Typography>
    </Button>
  );
};

interface ContactInputProps {
  name?: string;
  email?: string;
  message?: string;
}
export const Navbar = () => {
  const [show_contact_form, set_show_contact_form] = useState(false);
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, set_errors] = useState<ContactInputProps>({});

  const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors: ContactInputProps = {};
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
      console.log("Form Data:", form_data);
      alert("Form submitted successfully!");
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
        <Container maxWidth="sm" sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
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
              slotProps={{
                inputLabel: { style: { color: "#D1D5DB" } },
                input: { style: { color: "#D1D5DB" } },
              }}
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
              slotProps={{
                inputLabel: { style: { color: "#D1D5DB" } },
                input: { style: { color: "#D1D5DB", border: "none" } },
              }}
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
              slotProps={{
                inputLabel: { style: { color: "#D1D5DB" } },
                input: { style: { color: "#D1D5DB" } },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
};
