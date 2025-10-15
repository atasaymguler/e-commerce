import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Button, TextField, Typography } from "@mui/material";
import { setControlModal, setDeleteProductModal, setUpdateProductModal} from "../redux/slice/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";

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
        <Box sx={{
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
          <Typography variant="h4" sx={{textAlign:"center",marginBottom:"4px"}}>Kullanıcı Doğrulaması</Typography>
          <Typography variant="body2" className="text-center">
            İşleminize Devam Etmeden Önce Lütfen Şifrenizi Giriniz
          </Typography>
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
