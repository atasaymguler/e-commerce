
export interface RegisterUserType{
    id?:string,
    firstName:string,
    lastName:string,
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

export interface ChangeInfoType{
    username? : string,
    eposta?:string,
    age?:number,
    gender?:string,
    firstName? : string,
    lastName? : string
}