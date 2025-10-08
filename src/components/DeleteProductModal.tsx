import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Button, TextField } from "@mui/material";
import {
  closeBackdrop,
  openBackdrop,
  setDeleteProductModal,
  setProductToBeDeleted,
} from "../redux/slice/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import { getProductByPage } from "../redux/slice/productSlice";
import { useAppDispatch } from "../pages/Products/hooks";
import { getPage } from "../functions/getPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteProductModal() {
  const { deleteProductModal } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();
  const dispatch1 = useDispatch<AppDispatch>();

  const closeDeleteProductModal = () => {
    dispatch(setDeleteProductModal(false));
  };
  const { theProductToBeProcessed } = useSelector(
    (state: RootState) => state.app
  );

  const deleteProduct = async () => {
    try {
      dispatch(openBackdrop());
      let response = await productService.deleteProduct(
        theProductToBeProcessed.id
      );
      if (response) {
        toast.success("Ürün başarıyla silindi");
        let page: number = getPage();
        setTimeout(() => {
          dispatch1(getProductByPage({ currentPage: page, itemsPerPage: 8 }));
        }, 100);
        closeDeleteProductModal();
        dispatch(
          setProductToBeDeleted({
            id: "",
            name: "",
            price: 0,
            description: "",
            image: "",
          })
        );
      }
    } catch (error: any) {
      toast.error(`Ürün Silinrken Hata Oluştu ${error.message}`);
    } finally {
      dispatch(closeBackdrop());
    }
  };

  return (
    <div>
      <Modal open={deleteProductModal} onClose={closeDeleteProductModal}>
        <Box sx={style}>
          <h1 className="text-2xl !mb-2 text-center">Ürün Silme</h1>
          <p className="text-center">
            Ürünü silmek istediğinize emin misiniz ?
          </p>

          <div className="flex justify-center items-center !mt-4 gap-5">
            <Button
              onClick={deleteProduct}
              sx={{ textTransform: "none" }}
              size="small"
              variant="contained"
              color="error"
            >
              Sil
            </Button>
            <Button
              onClick={closeDeleteProductModal}
              sx={{ textTransform: "none" }}
              size="small"
              variant="contained"
            >
              İptal
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
