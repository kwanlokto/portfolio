import { Bookmark, BookmarkBorder, Share } from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Fade,
  IconButton,
  Paper,
  ThemeProvider,
  Typography,
  createTheme
} from '@mui/material';
import React, { useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#d84315',
    },
    background: {
      default: '#fafaf8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: '"Crimson Pro", "Playfair Display", serif',
    h1: {
      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h3: {
      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Crimson Pro", Georgia, serif',
      fontSize: '1.125rem',
      lineHeight: 1.8,
    },
  },
});

export default function PragmaticProgrammerArticle() {
  const [bookmarked, setBookmarked] = useState(false);

  const sections = [
    {
      title: "What Does 'Pragmatic' Actually Mean?",
      content: `Being pragmatic isn't about taking shortcuts. It's about making smart tradeoffs. You write code that works *and* lasts. You solve real problems instead of just flexing your technical chops. You get better over time, and you take ownership of what you ship.

The book frames software development as something you can practice and master, like woodworking or cooking. Not something you just "do."`
    },
    {
      title: "Own Your Code",
      subtitle: "The Big Ideas",
      content: `Early on, the book drops this line: "Don't live with broken windows." Meaning: if you see messy code, unclear docs, or failing tests — fix them. Or at least don't ignore them. Little problems pile up into technical debt that'll crush you later.

Good developers don't just write code. They own it. They own their mistakes and their growth too.`
    },
    {
      title: "DRY: Don't Repeat Yourself",
      content: `You've probably heard this one. But it's not just about copy-pasting. It's about duplicated *logic*, duplicated *knowledge*, duplicated *assumptions*. When something needs to change, you want to change it in exactly one place.

DRY makes your codebase cleaner, easier to maintain, and less bug-prone.`
    },
    {
      title: "Design for Change",
      content: `Here's the thing: requirements change. Teams grow. Systems scale. So instead of optimizing for today's features, optimize for flexibility.

Good code has clear boundaries. It's loosely coupled. You can modify one part without breaking three others. The book hammers this home — being clever is fine, but being flexible is better.`
    },
    {
      title: "Master Your Tools",
      content: `Pragmatic programmers really understand their editors, debuggers, shells, and version control. They automate repetitive stuff. They learn the shortcuts. Saving a few seconds dozens of times a day? That compounds into real productivity.

The book pushes you to invest time in your tools. It pays off.`
    },
    {
      title: "Test as You Go",
      content: `Testing isn't something you tack on at the end. It's part of working through the problem. Write tests alongside your code. Automate where you can. Treat tests like living documentation.

This lines up perfectly with modern practices like TDD and CI/CD, which didn't even exist when the first edition came out.`
    },
    {
      title: "Communicate Like It Matters",
      content: `Software isn't just code. It's people. You need to write clear docs, ask good questions, and explain tradeoffs to non-technical stakeholders. Communication is a technical skill.

A lot of projects fail because of misunderstandings, not bad engineering.`
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(180deg, #fafaf8 0%, #f0ede8 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #d84315 0%, #ff6f00 50%, #d84315 100%)',
        }
      }}>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Fade in timeout={800}>
            <Box>
              {/* Header Section */}
              <Box sx={{ mb: 6 }}>
                <Chip 
                  label="BOOK REVIEW" 
                  size="small"
                  sx={{ 
                    mb: 3,
                    bgcolor: '#d84315',
                    color: 'white',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem'
                  }}
                />
                
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    mb: 2,
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  The Pragmatic Programmer
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'text.secondary',
                    fontFamily: '"Crimson Pro", serif',
                    fontStyle: 'italic',
                    mb: 3,
                    fontSize: '1.5rem'
                  }}
                >
                  A Timeless Guide to Writing Better Software
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'system-ui' }}>
                    8 min read
                  </Typography>
                  <Box>
                    <IconButton onClick={() => setBookmarked(!bookmarked)} size="small">
                      {bookmarked ? <Bookmark sx={{ color: '#d84315' }} /> : <BookmarkBorder />}
                    </IconButton>
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#d84315', borderWidth: 2 }} />
              </Box>

              {/* Introduction */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  mb: 4,
                  bgcolor: 'white',
                  borderLeft: '4px solid #d84315',
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1" paragraph>
                  The tech world moves fast. New frameworks drop every month, languages evolve, tools come and go. But some books just stick around. The Pragmatic Programmer by Andrew Hunt and David Thomas came out in 1999, got an update in 2019, and developers still swear by it. There's a reason for that.
                </Typography>
                <Typography variant="body1">
                  This isn't a book about syntax or the hot new framework. It's about thinking like a professional — someone who treats code as craft, not just a job.
                </Typography>
              </Paper>

              {/* Main Content Sections */}
              {sections.map((section, index) => (
                <Fade in timeout={1000 + (index * 200)} key={index}>
                  <Box sx={{ mb: 5 }}>
                    {section.subtitle && (
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: '#d84315',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          fontSize: '0.875rem'
                        }}
                      >
                        {section.subtitle}
                      </Typography>
                    )}
                    
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        mb: 2,
                        mt: section.subtitle ? 1 : 0,
                      }}
                    >
                      {section.title}
                    </Typography>
                    
                    {section.content.split('\n\n').map((para, pIndex) => (
                      <Typography 
                        key={pIndex}
                        variant="body1" 
                        paragraph
                        sx={{ 
                          color: 'text.primary',
                          textAlign: 'justify'
                        }}
                      >
                        {para}
                      </Typography>
                    ))}
                  </Box>
                </Fade>
              ))}

              {/* Why It Still Holds Up */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  borderRadius: 0,
                }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    mb: 2,
                    color: 'white'
                  }}
                >
                  Why It Still Holds Up
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: '#e0e0e0' }}>
                  Cloud computing, containers, React, Kubernetes — none of that existed in 1999. And yet the book feels weirdly current because it focuses on principles, not tools.
                </Typography>
                <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                  The ideas map directly onto microservices, DevOps automation, clean architecture, agile development, sustainable engineering culture. It teaches you *how to think*, not what to memorize.
                </Typography>
              </Paper>

              {/* Who Should Read */}
              <Box sx={{ mb: 5 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    mb: 3,
                  }}
                >
                  Who Should Read It?
                </Typography>
                <Typography variant="body1" paragraph>
                  Pretty much everyone:
                </Typography>
                <Typography variant="body1" paragraph>
                  Beginners get solid habits early. Mid-level developers sharpen their architectural thinking. Senior engineers reinforce leadership and long-term design instincts. Tech leads and managers pick up ideas for better team culture.
                </Typography>
                <Typography variant="body1">
                  It's one of those rare programming books worth rereading every few years. You'll catch something new each time.
                </Typography>
              </Box>

              {/* Closing Quote */}
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  bgcolor: '#d84315',
                  color: 'white',
                  borderRadius: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '"""',
                    position: 'absolute',
                    top: -20,
                    left: 20,
                    fontSize: '10rem',
                    opacity: 0.1,
                    fontFamily: 'Georgia, serif',
                  }
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    mb: 2,
                    fontStyle: 'italic',
                    fontFamily: '"Crimson Pro", serif',
                    fontWeight: 600,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  The One Thing That Stuck with Me
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  You're not just coding. You're building a system that has to survive change.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mt: 2,
                    fontSize: '1.125rem',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  That shifts everything — how you name variables, design APIs, write tests, and even what you choose not to build. It's not about writing perfect code. It's about writing code that can evolve.
                </Typography>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}