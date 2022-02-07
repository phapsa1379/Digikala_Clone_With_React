import React from "react";
import style from "./Login.module.css";
import { loginBackground } from "assets/images";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { colors } from "assets/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

let navigate;
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  multilineColor: {
    color: "red",
  },
  direction: "rtl",
  typography: {
    fontFamily: "vazir",
    fontSize: 40,
  },
  palette: {
    primary: {
      main: colors.secondary,
    },
  },
});

const submitHandler = (e) => {
  e.preventDefault();
  // alert(e.target[0].value);
  let userName, password;
  userName = e.target[0].value;
  password = e.target[1].value;
  alert(userName);
  alert(password);
};

const LoginPage = (props) => {
  navigate = useNavigate();
  return (
    <div className={style.loginPageContainer}>
      <div className={style.loginFormContainer}>
        <div className={style.title}>ورود به پنل مدیریت فروشگاه دیجیکالا</div>
        <form className={style.form} onSubmit={submitHandler}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <TextField
                sx={{
                  input: { color: colors.secondary, fontSize: "20px" },
                  label: { color: colors.secondary },
                  borderBottom: `1px solid ${colors.secondary}`,
                  width: "40rem",
                  margin: "2rem 0",
                }}
                className={style.TextField}
                id="standard-basic"
                label="نام کاربری"
                variant="standard"
              />
              <TextField
                sx={{
                  input: { color: colors.secondary, fontSize: "20px" },
                  label: { color: colors.secondary },
                  borderBottom: `1px solid ${colors.secondary}`,
                  width: "40rem",
                  margin: "2rem 0",
                }}
                id="standard-password-input"
                label="رمزعبور"
                type="password"
                autoComplete="current-password"
                variant="standard"
                style={{ color: "#EE384E" }}
              />

              <Button
                variant="outlined"
                type="submit"
                sx={{
                  color: colors.secondary,
                  borderColor: colors.secondary,
                  fontSize: "30px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "40rem",
                  height: "6rem",
                  marginTop: "6rem!important",
                  marginBottom: "2rem!important",
                  backgroundColor: "transparent",
                  border: "3px solid",
                  "&:hover": {
                    color: colors.white,
                    backgroundColor: colors.secondary,
                    border: `3px solid ${colors.secondary}`,
                  },
                }}
              >
                ورود
              </Button>
            </ThemeProvider>
          </CacheProvider>
        </form>

        <div className={style.backBtn}>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="contained"
              link="/"
              sx={{
                color: colors.white,
                backgroundColor: colors.primary,
                borderRadius: "2rem",
                width: "20rem",
                height: "4rem",
                justifySelf: "flex-end",
                fontSize: "2rem",
                marginBottom: "2rem",
                transition: "0.5s",
                "&:hover": {
                  backgroundColor: colors.primary,
                  opacity: 0.8,
                },
              }}
            >
              بازگشت
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div className={style.background}>
        <img
          src={loginBackground}
          alt="background"
          className={style.backgroundImage}
        />
        <div className={style.cover}></div>
      </div>
    </div>
  );
};

export { LoginPage };
