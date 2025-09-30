import userService from "../../services/UserService"
import type { RegisterUserType } from "../../types/Types";

export const checkEmailAndUsername = async (email:string,username:string) : Promise<boolean> =>{
  
    const users : RegisterUserType[] = await userService.getAllUser();
    let situation : boolean = false;
    users.forEach((user:RegisterUserType)=>{
     
        if(user.eposta === email || user.username === username){
           
            situation = true
        }
    })
    return situation
}