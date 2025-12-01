"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { EmailData, send_email } from "@/lib/email";
import { FormEvent, useState } from "react";
import {
  MdBrightness4,
  MdDesignServices,
  MdHome,
  MdInfo,
  MdMenu,
  MdWork,
} from "react-icons/md";

import Link from "next/link";
import { Modal } from "./modal";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/", icon: <MdHome /> },
  { label: "Projects", href: "/project", icon: <MdWork /> },
  { label: "About", href: "/about-me", icon: <MdInfo /> },
  { label: "Design", href: "/system-design", icon: <MdDesignServices /> },
];

interface NavButtonProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const NavButton = ({ label, onClick, active }: NavButtonProps) => {
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
            active
              ? theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black
              : theme.palette.mode === "dark"
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

type NavbarProps = {
  toggleTheme: () => void;
};

export const Navbar = ({ toggleTheme }: NavbarProps) => {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);

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
        justifyContent: { xs: "none", sm: "flex-end" },
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
        {tabs.map((tab) => (
          <Link key={tab.href} href={tab.href}>
            <NavButton label={tab.label} active={pathname === tab.href} />
          </Link>
        ))}
        <Link href="_blank" onClick={(e) => e.preventDefault()}>
          <NavButton
            label="Contact"
            onClick={() => set_show_contact_form(true)}
          />
        </Link>

        <IconButton color="inherit" onClick={toggleTheme}>
          {/* you can conditionally show dark/light icons here */}
          <MdBrightness4 style={{ marginTop: -2 }} size={18} />
        </IconButton>
      </Box>

      {/* Hamburger for small screens */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MdMenu size={18}/>
        </IconButton>
        {/* Right side: Contact + Theme */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link
            href="_blank"
            onClick={(e) => e.preventDefault()}
            style={{ marginRight: "12px" }}
          >
            <NavButton
              label="Contact"
              onClick={() => set_show_contact_form(true)}
            />
          </Link>

          <IconButton onClick={toggleTheme}>
            <MdBrightness4 size={16} />
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 175, p: 0.5, pt: 2 }}>
            <List disablePadding>
              {tabs.map((tab) => (
                <Link key={tab.href} href={tab.href} passHref>
                  <ListItemButton onClick={() => setDrawerOpen(false)}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {tab.icon}
                    </ListItemIcon>
                    <ListItemText primary={tab.label} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>

      <Modal
        open={show_contact_form}
        onClose={() => set_show_contact_form(false)}
        sx={{
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: 10,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
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
            type="email"
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
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "medium",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
