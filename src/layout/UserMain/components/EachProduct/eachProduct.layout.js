import React, { useState, useEffect } from "react";

import style from "./eachProduct.module.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getProducts } from "api/products.api";
import { getCategory } from "api/category.api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "assets/colors";
import { CacheProvider } from "@emotion/react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import axios from "axios";
import Stack from "@mui/material/Stack";
const BASE_URL = "http://localhost:3002";

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
    fontSize: 30,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});
function EachProductLayout() {
  let [param, setParam] = useSearchParams();
  let id = param.get("id");
  id = Number(id);
  let navigate = useNavigate();

  // let [perPage, setPerPage] = useState(6);
  // let [pageNumber, setPageNumber] = useState(1);
  // let [numberOfPage, setNumberOfPage] = useState(1);
  let [productsArray, setProductsArray] = useState([]);
  // let [inPerPage, setInPerPage] = useState(6);
  // let [filter, setFilter] = useState("default");
  let [allProducts, setAllProducts] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [categoryNames, setCategoryNames] = useState([]);
  let [currentProduct, setCurrentProduct] = useState([]);
  // let howGet = {
  //   default: `?id=${id}&_page=${pageNumber}&_limit=${inPerPage}`,
  //   all: `?id=${id}`,
  //   priceAsce: `?id=${id}&_page=${pageNumber}&_limit=${inPerPage}&_sort=price&_order=asc`,
  //   priceDesc: `?id=${id}&_page=${pageNumber}&_limit=${inPerPage}&_sort=price&_order=desc`,
  //   createAtAsce: `?id=${id}&_page=${pageNumber}&_limit=${inPerPage}&_sort=createdAt&_order=asc`,
  //   createAtDesc: `?id=${id}&_page=${pageNumber}&_limit=${inPerPage}&_sort=createdAt&_order=desc`,
  // };

  const setCategoryName = () => {
    categoryNames = allCategory.map((category, index) => {
      return category.name;
    });

    setCategoryNames(categoryNames);
  };

  useEffect(() => {
    getProducts().then((res) => {
      setAllProducts(res.data);
    });
    getCategory().then((res) => {
      setAllCategory(res.data);
    });
  }, []);

  useEffect(() => {}, [allProducts]);

  const getCategoryNameByCategoryId = (id) => {
    for (let i = 0; i < allCategory.length; i++) {
      if (allCategory[i].id === id) return allCategory[i].name;
    }
  };
  const getCategoryIdByCategoryName = (name) => {
    for (let i = 0; i < allCategory.length; i++) {
      if (allCategory[i].name === name) return allCategory[i].id;
    }
  };
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {categoryNames ? (
              categoryNames.map((text, index) => (
                <ListItem
                  button
                  key={text}
                  sx={{
                    transition: "1s background",
                    "&:hover": {
                      backgroundColor: colors.primary,
                      color: colors.white,
                    },
                  }}
                  onClick={() => {
                    navigate(
                      `/products-list/?id=${getCategoryIdByCategoryName(text)}`
                    );
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
  return (
    <div className={style.productsGroupContainer}>
      {["left"].map((anchor) => (
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <React.Fragment key={anchor}>
              <Button
                onClick={toggleDrawer(anchor, true)}
                sx={{ fontSize: "3rem", fontWeight: "bold" }}
              >
                نمایش دسته بندی‌ها
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          </ThemeProvider>
        </CacheProvider>
      ))}
      <div className={style.productsGroupContainer}>
        <div className={style.groupContainer}>
          <div className={style.eachGroupTitle}>
            <a
              className={style.eachGroupTitleLink}
              href={`/products-list/?id=${id}`}
            >
              {getCategoryNameByCategoryId(id) + ":"}
            </a>
          </div>
          <div className={style.eachGroup}>
            {productsArray.map((product, index) => {
              return (
                <div className={style.eachCard} key={index}>
                  <ThemeProvider theme={theme}>
                    <Card
                      sx={{
                        maxWidth: 450,
                        border: "none",
                        padding: "1rem 1rem",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          bojectFit: "fill",
                          borderRadius: "2rem",
                          marginBottom: "1rem",
                        }}
                        height="auto"
                        image={`http://localhost:3002${product.image[0]}`}
                        alt="green iguana"
                      />

                      <CardContent>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fotSize: "2rem",
                            fontWeight: "bold",
                            marginTop: "1rem",
                            color: colors.textColor,
                          }}
                          gutterBottom
                          // variant="h5"
                          component="div"
                        >
                          {product.name}
                        </Typography>

                        <div className={style.descriptionOfEachCard}>
                          {product.description}
                        </div>
                        <div className={style.priceOfEachCard}>
                          {product.price.toLocaleString("fa")} تومان
                        </div>
                      </CardContent>
                      <CardActions sx={{ marginBottom: "2rem" }}>
                        <Button variant="contained" size="big">
                          اضافه‌به‌سبد‌خرید
                        </Button>
                        <Button
                          sx={{ marginRight: "2rem" }}
                          size="small"
                          onClick={() => {
                            navigate(`/product-details/?id=${product.id}`);
                          }}
                        >
                          بیشتر...
                        </Button>
                      </CardActions>
                    </Card>
                  </ThemeProvider>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { EachProductLayout };
