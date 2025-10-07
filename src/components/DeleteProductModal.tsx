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
  const { page } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();
  const dispatch1 = useDispatch<AppDispatch>();

  const closeDeleteProductModal = () => {
    dispatch(setDeleteProductModal(false));
  };
  const { user, theProductToBeProcessed } = useSelector(
    (state: RootState) => state.app
  );
  const [password, setPassword] = useState<string>('');
  const deleteProduct = async () => {
    if (password === user?.password) {
      // Siliecek Ürün
      try {
        dispatch(openBackdrop());
        let response = await productService.deleteProduct(
          theProductToBeProcessed.id
        );
        if (response) {
          toast.success("Ürün başarıyla silindi");
          setTimeout(() => {
            dispatch1(getProductByPage({ currentPage: page, itemsPerPage: 8 }));
          }, 100);
          closeDeleteProductModal()
          setPassword('')
          dispatch(setProductToBeDeleted({id:"",name:"",price:0,description:"",image:""}))
        }
      } catch (error: any) {
        toast.error(`Ürün Silinrken Hata Oluştu ${error.message}`);
      } finally {
        dispatch(closeBackdrop());
      }
    } else {
      toast.error("Şifre yanlış");
    }
  };

  return (
    <div>
      <Modal open={deleteProductModal} onClose={closeDeleteProductModal}>
        <Box sx={style}>
          <h1 className="text-2xl !mb-2 text-center">Ürün Silme</h1>
          <p className="text-center">
            Ürünü Silmek için lütfen şifrenizi giriniz.
          </p>
          <div className="!mt-2">
            <TextField
              value={password}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
              size="small"
              sx={{ width: "100%" }}
              type="password"
            />
          </div>
          <div className="flex justify-center items-center !mt-2">
            <Button
              onClick={deleteProduct}
              sx={{ textTransform: "none" }}
              size="small"
              variant="contained"
            >
              Sil
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
