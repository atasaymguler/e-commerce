import userService from "../../services/UserService"
import type { RegisterUserType } from "../../types/Types"

export const setUpdateUser = async(updatedUser:RegisterUserType) => {
    let users : RegisterUserType[] = await userService.getAllUser()
    let user = users.find((user:RegisterUserType)=> user.eposta === updatedUser.eposta || user.username === updatedUser.username)
     localStorage.setItem("user",JSON.stringify(user))
}