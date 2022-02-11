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
import swal from "sweetalert";
import { useEffect } from "react";
import axios from "axios";

let navigate;
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  fieldset: {
    borderColor: colors.primary,
  },
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
      main: colors.primary,
    },
  },
});

const submitHandler = (e) => {
  e.preventDefault();
  // alert(e.target[0].value);
  let userName, password;
  userName = e.target[0].value;
  password = e.target[1].value;
  if (!(userName && password))
    swal({
      title: "هشدار",
      text: "لطفا تمامی فیلد ها را پر کنید",
      icon: "warning",
    });
  else if (userName === "admin" && password === "admin") {
    swal({
      title: "موفقیت",
      text: `${userName} خوش آمدید`,
      icon: "success",
    }).then((res) => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ userName, password })
      );
      localStorage.setItem("isLoggedIn", JSON.stringify(true));

      navigate("/manage-products");
    });
  } else {
    swal({
      title: "خطا",
      text: "نام کاربری یا رمز عبور اشتباه است",
      icon: "error",
    });
  }
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
                  input: { color: colors.primary, fontSize: "20px" },
                  label: { color: colors.primary },
                  borderBottom: `1px solid ${colors.primary}`,
                  width: "40rem",
                  margin: "2rem 0",
                  "&:hover": {
                    // borderBottom: `3px solid ${colors.primary}`,
                  },
                }}
                className={style.TextField}
                id="standard-basic"
                label="نام کاربری"
                variant="standard"
              />
              <TextField
                sx={{
                  input: { color: colors.primary, fontSize: "20px" },
                  label: { color: colors.primary },
                  // borderBottom: `1px solid ${colors.primary}`,
                  width: "40rem",
                  margin: "2rem 0",
                  "&.Mui-focused fieldset": {
                    borderColor: `${colors.primary}!important`,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.primary,
                  },
                  "&.MuiInput-underline:hover": {
                    borderBottomColor: colors.primary,
                  },
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
                  color: colors.primary,
                  borderColor: colors.primary,
                  fontSize: "30px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "40rem",
                  height: "6rem",
                  marginTop: "6rem!important",
                  marginBottom: "2rem!important",
                  backgroundColor: "transparent",
                  border: "3px solid",
                  boxShadow: "-5px 5px 5px #e2364ad2",
                  "&:hover": {
                    color: colors.white,
                    backgroundColor: colors.primary,
                    border: `3px solid ${colors.primary}`,
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
                backgroundColor: colors.ligthPrimary,
                "& .MuiInput-underline:after": {
                  borderBottomColor: colors.white,
                },
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
      {/* <div className={style.background}>
        <img
          src={loginBackground}
          alt="background"
          className={style.backgroundImage}
        />
        <div className={style.cover}></div>
      </div> */}
    </div>
  );
};

export { LoginPage };
