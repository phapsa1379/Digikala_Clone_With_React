import React from "react";
import style from "./AdminHeader.module.css";
import logo from "assets/icons/digikala.svg";
import { BiSearch, FaShoppingCart, FaUser, FiMenu } from "assets/icons/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
const navBar2 = React.createRef();
const products = React.createRef();
const orders = React.createRef();
const entities = React.createRef();

const handleClickMenu = () => {
  navBar2.current.style.display === "flex"
    ? (navBar2.current.style.display = "none")
    : (navBar2.current.style.display = "flex");
};
const handleProducts = () => {
  products.current.classList.add("activeItem");
  entities.current.classList.remove("activeItem");
  orders.current.classList.remove("activeItem");
};

const handleEntites = () => {
  entities.current.classList.add("activeItem");
  orders.current.classList.remove("activeItem");
  products.current.classList.remove("activeItem");
};

const handleOrders = () => {
  orders.current.classList.add("activeItem");
  entities.current.classList.remove("activeItem");
  products.current.classList.remove("activeItem");
};
const AdminHeaderLayout = () => {
  return (
    <header className={style.header}>
      <div className={style.menu} onClick={handleClickMenu}>
        <FiMenu />
      </div>
      <div className={style.subHeader} ref={navBar2}>
        <div className={style.title}>پنل مدیریت فروشگاه</div>
        <nav className={style.navBar}>
          <ul className={style.navList}>
            <li
              className={`${style.navItem} ${style.activeItem}`}
              ref={products}
              onClick={handleProducts}
            >
              <a className={`${style.navLink} ${style.products}`} href="#">
                <span className={`${style.navText} ${style.activeText}`}>
                  کالاها
                </span>
              </a>
            </li>
            <li
              className={style.navItem}
              ref={entities}
              onClick={handleEntites}
            >
              <a className={`${style.navLink} ${style.entities}`} href="#">
                <span className={`${style.navText}`}>موجودی و قیمت ها</span>
              </a>
            </li>
            <li className={style.navItem} ref={orders} onClick={handleOrders}>
              <a className={`${style.navLink} ${style.orders}`} href="#">
                <span className={`${style.navText}`}>سفارش ها</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className={style.back}>
          <a className={style.backLink} href="/">
            بازگشت به سایت
          </a>
        </div>
      </div>

      <nav className={style.navBar2}>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <a className={`${style.navLink} ${style.adminLinkLogin}`} href="#">
              مدیریت
            </a>
          </li>
          <li className={style.navItem}>
            <a className={`${style.navLink} ${style.cartLink}`} href="#">
              سبد خرید
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { AdminHeaderLayout };
