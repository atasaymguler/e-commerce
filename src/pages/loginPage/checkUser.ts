import userService from "../../services/UserService"
import type { LoginUserType ,RegisterUserType} from "../../types/Types"

export const checkUser = async(loggedinUser : LoginUserType) : Promise<boolean> => {
    let users : RegisterUserType[] = await userService.getAllUser()
    let findUser : boolean = false
    users.forEach((user:RegisterUserType)=>{
        if((user.username=== loggedinUser.userNameOrEmail || user.eposta === loggedinUser.userNameOrEmail)&& user.password === loggedinUser.password){
            findUser = true ;
        }
    })
    return findUser
}