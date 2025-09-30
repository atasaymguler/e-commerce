import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RegisterUserType } from '../../types/Types'

export interface AppSliceType {
  drawer: boolean,
  user: RegisterUserType | null
}

const initialState: AppSliceType = {
  drawer: false,
  user : null
  // user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) as RegisterUserType : null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openDrawer : (state:AppSliceType) => {state.drawer = true},
    closeDrawer : (state:AppSliceType) => {state.drawer = false},
    setUser : (state:AppSliceType , action:PayloadAction<RegisterUserType|null>) => {state.user = action.payload}
  },
})

export const { openDrawer , closeDrawer,setUser } = appSlice.actions

export default appSlice.reducer