import React, { useState, useEffect } from "react";
import style from "./Table.module.css";
import { colors } from "assets/colors";
import { PropTypes } from "prop-types";
const TableComponent = (props) => {
  const {
    perPage,
    titlesArray,
    data,
    initialData,
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
    // data[row][col] = Number(e.target.value);

    data[row][col] = Number(e.target.value);
    // rowsThatChange.push(row);
    // setRowsThatChange(rowsThatChange);
    setInputChanges([...inputChanges, e.target]);
    setChangesArray([...changesArray, [...data[row]]]);
    changeFlag = true;
    checkChangeFlag(changeFlag);
  };
  const keyDownInputHandler = (e) => {
    if (e.keyCode === 27) {
      let row = e.target.getAttribute("data-row");
      let col = e.target.getAttribute("data-col");
      data[row][col] = initialData[row][col];

      console.log(
        "text",
        document.getElementById(`td${row}-${col}`).childNodes[1]
      );
      document.getElementById(`td${row}-${col}`).childNodes[1].nodeValue =
        String(initialData[row][col]);
      console.log("text", document.getElementById(`td${row}-${col}`).text);
      // e.target.parentNode.textContent = initialData[row][col];
      e.target.style.visibility = "hidden";
      console.log("shit", e.target);
    }
  };

  if (transferData) {
    // getDataFromTable({ data: data, rowsThatChange: rowsThatChange });
    getDataFromTable(changesArray);
    inputChanges.forEach((input) => {
      input.style.visibility = "hidden";
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
          {data.map((row, rindex) => {
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
                      id={`td${rindex}-${cindex}`}
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
                          : colors.text,
                      }}
                      onClick={() => {
                        if (clickable[cindex]) {
                          let itemId = getIdWithRowAndColumn(rindex, cindex);
                          clickFunc(column, itemId);
                        }
                      }}
                      onDoubleClick={(e) => {
                        if (doubleClickable[cindex]) {
                          let currentInput = document.getElementById(
                            `input${rindex}-${cindex}`
                          );
                          console.log("child", currentInput);
                          currentInput.style.visibility = "visible";
                          currentInput.value = column;
                        }
                      }}
                    >
                      {input[cindex] ? (
                        <input
                          id={`input${rindex}-${cindex}`}
                          onKeyDown={keyDownInputHandler}
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export { TableComponent };

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  titlesArray: PropTypes.array.isRequired,
  clickable: PropTypes.array.isRequired,
  doubleClickable: PropTypes.array.isRequired,
  img: PropTypes.array.isRequired,
  priceType: PropTypes.array.isRequired,
  inputType: PropTypes.string,
  input: PropTypes.array.isRequired,
  titleBgColor: PropTypes.string,
  titleColor: PropTypes.string,
  oddColor: PropTypes.string,
  evenColor: PropTypes.string,
  hiddenColumn: PropTypes.string,
  clickFunc: PropTypes.func,
  getDataFromTable: PropTypes.func,
  transferData: PropTypes.bool,
};
TableComponent.defaultProps = {
  inputType: "text",
  titleBgColor: "#C1C1C1",
  titleColor: "#000",
  oddColor: "#EEEEEE",
  evenColor: "#FFFFFF",
  hiddenColumn: "",
  clickFunc: () => {},
  getDataFromTable: () => {},
  transferData: false,
};
