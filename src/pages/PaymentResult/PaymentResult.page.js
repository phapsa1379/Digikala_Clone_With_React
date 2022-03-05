import React, { useState, useEffect } from "react";
import style from "./PaymentResult.module.css";
import { UserHeaderLayout } from "layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import okImg from "assets/icons/ok.png";
import cancelImg from "assets/icons/cancel.png";
/**************Helmet************************ */
import { Helmet } from "react-helmet";
/*************************************** */
const PaymentResultPage = (props) => {
  let [param, setParam] = useSearchParams();
  let resultParam = param.get("result");
  let [result, setResult] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setResult(resultParam);
  }, []);
  return (
    <div className={style.resultPage}>
      <Helmet>
        <title>
          {resultParam === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}
        </title>
      </Helmet>
      <div className={style.header}>
        <UserHeaderLayout result={result} />
      </div>
      <div className={style.mainPart}>
        <div className={style.title}>نتیجه پرداخت</div>
        <div className={style.message}>
          <div className={style.messageLogo}>
            <img
              src={
                result === "success"
                  ? okImg
                  : result === "failed"
                  ? cancelImg
                  : ""
              }
              alt=""
            />
          </div>
          <div className={style.messageText}>
            {result === "success"
              ? "باتشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد."
              : result === "failed"
              ? "پرداخت شما موفقیت‌آمیز نبود، سفارش شما در انتظار پرداخت است."
              : "تراکنشی صورت نگرفته است."}
          </div>
        </div>
        <div
          className={style.backBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          بازگشت به صفحه اصلی
        </div>
      </div>
    </div>
  );
};

export { PaymentResultPage };
