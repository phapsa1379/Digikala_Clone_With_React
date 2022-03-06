import React, { useState, useEffect } from "react";
import style from "./Cart.module.css";
import { UserHeaderLayout } from "layout";
import { colors } from "assets/colors";
import { TableComponent } from "components";
import { useNavigate } from "react-router-dom";
/*************Dialog Component material-ui************ */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
/*******************Theme and Rtl material-ui********************* */
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
/***************Button material-ui********************** */
import Button from "@mui/material/Button";
/****************************************************** */
/***************Redux Hooks*********** */
import { useSelector, useDispatch } from "react-redux";
/************Actions*************** */
import { setNumberOfProductsInBasket } from "redux/actions";
/************Helmet****************** */
import { Helmet } from "react-helmet";
/****************************************** */

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const dialogTheme = createTheme({
  multilineColor: {
    color: "red",
  },
  direction: "rtl",
  typography: {
    fontFamily: "vazir",
    fontSize: 35,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

let titleArray = ["id", "کالا", "قیمت", "تعداد", "عملیات"];

function CartPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [productsInBasket, setProductsInBasket] = useState([]);
  let [basket, setBasket] = useState([]);
  let [data, setData] = useState([]);
  let [itemId, setItemId] = useState(null);
  let [showDialog, setShowDialog] = useState(false);
  let dataArray = [];
  useEffect(() => {
    let localStorageBasket = JSON.parse(localStorage.getItem("basket"));

    if (!localStorageBasket) {
      localStorageBasket = {};
      localStorageBasket.basketProducts = [];
      localStorageBasket.numberOfProductsInBasket = 0;
      localStorageBasket.sumPrices = 0;
    }
    setBasket(localStorageBasket);
    setProductsInBasket(localStorageBasket.basketProducts);
  }, []);
  useEffect(() => {
    console.log(productsInBasket);
    let length = productsInBasket.length;
    dataArray = [];

    for (let i = 0; i < length; i++) {
      dataArray[i] = [];
    }

    for (let index = 0; index < length; index++) {
      for (let property in productsInBasket[index]) {
        if (property === "id") {
          dataArray[index][0] = productsInBasket[index][property];
        } else if (property === "name") {
          dataArray[index][1] = productsInBasket[index][property];
          // console.log("in for:",  dataArray);
        } else if (property === "totalPriceOfThisProduct") {
          dataArray[index][2] = productsInBasket[index][property];
        } else if (property === "number") {
          dataArray[index][3] = productsInBasket[index][property];
        }

        dataArray[index][4] = "حذف";
      }
    }
    setData(dataArray);
  }, [productsInBasket]);
  useEffect(() => {
    console.log("2");
    localStorage.setItem("basket", JSON.stringify(basket));
    dispatch(setNumberOfProductsInBasket(basket.numberOfProductsInBasket));
  }, [basket]);
  const getDataFromTable = () => {};
  const buyBtnHandler = () => {
    navigate("/finalize-purchase");
  };
  const handleClose = () => {
    setShowDialog(false);
  };
  const deleteConfirmHandler = () => {
    handleClose();
    basket.basketProducts.map((item, index) => {
      if (item.id === itemId) {
        basket.basketProducts.splice(index, 1);
        basket.numberOfProductsInBasket -= item.number;
        basket.sumPrices -= item.totalPriceOfThisProduct;
      }
    });
    console.log("1");
    setBasket({ ...basket });
    console.log(basket);
    setProductsInBasket([...basket.basketProducts]);

    console.log("3");
  };
  return (
    <div className={style.CartPage}>
      <Helmet>
        <title>سبد خرید</title>
      </Helmet>
      <div className={style.header}>
        <UserHeaderLayout />
      </div>
      {productsInBasket.length !== 0 ? (
        <div className={style.mainPart}>
          <div className={style.title}>سبد خرید</div>
          <div className={style.tableContainer}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={data}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, true, false, false, true]}
              doubleClickable={[false, false, false, false, false]}
              img={[false, false, false, false, false]}
              priceType={[false, false, true, false, false]}
              inputType="number"
              input={[false, false, false, false, false, false]}
              hiddenColumn={"id"}
              clickFunc={(text, productId) => {
                setItemId(productId);
                if (text === "حذف") {
                  // setState({ ...state, showDialog: true });
                  setShowDialog(true);
                } else {
                  navigate(`/product-details/?id=${productId}`);
                }

                // return (
                //   <Navigate
                //     to={`/product-details/?id=${orderId}`}
                //     replace={true}
                //   />
                // );
              }}
              doubleClickFunc={null}
              checkChangeFlag={false}
              eventIsDone={false}
              getDataFromTable={getDataFromTable}
            />
          </div>
          <div className={style.sumAndBuy}>
            <div className={style.buyingBtn} onClick={buyBtnHandler}>
              نهایی کردن سبد خرید
            </div>
            <div className={style.sumPrices}>
              قیمت کل :
              {basket.sumPrices
                ? basket.sumPrices.toLocaleString("fa") + " تومان"
                : null}
            </div>
          </div>
          <div className={style.confirmDialog}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={dialogTheme}>
                <Dialog
                  open={showDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    sx={{ color: colors.primary, fontSize: "3rem" }}
                    id="alert-dialog-title"
                  >
                    {"حذف کالا"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      آیا از حذف این کالا از سبد خرید اطمینان دارید؟
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>لغو</Button>
                    <Button onClick={deleteConfirmHandler} autoFocus>
                      تایید
                    </Button>
                  </DialogActions>
                </Dialog>
              </ThemeProvider>
            </CacheProvider>
          </div>
        </div>
      ) : (
        <div className={style.mainPart2}>
          <div className={style.title}> سبد خرید شما خالی است 🙁</div>
        </div>
      )}
    </div>
  );
}

export { CartPage };
