import Box from "@mui/material/Box";

import { Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setBuyModal } from "../redux/slice/appSlice";
import { useState } from "react";
import { createSms } from "../functions/createSms";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { creditCardSchema } from "../schema/CreditCardSchema";
import cardService from "../services/CardService";
import { type CardType, type PastOrdersType } from "../types/Types";
import { createIdForPastOrders } from "../functions/createIdPastOrders";
import pastOrders from "../services/PastOrders";
import { resetsTheBasket } from "../redux/slice/productSlice";

export default function BuyModal() {
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
  const { buyModal } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [controlSms, setControlSms] = useState<string>("");
  const {selectedProducts,calculetBasket} = useSelector((state:RootState)=>state.product)
  const {user} = useSelector((state:RootState)=>state.app)
  const closeBuyModal = () => {
    dispatch(setBuyModal(false));
  };
  let [sms, setSms] = useState<string>("");
  const getSms = () => {
    const newSms = createSms();
    setSms(newSms);
    toast.success(`SMS Kodu : ${newSms}`);
  };
  const buy = async (values:CardType,actions:any) => {
    console.log(sms,controlSms);
    if (sms === controlSms) {
      let response: CardType = await cardService.getCardInfo();
      
      if (
        response.cardOwner == values.cardOwner &&
        response.cardCv == values.cardCv &&
        response.cardNumber == values.cardNumber &&
        response.cardExpirationDate == values.cardExpirationDate
      ) {
        
        let id : string = await createIdForPastOrders()
        let date : Date = new Date()
        if(user?.id){
        let newPastOrders : PastOrdersType = {
          id : id,
          userId : user?.id,
          items : selectedProducts,
          total : calculetBasket,
          date : date.toLocaleString()
        }
         let response = await pastOrders.addPastOrders(newPastOrders)
         if(response){
          toast.success("Satın Alma İşlemi Başarıyla Gerçekleşti");
          localStorage.removeItem("selectedProducts")
          dispatch(resetsTheBasket())
          actions.resetForm()
          dispatch(setBuyModal(false))
          setControlSms("")
          setSms("")
         }
        }

      } else {
        toast.error("Hatalı Kart Bilgileri");
      }
    } else {
      toast.error("Hatalı Sms Kodu");
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      cardOwner: "",
      cardNumber: "",
      cardCv: "",
      cardExpirationDate: "",
    },
    validationSchema: creditCardSchema,
    onSubmit: buy,
  });
  return (
    <Modal open={buyModal} onClose={closeBuyModal}>
      <Box sx={style}>
        <h1 className="text-center text-2xl">Ödeme Paneli</h1>
        <form onSubmit={handleSubmit}>
          <div className="!mt-3">
            <TextField
              name="cardOwner"
              value={values.cardOwner}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              size="small"
              label="Kart Sahibi İsim Soyisim"
              helperText={
                errors.cardOwner &&
                touched.cardOwner && (
                  <span className="text-[12px] text-red-500">
                    {errors.cardOwner}
                  </span>
                )
              }
            />
          </div>
          <div className="!mt-3">
            <TextField
              name="cardNumber"
              value={values.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              size="small"
              label="Kart Numarası"
              helperText={
                errors.cardNumber &&
                touched.cardNumber && (
                  <span className="text-[12px] text-red-500">
                    {errors.cardNumber}
                  </span>
                )
              }
            />
          </div>
          <div className="!mt-3">
            <TextField
              name="cardCv"
              value={values.cardCv}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              size="small"
              label="Kart Cv"
              helperText={
                errors.cardCv &&
                touched.cardCv && (
                  <span className="text-[12px] text-red-500">
                    {errors.cardCv}
                  </span>
                )
              }
            />
          </div>
          <div className="!mt-3">
            <TextField
              name="cardExpirationDate"
              value={values.cardExpirationDate}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              size="small"
              label="Kart Son Kullanma Tarihi"
              helperText={
                errors.cardExpirationDate &&
                touched.cardExpirationDate && (
                  <span className="text-[12px] text-red-500">
                    {errors.cardExpirationDate}
                  </span>
                )
              }
            />
          </div>
          <div className="!mt-3 flex items-center gap-1">
            <TextField
              value={controlSms}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setControlSms(e.target.value)}
              type="number"
              sx={{ width: "50%" }}
              size="small"
              label="SMS Kodu"
            />
            <Button
              onClick={getSms}
              sx={{ width: "50%", textTransform: "none" }}
              size="small"
            >
              {" "}
              Kod Gönder{" "}
            </Button>
          </div>
          <div className="!mt-4 text-center">
            <Button
              type="submit"
              size="small"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              {" "}
              Onayla{" "}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
