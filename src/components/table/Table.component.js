import React, { useState, useEffect } from "react";
import style from "./Table.module.css";
import { colors } from "assets/colors";

const TableComponent = (props) => {
  const {
    perPage,
    titlesArray,
    data,
    titleBgColor,
    titleColor,
    oddColor,
    evenColor,
    doubleClickable,
    clickable,
    clickFunc,
    doubleClickFunc,
    img,
    priceType,
    inputType,
    input,
    checkChangeFlag,
    eventIsDone, //click on save button in manageEntities.lout
    getDataFromTable,
    hiddenColumn,
  } = props;

  let changeFlag = false;
  // let [rowsThatChange, setRowsThatChange] = useState([]);
  const [transferData, setTransferData] = useState(eventIsDone);
  let [changesArray, setChangesArray] = useState([]);
  let [inputChanges, setInputChanges] = useState([]);
  let hiddenIdCol;
  useEffect(() => {
    setTransferData(eventIsDone);
  }, [eventIsDone]);

  const getIdWithRowAndColumn = (row, col) => {
    return data[row][0];
  };
  const handleChangeInput = (e) => {
    let row, col;
    row = e.target.getAttribute("data-row");
    col = e.target.getAttribute("data-col");
    row = Number(row);
    col = Number(col);
    console.log("row is: ", row, "col is : ", col);
    data[row][col] = Number(e.target.value);
    // rowsThatChange.push(row);
    // setRowsThatChange(rowsThatChange);
    setInputChanges([...inputChanges, e.target]);
    setChangesArray([...changesArray, data[row]]);
    changeFlag = true;
    checkChangeFlag(changeFlag);
  };

  if (transferData) {
    // getDataFromTable({ data: data, rowsThatChange: rowsThatChange });
    getDataFromTable(changesArray);
    inputChanges.forEach((input) => {
      input.style.display = "none";
    });
  }
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead className={style.headerTable}>
          <tr
            className={style.eachRow}
            style={{
              backgroundColor: titleBgColor ? titleBgColor : "#C1C1C1",
              color: titleColor ? titleColor : "#000",
            }}
          >
            {titlesArray.map((title, index) => {
              if (title !== hiddenColumn) {
                return (
                  <th className={style.tableTitle} key={index}>
                    {title}
                  </th>
                );
              } else {
                hiddenIdCol = index;
                return "";
              }
            })}
          </tr>
        </thead>
        <tbody className={style.bodyTable}>
          {perPage === false
            ? data.map((row, rindex) => {
                return (
                  <tr
                    className={style.eachRow}
                    key={rindex}
                    style={{
                      backgroundColor:
                        rindex % 2 === 0
                          ? oddColor
                            ? oddColor
                            : "#EEEEEE"
                          : evenColor
                          ? evenColor
                          : "#FFFFFF",
                    }}
                  >
                    {row.map((column, cindex) => {
                      return cindex !== hiddenIdCol ? (
                        <td
                          className={style.eachColumn}
                          key={cindex}
                          style={{
                            cursor:
                              clickable[cindex] || doubleClickable[cindex]
                                ? "pointer"
                                : "default",
                            color: clickable[cindex]
                              ? "#3867d6"
                              : doubleClickable[cindex]
                              ? colors.greenButton
                              : "black",
                          }}
                          onClick={() => {
                            if (clickable[cindex]) {
                              let itemId = getIdWithRowAndColumn(
                                rindex,
                                cindex
                              );
                              clickFunc(column, itemId);
                            }
                          }}
                          onDoubleClick={(e) => {
                            if (doubleClickable[cindex]) {
                              e.target.childNodes[0].style.display = "block";
                              e.target.childNodes[0].value = column;
                            }
                          }}
                        >
                          {input[cindex] ? (
                            <input
                              data-row={rindex}
                              data-col={cindex}
                              type={inputType}
                              className={style.inputInTd}
                              onChange={handleChangeInput}
                              style={{
                                color: titleBgColor,
                              }}
                            />
                          ) : (
                            ""
                          )}
                          {img[cindex] ? (
                            <img
                              className={style.imageInTable}
                              src={`http://localhost:3002${column}`}
                              alt="img"
                            />
                          ) : priceType[cindex] ? (
                            column.toLocaleString("fa")
                          ) : (
                            column
                          )}
                        </td>
                      ) : (
                        ""
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
                            if (doubleClickable[index]) {
                              doubleClickFunc(column);
                            }
                          }}
                        >
                          {img[index] ? (
                            <img
                              className={style.imageInTable}
                              src={`http://localhost:3002${column}`}
                              alt="img"
                            />
                          ) : priceType[index] ? (
                            column.toLocaleString("fa")
                          ) : (
                            column
                          )}
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
