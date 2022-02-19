import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import video from "assets/videos/background.mp4";
import digikalaIcon from "assets/icons/favicon.svg";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, touchRippleClasses } from "@mui/material";
import CarouselSlide from "react-material-ui-carousel";

import { colors } from "assets/colors";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { s1, s2, s3, s4, s5 } from "assets/images";
import { getProducts } from "api/products.api";
import { getCategory } from "api/category.api";
import { useSearchParams, useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

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

// class HomeLayout extends React.Component {
const HomeLayout = (props) => {
  let navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const [param, setParam] = useSearchParams();

  useEffect(() => {
    getProducts().then((allProducts) => {
      setAllProducts(allProducts);
      console.log(allProducts);
      getCategory().then((allCategory) => {
        setAllCategory(allCategory);
      });
    });
  }, []);

  const pictures = [
    { image: s1, title: "Iu 1" },
    { image: s2, title: "Iu 2" },
    { image: s3, title: "Iu 3" },
    { image: s4, title: "Iu 4" },
    { image: s5, title: "Iu 5" },
  ];
  let numberOfShowingProductsOfEachCategory = 6;
  return (
    <div className={style.homeContainer}>
      <div
        className={`${style.videoBackgroundContainer}  ${style.scrollChild} scrollChild`}
      >
        <video
          className={`${style.videoBackground}`}
          autoPlay="autoplay"
          loop="loop"
          muted
          // ref={video}
          id="video-id"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={style.cover}>
          <div className={style.coverTitle}>
            <div className={style.titleText}>همین الان مطمئن خرید کن</div>
            <div className={style.titleIcon}>
              {" "}
              <img
                src={digikalaIcon}
                alt="digikala"
                className={style.titleIconImg}
              />
            </div>
          </div>

          <div className={style.appleBtn}>محصولات اپل</div>
        </div>
      </div>
      <div
        // style={{ backgroundColor: "green" }}
        className={`${style.slideShow} ${style.scrollChild} scrollChild`}
      >
        <Carousel
          sx={{ height: "60%", width: "80%" }}
          navButtonsAlwaysVisible={true}
        >
          {pictures.map(({ image, title }) => (
            <CarouselSlide key={image}>
              <Card>
                <CardMedia
                  image={image}
                  title={title}
                  style={{
                    height: `60vh`,
                    borderRadius: "1rem",
                  }}
                />
                <CardContent>
                  {/* <Typography>{title}</Typography> */}
                </CardContent>
              </Card>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
      <div className={style.productsSlider}>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: false,
          }}
          autoplay={true}
          navigation={true}
          pagination={false}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{
            margin: "0 auto",
            width: "90vw",
            paddingRight: "5rem",
            borderRadius: "2rem",
          }}
        >
          {allProducts.map((product, index) => {
            return (
              <SwiperSlide>
                <ThemeProvider theme={theme}>
                  <Card
                    sx={{
                      maxWidth: 350,
                      border: "none",
                      padding: "1rem 1rem",
                      height: "100%!important",
                      cursor: "pointer",
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div
        className={`${style.productsGroup} ${style.productsGroup1} ${style.scrollChild} scrollChild`}
      >
        {allCategory ? (
          allCategory.map((category, index) => {
            let counter = 0;
            return (
              <div className={style.groupContainer}>
                <div className={style.eachGroupTitle}>
                  <a
                    className={style.eachGroupTitleLink}
                    href={`/products-list/?categoryId=${category.id}`}
                    // onClick={() => {
                    //   let categoryId = category.id;
                    //   setParam({ categoryId });
                    // }}
                  >
                    {category.name + ":"}
                  </a>
                </div>
                <div className={style.eachGroup}>
                  {allProducts.map((product, index) => {
                    if (
                      category.id === product.categoryId &&
                      counter < numberOfShowingProductsOfEachCategory
                    ) {
                      counter++;
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
                              {/* <div className={style.cardImageContainer}>
                                    <img
                                      className={style.imageCard}
                                      src={`http://localhost:3002${product.image[0]}`}
                                      alt={`${category.name}`}
                                    />
                                  </div> */}
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
                      );
                    }
                  })}
                </div>
                <div className={style.moreBtnContainer}>
                  <a href={`/products-list/?categoryId=${category.id}`}>
                    <div
                      className={style.moreBtnGroup}
                      // onClick={() => {
                      //   let categoryId = category.id;
                      //   setParam({ categoryId });
                      // }}
                    >
                      مشاهده محصولات بیشتر ...
                    </div>
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
  // }
};

export { HomeLayout };
