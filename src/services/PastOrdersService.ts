import type { AxiosResponse } from "axios"
import { axiosConfig } from "../config/axiosConfig"
import type { PastOrdersType } from "../types/Types"

class PastOrdersService{

    getAllOrders():Promise<PastOrdersType[]>{
        return new Promise((resolve:any,reject:any)=>{
            axiosConfig.get("/orders")
            .then((response: AxiosResponse<any, any, {}>) => resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    }

     addPastOrders(newPastOrders:PastOrdersType):Promise<PastOrdersType>{
        return new Promise((resolve:any,reject:any)=>{
            axiosConfig.post("/orders",newPastOrders)
            .then((response: AxiosResponse<any, any, {}>) => resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    }

    getPastOrdersById(userId:string):Promise<PastOrdersType[]>{
          return new Promise((resolve:any,reject:any)=>{
            axiosConfig.get(`/orders?userId=${userId}`)
            .then((response: AxiosResponse<any, any, {}>) => resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    }

}

export default new PastOrdersService()