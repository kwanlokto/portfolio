"use client";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MdBrightness4, MdHome, MdInfo, MdMenu, MdWork } from "react-icons/md";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";

import { CiMail } from "react-icons/ci";
import { HRefButton } from "./href_button";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Link from "next/link";
import { Modal } from "./modal";
import { useState } from "react";
import { usePathname } from "next/navigation";

const CONTACT_EMAIL = "lokto.kwan@gmail.com";
const MAILTO_SUBJECT = "Hi Ray — saw your portfolio";
const MAILTO_BODY = "Hey Ray,\n\n";

const tabs = [
  { label: "Home", href: "/", icon: <MdHome size={20} /> },
  { label: "Projects", href: "/project", icon: <MdWork size={20} /> },
  { label: "About", href: "/about-me", icon: <MdInfo size={20} /> },
  // { label: "Blog", href: "/blog", icon: <MdInfo size={20} /> },
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
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show_contact_form, set_show_contact_form] = useState(false);
  const [copied, set_copied] = useState(false);

  const handle_open_mail = () => {
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      MAILTO_SUBJECT
    )}&body=${encodeURIComponent(MAILTO_BODY)}`;
    window.location.href = url;
  };

  const handle_copy_email = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      set_copied(true);
      setTimeout(() => set_copied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently no-op
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
          alignItems: "center",
          justifyContent: "space-between",
          py: 0.5,
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(true)}
          size="small"
          aria-label="Open navigation menu"
        >
          <MdMenu size={22} />
        </IconButton>

        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
              color: "text.primary",
            }}
          >
            Ray Kwan
          </Typography>
        </Link>

        {/* Right side: Contact + Theme */}
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <IconButton
            onClick={() => set_show_contact_form(true)}
            size="small"
            aria-label="Contact"
          >
            <IoChatbubbleEllipsesOutline size={20} />
          </IconButton>

          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="Toggle theme"
          >
            <MdBrightness4 size={20} />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: "background.default",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <Box sx={{ width: 240, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                px: 2,
                py: 2,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "text.primary",
                }}
              >
                Ray Kwan
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary" }}
              >
                Senior Software Engineer
              </Typography>
            </Box>

            <List sx={{ px: 1, py: 1.5 }}>
              {tabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <Link key={tab.href} href={tab.href} passHref>
                    <ListItemButton
                      selected={active}
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        py: 1,
                        "&.Mui-selected": {
                          bgcolor: "action.selected",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 36,
                          color: active ? "primary.main" : "text.secondary",
                        }}
                      >
                        {tab.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={tab.label}
                        primaryTypographyProps={{
                          fontWeight: active ? 600 : 500,
                          color: active ? "text.primary" : "text.secondary",
                          fontSize: "0.9375rem",
                        }}
                      />
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </Box>

      <Modal
        open={show_contact_form}
        onClose={() => set_show_contact_form(false)}
        sx={{
          maxWidth: 420,
          p: { xs: 3, sm: 3.5 },
        }}
      >
        <Stack spacing={2.5} sx={{ pt: 0.5 }}>
          <Box>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Get in touch
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Recruiter, collaborator, or just want to chat? Drop me a line —
              I read every message.
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<CiMail size={18} />}
            onClick={handle_open_mail}
            sx={{ py: 1 }}
          >
            Open in your email app
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.25,
              bgcolor: "action.hover",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                color: "text.primary",
                fontFamily: "monospace",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {CONTACT_EMAIL}
            </Typography>
            <Button
              size="small"
              onClick={handle_copy_email}
              sx={{
                minWidth: 0,
                px: 1.25,
                color: "text.secondary",
                "&:hover": { color: "text.primary", bgcolor: "transparent" },
              }}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </Box>

          <Divider>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              or find me on
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
            <HRefButton url="https://www.linkedin.com/in/loktokwan/">
              <SlSocialLinkedin
                size={20}
                color={theme.palette.text.secondary}
              />
            </HRefButton>
            <HRefButton url="https://github.com/kwanlokto">
              <SlSocialGithub
                size={20}
                color={theme.palette.text.secondary}
              />
            </HRefButton>
          </Box>
        </Stack>
      </Modal>
    </Box>
  );
};
