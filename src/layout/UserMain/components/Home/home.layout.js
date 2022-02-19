import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import video from "assets/videos/background.mp4";
import digikalaIcon from "assets/icons/favicon.svg";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, touchRippleClasses } from "@mui/material";
import CarouselSlide from "react-material-ui-carousel";
// import Card2 from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
import "uikit/dist/css/uikit-core-rtl.css";
import "uikit/dist/js/uikit-icons.min.js";
import "uikit/dist/js/uikit.min.js";
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

  // componentDidMount() {
  //   getProducts().then((allProducts) => {
  //     this.setState({ allProducts });
  //     console.log(allProducts);
  //     getCategory().then((allCategory) => {
  //       this.setState({ allCategory });
  //     });
  //   });
  // }

 


//Scorolling
  // const init = function () {
  //   let items = document.querySelectorAll(".scrollChild");
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].style.minHeight = "100vh";
  //   }
  // };
  // init();
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
          // NavButton={{
          //   style: {
          //     margin: "0 10px",
          //     position: "relative",
          //     backgroundColor: "#494949",
          //     top: "calc(50% - 20px) !important",
          //     color: "white",
          //     fontSize: "30px",
          //     transition: "200ms",
          //     cursor: "pointer",
          //     "&:hover": {
          //       opacity: "0.6 !important",
          //     },
          //   },
          // }}
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

      <div
        // data-aos="flip-right"
        // style={{ backgroundColor: "red" }}
        className={`${style.sliders} ${style.scrollChild} scrollChild`}
      >
        <div
          class="uk-position-relative uk-visible-toggle uk-light"
          tabindex="-1"
          uk-slideshow="animation: push"
        >
          <ul
            style={{ width: "100%", height: "100%", margin: "0 auto" }}
            class="ul uk-slideshow-items"
          >
            <li class="li">
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="scale: 1.2,1.2,1"
              >
                <img
                  style={{ height: "100vh" }}
                  class="img"
                  src={s1}
                  alt=""
                  uk-cover
                />
              </div>
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"
              ></div>
              <div class="uk-position-center uk-position-medium uk-text-center">
                <div uk-slideshow-parallax="scale: 1,1,0.8">
                  <h2
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "4rem",
                    }}
                    class="h2"
                    uk-slideshow-parallax="x: 200,0,0"
                  >
                    تا 70% تخفیف
                  </h2>
                  <p
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "2rem",
                    }}
                    class="p"
                    uk-slideshow-parallax="x: 400,0,0;"
                  >
                    همین الان خرید کن
                  </p>
                </div>
              </div>
            </li>
            <li class="li">
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="scale: 1.2,1.2,1"
              >
                <img
                  style={{ height: "100vh" }}
                  class="img"
                  src={s2}
                  alt=""
                  uk-cover
                />
              </div>
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"
              ></div>
              <div class="uk-position-center uk-position-medium uk-text-center">
                <div uk-slideshow-parallax="scale: 1,1,0.8">
                  <h2
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "4rem",
                    }}
                    class="h2"
                    uk-slideshow-parallax="x: 200,0,0"
                  >
                    تا 70% تخفیف
                  </h2>
                  <p
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "2rem",
                    }}
                    class="p"
                    uk-slideshow-parallax="x: 400,0,0;"
                  >
                    همین الان خرید کن
                  </p>
                </div>
              </div>
            </li>{" "}
            <li class="li">
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="scale: 1.2,1.2,1"
              >
                <img
                  style={{ height: "100vh" }}
                  class="img"
                  src={s4}
                  alt=""
                  uk-cover
                />
              </div>
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"
              ></div>
              <div class="uk-position-center uk-position-medium uk-text-center">
                <div uk-slideshow-parallax="scale: 1,1,0.8">
                  <h2
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "4rem",
                    }}
                    class="h2"
                    uk-slideshow-parallax="x: 200,0,0"
                  >
                    تا 70% تخفیف
                  </h2>
                  <p
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "2rem",
                    }}
                    class="p"
                    uk-slideshow-parallax="x: 400,0,0;"
                  >
                    همین الان خرید کن
                  </p>
                </div>
              </div>
            </li>{" "}
            <li class="li">
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="scale: 1.2,1.2,1"
              >
                <img
                  style={{ height: "100vh" }}
                  class="img"
                  src={s5}
                  alt=""
                  uk-cover
                />
              </div>
              <div
                class="uk-position-cover"
                uk-slideshow-parallax="opacity: 0,0,0.2; backgroundColor: #000,#000"
              ></div>
              <div class="uk-position-center uk-position-medium uk-text-center">
                <div uk-slideshow-parallax="scale: 1,1,0.8">
                  <h2
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "4rem",
                    }}
                    class="h2"
                    uk-slideshow-parallax="x: 200,0,0"
                  >
                    تا 70% تخفیف
                  </h2>
                  <p
                    style={{
                      color: colors.primary,
                      fontFamily: "vazir",
                      fontSize: "2rem",
                    }}
                    class="p"
                    uk-slideshow-parallax="x: 400,0,0;"
                  >
                    همین الان خرید کن
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <a
            class="uk-position-center-left uk-position-small uk-hidden-hover"
            href="#"
            uk-slidenav-previous
            uk-slideshow-item="previous"
          ></a>
          <a
            class="uk-position-center-right uk-position-small uk-hidden-hover"
            href="#"
            uk-slidenav-next
            uk-slideshow-item="next"
          ></a>
        </div>
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
