import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "configs/routes.config";
import * as Page from "pages";
import { ProtectedRoute, PublicRoute, PrivateRoute } from "./components";

function AppRoute(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATHS.ORDER_DETAILS}
          element={
            <PublicRoute
              component={(props) => <Page.OrderDetailsPage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.PRODUCTS_LIST}
          element={
            <PublicRoute
              component={(props) => <Page.ProductsListPage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.PRODUCT_DETAILS}
          element={
            <PublicRoute
              component={(props) => <Page.ProductDetailsPage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.MANAGE_PRODUCTS}
          element={
            <PrivateRoute
              component={(props) => <Page.ManageProductsPage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.FINALIZE_PURCHASE}
          element={
            <PublicRoute
              component={(props) => <Page.FinalizePurchasePage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.PAYMENT_RESULT}
          element={
            <PublicRoute
              component={(props) => <Page.PaymentResultPage {...props} />}
            />
          }
        />
        <Route
          path={PATHS.CART}
          element={
            <PublicRoute component={(props) => <Page.CartPage {...props} />} />
          }
        />
        <Route
          path={PATHS.MANAGE_ENTITY_PRODUCTS}
          element={
            <PrivateRoute
              component={(props) => (
                <Page.ManageEntityProductsPage {...props} />
              )}
            />
          }
        />

        <Route
          path={PATHS.HOME}
          element={
            <PublicRoute component={(props) => <Page.HomePage {...props} />} />
          }
        />
        <Route
          path={PATHS.LOGIN}
          element={
            <ProtectedRoute
              component={(props) => <Page.LoginPage {...props} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRoute };
