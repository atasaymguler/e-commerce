import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    userNameOrEmail: yup.string().required("Kullanıcı Adı veya E-Posta Zorunlu"),
    password: yup.string().required("Şifre Zorunlu"),
})