import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ControlModal, ProductType, RegisterUserType } from '../../types/Types'

export interface AppSliceType {
  backdrop: boolean,
  user: RegisterUserType | null,
  modal : boolean,
  check : boolean,
  actionType : string,
  addProductModal : boolean,
  deleteProductModal : boolean,
  controlModal : ControlModal,
  theProductToBeProcessed : ProductType,
  updateProductModal : boolean,
 
}

const initialState: AppSliceType = {
  backdrop: false,
  user : JSON.parse(localStorage.getItem("user") as string)  || null,
  modal : false,
  check : true,
  actionType : "",
  addProductModal : false,
  deleteProductModal : false,
  updateProductModal : false,
  controlModal : {
    open : false,
    actionType : ""
  },
  theProductToBeProcessed :  {
    id:"",
    name:"",
    price:0,
    description:"",
    image:""
  },
 
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
    state.theProductToBeProcessed = action.payload
  },
  setControlModal : (state:AppSliceType,action : PayloadAction<ControlModal>) => {
    state.controlModal = action.payload
  },
   setProductToBeUpdated : (state:AppSliceType,action:PayloadAction<ProductType>) => {
    state.theProductToBeProcessed = action.payload
  },
   setUpdateProductModal : (state:AppSliceType , action:PayloadAction<boolean>) => {
    state.updateProductModal = action.payload
  },
 
  
    },
   
})

export const { openBackdrop , closeBackdrop,setUser,setModal,setCheck,setAddProductModal ,setDeleteProductModal,setProductToBeDeleted ,setControlModal ,setProductToBeUpdated,setUpdateProductModal } = appSlice.actions

export default appSlice.reducer