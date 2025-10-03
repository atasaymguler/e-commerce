import * as yup from "yup";

export const changeInfoSchema = yup.object().shape({
    username : yup.string().required("Kullanıcı Adı Zorunlu").min(5,"Kullanıcı Adı En Az 5 Karakterli Olmalı Olmalı").max(20,"Kullanıcı Adı En Fazla 20 Karakterli Olmalı"),
    eposta:yup.string().email("E-Posta Geçersiz").required("E-Posta Zorunlu"),
    age:yup.number().required("Yaş Zorunlu").integer("Yaş Küsüratlı Değer Olmamalı").positive("Yaş Negatif Değer Olmamalı"),
    gender:yup.string().required("Cinsiyet Zorunlu"),
    firstName : yup.string().required("Ad Alanı Zorunlu"),
    lastName : yup.string().required("Soyad Alanı Zorunlu")
})