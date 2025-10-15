import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  closeBackdrop,
  openBackdrop,
  setAddProductModal,
} from "../redux/slice/appSlice";
import { useFormik } from "formik";
import { addProductSchema } from "../schema/AddProductSchema";
import { TextField } from "@mui/material";
import type { AddProductType, ProductType } from "../types/Types";
import { createIdForProduct } from "../functions/createIdProduct";
import productService from "../services/ProductService";
import { toast } from "react-toastify";
import { useAppDispatch } from "../pages/Products/hooks";
import { getProductByPage } from "../redux/slice/productSlice";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//    width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function AddProductModal() {
  const { addProductModal } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const dispatch1 = useAppDispatch();

  const handleClose = () => {
    dispatch(setAddProductModal(false));
  };

  const { page } = useSelector((state: RootState) => state.product);

  const submit = async (values: AddProductType, actions: any) => {
    let id: string = await createIdForProduct();
    console.log(id);
    let newProduct: ProductType = {
      id,
      name: values.productName,
      description: values.description,
      price: values.price,
      image: values.image,
    };

    try {
      dispatch(openBackdrop());
      let response: ProductType = await productService.addProduct(newProduct);

      if (response) {
        toast.success("Ürün Başarıyla Eklendi");
        setTimeout(() => {
          dispatch1(getProductByPage({ currentPage: page, itemsPerPage: 8 }));
        }, 100);
      }
    } catch (error: any) {
      toast.error("Ürün Eklenir Hata Oluştu " + error.message);
    } finally {
      dispatch(closeBackdrop());
      actions.resetForm();
      dispatch(setAddProductModal(false));
    }
  };

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        productName: "",
        description: "",
        price: 0,
        image: "",
      },
      validationSchema: addProductSchema,
      onSubmit: submit,
    });

  return (
    <div>
      <Modal open={addProductModal} onClose={handleClose}>
        <Box   sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      width: 500,
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflow: "auto",

      "@media (max-width:640px)": {
        width: "80vw", // Daha mantıklı bir değer
      },
      "@media (min-width:1024px)": {
        width: "500px", // Sabit genişlik veya "40vw"
      },
    }}>
          <h1 className="text-2xl !mb-2 text-center">Ürün Ekle</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="!mb-3">
                <TextField
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Ürün İsmi"
                  variant="outlined"
                  helperText={
                    errors.productName &&
                    touched.productName && (
                      <span className="text-[10px] text-red-600">
                        {errors.productName}{" "}
                      </span>
                    )
                  }
                />
              </div>
              <div className="!mb-3">
                <TextField
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Ürün Açıklaması"
                  variant="outlined"
                  helperText={
                    errors.description &&
                    touched.description && (
                      <span className="text-[10px] text-red-600">
                        {errors.description}{" "}
                      </span>
                    )
                  }
                />
              </div>
              <div className="!mb-3">
                <TextField
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Ürün Fiyatı"
                  variant="outlined"
                  helperText={
                    errors.price &&
                    touched.price && (
                      <span className="text-[10px] text-red-600">
                        {errors.price}{" "}
                      </span>
                    )
                  }
                />
              </div>
              <div className="!mb-3">
                <TextField
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Ürün Resmi (Url)"
                  variant="outlined"
                  helperText={
                    errors.image &&
                    touched.image && (
                      <span className="text-[10px] text-red-600">
                        {errors.image}{" "}
                      </span>
                    )
                  }
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="small"
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                  color="secondary"
                >
                  {" "}
                  Ürün Ekle{" "}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
