import type { AxiosResponse } from "axios"
import { axiosConfig } from "../config/axiosConfig"
import type { CardType } from "../types/Types"

class CardService{
    getCardInfo() : Promise<CardType>{
        return new Promise((resolve:any,reject:any) =>{
            axiosConfig.get("/card/1")
            .then((response: AxiosResponse<any, any, {}>)=> resolve(response.data))
            .catch((error:any)=> reject(error))
        })

    }
}
export default new CardService()