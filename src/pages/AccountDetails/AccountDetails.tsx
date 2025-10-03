import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Formik, Form, type FormikProps } from "formik";
import { Button } from "@mui/material";
import type { ChangeInfoType, RegisterUserType } from "../../types/Types";

import { changeInfoSchema } from "../../schema/ChangeInfoSchema";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheck, setModal, setUser } from "../../redux/slice/appSlice";
import type { RootState } from "../../redux/store";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import { setUpdateUser } from "./setUpdateUser";

export default function RegisterPage() {
  let [updateInfo, setUpdateInfo] = useState<RegisterUserType | null>(null);
  let {check,user} = useSelector((state:RootState)=> state.app)

  useEffect(() => {
    let userString = localStorage.getItem("user");
    if (userString) {
      setUpdateInfo(JSON.parse(userString) as RegisterUserType);
    }

  }, []);
  
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModal(true));
  };
  const formikRef = useRef<FormikProps<any>>(null);

  const changeInfo = async (values: ChangeInfoType) => {
    if(user){
    let updatedUser : Partial<RegisterUserType> = {
          firstName : values.firstName,
          lastName : values.lastName,
          username : values.username,
          eposta : values.eposta,
          age : values.age,
          gender : values.gender,
          id:user.id,
          token:user.token,
          isAdmin:user.isAdmin,
          password : user.password,
          passwordrepetition : user.passwordrepetition
      }
    try {
       let response: RegisterUserType= await userService.updateUser(updatedUser)
     if(response){
      // Başarılı
      toast.success("Bilgileriniz Güncellendi")
      dispatch(setCheck(true))
      localStorage.removeItem("user")
      setUpdateUser(response)
      dispatch(setUser(response))
     }
    } catch (error:any) {
      toast.error("Bilgileriniz Güncellenemedi, Hata Oluştu"  + error.message)
    }
    
    }
    
  };
  
  return (
    <div>
      <div className=" h-[70vh] flex justify-center items-center">
        <div className="h-1/2 w-1/2 bg-[#dfe6e9]  flex flex-col items-center justify-center  opacity-90 !p-5 rounded-md shadow-md !box-content">
          <fieldset  className="w-full" disabled={check}>
            <Formik
           innerRef={formikRef}
              initialValues={{
                firstName: updateInfo?.firstName,
                lastName: updateInfo?.lastName,
                username: updateInfo?.username,
                eposta: updateInfo?.eposta,
                age: updateInfo?.age,
                gender: updateInfo?.gender,
              }}
              validationSchema={changeInfoSchema}
              onSubmit={changeInfo}
              enableReinitialize={true}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form>
                  <div className="flex gap-5 !mb-5">
                    <div className="!mb-1 w-1/2">
                      <TextField
                        value={values.firstName ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: "100%" }}
                        name="firstName"
                        variant="standard"
                        helperText={
                          errors.firstName &&
                          touched.firstName && (
                            <span className="text-[11px] text-red-600">
                              {errors.firstName}
                            </span>
                          )
                        }
                      />
                    </div>
                    <div className="!mb-1 w-1/2">
                      <TextField
                        value={values.lastName ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: "100%" }}
                        name="lastName"
                        variant="standard"
                        helperText={
                          errors.lastName &&
                          touched.lastName && (
                            <span className="text-[11px] text-red-600">
                              {errors.lastName}
                            </span>
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 !mb-5 justify-between">
                    <div className="!mb-1 w-1/2">
                      <TextField
                        value={values.username ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: "100%" }}
                        name="username"
                        variant="standard"
                        helperText={
                          errors.username &&
                          touched.username && (
                            <span className="text-[11px] text-red-600">
                              {errors.username}
                            </span>
                          )
                        }
                      />
                    </div>
                    <div className="!mb-1 w-1/2">
                      <TextField
                        value={values.eposta ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: "100%" }}
                        name="eposta"
                        variant="standard"
                        helperText={
                          errors.eposta &&
                          touched.eposta && (
                            <span className="text-[11px] text-red-600">
                              {errors.eposta}
                            </span>
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 !mb-5 items-center">
                    <div className="!mb-1 w-1/2">
                      <TextField
                        value={values.age ?? ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ width: "100%" }}
                        name="age"
                        variant="standard"
                        helperText={
                          errors.age &&
                          touched.age && (
                            <span className="text-[11px] text-red-600">
                              {errors.age}
                            </span>
                          )
                        }
                      />
                    </div>
                    <div className="!mb-1 w-1/2">
                      <FormLabel>Cinsiyet</FormLabel>
                      <RadioGroup
                        row
                        value={values.gender ?? ""}
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <FormControlLabel
                          value="female"
                          checked={values.gender === "female"}
                          control={<Radio />}
                          label="Kadın"
                        />
                        <FormControlLabel
                          value="male"
                          checked={values.gender === "male"}
                          control={<Radio />}
                          label="Erkek"
                        />
                        {errors.gender && touched.gender && (
                          <span className="text-[11px] text-red-600">
                            {errors.gender}
                          </span>
                        )}
                      </RadioGroup>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </fieldset>
          <div className="flex gap-3">
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              variant="contained"
              onClick={openModal}
            >
              Düzenle
            </Button>
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              variant="contained"
              color="warning"
              onClick={() => {
    const values = formikRef.current?.values;
    if (values) {
      changeInfo(values);
    }
  }}
              disabled={check}
              type="submit"
            >
              Kaydet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
