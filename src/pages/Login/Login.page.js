import React, { useState } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

/*************Helmet***************** */
import { Helmet } from "react-helmet";
/****************Api************************* */
import { getUsers } from "api/users.api";
import { AiFillAlert } from "react-icons/ai";
/***************************************** */
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
    fontSize: 35,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "7rem",
      // width: "35rem",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "7rem",
      // width: "35rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "7rem",
      // width: "35rem",
    },
  },
});

const LoginPage = (props) => {
  const [users, setUsers] = useState([]);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // alert(e.target[0].value);
    let userName, password;
    userName = e.target[0].value; //username input
    password = e.target[2].value; //password input

    if (!(userName && password))
      swal({
        title: "هشدار",
        text: "لطفا تمامی فیلد ها را پر کنید",
        icon: "warning",
      });
    else {
      let flag = false;
      users.map((user, index) => {
        if (user.username === userName && user.password === password) {
          flag = true;
          localStorage.setItem("currentUser", JSON.stringify({ user }));
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          swal({
            title: "موفقیت",
            text:
              user.role === "admin"
                ? "به پنل مدیریت خوش آمدید"
                : "به پنل کاربری خوش آمدید",
            icon: "success",
          });
          if (user.role === "admin") {
            navigate("/manage-products");
          } else {
            navigate("/");
          }
        }
      });
      // if (userName === "admin" && password === "admin") {
      //   swal({
      //     title: "موفقیت",
      //     text: `${userName} خوش آمدید`,
      //     icon: "success",
      //   }).then((res) => {
      //     localStorage.setItem(
      //       "currentUser",
      //       JSON.stringify({ userName, password })
      //     );
      //     localStorage.setItem("isLoggedIn", JSON.stringify(true));

      //     navigate("/manage-products");
      //   });
      // }
      if (!flag) {
        swal({
          title: "خطا",
          text: "نام کاربری یا رمز عبور اشتباه است",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className={style.loginPageContainer}>
      <Helmet>
        <title>ورود</title>
      </Helmet>
      <div className={style.loginFormContainer}>
        <div className={style.title}>ورود به پنل کاربری</div>
        <form className={style.form} onSubmit={submitHandler}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <TextField
                className={classes.root}
                sx={{
                  input: {
                    color: colors.textColor,
                    fontSize: "20px",
                    textAlign: "center",
                  },
                  label: { color: colors.primary },

                  width: "40rem",
                  margin: "2rem 0",
                  marginBottom: "3rem",
                  "&:hover": {
                    // borderBottom: `3px solid ${colors.primary}`,
                  },
                }}
                id="standard-basic"
                label="نام کاربری"
                variant="outlined"
              />

              <FormControl
                className={classes.root}
                variant="outlined"
                sx={{ direction: "rtl" }}
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ paddingTop: "2rem", color: colors.primary }}
                >
                  رمزعبور
                </InputLabel>

                <OutlinedInput
                  // className={classes.root}

                  sx={{
                    input: {
                      color: `${colors.textColor}!important`,
                      fontSize: "20px",
                      textAlign: "center",
                      // direction: "rtl",
                    },
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
                  id="outlined-adornment-password-in-login"
                  label="رمزعبور"
                  type={values.showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  // type="password"
                  autoComplete="current-password"
                  // variant="outlined"
                  value={values.password}
                  endAdornment={
                    <InputAdornment position="end" className={style.eyeIcon}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{ color: "#EE384E" }}
                />
              </FormControl>

              <Button
                variant="outlined"
                type="submit"
                sx={{
                  color: colors.white,
                  borderColor: colors.primary,
                  fontSize: "30px",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  width: "40rem",
                  height: "6rem",
                  marginTop: "5rem!important",
                  marginBottom: "2rem!important",
                  backgroundColor: colors.primary,

                  // boxShadow: "-5px 5px 5px #e2364ad2",
                  "&:hover": {
                    color: colors.white,
                    backgroundColor: colors.ligthPrimary,
                  },
                }}
              >
                ورود
              </Button>
            </ThemeProvider>
          </CacheProvider>
        </form>

        <div className={style.bottomBtn}>
          <div className={style.backBtn}>
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="contained"
                link="/"
                sx={{
                  color: colors.primary,
                  backgroundColor: "transparent",
                  borderRadius: "2rem",
                  width: "20rem",
                  height: "4rem",
                  justifySelf: "flex-end",
                  fontSize: "2rem",
                  marginBottom: "2rem",
                  transition: "0.5s",
                  border: `1px solid ${colors.primary}`,
                  "&:hover": {
                    backgroundColor: colors.primary,
                    color: "white",
                    opacity: 0.8,
                  },
                }}
              >
                بازگشت
              </Button>
            </ThemeProvider>
          </div>
          <div className={style.registerBtn}>
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
                  marginLeft: "auto",
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  },
                }}
              >
                ثبت نام
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
