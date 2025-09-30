import UserService from "../../services/UserService"
import type { LoginUserType, RegisterUserType } from "../../types/Types"

export const findUser = async(loginUser:LoginUserType) => {
    let users : RegisterUserType[] = await UserService.getAllUser()
    let user = users.find((user:RegisterUserType)=> user.eposta === loginUser.userNameOrEmail || user.username === loginUser.userNameOrEmail)
     localStorage.setItem("user",JSON.stringify(user))
}