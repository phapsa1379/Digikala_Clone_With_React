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
import { Navigate } from "react-router-dom";
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
/*********OUR ICON****************** */
import { AiFillCloseCircle } from "assets/icons";
/***********Helmet******************** */
import { Helmet } from "react-helmet";
/************API**************** */
import { getOrders, postOrders, putOrders, deleteOrders } from "api/orders.api";
/************Modal**************** */
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
/***********Global Function******************* */
import { getOrderById, getProductById } from "globalFunctions";
/***********Redux*************** */
import { connect } from "react-redux";
import store from "redux/store";
import { fetchProducts } from "redux/actions/products.action";
/*********Jalali Date**************** */
import moment from "jalali-moment";
/************************************************ */
const BASE_URL = "http://localhost:3002";
const modalTheme = createTheme({
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
      main: colors.primary,
    },
  },
});
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
const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
  minWidth: "50rem",
  bgcolor: "background.paper",
  border: `5px solid ${colors.primary}`,
  boxShadow: 24,
  borderRadius: "2rem",
  maxHeight: "90vh",
  overflow: "scroll",
  p: 4,
};
const titleArray = [
  "id",
  "نام کاربر",
  "مجموع مبلغ",
  "زمان ثبت سفارش",
  "عملیات",
];

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
    openModal: false,
    orderId: null,
    currentOrder: {},
    dataOrderArray: [],
  };
  dataArray = [];

  ordersArray = [];
  numberOfPage = 1;
  deliverButtonHandler = () => {
    this.setState({ ...this.state, openModal: false }, () => {
      //set current Order as a is delivered
      let currentDate =
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getDate();
      currentDate = moment(currentDate, "YYYY/MM/DD")
        .locale("fa")
        .format("YYYY/MM/DD");
      // alert(currentDate);
      // console.log(this.state.currentOrder);
      this.setState(
        {
          ...this.state,
          currentOrder: {
            ...this.state.currentOrder,
            deliveryDate: currentDate,
          },
        },
        () => {
          putOrders(this.state.currentOrder.id, this.state.currentOrder);
          this.componentDidMount();
        }
      );
    });
  };
  findCategoryNameById = (id) => {
    let categoryName = "";
    this.state.allCategories.forEach((category) => {
      if (category.id === id) {
        categoryName = category.name;
      }
    });

    return categoryName;
  };
  findNameOfProductById = (thisId) => {
    return [
      ...this.props.products.map((product, index) => {
        if (product.id === thisId) {
          // console.log("name", product.name);
          return product.name;
        }
      }),
    ];
  };
  closeModalHandler = () => {
    this.setState({ ...this.state, openModal: false });
  };

  getDataFromTable = (data) => {};

  componentDidMount() {
    this.props.getProductss();
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
        let deliverdArray = [],
          undeliverdArray = [];
        this.state.allOrders.forEach((order) => {
          if (order.deliveryDate === "null") {
            undeliverdArray.push(order);
          } else {
            deliverdArray.push(order);
          }
        });
        console.log("delivery", deliverdArray);
        console.log("undelivery", undeliverdArray);
        axios
          .get(`${BASE_URL}/orders${howGet[this.state.filter]}`)
          .then((res) => {
            const ordersArray = res.data;

            this.setState({ ...this.state, orders: ordersArray }, () => {
              let length = this.state.orders.length;
              let totalLength = this.state.allOrders.length;

              this.numberOfPage = Math.ceil(
                (this.state.radio === "delivered"
                  ? deliverdArray.length
                  : undeliverdArray.length) / this.state.inPerPage
              );
              this.dataArray = [];
              for (let i = 0; i < length; i++) {
                this.dataArray[i] = [];
              }

              for (let index = 0; index < length; index++) {
                for (let property in this.state.orders[index]) {
                  if (property === "id") {
                    this.dataArray[index][0] =
                      this.state.orders[index][property];
                  } else if (property === "name") {
                    this.dataArray[index][1] =
                      this.state.orders[index][property];
                    console.log("in for:", this.dataArray);
                  } else if (property === "totalPrice") {
                    this.dataArray[index][2] =
                      this.state.orders[index][property];
                  } else if (property === "registerationDate") {
                    this.dataArray[index][3] =
                      this.state.orders[index][property];
                  }
                  this.dataArray[index][4] = "بررسی سفارش";
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
      this.setState({ ...this.state, pageNumber: 1 }, () => {
        this.setState({ ...this.state, radio: event.target.value }, () => {
          this.componentDidMount();
        });
      });
    };
    return (
      <div className={style.manageOrdersContainer}>
        <Helmet>
          <title>دیجی‌کالا | مدیریت سفارش‌ها</title>
        </Helmet>
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
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={modalTheme}>
            <Modal
              open={this.state.openModal}
              onClose={this.closeModalHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={boxStyle} className="modalBox">
                <span
                  className={style.closeModalBtn}
                  onClick={this.closeModalHandler}
                >
                  <AiFillCloseCircle />
                </span>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: colors.primary,
                    fontWeight: "bold",
                    marginBottom: "4rem",
                  }}
                >
                  نمایش سفارش
                </Typography>
                <div className={style.ordderInfo}>
                  <div className={style.ordderInfoName}>
                    نام مشتری :{" "}
                    <div className={style.modalText}>
                      {this.state.currentOrder.name}
                    </div>
                  </div>
                  <div className={style.ordderInfoAddress}>
                    آدرس :{" "}
                    <div className={style.modalText}>
                      {this.state.currentOrder.address}
                    </div>
                  </div>
                  <div className={style.ordderInfoPhone}>
                    تلفن :{" "}
                    <div className={style.modalText}>
                      {this.state.currentOrder.phoneNumber}
                    </div>
                  </div>
                  <div className={style.ordderInfoDeliveryDate}>
                    تاریخ تحویل :{" "}
                    <div className={style.modalText}>
                      {this.state.currentOrder.deliveryDate === "null"
                        ? "---------"
                        : this.state.currentOrder.deliveryDate}
                    </div>
                  </div>
                  <div className={style.ordderInfoOrderDate}>
                    تاریخ سفارش :{" "}
                    <div className={style.modalText}>
                      {this.state.currentOrder.registerationDate}
                    </div>
                  </div>
                  <div className={style.ordderInfoProducts}>
                    {
                      //basket Table in
                    }
                    <TableComponent
                      titleBgColor={colors.primary}
                      titleColor={colors.white}
                      data={this.state.dataOrderArray}
                      titlesArray={["id", "نام محصول", "قیمت", "تعداد"]}
                      perPage={false}
                      clickable={[false, true, false, false]}
                      doubleClickable={[false, false, false, false]}
                      img={[false, false, false, false]}
                      priceType={[false, false, true, false, false]}
                      inputType="number"
                      input={[false, false, false, false, false]}
                      hiddenColumn={"id"}
                      clickFunc={(text, orderId) => {
                        window.location.href = `/product-details/?id=${orderId}`;

                        // return (
                        //   <Navigate
                        //     to={`/product-details/?id=${orderId}`}
                        //     replace={true}
                        //   />
                        // );
                      }}
                      doubleClickFunc={null}
                      checkChangeFlag={false}
                      eventIsDone={false}
                      getDataFromTable={this.getDataFromTable}
                    />
                  </div>
                  <div className={style.deliveryButtonContainer}>
                    {this.state.currentOrder.deliveryDate === "null" ? (
                      <dvi className={style.deliverButton}>
                        <ThemeProvider theme={theme}>
                          <Button
                            onClick={this.deliverButtonHandler}
                            variant="contained"
                            link="/"
                            sx={{
                              color: colors.white,
                              backgroundColor: colors.ligthPrimary,
                              borderRadius: "1rem",
                              width: "15rem",
                              height: "5rem",
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
                            تحویل شده
                          </Button>
                        </ThemeProvider>
                      </dvi>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Box>
            </Modal>
          </ThemeProvider>
        </CacheProvider>
        {this.state.orders.length ? (
          <div className={style.tablePart}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={this.state.data}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, false, false, false, true]}
              doubleClickable={[false, false, false, false, false]}
              img={[false, false, false, false, false]}
              priceType={[false, false, true, false, false]}
              inputType="number"
              input={[false, false, false, false, false]}
              hiddenColumn={"id"}
              clickFunc={(text, orderId) => {
                this.setState({ ...this.state, orderId: orderId }, () => {
                  getOrderById(this.state.orderId).then((res) => {
                    this.setState(
                      {
                        ...this.state,
                        currentOrder: res,
                      },
                      () => {
                        this.setState(
                          { ...this.state, openModal: true },
                          () => {
                            /******************** */

                            // console.log(
                            //   "orders",
                            //   this.state.currentOrder.buyingProducts
                            // );

                            let len =
                              this.state.currentOrder.buyingProducts.length;
                            let currentBuyingProduct =
                              this.state.currentOrder.buyingProducts;
                            // console.log("currentBuying", currentBuyingProduct);
                            let arrayOfProductInBasket = [];
                            for (let i = 0; i < len; i++) {
                              arrayOfProductInBasket[i] = [];
                              for (let key in currentBuyingProduct[i]) {
                                //console.log(response);
                                if (key === "id") {
                                  arrayOfProductInBasket[i][0] =
                                    currentBuyingProduct[i].id;
                                  arrayOfProductInBasket[i][1] =
                                    this.findNameOfProductById(
                                      currentBuyingProduct[i].id
                                    );
                                } else if (key === "price") {
                                  arrayOfProductInBasket[i][2] =
                                    currentBuyingProduct[i].price;
                                } else if (key === "number") {
                                  arrayOfProductInBasket[i][3] =
                                    currentBuyingProduct[i].number;
                                }
                              }
                            }
                            // console.log("Order", arrayOfProductInBasket);
                            this.setState({
                              ...this.state,
                              dataOrderArray: arrayOfProductInBasket,
                            });

                            /******************** */
                          }
                        );
                      }
                    );
                  });
                });
              }}
              doubleClickFunc={null}
              checkChangeFlag={false}
              eventIsDone={false}
              getDataFromTable={this.getDataFromTable}
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
                    page={this.state.pageNumber}
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
const mapStateToProps = (state) => {
  // console.log("map", state.allProducts.products);
  return {
    products: state.allProducts.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductss: () => dispatch(fetchProducts()),
  };
};
const ManageOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageOrdersLayout);
export { ManageOrders };
