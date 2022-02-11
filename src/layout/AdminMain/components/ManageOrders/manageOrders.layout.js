import React from "react";
import style from "./manageOrders.module.css";
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
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableComponent } from "components";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const BASE_URL = "http://localhost:3002";

const theme4 = createTheme({
  multilineColor: {
    color: "red",
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

const theme2 = createTheme({
  direction: "ltr",
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

const theme3 = createTheme({
  multilineColor: {
    color: "red",
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

const titleArray = ["نام کاربر", "مجموع مبلغ", "زمان ثبت سفارش", "عملیات"];

/****Table */

/****RTL */

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

class ManageOrdersLayout extends React.Component {
  state = {
    allOrders: [],
    orders: [],
    inPerPage: 4,
    pageNumber: 1,
    data: [],
    filter: "default",
    allCategories: [],
    filterSelection: "",
    radio: "delivered",
  };
  dataArray = [];

  ordersArray = [];
  numberOfPage = 1;

  findCategoryNameById = (id) => {
    let categoryName = "";
    this.state.allCategories.forEach((category) => {
      if (category.id === id) {
        categoryName = category.name;
      }
    });

    return categoryName;
  };

  componentDidMount() {
    axios.get(`${BASE_URL}/orders`).then((res) => {
      const allOrdersArray = res.data;
      this.setState({ allOrders: allOrdersArray }, () => {
        let howGet = {
          default: `?_page=${this.state.pageNumber}&_limit=${
            this.state.inPerPage
          }&${
            this.state.radio === "delivered"
              ? "deliveryDate_ne=null"
              : "deliveryDate=null"
          }`,
          all: "",
          priceAsce: `?_page=${this.state.pageNumber}&_limit=${
            this.state.inPerPage
          }&_sort=totalPrice&_order=asc&${
            this.state.radio === "delivered"
              ? "deliveryDate_ne=null"
              : "deliveryDate=null"
          }`,
          priceDesc: `?_page=${this.state.pageNumber}&_limit=${
            this.state.inPerPage
          }&_sort=totalPrice&_order=desc&${
            this.state.radio === "delivered"
              ? "deliveryDate_ne=null"
              : "deliveryDate=null"
          }`,
          createAtAsce: `?_page=${this.state.pageNumber}&_limit=${
            this.state.inPerPage
          }&_sort=registerationDate&_order=asc&${
            this.state.radio === "delivered"
              ? "deliveryDate_ne=null"
              : "deliveryDate=null"
          }`,
          createAtDesc: `?_page=${this.state.pageNumber}&_limit=${
            this.state.inPerPage
          }&_sort=registerationDate&_order=desc&${
            this.state.radio === "delivered"
              ? "deliveryDate_ne=null"
              : "deliveryDate=null"
          }`,
        };
        axios
          .get(`${BASE_URL}/orders${howGet[this.state.filter]}`)
          .then((res) => {
            const ordersArray = res.data;

            this.setState({ ...this.state, orders: ordersArray }, () => {
              let length = this.state.orders.length;
              let totalLength = this.state.allOrders.length;

              this.numberOfPage = Math.ceil(length / this.state.inPerPage);
              this.dataArray = [];

              for (let i = 0; i < length; i++) {
                this.dataArray[i] = [];
              }

              for (let index = 0; index < length; index++) {
                for (let property in this.state.orders[index]) {
                  if (property === "name") {
                    this.dataArray[index][0] =
                      this.state.orders[index][property];
                    console.log("in for:", this.dataArray);
                  } else if (property === "totalPrice") {
                    this.dataArray[index][1] =
                      this.state.orders[index][property];
                  } else if (property === "registerationDate") {
                    this.dataArray[index][2] =
                      this.state.orders[index][property];
                  }
                  this.dataArray[index][3] = "بررسی سفارش";
                }
              }
              console.log(this.dataArray);
              this.setState({
                ...this.state,
                data: this.dataArray,
              });
            });
          })
          .catch((err) => {
            console.log("Something went wrong");
          });
      });
    });
  }
  render() {
    const handleChange = (event, value) => {
      this.setState({ ...this.state, pageNumber: value }, () => {
        this.componentDidMount();
      });
    };
    const handleChangeFilter = (event) => {
      console.log("value is : ", event.target.value);
      this.setState({ ...this.state, filter: event.target.value }, () => {
        this.componentDidMount();
      });
    };
    const handleChangeRadioButton = (event) => {
      this.setState({ ...this.state, radio: event.target.value });
      this.componentDidMount();
    };
    return (
      <div className={style.manageOrdersContainer}>
        <div className={style.headerPart}>
          <div className={style.headerPartTitle}>مدیریت سفارش ها</div>
          <div className={style.headerPartFilter}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme3}>
                <Box
                  sx={{
                    minWidth: 300,
                  }}
                >
                  <FormControl sx={{}} fullWidth>
                    <InputLabel sx={{}} id="demo-simple-select-label">
                      فیلتر بر اساس
                    </InputLabel>
                    <Select
                      sx={{}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.filter}
                      label="Age"
                      onChange={handleChangeFilter}
                    >
                      <MenuItem sx={{ color: colors.text }} value={"default"}>
                        بدون فیلتر
                      </MenuItem>
                      <MenuItem sx={{ color: colors.text }} value={"priceAsce"}>
                        مجموع مبلغ (صعودی)
                      </MenuItem>
                      <MenuItem value={"priceDesc"}>
                        {" "}
                        مجموع مبلغ (نزولی)
                      </MenuItem>
                      <MenuItem value={"createAtAsce"}>
                        زمان ثبت سفارش (صعودی)
                      </MenuItem>
                      <MenuItem value={"createAtDesc"}>
                        زمان ثبت سفارش (نزولی)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ThemeProvider>
            </CacheProvider>
          </div>
          <div className={style.headerPartOrderFilter}>
            <ThemeProvider theme={theme4}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={this.state.radio}
                  onChange={handleChangeRadioButton}
                >
                  <FormControlLabel
                    value="delivered"
                    control={<Radio />}
                    label="سفارش های تحویل شده"
                  />
                  <FormControlLabel
                    value="notDelivered"
                    control={<Radio />}
                    label="سفارش های در انتظار ارسال"
                  />
                </RadioGroup>
              </FormControl>
            </ThemeProvider>
          </div>
        </div>
        {this.state.orders.length ? (
          <div className={style.tablePart}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={this.state.data}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, false, false, true]}
              doubleClickable={[false, false, false, false]}
              img={[false, false, false, false]}
              priceType={[false, true, false, false]}
              clickFunc={(x) => {
                alert(x);
              }}
              doubleClickFunc={null}
            />
          </div>
        ) : (
          <div className={style.noOrders}>محتوایی جهت نمایش وجود ندارد :)</div>
        )}
        {this.state.filter !== "all" && this.state.orders.length ? (
          <div className={style.paginationPart}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme2}>
                <Stack spacing={2}>
                  <Pagination
                    count={this.numberOfPage}
                    color="primary"
                    size="large"
                    onChange={handleChange}
                    showFirstButton
                    showLastButton
                    sx={{
                      color: colors.primary,
                      direction: "rtl!important",
                    }}
                  />
                </Stack>
              </ThemeProvider>
            </CacheProvider>
          </div>
        ) : null}
      </div>
    );
  }
}

export { ManageOrdersLayout };
