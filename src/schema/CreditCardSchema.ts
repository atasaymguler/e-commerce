import * as yup from "yup"

export const creditCardSchema = yup.object().shape({
    cardOwner : yup.string().required("Kart Sahibi İsim Soyisim Zorunlu").oneOf(["Efe Kırak"],"Hatalı Kart Bilgisi"),
    cardNumber:yup.string().required("Kart Numarası Zorunlu").oneOf(["1111111111111111"],"Hatalı Kart Bilgisi"),
    cardCv : yup.string().required("Kart Cv'si Zorunlu").oneOf(["111"],"Hatalı Kart Bilgisi"),
    cardExpirationDate:yup.string().required("Kart Son Kullanma Tarihi Zorunlu").oneOf(["11/11"],"Hatalı Kart Bilgisi")
})