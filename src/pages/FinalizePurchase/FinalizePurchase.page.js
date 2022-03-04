import React, { useState, useEffect } from "react";
import style from "./FinalizePurchase.module.css";
import { UserHeaderLayout } from "layout";
import { colors } from "assets/colors";
/**************formik************ */
import { useFormik } from "formik";
/***************Input in material-ui************* */
import TextField from "@mui/material/TextField";
/*******************Theme and Rtl material-ui********************* */
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { makeStyles } from "@material-ui/core/styles";

/***************Button material-ui********************** */
import Button from "@mui/material/Button";
/***********************Text aria material-ui******************************* */
import TextareaAutosize from "@mui/material/TextareaAutosize";

/***********************Jalali moment Date************************** */
import moment from "jalali-moment";
/*******************react-router-dom************************** */
import { useNavigate } from "react-router-dom";
/*********************************************** */

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "6rem",
      width: "35rem",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "6rem",
      width: "35rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `3px solid ${colors.primary}`,
      borderRadius: "1rem",
      height: "6rem",
      width: "35rem",
    },
  },
});
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
const textFieldTheme = createTheme({
  fieldset: {
    borderColor: `${colors.primary}!important`,
  },

  direction: "rtl",
  typography: {
    fontFamily: "vazir",
    fontSize: 30,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "این فیلد نمی‌تواند خالی باشد";
    // } else if (values.firstName.length > 15) {
    //   errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "این فیلد نمی‌تواند خالی باشد";
    // } else if (values.lastName.length > 20) {
    //   errors.lastName = "Must be 20 characters or less";
  }
  if (!values.address) {
    errors.address = "این فیلد نمی‌تواند خالی باشد";
    // } else if (values.lastName.length > 20) {
    //   errors.lastName = "Must be 20 characters or less";
  }
  if (!values.phone) {
    errors.phone = "این فیلد نمی‌تواند خالی باشد";
  } else if (
    !/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
      values.phone
    )
  ) {
    errors.phone = "شماره تلفن نامعتبر است";
  }

  if (!values.date) {
    errors.date = "این فیلد نمی‌تواند خالی باشد";
  }
  return errors;
};

function FinalizePurchasePage(props) {
  let [currentCustomer, setCurrentCustomer] = useState({});
  let [basket, setBasket] = useState({});
  let navigate = useNavigate();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      date: "",
    },
    validate,
    onSubmit: (values) => {
      let objectOfInput = JSON.stringify(values, null, 2);
      setCurrentCustomer({ ...JSON.parse(objectOfInput) });
      console.log("form object", JSON.parse(objectOfInput));
      alert(objectOfInput);
      window.location.href =
        "http://localhost/paymentPage/dargah.html?totalPrice=" +
        basket.sumPrices;
    },
  });
  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem("basket")));
  }, []);
  useEffect(() => {
    localStorage.setItem("currentCustomer", JSON.stringify(currentCustomer));
  }, [currentCustomer]);
  return (
    <div className={style.finalaizePage}>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
      <div className={style.mainPart}>
        <div className={style.title}>نهایی کردن خرید</div>
        <form onSubmit={formik.handleSubmit} className={style.buyingForm}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={textFieldTheme}>
              <TextField
                name="firstName"
                className={classes.root}
                size="small"
                sx={{
                  width: "35rem",
                  backgroundColor: colors.white,
                  input: {
                    color: colors.text,
                    fontSize: "20px",
                    paddingTop: "1.5rem",
                  },
                  label: { color: colors.primary },

                  margin: "2rem",
                  marginBottom: "1rem",
                }}
                // className={style.TextField}
                id="standard-basic"
                label="نام"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />

              <div className={style.showErrorValidation}>
                {formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </div>
              <TextField
                name="lastName"
                className={classes.root}
                size="small"
                sx={{
                  input: {
                    color: colors.text,
                    fontSize: "20px",
                    paddingTop: "1.5rem",
                  },
                  label: { color: colors.primary },
                  width: "35rem",
                  margin: "2rem",
                  marginBottom: "1rem",
                  backgroundColor: colors.white,
                }}
                // className={style.TextField}
                id="standard-lastName-input"
                label="نام‌خانوادگی"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />

              <div className={style.showErrorValidation}>
                {formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </div>
              <TextareaAutosize
                name="address"
                style={{
                  border: `3px solid ${colors.primary}`,
                  width: "35rem",
                  label: { color: colors.primary },
                  height: "12rem",

                  margin: "2rem",
                  marginBottom: "1rem",
                  fontSize: "20px",
                  color: colors.text,
                  padding: "1rem",
                  "&:focus": { border: `3px solid ${colors.primary}` },
                }}
                className={style.textAria}
                aria-label="آدرس :"
                minRows={3}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <div className={style.showErrorValidation}>
                {" "}
                {formik.errors.address ? (
                  <div>{formik.errors.address}</div>
                ) : null}
              </div>
              <TextField
                className={classes.root}
                name="phone"
                size="small"
                sx={{
                  input: {
                    color: colors.text,
                    fontSize: "20px",
                    paddingTop: "1.5rem",
                  },
                  label: { color: colors.primary },
                  width: "35rem",
                  margin: "2rem",
                  marginBottom: "1rem",
                  backgroundColor: colors.white,
                }}
                type="tel"
                // className={style.TextField}
                id="standard-phone-input"
                label="تلفن‌همراه"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              <div className={style.showErrorValidation}>
                {" "}
                {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
              </div>
              <TextField
                className={classes.root}
                name="date"
                size="small"
                sx={{
                  input: {
                    color: colors.text,
                    fontSize: "20px",
                    paddingTop: "1.5rem",
                  },
                  label: { color: colors.primary },
                  width: "35rem",
                  margin: "2rem",
                  marginBottom: "1rem",
                  backgroundColor: colors.white,
                }}
                type="date"
                // className={style.TextField}
                id="standard-date-input"
                label="تاریخ تحویل"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.date}
              />

              <div className={style.showErrorValidation}>
                {formik.errors.date ? <div>{formik.errors.date}</div> : null}
              </div>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  transition: "1s",
                  color: colors.white,
                  backgroundColor: colors.primary,
                  fontSize: "2rem",
                  borderRadius: "10px",
                  width: "20rem",
                  height: "4rem",
                  marginTop: "6rem!important",
                  marginBottom: "2rem!important",
                  border: "none",
                  boxShadow: "5px 5px 5px rgb(0, 0, 0, 0.5)",
                  "&:hover": {
                    opacity: 0.8,
                    backgroundColor: colors.primary,
                    border: "none",
                  },
                }}
              >
                پرداخت
              </Button>
            </ThemeProvider>
          </CacheProvider>
        </form>
      </div>
    </div>
  );
}

export { FinalizePurchasePage };
