import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCheck, setModal } from '../redux/slice/appSlice';
import { Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function MyModal() {
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
   
const {modal,user} = useSelector((state:RootState)=> state.app)
const dispatch = useDispatch()
const [checkPassword,setCheckPassword] = useState<string>("")

const handleClose = () => {
  dispatch(setModal(false))
}

const controlPassword = () => {
  let result :boolean = checkPassword === user?.password ? true : false
  if(result){
    toast.success("Doğrulama Başarılı, Bilgilerinizi Güncelleyebilirsiniz")
     dispatch(setModal(false))
     dispatch(setCheck(false))
     setCheckPassword("")
  }
  else{
    toast.error("Doğrulama Başarısız, Lütfen Tekrar Deneyiniz")
    setCheckPassword("")
  }
}

  return (
   <Modal open={modal} onClose={handleClose} >
        <Box sx={style}>
          <Typography  variant="h5" component="h2">
            Kontrol Paneli
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Kişisel Bilgilerinizi değiştirmeden önce hesap doğrulaması yapmanız gerekmektedir lütfen şifrenizi giriniz.
          </Typography>
         <TextField
                    value={checkPassword}
                    onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> setCheckPassword(e.target.value)}
                      sx={{ width: "100%" }}
                      name="firstName"
                      type='password'
                      variant="standard"
                     
                    />
                    <Button onClick={controlPassword} variant='contained' size='small' sx={{textTransform:"none", marginTop:"15px"}}> Onayla </Button>
        </Box>
      </Modal>
  )
}
