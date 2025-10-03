
import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username : yup.string().required("Kullanıcı Adı Zorunlu").min(5,"Kullanıcı Adı En Az 5 Karakterli Olmalı Olmalı").max(20,"Kullanıcı Adı En Fazla 20 Karakterli Olmalı"),
    eposta:yup.string().email("E-Posta Geçersiz").required("E-Posta Zorunlu"),
    password:yup.string()
  .min(6, 'Şifre en az 6 karakter olmalıdır')
  .max(20, 'Şifre en fazla 20 karakter olmalıdır')
  .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
  .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
  .required('Şifre zorunludur'),
  passwordrepetition:yup.string().required("Tekrar Şifre Zorunlu").oneOf([yup.ref("password")],"Şifreler Uyuşmuyor"),
  age:yup.number().required("Yaş Zorunlu").integer("Yaş Küsüratlı Değer Olmamalı").positive("Yaş Negatif Değer Olmamalı"),
  gender:yup.string().required("Cinsiyet Zorunlu"),
  isAdmin : yup.boolean(),
  firstName : yup.string().required("Ad Alanı Zorunlu"),
  lastName : yup.string().required("Soyad Alanı Zorunlu")
})