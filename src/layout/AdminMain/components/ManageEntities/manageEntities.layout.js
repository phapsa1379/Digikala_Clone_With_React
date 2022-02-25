import React from "react";
import style from "./manageEntities.module.css";
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
import { putProducts } from "api/products.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "globalFunctions";
/***********Helmet******************** */
import { Helmet } from "react-helmet";
/***************************** */
const BASE_URL = "http://localhost:3002";

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

const titleArray = ["id", "نام کالا", "قیمت", "موجودی"];

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
let dataCopy = [];
class ManageEntitiesLayout extends React.Component {
  state = {
    allProducts: [],
    products: [],
    inPerPage: 4,
    pageNumber: 1,
    data: [],
    filter: "default",
    allCategories: [],
    filterSelection: "",
    storeButton: false,
    clickOnStoreButtonEvent: false,
  };
  checkChangeInput = (changeFlag) => {
    if (changeFlag) {
      this.setState({ ...this.state, storeButton: "true" });
    } else {
      this.setState({ ...this.state, storeButton: "false" });
    }
  };
  getDataFromTable = (changesArray) => {
    console.log("array", changesArray);
    changesArray.map((data, index) => {
      let obj = {};
      obj.name = data[1];
      obj.price = data[2];
      obj.count = data[3];
      getProductById(data[0])
        .then((res) => {
          obj = { ...res, ...obj };
          console.log("id is : ", obj);
          putProducts(data[0], obj)
            .then((res) => {
              console.log(res);
              this.setState({
                ...this.state,
                storeButton: false,
                clickOnStoreButtonEvent: false,
              });
              return res;
            })
            .catch((err) => {
              console.log(err);
              return err;
            });
        })
        .catch((err) => {});
    });
  };
  dataArray = [];

  productsArray = [];
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
    axios.get(`${BASE_URL}/category`).then((res) => {
      const allCategoriesArray = res.data;
      this.setState({ allCategories: allCategoriesArray }, () => {
        axios.get(`${BASE_URL}/products`).then((res) => {
          const allProductsArray = res.data;
          this.setState({ allProducts: allProductsArray }, () => {
            let howGet = {
              default: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}`,
              all: "",
              priceAsce: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=price&_order=asc`,
              priceDesc: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=price&_order=desc`,
              createAtAsce: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=createdAt&_order=asc`,
              createAtDesc: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=createdAt&_order=desc`,
              countAsce: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=count&_order=asc`,
              countDesc: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=count&_order=desc`,
            };
            axios
              .get(`${BASE_URL}/products${howGet[this.state.filter]}`)
              .then((res) => {
                const productsArray = res.data;

                this.setState(
                  { ...this.state, products: productsArray },
                  () => {
                    let length = this.state.products.length;
                    let totalLength = this.state.allProducts.length;

                    this.numberOfPage = Math.ceil(
                      totalLength / this.state.inPerPage
                    );
                    this.dataArray = [];

                    for (let i = 0; i < length; i++) {
                      this.dataArray[i] = [];
                      dataCopy[i] = [];
                    }

                    for (let index = 0; index < length; index++) {
                      for (let property in this.state.products[index]) {
                        if (property === "id") {
                          this.dataArray[index][0] =
                            this.state.products[index][property];
                          dataCopy[index][0] =
                            this.state.products[index][property];
                        } else if (property === "name") {
                          this.dataArray[index][1] =
                            this.state.products[index][property];
                          dataCopy[index][1] =
                            this.state.products[index][property];
                        } else if (property === "price") {
                          this.dataArray[index][2] =
                            this.state.products[index][property];
                          dataCopy[index][2] =
                            this.state.products[index][property];
                        } else if (property === "count") {
                          this.dataArray[index][3] =
                            this.state.products[index][property];
                          dataCopy[index][3] =
                            this.state.products[index][property];
                        }
                      }
                    }

                    this.setState({
                      ...this.state,
                      data: [...this.dataArray],
                    });
                  }
                );
              })
              .catch((err) => {
                console.log("Something went wrong");
              });
          });
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
    return (
      <div className={style.manageProductsContainer}>
        <Helmet>
          <title>دیجی‌کالا | مدیریت موجودی وقیمت‌ها</title>
        </Helmet>
        <div className={style.headerPart}>
          <div className={style.headerPartTitle}>مدیریت موجودی و قیمت ها</div>
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
                        قیمت (صعودی)
                      </MenuItem>
                      <MenuItem value={"priceDesc"}> قیمت (نزولی)</MenuItem>
                      <MenuItem sx={{ color: colors.text }} value={"countAsce"}>
                        تعداد (صعودی)
                      </MenuItem>
                      <MenuItem value={"countDesc"}> تعداد (نزولی)</MenuItem>
                      <MenuItem value={"createAtAsce"}>
                        زمان ایجاد (صعودی)
                      </MenuItem>
                      <MenuItem value={"createAtDesc"}>
                        زمان ایجاد (نزولی)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ThemeProvider>
            </CacheProvider>
          </div>
          <div className={style.headerPartButton}>
            <ToastContainer
              bodyClassName={() => style.toastify}
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ThemeProvider theme={theme}>
              <Button
                disabled={!this.state.storeButton}
                onClick={(e) => {
                  this.setState(
                    {
                      ...this.state,
                      clickOnStoreButtonEvent: true,
                    },
                    () => {
                      toast.success("تغییرات با موفقیت ذخیره شد", {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                  );
                }}
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
                ذخیره
              </Button>
            </ThemeProvider>
          </div>
        </div>
        {this.state.products.length ? (
          <div className={style.tablePart}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={[...this.state.data]}
              initialData={[...dataCopy]}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, false, false, false]}
              doubleClickable={[false, false, true, true]}
              img={[false, false, false, false]}
              priceType={[false, false, true, false]}
              inputType="number"
              input={[false, false, true, true]}
              hiddenColumn={"id"}
              doubleClickFunc={(x) => {
                alert(x);
              }}
              clickFunc={null}
              checkChangeFlag={this.checkChangeInput}
              eventIsDone={this.state.clickOnStoreButtonEvent}
              getDataFromTable={this.getDataFromTable}
            />
          </div>
        ) : (
          <div className={style.noProducts}>
            محتوایی جهت نمایش وجود ندارد :)
          </div>
        )}
        {this.state.filter !== "all" && this.state.products.length ? (
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

export { ManageEntitiesLayout };
