import React from "react";
import style from "./Card.module.css";
import { colors } from "assets/colors";
import { CacheProvider } from "@emotion/react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

function CardComponent(props) {
  let { product, productUrl, imageUrl } = props;
  const navigate = useNavigate();
  return (
    <div
      className={style.eachCardDiv}
      onClick={() => {
        navigate(productUrl);
      }}
    >
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            maxWidth: 450,
            border: "none",
            padding: "1rem 1rem",
            height: "960px",
            position: "relative",
          }}
        >
          {/* <CardMedia
              component="img"
              sx={{
                bojectFit: "fill",
                borderRadius: "2rem",
                marginBottom: "1rem",
              }}
              height="auto"
              image={`http://localhost:3002${product.image[0]}`}
              alt="green iguana"
            /> */}

          <div
            className={style.cardImageContainer}
            style={{
              objectFit: "fill",
              height: "400px",
              width: "400px",
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
              src={imageUrl}
              alt="محصولات"
              className={style.imageCard}
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

            <div className={style.descriptionOfEachCard}>
              {product.description}
            </div>
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
                navigate(productUrl);
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

export { CardComponent };
