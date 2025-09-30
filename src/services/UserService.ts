import type { AxiosResponse } from "axios"
import { axiosConfig } from "../config/axiosConfig"
import type { UserType } from "../types/Types"

class UserService {
    addUserToServer(newUser : UserType):Promise<UserType>{
        return new Promise((resolve:any,reject:any)=>{
        axiosConfig.post(`/users`,newUser)
        .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
        .catch((error:any)=> reject(error))
    })
    }

    getAllUser():Promise<UserType[]>{
        return new Promise((resolve:any,reject:any)=>{
            axiosConfig.get("/users")
            .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    }
}

export default new UserService()