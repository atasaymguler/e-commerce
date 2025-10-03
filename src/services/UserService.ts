import type { AxiosResponse } from "axios"
import { axiosConfig } from "../config/axiosConfig"
import type { RegisterUserType } from "../types/Types"

class UserService {
    addUserToServer(newUser : RegisterUserType):Promise<RegisterUserType>{
        return new Promise((resolve:any,reject:any)=>{
        axiosConfig.post(`/users`,newUser)
        .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
        .catch((error:any)=> reject(error))
    })
    }

    getAllUser():Promise<RegisterUserType[]>{
        return new Promise((resolve:any,reject:any)=>{
            axiosConfig.get("/users")
            .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    }

    updateUser(user:Partial<RegisterUserType>):Promise<RegisterUserType> {
        return new Promise((resolve:any,reject:any)=>{
            axiosConfig.put(`/users/${user.id}`,user)
             .then((response:AxiosResponse<any, any, {}>)=> resolve(response.data))
            .catch((error:any)=> reject(error))
        })
    } 
}

export default new UserService()