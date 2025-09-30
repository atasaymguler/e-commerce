
export interface RegisterUserType{
    username:string,
    eposta:string,
    password:string,
    passwordrepetition:string,
    age:number,
    gender:string,
    isAdmin:boolean
    token?: string
}
export interface LoginUserType{
    userNameOrEmail:string,
    password:string,
}