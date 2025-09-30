import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/LoginSchema";
import { useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from "../../redux/slice/appSlice";
import { checkUser } from "./checkUser";
import { toast } from "react-toastify";
import { findUser } from "./findUser";
export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submit = async() => {
    try {
    
      dispatch(openDrawer())
      let userCheck:boolean = await checkUser(values)
      if(userCheck){
        toast.success("Giriş Yapılıyor");
        navigate("/home")
        findUser(values)
      }else{
        toast.error("Kullanıcı adı veya Şifre Yanlış")
      }
    } catch (error : any) {
      toast.error("Giriş Yapılırken Hata Oluştu : "+error.message)
    }
    finally{
      dispatch(closeDrawer())
    }
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      userNameOrEmail: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: submit
  });

  const clear = () => {
    resetForm();
  };
  return (
    <div className="h-screen w-full bg-[url('/src/assets/Main1.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="h-full w-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-1/4 bg-[#fff] opacity-90 !p-3 rounded-md shadow-md">
          <div className="!mb-2">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ width: "100%" }}
                value={values.userNameOrEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                id="userNameOrEmail"
                name="userNameOrEmail"
                label="Email veya Kullanıcı Adı"
                variant="standard"
                helperText={
                  touched.userNameOrEmail &&
                  errors.userNameOrEmail && (
                    <span className="text-red-600">
                      {errors.userNameOrEmail}
                    </span>
                  )
                }
              />
            </Box>
          </div>
          <div className="!mb-2">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ width: "100%" }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                name="password"
                label="Şifre"
                variant="standard"
                type="password"
                helperText={
                  touched.password &&
                  errors.password && (
                    <span className="text-red-600">{errors.password}</span>
                  )
                }
              />
            </Box>
          </div>
          <div className="!mt-4">
            <div className="flex gap-3.5 justify-center">
              <Button
                size="small"
                sx={{ textTransform: "none" }}
                variant="contained"
                type="submit"
              >
                Giriş Yap
              </Button>
              <Button
                size="small"
                sx={{ textTransform: "none" }}
                variant="contained"
                onClick={clear}
              >
                Temizle
              </Button>
            </div>
            <div className="flex justify-center !mt-3">
              <p>
                Hesabınız yok mu?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-700 cursor-pointer"
                >
                  Kayıt Ol
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
