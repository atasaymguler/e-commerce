import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RegisterUserType } from '../../types/Types'

export interface AppSliceType {
  backdrop: boolean,
  user: RegisterUserType | null,
  modal : boolean,
  check : boolean,
  addProductModal : boolean,

}

const initialState: AppSliceType = {
  backdrop: false,
  user : null,
  modal : false,
  check : true,
  addProductModal : false,
 
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
   
    },
   
})

export const { openBackdrop , closeBackdrop,setUser,setModal,setCheck,setAddProductModal } = appSlice.actions

export default appSlice.reducer