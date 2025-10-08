export interface RegisterUserType {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  eposta: string;
  password: string;
  passwordrepetition: string;
  age: number;
  gender: string;
  isAdmin: boolean;
  token?: string;
}
export interface LoginUserType {
  userNameOrEmail: string;
  password: string;
}

export interface ChangeInfoType {
  username?: string;
  eposta?: string;
  age?: number;
  gender?: string;
  firstName?: string;
  lastName?: string;
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface AddProductType {
  productName: string;
  description: string;
  price: number;
  image: string;
}
export interface ControlModal {
  open: boolean;
  actionType: string;
}
export interface SelectedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}
export interface CardType {
  cardOwner: string;
  cardNumber: string;
  cardCv: string;
  cardExpirationDate: string;
}
export interface PastOrdersType{
  id:string,
  userId : string,
  items : ProductType[],
  total : number,
  date : string
}
