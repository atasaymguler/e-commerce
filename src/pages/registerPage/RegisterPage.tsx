import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/RegisterSchema";
import type { RegisterUserType } from "../../types/Types";
import { createToken } from "../../functions/createToken";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import { checkEmailAndUsername } from "./checkEmailAndUsername";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const navigate = useNavigate()
  const submit = async (values: RegisterUserType) => {
    const token = createToken();
    let awaitSituation = await checkEmailAndUsername(values.eposta,values.username);
    if(!awaitSituation) {
         let newUser = {
      ...values,
      token,
    };
    try {
      let response: RegisterUserType = await userService.addUserToServer(newUser);
      if (response) {
        toast.success("Kayıt Oluşturuldu, Aramıza Hoş Geldiniz :)");
        clear();
        navigate("/login")
      }
    } catch (error: any) {
      toast.error(`Kayıt Oluşturulurken Hata Oluştu : ${error.message}`);
    }
    }
    else{
      toast.error("Email veya Kullanıcı Adı Daha Önce Kullanılmış")
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
          className="w-1/4 bg-[#fff] opacity-90 !p-3 rounded-md shadow-md"
        >
          <div className="!mb-1">
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
                  <span className="text-[11px] text-red-600">
                    {errors.username}
                  </span>
                )
              }
            />
          </div>
          <div className="!mb-1">
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
                  <span className="text-[11px] text-red-600">
                    {errors.eposta}
                  </span>
                )
              }
            />
          </div>
          <div className="!mb-1">
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
                  <span className="text-[11px] text-red-600">
                    {errors.password}
                  </span>
                )
              }
            />
          </div>
          <div className="!mb-1">
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
                  <span className="text-[11px] text-red-600">
                    {errors.passwordrepetition}
                  </span>
                )
              }
            />
          </div>
          <div className="!mb-1">
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
                  <span className="text-[11px] text-red-600">{errors.age}</span>
                )
              }
            />
          </div>
          <div>
            <FormLabel>Cinsiyet</FormLabel>
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
                <span className="text-[11px] text-red-600">
                  {errors.gender}
                </span>
              )}
            </RadioGroup>
          </div>
          <div>
            <FormLabel id="isAdminCheck">Admin Mi ?</FormLabel>
            <Checkbox
              id="isAdmin"
              checked={values.isAdmin}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              size="small"
              sx={{ textTransform: "none" }}
              variant="contained"
              color="secondary"
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
