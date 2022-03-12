import React, { useState, useEffect } from "react";
import style from "./productsGroup.module.css";
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
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Stack from "@mui/material/Stack";
/***********Helmet******************** */
import { Helmet } from "react-helmet";
/***************************** */
import { SkeletonImage } from "skeleton-elements/react";
import { SkeletonBlock } from "skeleton-elements/react";
// import "./styles.css";
import "skeleton-elements/css";
/***************Card************** */
import { CardComponent, SkeletonCard } from "components";
/*********************************** */

const BASE_URL = "http://localhost:3002";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
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

function ProductsGroupLayout() {
  let [param, setParam] = useSearchParams();
  let categoryId = param.get("categoryId");
  categoryId = Number(categoryId);
  let navigate = useNavigate();

  let [perPage, setPerPage] = useState(6);
  let [pageNumber, setPageNumber] = useState(1);
  let [numberOfPage, setNumberOfPage] = useState(1);
  let [productsArray, setProductsArray] = useState([]);
  let [inPerPage, setInPerPage] = useState(6);
  let [filter, setFilter] = useState("default");
  let [allProducts, setAllProducts] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [categoryNames, setCategoryNames] = useState([]);
  let [productsInThisCategory, setProductsInThisCategory] = useState([]);
  let howGet = {
    default: `?categoryId=${categoryId}&_page=${pageNumber}&_limit=${inPerPage}`,
    all: `?categoryId=${categoryId}`,
    priceAsce: `?categoryId=${categoryId}&_page=${pageNumber}&_limit=${inPerPage}&_sort=price&_order=asc`,
    priceDesc: `?categoryId=${categoryId}&_page=${pageNumber}&_limit=${inPerPage}&_sort=price&_order=desc`,
    createAtAsce: `?categoryId=${categoryId}&_page=${pageNumber}&_limit=${inPerPage}&_sort=createdAt&_order=asc`,
    createAtDesc: `?categoryId=${categoryId}&_page=${pageNumber}&_limit=${inPerPage}&_sort=createdAt&_order=desc`,
  };

  const pageFunc = () => {
    productsInThisCategory = allProducts.filter((product) => {
      return product.categoryId === categoryId;
    });
    setProductsInThisCategory(productsInThisCategory);

    let totalLength = productsInThisCategory.length;

    numberOfPage = Math.ceil(totalLength / perPage);
    setNumberOfPage(numberOfPage);
    console.log("allProducts", allProducts);
    //console.log(numberOfPage);
  };
  const setCategoryName = () => {
    categoryNames = allCategory.map((category, index) => {
      return category.name;
    });

    setCategoryNames(categoryNames);
  };
  useEffect(() => {
    getProducts().then((products) => {
      setAllProducts(products);
      console.log("allProductsssssss", allProducts);
      console.log(":1");
      pageFunc();
    });
    getCategory().then((categories) => {
      setAllCategory(categories);
    });
  }, []);

  useEffect(() => {
    pageFunc();
  }, [allProducts]);

  useEffect(() => {
    setCategoryName();
  }, [allCategory]);

  useEffect(() => {
    console.log(":2");
    axios.get(`${BASE_URL}/products${howGet[filter]}`).then((res) => {
      setProductsArray(res.data);
      setPageNumber(1);
      pageFunc();
    });

    console.log("run");
  }, [categoryId]);

  useEffect(() => {
    console.log(":3");
    axios.get(`${BASE_URL}/products${howGet[filter]}`).then((res) => {
      setProductsArray(res.data);
      pageFunc();
      console.log("run");
    });
  }, [pageNumber, numberOfPage]);

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
  const handleChange = (event, value) => {
    setPageNumber(value);
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
                      `/products-list/?categoryId=${getCategoryIdByCategoryName(
                        text
                      )}`
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
      <Helmet>
        <title>
          {"گروه محصولات" + " | " + getCategoryNameByCategoryId(categoryId)}
        </title>
      </Helmet>
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
              href={`/products-list/?categoryId=${categoryId}`}
            >
              {getCategoryNameByCategoryId(categoryId) ? (
                getCategoryNameByCategoryId(categoryId) + ":"
              ) : (
                <div className={style.titleSkeleton}>
                  <SkeletonBlock
                    tag="p"
                    width="250px"
                    effect={"wave"}
                    borderRadius="20px"
                  />
                </div>
                // <Skeleton
                //   animation="wave"
                //   variant="rectangular"
                //   width={210}
                //   height={50}
                // />
              )}
            </a>
          </div>
          <div className={style.eachGroup}>
            {productsArray.length ? (
              productsArray.map((product, index) => {
                return (
                  <div className={style.eachCard} key={index}>
                    <CardComponent
                      product={product}
                      productUrl={`/product-details/?id=${product.id}`}
                      imageUrl={`http://localhost:3002${product.image[0]}`}
                    />
                  </div>
                );
              })
            ) : (
              <div className={style.skeletonCards}>
                <SkeletonCard /> <SkeletonCard /> <SkeletonCard />{" "}
                <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
              </div>
            )}
          </div>
        </div>
      </div>
      {productsArray.length ? (
        <div className={style.paginationPart}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme2}>
              <Stack spacing={2}>
                <Pagination
                  count={numberOfPage}
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

export { ProductsGroupLayout };
