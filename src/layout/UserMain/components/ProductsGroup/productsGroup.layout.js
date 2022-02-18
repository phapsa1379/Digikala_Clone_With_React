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

function ProductsGroupLayout() {
  let navigate = useNavigate();
  let [param, setParam] = useSearchParams();
  let categoryId = param.get("categoryId");
  categoryId = Number(categoryId);

  let [allProducts, setAllProducts] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [categoryNames, setCategoryNames] = useState([]);
  useEffect(() => {
    getProducts().then((allProducts) => {
      setAllProducts(allProducts);
    });
    getCategory().then((allCategory) => {
      setAllCategory(allCategory);
      categoryNames = allCategory.map((category, index) => {
        return category.name;
      });
      setCategoryNames(categoryNames);
    });
  }, []);

  const getCategoryNameByCategoryId = (id) => {
    for (let i = 0; i < allCategory.length; i++) {
      if (allCategory[i].id === id) return allCategory[i].name;
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
          {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
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
              href={`/products-list/?categoryId=${categoryId}`}
              // onClick={() => {
              //   let categoryId = category.id;
              //   setParam({ categoryId });
              // }}
            >
              {getCategoryNameByCategoryId(categoryId) + ":"}
            </a>
          </div>
          <div className={style.eachGroup}>
            {allProducts.map((product, index) => {
              if (categoryId === product.categoryId) {
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
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductsGroupLayout };
