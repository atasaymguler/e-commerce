import type { AxiosResponse } from "axios"
import { axiosConfig } from "../config/axiosConfig"
import type { ProductType } from "../types/Types"

class ProductService{

    // Sayfaya göre veri çekme işlemi yapıyoruz bize hem data hem headers kısmı lazım o yüzden response.data yerine response kullandık ve geri dönen tipi Promise<AxiosResponse<ProductType[]> olarak değiştirdik.

   getAllProducts(page: number, limit: number):Promise<AxiosResponse<ProductType[]>>{
        return new Promise((resolve:any,reject:any)=>{
             axiosConfig.get(`/products?_page=${page}&_limit=${limit}`)
             .then((response:AxiosResponse<any, any, {}>)=> resolve(response))
             .catch((error:any)=> reject(error))
           
        }
    )
    }
    
}

export default new ProductService()
