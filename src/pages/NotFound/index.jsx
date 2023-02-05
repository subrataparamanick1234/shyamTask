import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Opps! 404 No page found !
            </Typography>

            <Typography
              component="a"
              variant="h5"
              onClick={() => navigate("/dashboard")}
              sx={{ color: "blue", cursor: "pointer" }}
            >
              Back to dashboard
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default NotFound;
