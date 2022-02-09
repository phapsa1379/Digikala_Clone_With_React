import React from "react";
import style from "./manageProducts.module.css";
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

const titleArray = ["تصویر", "نام کالا", "دسته بندی", "ویرایش", ["حذف"]];

/****Table */

/****RTL */

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

/***RTL */

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.primary.main,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
/****Table */

class ManageProductsLayout extends React.Component {
  state = {
    allProducts: [],
    products: [],
    inPerPage: 2,
    pageNumber: 1,
    data: [],
    filter: "default",
    allCategories: [],
    filterSelection: "",
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
                    }

                    for (let index = 0; index < length; index++) {
                      for (let property in this.state.products[index]) {
                        if (property === "thumbnail") {
                          this.dataArray[index][0] =
                            this.state.products[index][property];
                          console.log("in for:", this.dataArray);
                        } else if (property === "firstName") {
                          this.dataArray[index][1] =
                            this.state.products[index][property];
                        } else if (property === "categoryId") {
                          this.dataArray[index][2] = this.findCategoryNameById(
                            this.state.products[index][property]
                          );
                        }
                        this.dataArray[index][3] = "ویرایش";
                        this.dataArray[index][4] = "حذف";
                      }
                    }
                    console.log(this.dataArray);
                    this.setState({
                      ...this.state,
                      data: this.dataArray,
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
        <div className={style.headerPart}>
          <div className={style.headerPartTitle}>مدیریت کالا ها</div>
          <div className={style.headerPartFilter}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Box sx={{ minWidth: 300 }}>
                  <FormControl sx={{ color: "#000" }} fullWidth>
                    <InputLabel
                      sx={{ color: "#000" }}
                      id="demo-simple-select-label"
                    >
                      فیلتر بر اساس
                    </InputLabel>
                    <Select
                      sx={{ color: "#000" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.filter}
                      label="Age"
                      onChange={handleChangeFilter}
                    >
                      <MenuItem sx={{ color: "#000" }} value={"default"}>
                        بدون فیلتر
                      </MenuItem>
                      <MenuItem sx={{ color: "#000" }} value={"priceAsce"}>
                        قیمت (صعودی)
                      </MenuItem>
                      <MenuItem value={"priceDesc"}> قیمت (نزولی)</MenuItem>
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
            <ThemeProvider theme={theme}>
              <Button
                onClick={() => {}}
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
                افزودن کالا
              </Button>
            </ThemeProvider>
          </div>
        </div>
        {this.state.products.length ? (
          <div className={style.tablePart}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={this.state.data}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, false, false, true, true]}
              doubleClickable={[false, false, false, false, false]}
              clickFunc={(x) => {
                alert(x);
              }}
              doubleClickFunc={null}
            />

            {/* <CacheProvider value={cacheRtl}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CacheProvider> */}
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

export { ManageProductsLayout };
