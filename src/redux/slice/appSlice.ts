import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProductType, RegisterUserType } from '../../types/Types'

export interface AppSliceType {
  backdrop: boolean,
  user: RegisterUserType | null,
  modal : boolean,
  check : boolean,
  addProductModal : boolean,
  deleteProductModal : boolean,
  productToBeDeleted : ProductType

}

const initialState: AppSliceType = {
  backdrop: false,
  user : null,
  modal : false,
  check : true,
  addProductModal : false,
  deleteProductModal : false,
  productToBeDeleted: {
    id:"",
    name:"",
    price:0,
    description:"",
    image:""
  }
  
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openBackdrop : (state:AppSliceType) => {state.backdrop = true},
    closeBackdrop : (state:AppSliceType) => {state.backdrop = false},
    setUser : (state:AppSliceType , action:PayloadAction<RegisterUserType|null>) => {state.user = action.payload},
    setModal : (state:AppSliceType , action:PayloadAction<boolean>) => {state.modal = action.payload},
     setCheck : (state:AppSliceType , action:PayloadAction<boolean>) => {
     state.check = action.payload
  },
  setAddProductModal : (state:AppSliceType , action:PayloadAction<boolean>) => {state.addProductModal = action.payload},
  setDeleteProductModal : (state:AppSliceType , action:PayloadAction<boolean>) => {
    state.deleteProductModal = action.payload
  },
  setProductToBeDeleted : (state:AppSliceType,action:PayloadAction<ProductType>) => {
    state.productToBeDeleted = action.payload
  }
   
    },
   
})

export const { openBackdrop , closeBackdrop,setUser,setModal,setCheck,setAddProductModal ,setDeleteProductModal,setProductToBeDeleted } = appSlice.actions

export default appSlice.reducer