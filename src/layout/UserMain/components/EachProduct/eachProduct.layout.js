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
import { getProducts, putProducts } from "api/products.api";
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
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
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
/*************Helmet********************* */
import { Helmet } from "react-helmet";

/*********Share Product********* */
import {
  EmailShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PocketShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
/************Swal***************** */
import swal from "sweetalert";
/*****Toastify *****/
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/***************Redux Hooks*********** */
import { useSelector, useDispatch } from "react-redux";
/************Actions*************** */
import { setNumberOfProductsInBasket } from "redux/actions";
/************************************* */
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
/********************Skeleton************************* */
import { SkeletonImage } from "skeleton-elements/react";
import { SkeletonBlock } from "skeleton-elements/react";
// import "./styles.css";
import "skeleton-elements/css";
/******************Images****************** */
import { userComment } from "assets/images";
/*****************Jalali moment****************** */
import moment from "jalali-moment";
/******************************************** */
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
const shareTheme = createTheme({
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
  // let numberOfProductsInBasketRedux = useSelector(
  //   (state) => state.numberOfProductsInBasketState.numberOfProductsInBasket
  // );

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser = currentUser ? currentUser.user : {};

  const [star, setStar] = useState(0);
  const [value, setValue] = React.useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let [numberOfGood, setNumberOfGood] = useState(1);

  let [productsArray, setProductsArray] = useState([]);

  // let [filter, setFilter] = useState("default");
  let [allProducts, setAllProducts] = useState([]);
  let [allCategory, setAllCategory] = useState([]);
  let [categoryNames, setCategoryNames] = useState([]);
  let [currentProduct, setCurrentProduct] = useState(null);
  let [basket, setBasket] = useState({});
  let [currentURL, setCurrentURL] = useState(null);

  const setCategoryName = () => {
    categoryNames = allCategory.map((category, index) => {
      return category.name;
    });

    setCategoryNames(categoryNames);
  };

  function productHandleClick(event) {
    event.preventDefault();
    navigate("/");
  }
  function submitCommentHandler(e) {
    e.preventDefault();
    // let currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
    if (e.target[0].value && e.target[1].value) {
      if (!star) {
        swal({
          title: "توجه!",
          text: "به کالا از 1 تا 5 امتیاز دهید ⭐",
          icon: "warning",
        });
      } else {
        let currentDate =
          new Date().getFullYear() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getDate();
        currentDate = moment(currentDate, "YYYY/MM/DD")
          .locale("fa")
          .format("YYYY/MM/DD");
        currentProduct.sumRate = +currentProduct.sumRate + Number(star);
        currentProduct.rateNumber += 1;
        let comment = {
          productId: currentProduct.id,
          userId: currentUser.id,
          username: currentUser.username,
          comment: e.target[1].value,
          titleComment: e.target[0].value,
          star: star,
          date: currentDate,
          id: +(String(currentProduct.id) + String(currentUser.id)),
        };
        currentProduct.comments.unshift(comment);

        putProducts(currentProduct.id, currentProduct)
          .then((response) => {
            console.log(response.data);
            toast.success("دیدگاه شما با موفقیت ثبت شد.", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setCurrentProduct({ ...currentProduct });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      swal({
        title: "توجه!",
        text: "لطفا تمامی فیلد ها را پر کنید",
        icon: "warning",
      });
    }
  }
  function categoryHandleClick(event) {
    event.preventDefault();
    navigate(`/products-list/?categoryId=${currentProduct.categoryId}`);
  }
  const dispatch = useDispatch();
  const handleChangeNumber = (e) => {
    if (e.target.value < 1) {
      swal({
        title: "خطا",
        text: `تعداد محصول نمی‌تواند کمتر از یک باشد.`,
        icon: "error",
      });
    } else if (e.target.value <= currentProduct.count) {
      setNumberOfGood(e.target.value);
    } else {
      swal({
        title: "خطا",
        text: `از این محصول فقط به تعداد ${currentProduct.count} عدد در انبار موجود است.`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getProducts().then((res) => {
      setAllProducts(res);
      //console.log(allProducts);
    });
    getCategory().then((res) => {
      setAllCategory(res);
    });
    setCurrentURL(window.location.href);
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

  useEffect(() => {
    dispatch(setNumberOfProductsInBasket(basket.numberOfProductsInBasket));
  }, [basket.numberOfProductsInBasket]);

  const actions = [
    {
      key: "telegram",
      icon: (
        <TelegramShareButton url={currentURL}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
      ),
      name: "تلگرام",
    },
    {
      key: "whatsapp",
      icon: (
        <WhatsappShareButton url={currentURL}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      ),
      name: "واتس اپ",
    },
    {
      key: "twitter",
      icon: (
        <TwitterShareButton url={currentURL}>
          {" "}
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
      ),
      name: "توییتر",
    },
    {
      key: "email",
      icon: (
        <EmailShareButton url={currentURL}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      ),
      name: "ایمیل",
    },
  ];
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
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={`${BASE_URL}/`}
      onClick={productHandleClick}
    >
      محصولات
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
      onClick={categoryHandleClick}
    >
      {currentProduct
        ? getCategoryNameByCategoryId(currentProduct.categoryId)
        : ""}
    </Link>,
    <Typography key="3" color="text.primary">
      {currentProduct ? currentProduct.name : ""}
    </Typography>,
  ];

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
      <Helmet>
        <title>
          {currentProduct
            ? getCategoryNameByCategoryId(currentProduct.categoryId) +
              " | " +
              currentProduct.name
            : ""}
        </title>
      </Helmet>
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
      <div className={style.path}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Breadcrumbs
                separator={
                  <NavigateBeforeIcon
                    fontSize="large"
                    // sx={{ color: colors.primary }}
                  />
                }
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </ThemeProvider>
        </CacheProvider>
      </div>
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
                      onClick={(e) => {
                        basket = JSON.parse(localStorage.getItem("basket"));
                        if (!basket) {
                          basket = {};
                          basket.basketProducts = [];
                          basket.numberOfProductsInBasket = 0;
                          basket.sumPrices = 0;
                        }
                        setBasket(basket);

                        let existFlag = false;
                        let processStatus = true;
                        numberOfGood = Number(numberOfGood);

                        basket.basketProducts.map((item) => {
                          if (item.id === currentProduct.id) {
                            existFlag = true;
                            item.number += numberOfGood;
                            if (item.number <= currentProduct.count) {
                              basket.numberOfProductsInBasket += numberOfGood;

                              item.totalPriceOfThisProduct +=
                                currentProduct.price * numberOfGood;
                              basket.sumPrices +=
                                currentProduct.price * numberOfGood;
                            } else {
                              processStatus = false;
                              swal({
                                title: "خطا",
                                text: `از این محصول فقط به تعداد ${currentProduct.count} عدد در انبار موجود است. تعداد مورد درخواستی شما بیش از موجودی است!`,
                                icon: "error",
                              });
                            }
                          }
                        });
                        if (!existFlag) {
                          basket.numberOfProductsInBasket =
                            Number(basket.numberOfProductsInBasket) +
                            Number(numberOfGood);

                          let basketProduct = { ...currentProduct };
                          basketProduct.number = Number(numberOfGood);
                          basketProduct.totalPriceOfThisProduct =
                            Number(currentProduct.price) * Number(numberOfGood);
                          basket.basketProducts.push(basketProduct);
                          basket.sumPrices +=
                            basketProduct.totalPriceOfThisProduct;
                        }

                        // basket.basketProducts = [
                        //   ...basket.basketProducts,
                        //   { ...basketProduct },
                        // ];
                        if (processStatus) {
                          setBasket(basket);
                          // console.log(basket);
                          localStorage.setItem(
                            "basket",
                            JSON.stringify(basket)
                          );
                          toast.success(
                            "محصول با موفقیت به سبد خرید شما اضافه شد.",
                            {
                              position: "bottom-left",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            }
                          );
                        }
                      }}
                    >
                      افزودن به سبد خرید
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
            </div>
            <div className={style.sideTools}>
              <div className={style.shareProduct}>
                <CacheProvider value={cacheRtl}>
                  <ThemeProvider theme={shareTheme}>
                    <Box
                      sx={{
                        // height: "auto",
                        height: "200px",
                        transform: "translateZ(0px)",

                        backgroundColor: "#000",
                      }}
                    >
                      <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{
                          position: "absolute",
                          top: "12rem",
                          right: "-10rem",
                        }}
                        icon={<ShareIcon />}
                        direction="down"
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.key}
                            icon={action.icon}
                            tooltipTitle={action.name}
                          />
                        ))}
                      </SpeedDial>
                    </Box>
                  </ThemeProvider>
                </CacheProvider>
              </div>
            </div>
          </div>
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
                        label="مشخصات کالا"
                        {...a11yProps(1)}
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                      />
                      <Tab
                        label="دیدگاه ها"
                        {...a11yProps(2)}
                        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
                      />
                      <Tab
                        label="پرسش ها"
                        {...a11yProps(3)}
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
                    <div className={style.property}>مشخصات کالا</div>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    // sx={{ backgroundColor: colors.bgColor }}
                    index={2}
                    sx={{ padding: "3rem 0" }}
                  >
                    <div className={style.commentPart}>
                      {localStorage.getItem("isLoggedIn") ? (
                        currentProduct.comments.some((comment) => {
                          console.log(currentUser.id);
                          return comment.userId === currentUser.id;
                        }) ? (
                          <div className={style.alreadyComment}>
                            شما قبلا نظر خود را راجع به این کالا ثبت کرده اید 😉
                          </div>
                        ) : (
                          <div className={style.showCommentPart}>
                            <div className={style.titleCommentText}>
                              ثبت دیدگاه
                            </div>
                            <form
                              className={style.commentForm}
                              onSubmit={submitCommentHandler}
                            >
                              <input
                                type="text"
                                name="title"
                                placeholder="عنوان دیدگاه"
                                className={style.titleCommentInput}
                              />
                              <textarea
                                placeholder="دیدگاه خود را بنویسید ..."
                                className={style.explainComment}
                              ></textarea>
                              <div className={style.bottomCommentPart}>
                                <div className={style.starPart}>
                                  <div className={style.starTitle}>
                                    امتیاز دادن به کالا :{" "}
                                  </div>
                                  <Stack spacing={1} sx={{ direction: "ltr" }}>
                                    <Rating
                                      sx={{ direction: "ltr" }}
                                      name="size-medium"
                                      defaultValue={0}
                                      size="large"
                                      onChange={(e) => {
                                        setStar(e.target.value);
                                      }}
                                    />
                                  </Stack>
                                </div>
                                <button
                                  className={style.commentSubmitBtn}
                                  type="submit"
                                >
                                  ثبت دیدگاه
                                </button>
                              </div>
                            </form>
                          </div>
                        )
                      ) : (
                        <div className={style.unShowCommentPart}>
                          <div className={style.unShowCommentPartText}>
                            برای ثبت دیدگاه باید وارد حساب کاربری خود شوید
                          </div>
                          <div
                            className={style.unShowCommentPartButton}
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            ورود
                          </div>
                        </div>
                      )}
                      <div className={style.commentList}>
                        {currentProduct ? (
                          currentProduct.comments.length ? (
                            <div className={style.userCommentsTitle}>
                              سایر نظرات
                            </div>
                          ) : (
                            <div className={style.noComment}>
                              تاکنون هیچ نظری ثبت نشده است 🥲
                            </div>
                          )
                        ) : (
                          ""
                        )}
                        <ul className={style.commentUl}>
                          {currentProduct
                            ? currentProduct.comments.map((comment) => (
                                <li
                                  className={style.commentLi}
                                  key={comment.id}
                                >
                                  <div className={style.headerComment}>
                                    <div
                                      className={style.commentUserIconContainer}
                                    >
                                      <img
                                        className={style.commentUserIcon}
                                        src={userComment}
                                        alt="userIcon"
                                      />
                                    </div>
                                    <div className={style.commentUserName}>
                                      {comment.username === currentUser.username
                                        ? "شما"
                                        : comment.username + "@"}
                                    </div>
                                    <div className={style.commentDate}>
                                      {comment.date}
                                    </div>
                                  </div>
                                  <div className={style.commentTitle}>
                                    {comment.titleComment}
                                  </div>
                                  <div className={style.commentExplain}>
                                    {comment.comment}
                                  </div>
                                  <div className={style.commentStar}>
                                    <div className={style.textStar}>
                                      امتیاز داده شده به کالا :{" "}
                                    </div>
                                    <Rating
                                      name="size-small"
                                      defaultValue={comment.star}
                                      size="small"
                                      readOnly
                                    />
                                  </div>
                                </li>
                              ))
                            : ""}
                        </ul>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3} sx={{ padding: "3rem 0" }}>
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
        <div className={style.skeletonMode}>
          <div className={style.skeletonImagePart}>
            <SkeletonImage
              effect={"wave"}
              width="630"
              height="630"
              borderRadius="20px"
            />
          </div>
          <div className={style.skeletonTextPart}>
            <SkeletonBlock
              tag="p"
              height="40px"
              width="500px"
              effect={"wave"}
              borderRadius="20px"
            />
            <SkeletonBlock
              tag="p"
              height="40px"
              width="300px"
              effect={"wave"}
              borderRadius="20px"
            />
            <SkeletonBlock
              tag="p"
              height="40px"
              width="250px"
              effect={"wave"}
              borderRadius="20px"
            />
            <SkeletonBlock
              tag="p"
              height="40px"
              width="200px"
              effect={"wave"}
              borderRadius="20px"
            />
          </div>
        </div>
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
                      <div
                        className={style.eachCardDiv}
                        onClick={() => {
                          navigate(`/product-details/?id=${product.id}`);
                        }}
                      >
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
                                  navigate(
                                    `/product-details/?id=${product.id}`
                                  );
                                }}
                              >
                                بیشتر...
                              </Button>
                            </CardActions>
                          </Card>
                        </ThemeProvider>
                      </div>
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
