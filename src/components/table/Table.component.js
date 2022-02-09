import React from "react";
import style from "./Table.module.css";
import { colors } from "assets/colors";

const TableComponent = (props) => {
  const {
    perPage,
    titlesArray,
    data,
    titleColor,
    oddColor,
    evenColor,
    doubleClickable,
    filterBasedOnWhichColumn,
    asOrdis, //0->desending,1->asending
    clickable,
    clickFunc,
    doubleClickFunc,
  } = props;

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead className={style.headerTable}>
          <tr
            className={style.eachRow}
            style={{ backgroundColor: titleColor ? titleColor : "#C1C1C1" }}
          >
            {titlesArray.map((title, index) => {
              return (
                <th className={style.tableTitle} key={index}>
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={style.bodyTable}>
          {perPage === false
            ? data.map((row, index) => {
                return (
                  <tr
                    className={style.eachRow}
                    key={index}
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? oddColor
                            ? oddColor
                            : "#EEEEEE"
                          : evenColor
                          ? evenColor
                          : "#FFFFFF",
                    }}
                  >
                    {row.map((column, index) => {
                      return (
                        <td
                          className={style.eachColumn}
                          key={index}
                          style={{
                            cursor:
                              clickable[index] || doubleClickable[index]
                                ? "pointer"
                                : "default",
                            color: clickable[index]
                              ? "#3867d6"
                              : doubleClickable[index]
                              ? colors.greenButton
                              : "black",
                          }}
                          onClick={() => {
                            if (clickable[index]) {
                              clickFunc(column);
                            }
                          }}
                          onDoubleClick={() => {
                            if (doubleClickable[index]) {
                              doubleClickFunc(column);
                            }
                          }}
                        >
                          {column}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : data.slice(0, perPage).map((row, index) => {
                return (
                  <tr
                    className={style.eachRow}
                    key={index}
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? oddColor
                            ? oddColor
                            : "#EEEEEE"
                          : evenColor
                          ? evenColor
                          : "#FFFFFF",
                    }}
                  >
                    {row.map((column, index) => {
                      return (
                        <td
                          className={style.eachColumn}
                          key={index}
                          style={{
                            cursor:
                              clickable[index] || doubleClickable[index]
                                ? "pointer"
                                : "default",
                            color: clickable[index]
                              ? "#3867d6"
                              : doubleClickable[index]
                              ? colors.greenButton
                              : "black",
                          }}
                          onClick={() => {
                            if (clickable[index]) {
                              clickFunc(column);
                            }
                          }}
                          onDoubleClick={() => {
                            if (doubleClickable) {
                              doubleClickFunc(column);
                            }
                          }}
                        >
                          {column}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export { TableComponent };
