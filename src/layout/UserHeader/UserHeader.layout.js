import React from "react";
import style from "./UserHeader.module.css";
import { digikalaLogo } from "assets/icons";
import { BiSearch, FaShoppingCart, FaUser, FiMenu } from "assets/icons/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { colors } from "assets/colors";
import { useSearchParams, useNavigate } from "react-router-dom";
/*************React-Redux-Hooks****************** */
import { useDispatch, useSelector } from "react-redux";
/*****************Prop Types and Props Default********************************** */
import PropTypes from "prop-types";
/***************api************************ */
import { postOrders } from "api/orders.api";
const navBar2 = React.createRef();
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
const handleClickMenu = () => {
  navBar2.current.style.display === "flex"
    ? (navBar2.current.style.display = "none")
    : (navBar2.current.style.display = "flex");
};

const UserHeaderLayout = (props) => {
  // let [param, setParam] = useSearchParams();
  // let id = Number(param.get("id"));
  let result = props.result;

  let numberOfProductsInBasketRedux = useSelector(
    (state) => state.numberOfProductsInBasketState.numberOfProductsInBasket
  );

  let [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket"))
      ? JSON.parse(localStorage.getItem("basket"))
      : {}
  );

  // console.log("number:", basket.numberOfProductsInBasket);
  let [numberOfProductsInBasket, setNumberOfProductsInBasket] = useState(
    basket.numberOfProductsInBasket ? basket.numberOfProductsInBasket : 0
  );
  useEffect(() => {
    if (JSON.stringify(basket) !== "{}" && basket !== null) {
      setNumberOfProductsInBasket(basket.numberOfProductsInBasket);
    } else {
      setNumberOfProductsInBasket(0);
    }
  }, [basket]);
  useEffect(() => {
    // console.log("redux", numberOfProductsInBasketRedux);
    setBasket(
      JSON.parse(localStorage.getItem("basket"))
        ? JSON.parse(localStorage.getItem("basket"))
        : {}
    );
  }, [numberOfProductsInBasketRedux]);

  const [login, setLogin] = useState(false);
  useEffect(() => {
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    isLoggedIn = JSON.parse(isLoggedIn);
    // if (currentUser)
    //   if (currentUser.userName !== null && currentUser.userName !== undefined) {
    //     setLogin(true);
    //   }
    if (isLoggedIn === true) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    if (props.result === "success") {
      //post request to server.........
      let currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
      let currentOrder = {};
      currentOrder.name =
        currentCustomer.firstName + " " + currentCustomer.lastName;
      currentOrder.phoneNumber = currentCustomer.phone;
      currentOrder.address = currentCustomer.address;
      currentOrder.orderDate = currentCustomer.date;
      currentOrder.deliveryDate = "null";
      currentOrder.registerationDate = currentCustomer.registerationDate;
      currentOrder.totalPrice = basket.sumPrices;
      currentOrder.buyingProducts = [];
      basket.basketProducts.forEach((product) => {
        currentOrder.buyingProducts.push({
          id: product.id,
          price: product.price, //price of each product
          number: product.number,
        });
      });
      postOrders(currentOrder).then(() => {
        basket = {};
        basket.basketProducts = [];
        basket.numberOfProductsInBasket = 0;
        basket.sumPrices = 0;

        localStorage.setItem("basket", JSON.stringify(basket));
        localStorage.setItem("currentCustomer", JSON.stringify({}));
      });
      /************************** */
    }
  }, [props.result]);
  return (
    <header className={style.header}>
      <div className={style.menu} onClick={handleClickMenu}>
        <FiMenu />
      </div>
      <div className={style.headerTop} ref={navBar2}>
        <div className={style.logo}>
          <Link to="/">
            <img src={digikalaLogo} alt="logo" className={style.logo} />
          </Link>
        </div>
        <div className={style.serachBar}>
          <span className={style.serachBarIcon}>
            <BiSearch />
          </span>
          <input
            type="search"
            placeholder="جستجو در دیجیکالا ..."
            className={style.serachBarInput}
          />
        </div>
        <nav className={style.navBar}>
          <ul className={style.navList}>
            <li className={style.navItem}>
              <a
                className={`${style.navLink} ${style.adminLinkLogin}`}
                href={login === true ? "/manage-products" : "/login"}
              >
                <ThemeProvider theme={theme}>
                  <Tooltip title="مدیریت">
                    <IconButton>
                      <span className={style.navIcon}>
                        {" "}
                        <FaUser />
                      </span>
                    </IconButton>
                  </Tooltip>
                </ThemeProvider>
              </a>
            </li>
            {result !== "success" ? (
              <li className={style.navItem}>
                <a
                  className={`${style.navLink} ${style.cartLink}`}
                  href="/cart"
                >
                  <ThemeProvider theme={theme}>
                    <Tooltip title="سبد خرید">
                      <IconButton>
                        <span className={style.navIcon}>
                          {" "}
                          <Badge
                            badgeContent={numberOfProductsInBasket}
                            color="primary"
                          >
                            <FaShoppingCart />
                          </Badge>
                        </span>
                      </IconButton>
                    </Tooltip>
                  </ThemeProvider>
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        <nav className={style.navBar2}>
          <ul className={style.navList}>
            <li className={style.navItem}>
              <a
                className={`${style.navLink} ${style.adminLinkLogin}`}
                href={login === true ? "/manage-products" : "/login"}
              >
                مدیریت
              </a>
            </li>
            <li className={style.navItem}>
              <a className={`${style.navLink} ${style.cartLink}`} href="/cart">
                سبد خرید
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className={style.headerBottom}>
        <div className={style.slider}></div>
        <div className={style.advertisments}>
          <div className={style.adv1}>
            <img className={style.adv1Image} src={adv1} alt="advertisment" />
          </div>
          <div className={style.adv2}>
            <img className={style.adv2Image} src={adv2} alt="advertisment" />
          </div>
        </div>
      </div> */}
    </header>
  );
};

export { UserHeaderLayout };

UserHeaderLayout.propTypes = {
  result: PropTypes.bool,
};

UserHeaderLayout.defaultProps = {
  result: false,
};
