import React from "react";
import style from "./404.module.css";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { colors } from "assets/colors";
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

function NotFoundPage(props) {
  let navigate = useNavigate();
  return (
    <div className={style.notFoundPage}>
      <div className={style.title}>صفحه مورد‌نظر پیدا نشد :(</div>
      <div className={style.homeButton}>
        <ThemeProvider theme={theme}>
          <Button
            onClick={(e) => {
              return navigate("/", { replace: true });
            }}
            variant="contained"
            link="/"
            sx={{
              color: colors.white,
              backgroundColor: colors.ligthPrimary,
              borderRadius: "1rem",
              width: "20rem",
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
            بازگشت به خانه
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

export { NotFoundPage };
