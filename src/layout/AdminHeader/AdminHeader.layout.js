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
  products.current.classList.add(style.activeItem);
  entities.current.classList.remove(style.activeItem);
  orders.current.classList.remove(style.activeItem);
  orders.current.firstChild.firstChild.classList.remove(style.activeText);
  entities.current.firstChild.firstChild.classList.remove(style.activeText);
  products.current.firstChild.firstChild.classList.add(style.activeText);
};

const handleEntites = () => {
  entities.current.classList.add(style.activeItem);
  orders.current.classList.remove(style.activeItem);
  products.current.classList.remove(style.activeItem);
  orders.current.firstChild.firstChild.classList.remove(style.activeText);
  products.current.firstChild.firstChild.classList.remove(style.activeText);
  entities.current.firstChild.firstChild.classList.add(style.activeText);
};

const handleOrders = () => {
  orders.current.classList.add(style.activeItem);
  entities.current.classList.remove(style.activeItem);
  products.current.classList.remove(style.activeItem);
  entities.current.firstChild.firstChild.classList.remove(style.activeText);
  products.current.firstChild.firstChild.classList.remove(style.activeText);
  orders.current.firstChild.firstChild.classList.add(style.activeText);
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

        <nav className={style.navBar2}>
          <ul className={style.navList}>
            <li
              className={`${style.navItem} ${style.activeItem}`}
              // ref={products}
              // onClick={handleProducts}
            >
              <a className={`${style.navLink} ${style.products}`} href="#">
                <span className={`${style.navText} ${style.activeText}`}>
                  کالاها
                </span>
              </a>
            </li>
            <li
              className={style.navItem}
              // ref={entities}
              // onClick={handleEntites}
            >
              <a className={`${style.navLink} ${style.entities}`} href="#">
                <span className={`${style.navText}`}>موجودی و قیمت ها</span>
              </a>
            </li>
            <li
              className={style.navItem}
              // ref={orders}
              // onClick={handleOrders}
            >
              <a className={`${style.navLink} ${style.orders}`} href="#">
                <span className={`${style.navText}`}>سفارش ها</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { AdminHeaderLayout };
