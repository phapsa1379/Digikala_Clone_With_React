import React from "react";
import style from "./Table.module.css";

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
    asOrdis,
  } = props;

  return (
    <div>
      <table>
        <thead>
          <tr style={{ color: titleColor ? titleColor : "#C1C1C1" }}>
            {titlesArray.map((title, index) => {
              return <th key={index}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          perPage===false?
          {data.map((row, index) => {
            return (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? oddColor : evenColor,
                }}
              >
                {row.map((column, index) => {
                  return (
                    <td
                      key={index}
                      onDoubleClick={() => {
                        if (doubleClickable) {
                          doubleClickable(column);
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
          :
          {data.slice(0, perPage).map((row, index) => {
            return (
              <tr
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
                      key={index}
                      onDoubleClick={() => {
                        if (doubleClickable) {
                          doubleClickable(column);
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
