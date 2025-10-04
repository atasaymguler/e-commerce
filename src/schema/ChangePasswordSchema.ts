import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
    oldPassword : yup.string().required("Eski Şifre Girilmesi Gerekiyor"),
    newPassword : yup.string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .max(20, 'Şifre en fazla 20 karakter olmalıdır')
      .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
      .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
      .required('Şifre zorunludur'),
      newPasswordRepeat:yup.string().required("Tekrar Şifre Zorunlu").oneOf([yup.ref("newPassword")],"Şifreler Uyuşmuyor"),
})