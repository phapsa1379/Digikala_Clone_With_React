import React from "react";
import style from "./manageProducts.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { colors } from "assets/colors";
import { AiFillCloseCircle } from "assets/icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableComponent } from "components";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { connect } from "react-redux";
import { fetchProducts } from "redux/actions/products.action";
import { deleteProducts, postProducts, putProducts } from "api/products.api";
import { postCategory } from "api/category.api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
/*****Toastify *****/
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/*******ckEditor ****/
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "ckeditor5/build/translations/fa";
/************SunEditor************* */
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
/**************SweetAlert******************** */
import swal from "sweetalert";
/******************************** */
import { getProductById } from "globalFunctions";
const BASE_URL = "http://localhost:3002";

const theme = createTheme({
  multilineColor: {
    color: "red",
  },
  direction: "rtl",
  typography: {
    fontFamily: "vazir",
    fontSize: 40,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});
const modalTheme = createTheme({
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
const theme2 = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "vazir",
    fontSize: 40,
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

const theme3 = createTheme({
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

const titleArray = ["id", "تصویر", "نام کالا", "دسته بندی", "ویرایش", ["حذف"]];

/****Table */

/****RTL */

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

//React Select Styles
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "1.8rem",
    color: state.isSelected ? colors.white : colors.primary,
    backgroundColor: state.isSelected ? colors.primary : colors.white,
    padding: 20,
    borderRadius: "0.5rem",
    cursor: "pointer",
    zIndex: 101,
    "&:hover": {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  }),

  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "1.8rem",
    color: colors.text,
    zIndex: 101,
  }),
  control: (provided, state) => ({
    ...provided,
    width: "90%",
    border: `2px solid ${colors.primary}`,
    boxShadow: "none",
    borderRadius: "1rem",
    zIndex: 101,
    "&:focus": {
      // outline: "none",
      boxShadow: "0 0 1rem 0.5rem",
    },
    "&:hover": {
      // outline: "none",
    },
  }),
  container: (provided, state) => ({
    ...provided,
    display: "flex",
    justifyContent: "center",
    height: "5rem",
    margin: "1rem 0",
    zIndex: 101,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "90%",
    border: `2px solid ${colors.primary}`,
    borderRadius: "1rem",
    zIndex: 101,
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: "20rem",
    zIndex: 101,
  }),
  input: (provided, state) => ({
    ...provided,
    color: colors.primary,
    fontSize: "1.8rem",

    fontFamily: "vazir",
    zIndex: 101,

    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      outline: "none",
    },
  }),

  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: "vazir",
    fontSize: "1.8rem",
  }),
};
/***RTL */

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.primary.main,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
/****Table */

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "35%",
  minWidth: "50rem",
  bgcolor: "background.paper",
  border: `5px solid ${colors.primary}`,
  boxShadow: 24,
  borderRadius: "2rem",
  // display: "flex",
  // justifyContent: "space-between",
  p: 4,
};
const getTextFromEditor = (content) => {
  return content.replace(/<[^>]*>/g, "");
};

// CKEDITOR.config.language = "fa";
// CKEDITOR.replace("body", {
//   filebrowserUploadUrl: "/admin/upload_image",
//   filebrowserImageUploadUrl: "/admin/upload_image",
//   imageUploadUrl: "/admin/upload_image?type=drag",
//   filebrowserUploadMethod: "form",
//   extraPlugins: "uploadimage",
//   width: "100%",
//   height: "400px",
//   toolbar: [
//     [
//       "Bold",
//       "Italic",
//       "Underline",
//       "StrikeThrough",
//       "-",
//       "Undo",
//       "Redo",
//       "-",
//       "Cut",
//       "Copy",
//       "Paste",
//       "Replace",
//       "-",
//       "Outdent",
//       "Indent",
//       "-",
//     ],
//     [
//       "NumberedList",
//       "BulletedList",
//       "-",
//       "JustifyLeft",
//       "JustifyCenter",
//       "JustifyRight",
//       "JustifyBlock",
//     ],
//     ["Table", "-", "Smiley", "TextColor", "BGColor"],
//   ],
//   contentsLangDirection: "rtl",
//   font_defaultLabel: "Vazir",
//   font_names: "Vazir",
// });

let options;

class ManageProductsLayout extends React.Component {
  state = {
    allProducts: [],
    products: [],
    inPerPage: 4,
    pageNumber: 1,
    data: [],
    filter: "default",
    allCategories: [],
    filterSelection: "",
    showDialog: false,
    openModal: false,
    selectInputModal: null,
    selectedFile: null,
    editorValue: "",
    addOrEdit: null,
    nameProductValue: "",

    currentProduct: null,
    itemId: null,
  };
  selectReference = React.createRef();

  onFileUpload = (e) => {
    //Create an object of formData
    const formData = new FormData();
    // console.log("selectedFile", this.state.selectedFile);
    // Update the formData object
    if (this.state.selectedFile !== null) {
      formData.append(
        "image",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      // Details of the uploaded file

      // Request made to the backend api
      // Send formData object
      return formData;
    } else {
      swal({
        title: "خطا",
        text: `فیلد عکس نمیتواند خالی باشد.`,
        icon: "error",
      });
      return false;
    }
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  submitButtonHandler = (e) => {
    e.preventDefault();
    //  const nameOfProduct = e.target.parentNode[1].value;
    // console.log(e.target[1].value);
    // const categoryName = this.state.selectInputModal.label;
    // const description = this.state.editorValue;
    // console.log(categoryName, description);
    if (this.state.addOrEdit === "add") {
      let formData = this.onFileUpload();
      if (formData !== false) {
        axios
          .post(`${BASE_URL}/upload`, formData)
          .then((res) => {
            if (this.state.selectedFile.size < 2000000) {
              let urlImage = res.data.filename;
              urlImage = "/files/" + urlImage;
              const nameOfProduct = e.target[1].value;

              const categoryName = this.state.selectInputModal.label;

              const description = this.state.editorValue;
              // console.log(res);
              if (urlImage && nameOfProduct && categoryName && description) {
                // alert("با موفقیت ثبت شد");
                let productObj = {};
                productObj.name = nameOfProduct;
                productObj.categoryId = Number(
                  this.findCategoryIdByName(categoryName)
                );
                productObj.brand = "";
                productObj.price = 0;
                productObj.count = 0;
                productObj.description = description;
                productObj.thumbnail = urlImage;
                productObj.image = [];
                productObj.image[0] = urlImage;
                postProducts(productObj).then((res) => {
                  toast.success("محصول جدید با موفقیت ثبت شد", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  this.setState({ ...this.state, openModal: false }, () => {
                    this.componentDidMount();
                  });
                });
              } else {
                swal({
                  title: "خطا",
                  text: `لطفا تمامی  فیلد هار پر کنید`,
                  icon: "error",
                });
              }
            } else {
              swal({
                title: "خطا",
                text: `حجم فایل بیشتر از 2 مگابایت است`,
                icon: "error",
              });
            }
            // console.log(nameOfProduct, categoryName, description);
          })
          .catch((err) => {
            swal({
              title: "خطا",
              text: `خطایی در آپلود عکس رخ داده است`,
              icon: "error",
            });
          });
      }
    } else if (this.state.addOrEdit === "edit") {
      let formData = this.onFileUpload();
      if (formData !== false) {
        axios
          .post(`${BASE_URL}/upload`, formData)
          .then((res) => {
            if (this.state.selectedFile.size < 2000000) {
              let urlImage = res.data.filename;
              urlImage = "/files/" + urlImage;
              const nameOfProduct = e.target[1].value;

              const categoryName = this.state.selectInputModal.label;

              const description = this.state.editorValue;
              // console.log(res);
              if (urlImage && nameOfProduct && categoryName && description) {
                // alert("با موفقیت ثبت شد");
                let productObj = {};
                productObj.name = nameOfProduct;
                productObj.categoryId = Number(
                  this.findCategoryIdByName(categoryName)
                );

                productObj.description = description;

                productObj.image.push(urlImage);
                let currentProduct = this.state.currentProduct;
                productObj = { ...currentProduct, ...productObj };
                putProducts(this.state.itemId, productObj).then((res) => {
                  toast.success("محصول با موفقیت ویرایش شد", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  this.setState({ ...this.state, openModal: false }, () => {
                    this.componentDidMount();
                  });
                });
              } else {
                swal({
                  title: "خطا",
                  text: `لطفا تمامی  فیلد هار پر کنید`,
                  icon: "error",
                });
              }
            } else {
              swal({
                title: "خطا",
                text: `حجم فایل بیشتر از 2 مگابایت است`,
                icon: "error",
              });
            }
            // console.log(nameOfProduct, categoryName, description);
          })
          .catch((err) => {
            swal({
              title: "خطا",
              text: `خطایی در آپلود عکس رخ داده است`,
              icon: "error",
            });
          });
      }
    }
    // console.log("imageInput", e.target.parentNode[0]);
  };
  handleChangeDescription = (content) => {
    //content includes tag so to seprate text from tag we use getTextFromEditor function
    this.setState({ ...this.state, editorValue: getTextFromEditor(content) });
  };
  handleCreateOption = (newCategory) => {
    postCategory({ name: newCategory })
      .then((res) => {
        toast.success("دسته بندی جدید با موفقیت ایجاد شد", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        this.componentDidMount();
      })
      .catch((err) => {
        alert("error");
      });
    // alert(newCategory);
  };
  handleChangeSelectInputModal = (selectInputModal) => {
    this.setState({ selectInputModal });
  };
  //close confirm Dialog handler
  handleClose = () => {
    this.setState({ ...this.state, showDialog: false });
  };

  addProductHandler = () => {
    this.setState({ ...this.state, openModal: true }, () => {
      this.setState({ ...this.state, addOrEdit: "add" });
    });
  };
  editProductHandler = () => {
    this.setState({ ...this.state, openModal: true }, () => {
      this.setState({ ...this.state, addOrEdit: "edit" });
    });
  };
  closeModalHandler = () => {
    this.setState({ ...this.state, openModal: false });
  };

  deleteConfirmHandler = () => {
    this.setState({ ...this.state, showDialog: false }, () => {
      deleteProducts(this.state.itemId);
      this.state.allProducts.map((item, index) => {
        if (item.id === this.state.itemId) {
          this.state.allProducts.splice(index, 1);
        }
      });
      this.componentDidMount();

      this.setState({ ...this.state, itemId: null });
    });
  };
  getDataFromTable = (data) => {};
  dataArray = [];

  productsArray = [];
  numberOfPage = 1;
  getIndexByCategoryId = (categoryId) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value == categoryId) {
        return i;
      }
    }
  };
  findCategoryNameById = (id) => {
    let categoryName = "";
    this.state.allCategories.forEach((category) => {
      if (category.id === id) {
        categoryName = category.name;
      }
    });

    return categoryName;
  };
  findCategoryIdByName = (name) => {
    let categoryId;
    this.state.allCategories.forEach((category) => {
      if (category.name === name) {
        categoryId = category.id;
      }
    });

    return categoryId;
  };
  componentWillMount() {
    this.props.getProductss();
  }
  componentDidMount() {
    axios.get(`${BASE_URL}/category`).then((res) => {
      const allCategoriesArray = res.data;
      let intializeOptions = [];
      allCategoriesArray.forEach((category, index) => {
        intializeOptions.push({
          value: category.id,
          label: category.name,
        });
      });
      options = intializeOptions;
      this.setState({ allCategories: allCategoriesArray }, async () => {
        // axios.get(`${BASE_URL}/products`).then((res) => {

        const allProductsArray = await this.props.products;
        // console.log("redux", allProductsArray);
        this.setState({ allProducts: allProductsArray }, () => {
          let howGet = {
            default: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}`,
            all: "",
            priceAsce: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=price&_order=asc`,
            priceDesc: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=price&_order=desc`,
            createAtAsce: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=createdAt&_order=asc`,
            createAtDesc: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=createdAt&_order=desc`,
            category: `?_page=${this.state.pageNumber}&_limit=${this.state.inPerPage}&_sort=categoryId&_order=asc`,
          };
          axios
            .get(`${BASE_URL}/products${howGet[this.state.filter]}`)
            .then((res) => {
              const productsArray = res.data;

              this.setState({ ...this.state, products: productsArray }, () => {
                let length = this.state.products.length;
                let totalLength = this.state.allProducts.length;

                this.numberOfPage = Math.ceil(
                  totalLength / this.state.inPerPage
                );
                this.dataArray = [];

                for (let i = 0; i < length; i++) {
                  this.dataArray[i] = [];
                }

                for (let index = 0; index < length; index++) {
                  for (let property in this.state.products[index]) {
                    if (property === "id") {
                      this.dataArray[index][0] =
                        this.state.products[index][property];
                    } else if (property === "thumbnail") {
                      this.dataArray[index][1] =
                        this.state.products[index][property];
                      // console.log("in for:", this.dataArray);
                    } else if (property === "name") {
                      this.dataArray[index][2] =
                        this.state.products[index][property];
                    } else if (property === "categoryId") {
                      this.dataArray[index][3] = this.findCategoryNameById(
                        this.state.products[index][property]
                      );
                    }
                    this.dataArray[index][4] = "ویرایش";
                    this.dataArray[index][5] = "حذف";
                  }
                }
                // console.log(this.dataArray);
                this.setState({
                  ...this.state,
                  data: this.dataArray,
                });
              });
            })
            .catch((err) => {
              console.log("Something went wrong");
            });
        });
        // });
      });
    });
    // (async () => {})();
  }
  render() {
    const handleChange = (event, value) => {
      this.setState({ ...this.state, pageNumber: value }, () => {
        this.componentDidMount();
      });
    };
    const handleChangeFilter = (event) => {
      console.log("value is : ", event.target.value);
      this.setState({ ...this.state, filter: event.target.value }, () => {
        this.componentDidMount();
      });
    };
    return (
      <div className={style.manageProductsContainer}>
        <div className={style.headerPart}>
          <div className={style.headerPartTitle}>مدیریت کالا ها</div>
          <div className={style.headerPartFilter}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme3}>
                <Box
                  sx={{
                    minWidth: 300,
                  }}
                >
                  <FormControl sx={{}} fullWidth>
                    <InputLabel sx={{}} id="demo-simple-select-label">
                      فیلتر بر اساس
                    </InputLabel>
                    <Select
                      sx={{}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.filter}
                      label="Age"
                      onChange={handleChangeFilter}
                    >
                      <MenuItem sx={{ color: colors.text }} value={"default"}>
                        بدون فیلتر
                      </MenuItem>
                      <MenuItem sx={{ color: colors.text }} value={"priceAsce"}>
                        قیمت (صعودی)
                      </MenuItem>
                      <MenuItem value={"priceDesc"}> قیمت (نزولی)</MenuItem>
                      <MenuItem value={"createAtAsce"}>
                        زمان ایجاد (صعودی)
                      </MenuItem>
                      <MenuItem value={"createAtDesc"}>
                        زمان ایجاد (نزولی)
                      </MenuItem>
                      <MenuItem value={"category"}>دسته بندی</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ThemeProvider>
            </CacheProvider>
          </div>
          <div className={style.headerPartButton}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={modalTheme}>
                <Modal
                  open={this.state.openModal}
                  onClose={this.closeModalHandler}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={boxStyle} className="modalBox">
                    <span
                      className={style.closeModalBtn}
                      onClick={this.closeModalHandler}
                    >
                      <AiFillCloseCircle />
                    </span>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ color: colors.primary }}
                    >
                      افزودن / ویرایش کالا
                    </Typography>

                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography> */}

                    <form
                      className={style.modalForm}
                      action="http://localhost:3002/upload"
                      method="post"
                      enctype="multipart/form-data"
                      onSubmit={this.submitButtonHandler}
                    >
                      <label
                        className={style.labelFormModal}
                        htmlFor="imageName"
                      >
                        تصویر کالا :
                      </label>
                      {/* <input
                        id="imageName"
                        type="text"
                        placeholder="تصویر کالا موردنظر خود را انتخاب کنید"
                        className={`${style.inputFormModal} ${style.imageNameInput}`}
                      /> */}
                      <input
                        id="imageName"
                        type="file"
                        onChange={this.onFileChange}
                        className={`${style.inputFormModal} ${style.imageNameInput}`}
                      />
                      <label
                        className={style.labelFormModal}
                        htmlFor="productName"
                      >
                        نام کالا :
                      </label>
                      <input
                        value={this.state.nameProductValue}
                        name="name"
                        id="productName"
                        type="text"
                        placeholder="نام کالا موردنظر خود را وارد کنید"
                        className={`${style.inputFormModal} ${style.imageNameInput}`}
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            nameProductValue: e.target.value,
                          });
                        }}
                      />

                      <label
                        className={style.labelFormModal}
                        htmlFor="category"
                      >
                        دسته بندی :
                      </label>
                      <CreatableSelect
                        formatCreateLabel={(userInput) =>
                          `افزودن دسته‌بندی : ${userInput}`
                        }
                        id="category"
                        styles={customStyles}
                        defaultValue={this.state.selectInputModal}
                        onChange={this.handleChangeSelectInputModal}
                        onCreateOption={this.handleCreateOption}
                        // onFocus={() => {
                        //   this.selectReference.current.style.marginBottom =
                        //     "5rem";
                        // }}
                        // onBlur={() => {
                        //   this.selectReference.current.style.marginBottom = "0";
                        // }}
                        isClearable
                        placeholder="دسته بندی موردنظر خود را انتخاب کنید"
                        options={options}
                      />
                      <label
                        ref={this.selectReference}
                        className={style.labelFormModal}
                        htmlFor="description"
                      >
                        توضیحات :
                      </label>
                      <div className={style.ckeContainer}>
                        <SunEditor
                          id="description"
                          defaultValue={this.state.editorValue}
                          color={`${colors.primary}`}
                          placeholder="توضیحات موردنظر خود را وارد کنید"
                          onChange={this.handleChangeDescription}
                          setDefaultStyle={`font-family: vazir; font-size: 1.8rem;color: ${colors.text};z-index=1;max-height:15rem;min-height:15rem;`}
                        />
                        {/* <CKEditor
                          id="description"
                          config={{
                            language: "fa",
                          }}
                          editor={ClassicEditor}
                          data="<p>توضیحات مربوط به کالا ...</p>"
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                          }}
                          onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                          }}
                        /> */}
                      </div>
                      <button className={style.subButton} type="submit">
                        ذخیره
                      </button>
                    </form>
                  </Box>
                </Modal>
              </ThemeProvider>
            </CacheProvider>
            <ToastContainer
              bodyClassName={() => style.toastify}
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ThemeProvider theme={theme}>
              <Button
                onClick={this.addProductHandler}
                variant="contained"
                link="/"
                sx={{
                  color: colors.white,
                  backgroundColor: colors.ligthPrimary,
                  borderRadius: "1rem",
                  width: "15rem",
                  height: "5rem",
                  justifySelf: "flex-end",
                  fontSize: "2rem",
                  marginBottom: "2rem",
                  transition: "0.5s",
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  },
                }}
              >
                افزودن کالا
              </Button>
            </ThemeProvider>
          </div>
        </div>
        {this.state.products.length ? (
          <div className={style.tablePart}>
            <TableComponent
              titleBgColor={colors.primary}
              titleColor={colors.white}
              data={this.state.data}
              titlesArray={titleArray}
              perPage={false}
              clickable={[false, false, false, false, true, true]}
              doubleClickable={[false, false, false, false, false, false]}
              img={[false, true, false, false, false, false]}
              priceType={[false, false, false, false, false, false]}
              inputType="number"
              input={[false, false, false, false, false, false]}
              hiddenColumn={"id"}
              clickFunc={(x, itemId) => {
                // console.log(x, itemId);
                this.setState({ ...this.state, itemId: itemId }, () => {
                  if (x === "ویرایش") {
                    getProductById(this.state.itemId).then((res) => {
                      this.setState(
                        {
                          ...this.state,
                          currentProduct: res,
                        },
                        () => {
                          this.setState(
                            {
                              ...this.state,

                              editorValue:
                                this.state.currentProduct.description,
                              nameProductValue: this.state.currentProduct.name,
                              selectInputModal:
                                options[
                                  this.getIndexByCategoryId(
                                    this.state.currentProduct.categoryId
                                  )
                                ],
                            },
                            () => {
                              this.editProductHandler();
                            }
                          );
                        }
                      );
                    });
                  } else if (x === "حذف") {
                    this.setState({ ...this.state, showDialog: true });
                  }
                });
              }}
              doubleClickFunc={null}
              checkChangeFlag={false}
              eventIsDone={false}
              getDataFromTable={this.getDataFromTable}
            />

            {/* <CacheProvider value={cacheRtl}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CacheProvider> */}
          </div>
        ) : (
          <div className={style.noProducts}>
            محتوایی جهت نمایش وجود ندارد :)
          </div>
        )}
        {this.state.filter !== "all" && this.state.products.length ? (
          <div className={style.paginationPart}>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme2}>
                <Stack spacing={2}>
                  <Pagination
                    count={this.numberOfPage}
                    color="primary"
                    size="large"
                    onChange={handleChange}
                    showFirstButton
                    showLastButton
                    sx={{
                      color: colors.primary,
                      direction: "rtl!important",
                    }}
                  />
                </Stack>
              </ThemeProvider>
            </CacheProvider>
          </div>
        ) : null}
        <div className={style.confirmDialog}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={dialogTheme}>
              <Dialog
                open={this.state.showDialog}
                onClose={this.handleClose}
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
                    آیا از حذف این محصول اطمینان دارید؟
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose}>لغو</Button>
                  <Button onClick={this.deleteConfirmHandler} autoFocus>
                    تایید
                  </Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>
          </CacheProvider>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("map", state.allProducts.products);
  return {
    products: state.allProducts.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductss: () => dispatch(fetchProducts()),
  };
};
// export { ManageProductsLayout };
const ManageProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductsLayout);
export { ManageProducts };
