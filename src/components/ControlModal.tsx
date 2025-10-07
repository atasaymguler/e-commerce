import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Button, TextField } from "@mui/material";
import { setControlModal, setDeleteProductModal, setUpdateProductModal} from "../redux/slice/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";

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

export default function ControlModal() {

  const dispatch = useDispatch();

  const {controlModal,user} = useSelector((state:RootState)=> state.app)

  const closeControlModal = () => {
    dispatch(setControlModal({open:false,actionType:""}));
    setPassword("")
  };

  const [password, setPassword] = useState<string>('');

  const checkUser = () => {
    if(user?.password === password){
        // Doğrulama Başarılı
        if(controlModal.actionType === "update"){
          closeControlModal()
          dispatch(setUpdateProductModal(true))
        }
        else if(controlModal.actionType === "delete"){
            closeControlModal()
          dispatch(setDeleteProductModal(true))
        }
    }
    else {
      toast.error("Şifre Yanlış")
      dispatch(setControlModal({open:false,actionType:""}))
      setPassword("")
      
    }
  }
  
  return (
    <div>
      <Modal open={controlModal.open} onClose={closeControlModal}>
        <Box sx={style}>
          <h1 className="text-2xl !mb-2 text-center">Kullanıcı Doğrulaması</h1>
          <p className="text-center">
            İşleminize Devam Etmeden Önce Lütfen Şifrenizi Giriniz
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
              onClick={checkUser}
              sx={{ textTransform: "none" }}
              size="small"
              variant="contained"
            >
              Onayla
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
