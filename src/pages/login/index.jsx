import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginRequest } from "../../redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Email is required")
    .email("Email is invalid. i.e : yourmail@email.com"),
  password: Yup.string()
    .required("Password is required")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please follow the format i.e : Demo@123")
    .min(6, "Please enter a password that is at least 6 characters"),
});

const theme = createTheme();
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let formData = new FormData();

  const [isLoading, setIsLoading] = useState(false);
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "all",
  };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleSubmitForm = (data) => {
    setIsLoading(true);
    formData.append("username", data?.username);
    formData.append("password", data?.password);
    formData.append("user_type", 4);

    dispatch(loginRequest(formData))
      .then((res) => {
        if (res?.payload?.status) {
          toast(res?.payload?.message, { type: "success" });
          navigate("/dashboard");
          localStorage.setItem("token", res?.payload?.token?.access_token);
          localStorage.setItem("user", JSON.stringify(res?.payload?.user));
          setIsLoading(false);
        } else {
          toast("Something went worng!", { type: "error" });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("username")}
              />

              {errors.username && (
                <div className="text-danger d-flex">
                  <span style={{ marginLeft: "5px", color: "red" }}>
                    {" "}
                    {errors.username?.message}{" "}
                  </span>
                </div>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />

              {errors.password && (
                <div className="text-danger d-flex">
                  <span style={{ marginLeft: "5px", color: "red" }}>
                    {" "}
                    {errors.password?.message}{" "}
                  </span>
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(handleSubmitForm)}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : "Sign In"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
