import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../../components/Listitems";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getDoctorList } from "../../redux/dashboardSlice";
import { AppointmentModal } from "../../components/AppointmentModal";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardData } = useSelector((store) => store.dashboard);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [clinicID, setclinicID] = useState(null);

  // FOR GET DOCTOR LIST
  useEffect(() => {
    async function getDoctor() {
      let formData = new FormData();
      formData.append("id", 14);
      dispatch(getDoctorList(formData));
    }
    getDoctor();
  }, [dispatch]);
  // FOR GET DOCTOR LIST

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {" "}
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/");
                  localStorage.removeItem("token");
                  toast("Logout Succesfully !", { type: "success" });
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid item xs={12} md={4} lg={9}>
                {dashboardData !== null ? (
                  <>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Typography
                        component={"h4"}
                        sx={{
                          mt: 4,
                          mb: 4,
                        }}
                      >
                        Doc Name : {dashboardData?.name}
                      </Typography>

                      <Typography
                        component={"h4"}
                        sx={{
                          mt: 4,
                          mb: 4,
                        }}
                      >
                        clinics Details:
                      </Typography>
                      {dashboardData?.clinics?.map((item, i) => (
                        <Grid
                          key={i}
                          item
                          xs={12}
                          md={4}
                          lg={9}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          Name : {item?.name}
                          {Object.entries(item?.slots)?.map((key) => (
                            <Paper
                              key={i}
                              sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 200,
                                width: "100%",
                                margin: "10px 0px 0px 10px",
                              }}
                            >
                              {key[0]}
                              <br />
                              {key[1]?.start_time} - {key[1]?.end_time}
                            </Paper>
                          ))}
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{
                              ml: 4,
                              mb: 4,
                              fontSize: 12,
                              height: "50px",
                            }}
                            onClick={() => {
                              setOpenModal(true);
                              setclinicID(item?.id);
                            }}
                          >
                            Book now
                          </Button>
                        </Grid>
                      ))}
                    </Paper>
                  </>
                ) : (
                  <>loading...</>
                )}
              </Grid>
            </Container>
          </Box>
        </Box>
        <AppointmentModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          clinicID={clinicID}
        />
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
