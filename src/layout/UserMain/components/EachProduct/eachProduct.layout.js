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
import TextField from "@mui/material/TextField";
import { getProducts } from "api/products.api";
import { getCategory } from "api/category.api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "assets/colors";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
/******************image magnify */
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

/********************** */
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function EachProductLayout(props) {
  let [param, setParam] = useSearchParams();
  let id = param.get("id");
  id = Number(id);
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let [numberOfGood, setNumberOfGood] = useState(1);

  let [productsArray, setProductsArray] = useState([]);

  // let [filter, setFilter] = useState("default");
  let [allProducts, setAllProducts] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [categoryNames, setCategoryNames] = useState([]);
  let [currentProduct, setCurrentProduct] = useState(null);

  const setCategoryName = () => {
    categoryNames = allCategory.map((category, index) => {
      return category.name;
    });

    setCategoryNames(categoryNames);
  };
  const handleChangeNumber = (e) => {
    setNumberOfGood(e.target.value);
  };

  useEffect(() => {
    getProducts().then((res) => {
      setAllProducts(res);
      console.log(allProducts);
    });
    getCategory().then((res) => {
      setAllCategory(res);
    });
  }, [id]);

  useEffect(() => {
    allProducts.map((product, index) => {
      if (product.id === id) {
        setCurrentProduct(product);
        console.log(product);
      }
    });
  }, [allProducts]);

  useEffect(() => {
    setCategoryName();
  }, [allCategory]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    <div className={style.productEachContainer}>
      {["left"].map((anchor) => (
        <div className={style.menu}>
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
        </div>
      ))}
      {currentProduct ? (
        <div className={style.productPart}>
          <div className={style.detailsProduct}>
            <div className={style.eachProductContainerImagePart}>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  // marginRight: "5rem",
                  width: "100%",
                  margin: "0 auto",
                  height: "auto",
                  borderRadius: "5rem",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide style={{ objectFit: "fill" }}>
                  {/* <img
                    className={style.imgOfSelfProduct}
                    src={`http://localhost:3002${currentProduct.image[0]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                    }}
                  /> */}

                  <InnerImageZoom
                    src={`http://localhost:3002${currentProduct.image[0]}`}
                    zoomSrc={`http://localhost:3002${currentProduct.image[0]}`}
                    zoomScale={2}
                    zoomType="hover"
                    height="100%"
                    width="100%"
                    className={style.innerZoom}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ objectFit: "fill" }}>
                  {/* <img
                    className={style.imgOfSelfProduct}
                    src={`http://localhost:3002${currentProduct.image[1]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                    }}
                  /> */}
                  <InnerImageZoom
                    src={`http://localhost:3002${currentProduct.image[1]}`}
                    zoomSrc={`http://localhost:3002${currentProduct.image[1]}`}
                    zoomScale={2}
                    zoomType="hover"
                    className={style.innerZoom}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ objectFit: "fill" }}>
                  {/* <img
                    className={style.imgOfSelfProduct}
                    src={`http://localhost:3002${currentProduct.image[2]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                    }}
                  /> */}
                  <InnerImageZoom
                    src={`http://localhost:3002${currentProduct.image[2]}`}
                    zoomSrc={`http://localhost:3002${currentProduct.image[2]}`}
                    zoomScale={2}
                    zoomType="hover"
                    className={style.innerZoom}
                  />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "fill",
                    cursor: "pointer",
                    borderRadius: "2rem",
                  }}
                >
                  <img
                    src={`http://localhost:3002${currentProduct.image[0]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                      borderRadius: "2rem",
                      border: "1px solid #D1D1D1",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "fill",
                    cursor: "pointer",
                    borderRadius: "2rem",
                  }}
                >
                  <img
                    src={`http://localhost:3002${currentProduct.image[1]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                      borderRadius: "2rem",
                      border: "1px solid #D1D1D1",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "fill",
                    cursor: "pointer",
                    borderRadius: "2rem",
                  }}
                >
                  <img
                    src={`http://localhost:3002${currentProduct.image[2]}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "inline-block",
                      borderRadius: "2rem",
                      border: "1px solid #D1D1D1",
                    }}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={style.eachProductContainerTextPart}>
              <div className={style.productName}>{currentProduct.name}</div>
              <div className={style.productCategory}>
                {getCategoryNameByCategoryId(currentProduct.categoryId)}
              </div>
              <div className={style.productPrice}>
                {currentProduct.price.toLocaleString("fa")} تومان
              </div>
              <div className={style.productBuying}>
                <div className={style.numberOfProductToBuy}>
                  <label
                    forHtml="outlined-number"
                    className={style.countBuying}
                  >
                    تعداد :
                  </label>
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        value={numberOfGood}
                        onChangeCapture={handleChangeNumber}
                        id="outlined-number"
                        label="Number"
                        type="number"
                        sx={{
                          border: `3px solid ${colors.primary}`,
                          borderRadius: "1rem",
                          width: "20rem",
                          "&:focus": {
                            ouline: "none",
                          },
                        }}
                        label=""
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </ThemeProvider>
                  </CacheProvider>
                </div>
                <div className={style.buyBtn}>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      sx={{
                        width: "40rem",
                        height: "6rem",
                        borderRadius: "2rem",
                        "&:hover": {
                          backgroundColor: colors.ligthPrimary,
                        },
                        boxShadow: "5px 5px 8px 0 rgba(0,0,0,0.6)",
                      }}
                    >
                      افزودن به سبد خرید
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </div>
          <div className={style.tabProduct}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label="توضیحات"
                        {...a11yProps(0)}
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                      />
                      <Tab
                        label="دیدگاه ها"
                        {...a11yProps(1)}
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                      />
                      <Tab
                        label="پرسش ها"
                        {...a11yProps(2)}
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} sx={{ padding: "3rem 0" }}>
                    <div className={style.descriptionText}>
                      {currentProduct.description}
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1} sx={{ padding: "3rem 0" }}>
                    <div className={style.descriptionText}>
                      دیدگاهی وجود ندارد
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2} sx={{ padding: "3rem 0" }}>
                    <div className={style.descriptionText}>
                      پرسشی وجود ندارد
                    </div>
                  </TabPanel>
                </Box>
              </ThemeProvider>
            </CacheProvider>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={style.similarProducts}>
        <div className={style.similarProductsTitle}>محصولات مشابه</div>
        <div className={style.productsSlider}>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: false,
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{
              margin: "0 auto",
              width: "90vw",
              paddingRight: "5rem",
            }}
          >
            {allProducts && currentProduct ? (
              allProducts.map((product, index) => {
                if (currentProduct.categoryId === product.categoryId) {
                  return (
                    <SwiperSlide style={{ height: "auto" }} key={index}>
                      <ThemeProvider theme={theme}>
                        <Card
                          sx={{
                            height: "640px",
                            position: "relative",
                            maxWidth: 350,
                            border: "none",
                            padding: "1rem 1rem",

                            cursor: "pointer",
                            borderRadius: "2rem",
                            transition: "0.8s",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <div
                            className={style.imgaeProductSliderContainer}
                            style={{
                              objectFit: "fill",
                              height: "300px",
                              width: "300px",
                              textAlign: "center",
                              padding: 0,
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "inline-block",
                                marginRight: "1.5rem",
                              }}
                              src={`http://localhost:3002${product.image[0]}`}
                              alt="محصولات"
                              className={style.imgaeProductSlider}
                            />
                          </div>

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

                            <div className={style.priceOfEachCard}>
                              {product.price.toLocaleString("fa")} تومان
                            </div>
                          </CardContent>
                          <CardActions
                            sx={{
                              marginBottom: "2rem",
                              position: "absolute",
                              bottom: "2rem",
                            }}
                          >
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
                    </SwiperSlide>
                  );
                }
              })
            ) : (
              <></>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export { EachProductLayout };
// {`http://localhost:3002${currentProduct.image[0]}`}
