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
/*********************Helmet-************************** */
import { Helmet } from "react-helmet";

/****************Persian Date picker************************** */
import { DatePicker } from "jalali-react-datepicker";
import { RangeDatePicker } from "jalali-react-datepicker";

/************************************************** */

/********************************************* */

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

  // if (!values.date) {
  //   console.log("bad", values.date);
  //   errors.date = "این فیلد نمی‌تواند خالی باشد";
  // }
  return errors;
};

function FinalizePurchasePage(props) {
  let [currentCustomer, setCurrentCustomer] = useState({});
  let [basket, setBasket] = useState({});
  let [dateValue, setDateValue] = useState(null);
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
      values.date = dateValue;
      // console.log("values:", values);

      // let objectOfInput = values;
      // objectOfInput.date = moment(values.date, "YYYY/MM/DD")
      //   .locale("fa")
      //   .format("YYYY/MM/DD");
      let registerationDate =
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getDate();
      registerationDate = moment(registerationDate, "YYYY/MM/DD")
        .locale("fa")
        .format("YYYY/MM/DD");
      values.registerationDate = registerationDate;
      setCurrentCustomer({ ...values });
      // console.log("form object", values);
      // alert(values);
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
      <Helmet>
        <title>پرداخت نهایی</title>
      </Helmet>
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
              {/* <TextField
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
                  // backgroundColor: colors.white,
                }}
                type="date"
                // className={style.TextField}
                id="standard-date-input"
                label="تاریخ تحویل"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.date}
              /> */}
              <DatePicker
                name="date"
                onClickSubmitButton={({ value }) => {
                  let date = value._d;
                  let currentDate =
                    date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDate();
                  currentDate = moment(currentDate, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD");
                  console.log("submit date is called", currentDate);
                  setDateValue(currentDate);
                }}
                timePicker={false}
                label="تاریخ تحویل"
                className={style.dataPicker}
                theme={{
                  backColor: "#FFFFFF",
                  // head
                  headBackColor: colors.primary,
                  headTitleColor: colors.white,

                  headArrowColor: "#000",
                  headRangeBackColor: "#D6D6D6",
                  headRangeColor: "#000",

                  // weekdays color
                  weekDaysColor: "#3F3F3F",

                  // days
                  daysColor: "#000",
                  daysBackColor: "#FFFFFF",
                  holidaysColor: colors.red,
                  holidaysBackColor: "#FFFFFF",
                  daysRound: "50%",

                  selectDayColor: "#fff",
                  selectDayBackColor: colors.primary,

                  // buttons
                  submitBackColor: colors.primary,
                  submitHoverBackColor: colors.ligthPrimary,
                  submitColor: colors.white,
                  submitHoverColor: colors.white,
                  cancelBackColor: colors.primary,
                  cancelHoverBackColor: colors.ligthPrimary,
                  cancelColor: colors.white,
                  cancelHoverColor: colors.white,
                  changeViewButtonBackColor: "#D6D6D6",
                  changeViewButtonHoverBackColor: "#fff",
                  changeViewButtonColor: "#000",
                  changeViewButtonHoverColor: colors.primary,
                  // time
                  timeBackColor: "#f0f0f0",
                  timeNumberColor: "#000",
                  handBackColor: "#617fdf",
                  handCircleColor: "#617fdf",
                  selectedNumberColor: "#fff",
                  headTimeTitleColor: colors.primary,
                }}
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
