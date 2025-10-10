import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/RegisterSchema";
import type { RegisterUserType } from "../../types/Types";
import { createToken } from "../../functions/createToken";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import { checkEmailAndUsername } from "./checkEmailAndUsername";
import { useNavigate } from "react-router-dom";
import { createId } from "../../functions/createId";

export default function RegisterPage() {
  const navigate = useNavigate();
  const submit = async (values: RegisterUserType) => {
    const token = createToken();
    const id = await createId()
    let awaitSituation = await checkEmailAndUsername(
      values.eposta,
      values.username
    );
    if (!awaitSituation) {
      let newUser = {
        ...values,
        token,
        id
      };
      try {
        let response: RegisterUserType = await userService.addUserToServer(
          newUser
        );
        if (response) {
          toast.success("Kayıt Oluşturuldu, Aramıza Hoş Geldiniz :)");
          clear();
          navigate("/");
        }
      } catch (error: any) {
        toast.error(`Kayıt Oluşturulurken Hata Oluştu : ${error.message}`);
      }
    } else {
      toast.error("Email veya Kullanıcı Adı Daha Önce Kullanılmış");
    }
  };
  const clear = () => {
    resetForm();
  };

  const {
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    values,
    touched,
  } = useFormik({
    initialValues: {
      firstName : "",
      lastName : "",
      username: "",
      eposta: "",
      password: "",
      passwordrepetition: "",
      age: 0,
      gender: "",
      isAdmin: false,
    },
    validationSchema: registerSchema,
    onSubmit: submit,
  });

  return (
    <div className="h-screen w-full bg-[url('/src/assets/Main1.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="h-full w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-3/4 md:w-1/2 bg-[#fff] opacity-90 !p-3 rounded-md shadow-md"
        >
            <div className="flex flex-col md:flex-row md:gap-3">
            <div className="!mb-1 md:w-1/2">
              <TextField
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ width: "100%" }}
                name="firstName"
                label="Adınız"
                variant="standard"
                helperText={
                  errors.firstName &&
                  touched.firstName && (
                    <span className="text-red-600">
                      {errors.firstName}
                    </span>
                  )
                }
              />
            </div>
            <div className="!mb-1 md:w-1/2">
              <TextField
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ width: "100%" }}
                name="lastName"
                label="Soyadınız"
                variant="standard"
                helperText={
                  errors.lastName &&
                  touched.lastName && (
                    <span className=" text-red-600">
                      {errors.lastName}
                    </span>
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-3">
            <div className="!mb-1 md:w-1/2">
              <TextField
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ width: "100%" }}
                name="username"
                label="Kullanıcı Adı"
                variant="standard"
                helperText={
                  errors.username &&
                  touched.username && (
                    <span className=" text-red-600">
                      {errors.username}
                    </span>
                  )
                }
              />
            </div>
            <div className="!mb-1 md:w-1/2">
              <TextField
                value={values.eposta}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ width: "100%" }}
                name="eposta"
                label="E-posta"
                variant="standard"
                helperText={
                  errors.eposta &&
                  touched.eposta && (
                    <span className=" text-red-600">
                      {errors.eposta}
                    </span>
                  )
                }
              />
            </div>
          </div>
                <div className="flex flex-col md:flex-row md:gap-3">
            <div className="!mb-1 md:w-1/2">
            <TextField
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              name="password"
              label="Şifre"
              variant="standard"
              helperText={
                errors.password &&
                touched.password && (
                  <span className=" text-red-600">
                    {errors.password}
                  </span>
                )
              }
            />
          </div>
          <div className="!mb-1 md:w-1/2">
            <TextField
              type="password"
              value={values.passwordrepetition}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              name="passwordrepetition"
              label="Şifre Tekrarı"
              variant="standard"
              helperText={
                errors.passwordrepetition &&
                touched.passwordrepetition && (
                  <span className=" text-red-600">
                    {errors.passwordrepetition}
                  </span>
                )
              }
            />
          </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-3 ">
 <div className="!my-1 md:w-1/2">
            <TextField
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
              name="age"
              label="Yaş"
              variant="standard"
              helperText={
                errors.age &&
                touched.age && (
                  <span className=" text-red-600">{errors.age}</span>
                )
              }
            />
          </div>
          <div className="!mb-1 md:w-1/2">
            <FormLabel><span className="text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">Cinsiyet</span></FormLabel>
            <RadioGroup
              row
              value={values.gender}
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Kadın"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Erkek"
              />
              {errors.gender && touched.gender && (
                <span className=" text-red-600">
                  {errors.gender}
                </span>
              )}
            </RadioGroup>
          </div>
          </div>
              <div className=" flex gap-2 items-center !mb-2">
 <FormLabel id="isAdminCheck"><span className="text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">Admin Mi ?</span></FormLabel>
          
            <input className="w-[10px] md:w-[12px] lg:w-[15px]" type="checkbox"  id="isAdmin"
              checked={values.isAdmin}
              onBlur={handleBlur}
              onChange={handleChange} />
              </div>
           
          <div className="flex gap-3 justify-center">
            <Button
              type="submit"
              size="small"
              sx={{ textTransform: "none"  }}
              variant="contained"
             
            >
              Kayıt Ol
            </Button>
            <Button
              onClick={clear}
              size="small"
              sx={{ textTransform: "none" }}
              variant="contained"
              color="warning"
            >
              Temizle
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
}
