import * as yup from "yup";

export const addProductSchema = yup.object().shape({
    productName : yup.string().required("Ürün İsmi Zorunlu").min(5,"Ürün İsmi En Az 5 Karakterli Olmalı"),
    description : yup.string().required("Ürün Açıklaması Zorunlu").min(10,"Ürün İsmi En Az 10 Karakterli Olmalı"),
    price : yup.number().required("Ürün Fiyatı Zorunlu").positive("Ürün Fiyatı Negatif Bir Değer Olamaz"),
    image : yup.string().required("Ürün Resmi Zorunlu")
})