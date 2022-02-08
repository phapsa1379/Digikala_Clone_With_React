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

const titleArray = ["تصویر", "نام کالا", "دسته بندی", "عملیات"];

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

const ManageProductsLayout = () => {
  let [products, setProducts] = useState([]);
  let [data, setData] = useState([]);
  let dataArray = [];
  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        const productsArray = res.data;

        setProducts(productsArray, () => {
          console.log("productsArray:", productsArray, ",prodcuts: ", products);
        });
      })
      .then((res) => {
        console.log("products", products);
        for (let index = 0; index < products.length; index++) {
          for (const property in products) {
            if (property === "thumbnail") {
              dataArray[index][0] = products[property];
            } else if (property === "firstName") {
              dataArray[index][1] = products[property];
            } else if (property === "category") {
              dataArray[index][2] = products[property].name;
            }
            dataArray[index][3] = "ویرایش / حذف";
          }
        }
        setData(dataArray);
        console.log("data", data);
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <div className={style.manageProductsContainer}>
      <div className={style.headerPart}>
        <div className={style.headerPartTitle}>مدیریت کالا ها</div>
        <div className={style.headerPartButton}>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => {}}
              variant="contained"
              link="/"
              sx={{
                color: colors.white,
                backgroundColor: colors.greenButton,
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
      <div className={style.tablePart}>
        <TableComponent data={data} titlesArray={titleArray} perPage={false} />
        {console.log(data)}
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
      <div className={style.paginationPart}></div>
    </div>
  );
};

export { ManageProductsLayout };
